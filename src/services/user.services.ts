import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../lib/prisma";
import { hashPassword } from "../lib/auth";

const publicUserSelect = {
  id: true,
  first_name: true,
  last_name: true,
  email: true,
  phone_no: true,
  gender: true,
  date_of_birth: true,
} as const;

export async function createUser(data: Prisma.userCreateInput) {
  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: { ...data, password: hashedPassword },
    select: publicUserSelect,
  });

  return user;
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: publicUserSelect,
  });

  return user;
}

export async function updateUser(id: string, data: Prisma.userUpdateInput) {
  const user = await prisma.user.update({
    where: { id },
    data,
    select: publicUserSelect,
  });

  return user;
}
