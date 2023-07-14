-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_user_fkey";

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
