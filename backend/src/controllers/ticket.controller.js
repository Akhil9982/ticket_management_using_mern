const ticketModel = require("../models/ticket.model");

// @desc    Get tickets (Handles Customer vs Agent/Admin views)
// @route   GET /api/tickets
// @access  Private
const getTickets = async (req, res) => {
  let query;

  if (req.user.role === "Customer") {
    query = ticketModel.find({
      createdBy: req.user._id,
    });
  } else {
    query = ticketModel.find();
  }

  const tickets = await query
    .populate("createdBy", "name email role")
    .populate("assignedTo", "name email role");

  res.status(200).json(tickets);
};

// @desc    Get a single ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = async (req, res) => {
  const ticket = await ticketModel
    .findById(req.params.id)
    .populate("createdBy", "name email role")
    .populate("assignedTo", "name email role");

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  // OWNERSHIP CHECK: Block Customers from viewing other people's tickets
  if (
    req.user.role === "Customer" &&
    ticket.createdBy._id.toString() !== req.user._id.toString()
  ) {
    return res
      .status(403)
      .json({ message: "Not authorized to view this ticket" });
  }

  res.status(200).json(ticket);
};

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = async (req, res) => {
  const ticket = await ticketModel.findById(req.params.id);

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  // OWNERSHIP CHECK: Block Customers from updating other people's tickets
  if (
    req.user.role === "Customer" &&
    ticket.createdBy.toString() !== req.user._id.toString()
  ) {
    return res
      .status(403)
      .json({ message: "Not authorized to update this ticket" });
  }

  // Update the ticket
  const updatedTicket = await ticketModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }, // Returns the newly updated document instead of the old one
  );

  res.status(200).json(updatedTicket);
};

// @desc    Create a new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = async (req, res) => {
  const { title, description, priority } = req.body;

  // 1. Validation
  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Please add a title and description" });
  }

  // 2. Create the ticket in MongoDB
  const ticket = await ticketModel.create({
    title,
    description,
    priority: priority || "Medium",
    status: "open",
    // We get req.user._id securely from the JWT via our authMiddleware
    createdBy: req.user._id,
  });

  res.status(201).json(ticket);
};

// @desc    Delete a ticket
// @route   DELETE /api/tickets/:id
// @access  Private (Admin Only - Enforced by Middleware)
const deleteTicket = async (req, res) => {
  // 1. Find the ticket
  const ticket = await ticketModel.findById(req.params.id);
  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  // 2. Delete the document
  await ticket.deleteOne();
  res.status(200).json({
    id: req.params.id,
    message: "Ticket deleted successfully",
  });
};

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};
