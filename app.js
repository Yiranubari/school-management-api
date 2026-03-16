import express from "express";
import dotenv from "dotenv";
import schoolRouter from "./routes/school.routes.js";
import healthRouter from "./routes/health.routes.js";
import { AppException } from "./exceptions/app.exception.js";
import logger from "./utils/logger.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "School Management API is running" });
});

app.use("/", healthRouter);
app.use("/", schoolRouter);

// Global error handling middleware
app.use((err, req, res, next) => {
  logger.error("Unhandled error", err);

  if (err instanceof AppException) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Handle unexpected errors
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
