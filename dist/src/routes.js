"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = routes;
const errors_1 = require("./errors");
const middleware_1 = require("./middleware");
const schemas_1 = require("./schemas");
const services_1 = require("./services");
function routes(app) {
    app.post("/auth/register", async (req, res) => {
        const result = await (0, services_1.registerUser)(schemas_1.registerSchema.parse(req.body));
        res.status(201).json(result);
    });
    app.post("/auth/login", async (req, res) => {
        const { email, password } = schemas_1.loginSchema.parse(req.body);
        res.json(await (0, services_1.loginUser)(email, password));
    });
    app.get("/users/me", middleware_1.authMiddleware, async (req, res) => {
        const user = await (0, services_1.getUser)(req.userId);
        if (!user)
            throw new errors_1.AppError(404, "User not found");
        res.json(user);
    });
    app.patch("/users/me", middleware_1.authMiddleware, async (req, res) => {
        const data = schemas_1.updateUserSchema.parse(req.body);
        res.json(await (0, services_1.updateUser)(req.userId, data));
    });
}
