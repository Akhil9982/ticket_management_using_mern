const mongoose = require("mongoose");

let cachedConnection = null;

async function connectDB() {
  try {
    // 1. Check if we already have an active connection using Mongoose's readyState
    // readyState 1 means "Connected"
    if (cachedConnection && mongoose.connection.readyState === 1) {
      console.log("Using cached database connection");
      return cachedConnection;
    }

    // 2. Validate environment variable
    const dbUrl = process.env.MONGO_URI; // Changed to standard ALL_CAPS
    if (!dbUrl) {
      throw new Error("MONGO_URI environment variable is not set");
    }

    cachedConnection = await mongoose.connect(dbUrl);
    console.log("Database connected successfully");
    return cachedConnection;
  } catch (err) {
    console.error("Database connection error:", err);

    // Here we use process.exit(1) because to exit the node if DB fails to connect and basically to stop the API from connecting continuously to database.

    process.exit(1);
  }
}

module.exports = connectDB;
