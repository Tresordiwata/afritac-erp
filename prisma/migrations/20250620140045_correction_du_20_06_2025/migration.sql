/*
  Warnings:

  - You are about to drop the column `email` on the `Utilisateur` table. All the data in the column will be lost.
  - Added the required column `ClientId` to the `JournalType` table without a default value. This is not possible if the table is not empty.
  - Made the column `formatJournal` on table `JournalType` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `login` to the `Utilisateur` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Journal" DROP CONSTRAINT "Journal_journalTypeId_fkey";

-- DropIndex
DROP INDEX "Utilisateur_email_key";

-- AlterTable
ALTER TABLE "Journal" ALTER COLUMN "journalTypeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "JournalType" ADD COLUMN     "ClientId" TEXT NOT NULL,
ALTER COLUMN "formatJournal" SET NOT NULL;

-- AlterTable
ALTER TABLE "Utilisateur" DROP COLUMN "email",
ADD COLUMN     "login" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Journal" ADD CONSTRAINT "Journal_journalTypeId_fkey" FOREIGN KEY ("journalTypeId") REFERENCES "JournalType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalType" ADD CONSTRAINT "JournalType_ClientId_fkey" FOREIGN KEY ("ClientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
