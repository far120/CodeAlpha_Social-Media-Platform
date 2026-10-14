import { Request, Response, NextFunction } from "express";
import AppError from "./AppError";


const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Duplicate key error from MongoDB
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];

    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  console.error("💥 ERROR:", err);

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

export default errorHandler;
