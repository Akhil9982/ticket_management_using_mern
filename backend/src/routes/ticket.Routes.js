const express = require("express");
const router = express.Router();
const { allowedRoles } = require("../middlewares/auth.middleware");

const {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticket.controller");

const commentRouter = require("./comment.routes");

// Re-routes requests to the comment router
router.use("/:ticketId/comments", commentRouter);


// TICKET ROUTES

// 1. Get Tickets: Allow EVERYONE (Controller handles the filtering)
router.get("/getTickets", allowedRoles("customer", "agent", "admin"), getTickets);

// 2. Create Ticket: Allow customers (Note: Add "agent" or "admin" here if we want staff to create tickets too)
router.post("/createTicket", allowedRoles("customer"), createTicket);

// 3. Single Ticket Actions (View, Update, Delete)
router
  .route("/:id")
  // MUST have allowedRoles so req.user is passed to the controller!
  .get(allowedRoles("customer", "agent", "admin"), getTicket)
  .put(allowedRoles("customer", "agent", "admin"), updateTicket)
  .delete(allowedRoles("admin"), deleteTicket); 

module.exports = router;