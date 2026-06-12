"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeHandler = getMeHandler;
exports.updateMeHandler = updateMeHandler;
const user_services_1 = require("../../services/user.services");
const errors_1 = require("../../utils/errors");
const user_schema_1 = require("../../validators/user.schema");
async function getMeHandler(req, res) {
    const user = await (0, user_services_1.getUser)(req.userId);
    if (!user) {
        throw new errors_1.AppError(404, "User not found");
    }
    res.status(200).json(user);
}
async function updateMeHandler(req, res) {
    const data = user_schema_1.updateUserSchema.parse(req.body);
    const user = await (0, user_services_1.updateUser)(req.userId, data);
    res.status(200).json(user);
}
