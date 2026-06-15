const Comment = require("../models/comment.model");
const Ticket = require("../models/ticket.model");

// @desc    Get comments for a specific ticket
// @route   GET /api/tickets/:ticketId/comments
// @access  Private
const getComments = async (req, res) => {
  // 1. Verify the ticket exists and the user has access to it
  const ticket = await Ticket.findById(req.params.ticketId);

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  // 2. OWNERSHIP CHECK: Ensure the Customer actually owns the parent ticket
  if (
    req.user.role === "Customer" &&
    ticket.createdBy.toString() !== req.user._id.toString()
  ) {
    return res
      .status(403)
      .json({ message: "Not authorized to view these comments" });
  }

  // 3. If they pass the check (or if they are an Agent/Admin), fetch the comments
  const comments = await Comment.find({
    ticketId: req.params.ticketId,
  }).populate("senderId", "name role");

  // 4. (Optional) Filter out internal agent notes so customers cannot see them
  let visibleComments = comments;
  if (req.user.role === "Customer") {
    visibleComments = comments.filter(
      (comment) => comment.isInternalNote === false,
    );
  }

  res.status(200).json(visibleComments);
};

// @desc    Add a comment to a ticket
// @route   POST /api/tickets/:ticketId/comments
// @access  Private
const addComment = async (req, res) => {
  const { message, comment: incomingComment } = req.body;
  const commentText = (message || incomingComment || "").trim();

  if (!commentText) {
    return res.status(400).json({ message: "Please add a message" });
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }
  // 2. Use the Comment model to create a new comment in the database
  const comment = await Comment.create({
    ticketId: req.params.ticketId,
    senderId: req.user._id, // Comes securely from our authMiddleware
    message: commentText,
  });

  // Fetch it again to populate the sender's details before sending back to React
  const populatedComment = await Comment.findById(comment._id).populate(
    "senderId",
    "name role",
  );

  res.status(201).json(populatedComment);
};

module.exports = {
  getComments,
  addComment,
};
