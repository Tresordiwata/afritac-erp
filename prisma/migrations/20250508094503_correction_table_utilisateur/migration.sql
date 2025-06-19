/*
  Warnings:

  - The `status` column on the `Utilisateur` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Utilisateur" DROP COLUMN "status",
ADD COLUMN     "status" "StatusRow" NOT NULL DEFAULT 'A';
