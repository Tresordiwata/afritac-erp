/*
  Warnings:

  - You are about to drop the column `prix` on the `DetailFacture` table. All the data in the column will be lost.
  - You are about to drop the column `qte` on the `DetailFacture` table. All the data in the column will be lost.
  - You are about to drop the column `rubriqueFactureId` on the `DetailFacture` table. All the data in the column will be lost.
  - Added the required column `contenu` to the `DetailFacture` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DetailFacture" DROP CONSTRAINT "DetailFacture_rubriqueFactureId_fkey";

-- AlterTable
ALTER TABLE "DetailFacture" DROP COLUMN "prix",
DROP COLUMN "qte",
DROP COLUMN "rubriqueFactureId",
ADD COLUMN     "contenu" TEXT NOT NULL;
