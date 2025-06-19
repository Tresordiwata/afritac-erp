/*
  Warnings:

  - The primary key for the `Client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Paiement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Utilisateur` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Paiement" DROP CONSTRAINT "Paiement_idClient_fkey";

-- AlterTable
ALTER TABLE "Client" DROP CONSTRAINT "Client_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Client_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Client_id_seq";

-- AlterTable
ALTER TABLE "Paiement" DROP CONSTRAINT "Paiement_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "idClient" SET DATA TYPE TEXT,
ADD CONSTRAINT "Paiement_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Paiement_id_seq";

-- AlterTable
ALTER TABLE "Utilisateur" DROP CONSTRAINT "Utilisateur_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Utilisateur_id_seq";

-- AddForeignKey
ALTER TABLE "Paiement" ADD CONSTRAINT "Paiement_idClient_fkey" FOREIGN KEY ("idClient") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
