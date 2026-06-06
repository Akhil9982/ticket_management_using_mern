const express = require("express");
const authRoutes = require("./routes/auth.routes");
const ticketRoutes = require("./routes/ticket.Routes");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

// Routes - Endpoints
app.use("/api/auth/users", authRoutes);
app.use("/api/tickets", ticketRoutes);

module.exports = app;
