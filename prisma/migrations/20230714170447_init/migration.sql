/*
  Warnings:

  - You are about to drop the column `userId` on the `Log` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_userId_fkey";

-- AlterTable
ALTER TABLE "Log" DROP COLUMN "userId",
ADD COLUMN     "user" TEXT;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
