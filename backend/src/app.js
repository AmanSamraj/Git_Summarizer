
import "dotenv/config";
import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes.js";

const app = express();

// Allow the frontend to communicate with the backend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
  })
);

// Allow the backend to read JSON data
app.use(express.json({ limit: "1mb" }));

// Welcome route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to GitSummarizer Backend API"
  });
});

// Health check route
app.use("/api/health", healthRoutes);

// Handle routes that do not exist
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

export default app;
