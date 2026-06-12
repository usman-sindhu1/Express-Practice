"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = userRoutes;
const auth_middleware_1 = require("../../middleware/auth.middleware");
const user_services_1 = require("../../services/user.services");
const asyncHandler_1 = require("../../utils/asyncHandler");
const errors_1 = require("../../utils/errors");
const user_schema_1 = require("../../validators/user.schema");
function userRoutes(app) {
    app.get("/users/me", auth_middleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const user = await (0, user_services_1.getUser)(req.userId);
        if (!user) {
            throw new errors_1.AppError(404, "User not found");
        }
        res.status(200).json(user);
    }));
    app.patch("/users/me", auth_middleware_1.authMiddleware, (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const data = user_schema_1.updateUserSchema.parse(req.body);
        const user = await (0, user_services_1.updateUser)(req.userId, data);
        res.status(200).json(user);
    }));
}
