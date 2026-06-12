"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerHandler = registerHandler;
exports.loginHandler = loginHandler;
const auth_services_1 = require("../../services/auth.services");
const auth_schema_1 = require("../../validators/auth.schema");
async function registerHandler(req, res) {
    const data = auth_schema_1.registerSchema.parse(req.body);
    const result = await (0, auth_services_1.registerUser)(data);
    res.status(201).json(result);
}
async function loginHandler(req, res) {
    const data = auth_schema_1.loginSchema.parse(req.body);
    const result = await (0, auth_services_1.loginUser)(data.email, data.password);
    res.status(200).json(result);
}
