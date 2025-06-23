-- CreateEnum
CREATE TYPE "NIVEAUSAISIE" AS ENUM ('R', 'A', 'N');

-- AlterTable
ALTER TABLE "FactureImport" ADD COLUMN     "niveauSaisie" "NIVEAUSAISIE" NOT NULL DEFAULT 'R';
