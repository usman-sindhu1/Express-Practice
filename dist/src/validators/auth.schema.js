"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = exports.dateOfBirthSchema = exports.genderSchema = void 0;
const zod_1 = require("zod");
exports.genderSchema = zod_1.z.enum(["male", "female", "other", "prefer_not_to_say"]);
exports.dateOfBirthSchema = zod_1.z.coerce
    .date()
    .max(new Date(), "Date of birth must be in the past");
exports.registerSchema = zod_1.z.object({
    first_name: zod_1.z.string().min(1, "First name is required"),
    last_name: zod_1.z.string().min(1, "Last name is required"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters"),
    phone_no: zod_1.z.string().min(10, "Phone number must be at least 10 digits"),
    gender: exports.genderSchema.optional(),
    date_of_birth: exports.dateOfBirthSchema.optional(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(1, "Password is required"),
});
