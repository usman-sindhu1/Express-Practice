"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = authRoutes;
const auth_services_1 = require("../../services/auth.services");
const asyncHandler_1 = require("../../utils/asyncHandler");
const auth_schema_1 = require("../../validators/auth.schema");
function authRoutes(app) {
    app.post("/auth/register", (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const data = auth_schema_1.registerSchema.parse(req.body);
        const result = await (0, auth_services_1.registerUser)(data);
        res.status(201).json(result);
    }));
    app.post("/auth/login", (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const data = auth_schema_1.loginSchema.parse(req.body);
        const result = await (0, auth_services_1.loginUser)(data.email, data.password);
        res.status(200).json(result);
    }));
}
