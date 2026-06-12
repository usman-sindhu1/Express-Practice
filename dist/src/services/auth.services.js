"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const auth_1 = require("../lib/auth");
const errors_1 = require("../utils/errors");
const user_services_1 = require("./user.services");
async function registerUser(data) {
    const user = await (0, user_services_1.createUser)(data);
    const token = (0, auth_1.signToken)(user.id);
    return { user, token };
}
async function loginUser(email, password) {
    const user = await (0, user_services_1.getUserByEmail)(email);
    if (!user || !(await (0, auth_1.comparePassword)(password, user.password))) {
        throw new errors_1.AppError(401, "Invalid email or password");
    }
    const { password: _, ...publicUser } = user;
    return {
        user: publicUser,
        token: (0, auth_1.signToken)(user.id),
    };
}
