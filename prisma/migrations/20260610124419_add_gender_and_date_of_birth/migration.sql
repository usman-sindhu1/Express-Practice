-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other', 'prefer_not_to_say');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "date_of_birth" DATE,
ADD COLUMN     "gender" "Gender";
