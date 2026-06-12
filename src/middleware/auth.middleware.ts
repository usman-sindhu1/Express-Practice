import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../lib/auth";
import { AppError } from "../utils/errors";

export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(new AppError(401, "Unauthorized"));
  }

  const token = authHeader.slice(7);

  try {
    const { userId } = verifyToken(token);
    req.userId = userId;
    next();
  } catch {
    next(new AppError(401, "Invalid or expired token"));
  }
}
