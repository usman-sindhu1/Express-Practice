"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = void 0;
const zod_1 = require("zod");
const auth_schema_1 = require("./auth.schema");
exports.updateUserSchema = zod_1.z
    .object({
    first_name: zod_1.z.string().min(1).optional(),
    last_name: zod_1.z.string().min(1).optional(),
    phone_no: zod_1.z.string().min(10).optional(),
    gender: auth_schema_1.genderSchema.optional(),
    date_of_birth: auth_schema_1.dateOfBirthSchema.optional(),
})
    .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
});
