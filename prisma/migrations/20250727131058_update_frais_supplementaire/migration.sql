-- DropForeignKey
ALTER TABLE "FraisSupplementaire" DROP CONSTRAINT "FraisSupplementaire_journalTypeId_fkey";

-- AlterTable
ALTER TABLE "FraisSupplementaire" ADD COLUMN     "vehicule" TEXT,
ALTER COLUMN "isFactured" SET DEFAULT false,
ALTER COLUMN "journalTypeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "FraisSupplementaire" ADD CONSTRAINT "FraisSupplementaire_journalTypeId_fkey" FOREIGN KEY ("journalTypeId") REFERENCES "JournalType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
