import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("Error:", error);

  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation error",
      errors: error.errors,
    });
  }

  if (error.code === 11000) {
    return res.status(400).json({
      message: "Duplicate field value entered",
    });
  }

  res.status(error.status || 500).json({
    message: error.message || "Internal server error",
  });
};
