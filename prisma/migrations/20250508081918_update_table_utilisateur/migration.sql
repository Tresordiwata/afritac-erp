/*
  Warnings:

  - The `status` column on the `Paiement` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusRow" AS ENUM ('A', 'B', 'D');

-- AlterTable
ALTER TABLE "Paiement" DROP COLUMN "status",
ADD COLUMN     "status" "StatusRow" NOT NULL DEFAULT 'A';
