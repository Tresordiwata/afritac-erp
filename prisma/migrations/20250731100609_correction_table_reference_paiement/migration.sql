/*
  Warnings:

  - You are about to drop the column `datereReference` on the `ReferencePaiementImport` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ReferencePaiementImport" DROP COLUMN "datereReference",
ADD COLUMN     "dateReference" TIMESTAMP(3);
