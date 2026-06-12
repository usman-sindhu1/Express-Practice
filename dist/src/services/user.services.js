"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getUserByEmail = getUserByEmail;
exports.getUser = getUser;
exports.updateUser = updateUser;
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../lib/auth");
const publicUserSelect = {
    id: true,
    first_name: true,
    last_name: true,
    email: true,
    phone_no: true,
    gender: true,
    date_of_birth: true,
};
async function createUser(data) {
    const hashedPassword = await (0, auth_1.hashPassword)(data.password);
    const user = await prisma_1.prisma.user.create({
        data: { ...data, password: hashedPassword },
        select: publicUserSelect,
    });
    return user;
}
async function getUserByEmail(email) {
    return prisma_1.prisma.user.findUnique({ where: { email } });
}
async function getUser(id) {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id },
        select: publicUserSelect,
    });
    return user;
}
async function updateUser(id, data) {
    const user = await prisma_1.prisma.user.update({
        where: { id },
        data,
        select: publicUserSelect,
    });
    return user;
}
