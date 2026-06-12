"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const auth_1 = require("../lib/auth");
const errors_1 = require("../utils/errors");
function authMiddleware(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return next(new errors_1.AppError(401, "Unauthorized"));
    }
    const token = authHeader.slice(7);
    try {
        const { userId } = (0, auth_1.verifyToken)(token);
        req.userId = userId;
        next();
    }
    catch {
        next(new errors_1.AppError(401, "Invalid or expired token"));
    }
}
