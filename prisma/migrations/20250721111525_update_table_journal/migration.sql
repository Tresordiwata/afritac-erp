-- AlterTable
ALTER TABLE "FactureImport" ALTER COLUMN "dateFacture" DROP DEFAULT;

-- AlterTable
ALTER TABLE "JournalType" ADD COLUMN     "derniereImpression" TEXT DEFAULT '',
ADD COLUMN     "solde" DOUBLE PRECISION DEFAULT 0;
