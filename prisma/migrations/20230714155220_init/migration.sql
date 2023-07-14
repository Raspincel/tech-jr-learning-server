/*
  Warnings:

  - You are about to drop the column `userEmail` on the `Log` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_userId_userEmail_fkey";

-- DropIndex
DROP INDEX "User_id_email_key";

-- AlterTable
ALTER TABLE "Log" DROP COLUMN "userEmail";

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
