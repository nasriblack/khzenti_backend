import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { validateEmailConstraints } from "../utils/validator";
import rateLimit from "express-rate-limit";

/**
 * Zod schema for email validation
 */
const whitelistSchema = z.object({
  email: z.string().min(1, "Email is required"),
});

/**
 * Middleware to validate whitelist request body
 */
export const validateWhitelistRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    // Validate with Zod schema
    const result = whitelistSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }

    // Additional email validation
    const { email } = result.data;
    const emailValidation = validateEmailConstraints(email);

    if (!emailValidation.valid) {
      res.status(400).json({
        success: false,
        message: emailValidation.error || "Invalid email",
      });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};
/**
 * Rate limiter configuration
 * Limits requests to 5 per 15 minutes per IP
 */
export const apiLimiter: any = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 5, // 5 requests per window
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Skip successful requests from rate limit count
  skipSuccessfulRequests: false,
  // Skip failed requests from rate limit count
  skipFailedRequests: false,
});

/**
 * Strict rate limiter for whitelist endpoint
 * More restrictive to prevent abuse
 */
export const whitelistLimiter: any = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // 3 requests per 15 minutes
  message: {
    success: false,
    message:
      "You have exceeded the whitelist submission limit. Please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
