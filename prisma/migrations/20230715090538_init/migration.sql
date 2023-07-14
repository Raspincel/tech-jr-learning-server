-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_user_fkey";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
