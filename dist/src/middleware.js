"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
exports.errorMiddleware = errorMiddleware;
const zod_1 = require("zod");
const auth_1 = require("./auth");
const errors_1 = require("./errors");
function authMiddleware(req, _res, next) {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        return next(new errors_1.AppError(401, "Unauthorized"));
    }
    try {
        req.userId = (0, auth_1.verifyToken)(header.slice(7)).userId;
        next();
    }
    catch {
        next(new errors_1.AppError(401, "Invalid or expired token"));
    }
}
function errorMiddleware(err, _req, res, _next) {
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            message: "Validation failed",
            errors: err.flatten().fieldErrors,
        });
    }
    if (err instanceof errors_1.AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    const code = err.code;
    if (code === "P2002") {
        return res.status(409).json({ message: "Email or phone number already exists" });
    }
    if (code === "P1001") {
        return res.status(503).json({ message: "Database is unreachable" });
    }
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
}
