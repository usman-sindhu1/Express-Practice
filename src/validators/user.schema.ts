import { z } from "zod";
import { dateOfBirthSchema, genderSchema } from "./auth.schema";

export const updateUserSchema = z
  .object({
    first_name: z.string().min(1).optional(),
    last_name: z.string().min(1).optional(),
    phone_no: z.string().min(10).optional(),
    gender: genderSchema.optional(),
    date_of_birth: dateOfBirthSchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });
