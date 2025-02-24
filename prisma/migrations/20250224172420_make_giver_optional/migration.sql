-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_giverId_fkey";

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "giverId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_giverId_fkey" FOREIGN KEY ("giverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
