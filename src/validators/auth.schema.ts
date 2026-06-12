import { z } from "zod";

export const genderSchema = z.enum(["male", "female", "other", "prefer_not_to_say"]);

export const dateOfBirthSchema = z.coerce
  .date()
  .max(new Date(), "Date of birth must be in the past");

export const registerSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone_no: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: genderSchema.optional(),
  date_of_birth: dateOfBirthSchema.optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
