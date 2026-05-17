import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/client";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export interface AppError extends Object {
  message: string;
  code?: string;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  let statusCode = 500;
  let message = "Internal Server Error";
  console.log("checking the err", err);

  // Prisma errors
  // if (err instanceof PrismaClient.PrismaClientKnownRequestError) {
  //   statusCode = 400;

  //   if (err.code === "P2002") {
  //     message = "A record with this value already exists";
  //   } else if (err.code === "P2025") {
  //     message = "Record not found";
  //   } else if (err.code === "P2003") {
  //     message = "Foreign key constraint failed";
  //   }
  // }

  // // Validation errors
  // if (err instanceof PrismaClient.PrismaClientValidationError) {
  //   statusCode = 400;
  //   message = "Invalid data provided";
  // }

  // // Log error in development
  // if (process.env.NODE_ENV === "development") {
  //   console.error("Error:", err);
  // }

  if (err instanceof PrismaClientKnownRequestError) {
    let message = "Database error";

    if (err.code === "P2002") {
      message = "A record with this value already exists";
    } else if (err.code === "P2025") {
      message = "Record not found";
    } else if (err.code === "P2003") {
      message = "Foreign key constraint failed";
    }

    if (err instanceof PrismaClientValidationError) {
      statusCode = 400;
      message = "Invalid data provided";
    }

    return res.status(400).json({
      success: false,
      error: message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: err.errors.map((e) => `${e.path} is ${e.message}`),
    });
  }

  return res.status(400).json({
    success: false,
    error: err?.message || "Something went wrong",
  });
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response => {
  return res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
  });
};

export class AppErrorClass extends Error implements AppError {
  message: string;
  code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.message = message;
    // this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}
