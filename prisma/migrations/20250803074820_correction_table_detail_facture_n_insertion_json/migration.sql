/*
  Warnings:

  - Changed the type of `contenu` on the `DetailFacture` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "DetailFacture" DROP COLUMN "contenu",
ADD COLUMN     "contenu" JSONB NOT NULL;
