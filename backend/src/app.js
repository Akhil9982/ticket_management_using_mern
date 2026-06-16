const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const ticketRoutes = require("./routes/ticket.Routes");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());

// Allow requests from Vite frontend
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("API is running");
});

// Routes - Endpoints
app.use("/api/auth/users", authRoutes);
app.use("/api/tickets", ticketRoutes);

module.exports = app;
