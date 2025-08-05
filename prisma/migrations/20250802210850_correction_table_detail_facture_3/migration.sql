-- DropForeignKey
ALTER TABLE "DetailFacture" DROP CONSTRAINT "DetailFacture_factureId_fkey";

-- AlterTable
ALTER TABLE "DetailFacture" ALTER COLUMN "factureId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "DetailFacture" ADD CONSTRAINT "DetailFacture_factureId_fkey" FOREIGN KEY ("factureId") REFERENCES "FactureImport"("id") ON DELETE SET NULL ON UPDATE CASCADE;
