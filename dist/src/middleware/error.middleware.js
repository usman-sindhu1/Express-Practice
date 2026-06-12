"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const zod_1 = require("zod");
const errors_1 = require("../utils/errors");
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
