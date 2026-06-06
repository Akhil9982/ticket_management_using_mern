const express = require("express");
// mergeParams: true is REQUIRED so this router can read the :ticketId from the parent router
const router = express.Router({ mergeParams: true });
const { allowedRoles } = require("../middlewares/auth.middleware");
const {
  getComments,
  addComment,
} = require("../controllers/comment.controller");

// Route: /api/tickets/:ticketId/comments
// getComments
router.route("/getComments").get(allowedRoles("agent", "admin"), getComments);
// addComments
router.route("/addComments").post(allowedRoles("agent", "admin"), addComment);

module.exports = router;
