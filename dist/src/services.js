"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getUser = getUser;
exports.updateUser = updateUser;
const auth_1 = require("./auth");
const errors_1 = require("./errors");
const prisma_1 = require("./prisma");
const userFields = {
    id: true,
    first_name: true,
    last_name: true,
    email: true,
    phone_no: true,
    gender: true,
    date_of_birth: true,
};
async function registerUser(data) {
    const user = await prisma_1.prisma.user.create({
        data: { ...data, password: await (0, auth_1.hashPassword)(data.password) },
        select: userFields,
    });
    return { user, token: (0, auth_1.signToken)(user.id) };
}
async function loginUser(email, password) {
    const user = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (!user || !(await (0, auth_1.comparePassword)(password, user.password))) {
        throw new errors_1.AppError(401, "Invalid email or password");
    }
    const { password: _, ...publicUser } = user;
    return { user: publicUser, token: (0, auth_1.signToken)(user.id) };
}
function getUser(id) {
    return prisma_1.prisma.user.findUnique({ where: { id }, select: userFields });
}
function updateUser(id, data) {
    return prisma_1.prisma.user.update({ where: { id }, data, select: userFields });
}
