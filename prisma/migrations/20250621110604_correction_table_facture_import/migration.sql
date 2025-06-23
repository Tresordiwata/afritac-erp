/*
  Warnings:

  - You are about to drop the column `clientId` on the `FactureImport` table. All the data in the column will be lost.
  - Added the required column `journalTypeId` to the `FactureImport` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FactureImport" DROP CONSTRAINT "FactureImport_clientId_fkey";

-- AlterTable
ALTER TABLE "FactureImport" DROP COLUMN "clientId",
ADD COLUMN     "dateFacture" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "journalTypeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "FactureImport" ADD CONSTRAINT "FactureImport_journalTypeId_fkey" FOREIGN KEY ("journalTypeId") REFERENCES "JournalType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
