/*
  Warnings:

  - A unique constraint covering the columns `[email,is_deleted]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone,is_deleted]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_is_deleted_key" ON "User"("email", "is_deleted");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_is_deleted_key" ON "User"("phone", "is_deleted");
