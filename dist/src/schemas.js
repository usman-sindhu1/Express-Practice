"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const gender = zod_1.z.enum(["male", "female", "other", "prefer_not_to_say"]);
const dateOfBirth = zod_1.z.coerce.date().max(new Date());
exports.registerSchema = zod_1.z.object({
    first_name: zod_1.z.string().min(1),
    last_name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    phone_no: zod_1.z.string().min(10),
    gender: gender.optional(),
    date_of_birth: dateOfBirth.optional(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1),
});
exports.updateUserSchema = zod_1.z
    .object({
    first_name: zod_1.z.string().min(1).optional(),
    last_name: zod_1.z.string().min(1).optional(),
    phone_no: zod_1.z.string().min(10).optional(),
    gender: gender.optional(),
    date_of_birth: dateOfBirth.optional(),
})
    .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
});
