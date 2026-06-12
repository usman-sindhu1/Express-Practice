import { comparePassword, signToken } from "../lib/auth";
import { AppError } from "../utils/errors";
import { createUser, getUserByEmail } from "./user.services";

type RegisterInput = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_no: string;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
  date_of_birth?: Date;
};

export async function registerUser(data: RegisterInput) {
  const user = await createUser(data);
  const token = signToken(user.id);

  return { user, token };
}

export async function loginUser(email: string, password: string) {
  const user = await getUserByEmail(email);

  if (!user || !(await comparePassword(password, user.password))) {
    throw new AppError(401, "Invalid email or password");
  }

  const { password: _, ...publicUser } = user;

  return {
    user: publicUser,
    token: signToken(user.id),
  };
}
