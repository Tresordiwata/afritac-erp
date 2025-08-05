/*
  Warnings:

  - Added the required column `datePaiement` to the `PaiementImport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaiementImport" ADD COLUMN     "datePaiement" TIMESTAMP(3) NOT NULL;
