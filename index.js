import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.config.js";

// Load environment variables from .env file
dotenv.config();

// Connect to the MongoDB database
connectDB()
  .then(() => {
    // Start the server
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log();
    });
  })
  .catch((err) => {
    console.error("error:", err);
  });
