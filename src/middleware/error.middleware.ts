import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/errors";

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.flatten().fieldErrors,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err && typeof err === "object" && "code" in err) {
    if (err.code === "P2002") {
      return res.status(409).json({ message: "Email or phone number already exists" });
    }
    if (err.code === "P1001") {
      return res.status(503).json({ message: "Database is unreachable" });
    }
  }

  console.error(err);
  return res.status(500).json({ message: "Internal server error" });
}
