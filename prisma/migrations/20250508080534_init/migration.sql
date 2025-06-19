/*
  Warnings:

  - You are about to drop the `CaisseOperation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Compte` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rubrique` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `banques` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `caisses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clotures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `depenses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `depenses_planifiees` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fournisseurs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recettes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `succursales` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `utilisateurs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `versements` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "STATUSFACTURE" AS ENUM ('B', 'C');

-- DropForeignKey
ALTER TABLE "CaisseOperation" DROP CONSTRAINT "CaisseOperation_caisseId_fkey";

-- DropForeignKey
ALTER TABLE "Compte" DROP CONSTRAINT "Compte_banqueId_fkey";

-- DropForeignKey
ALTER TABLE "caisses" DROP CONSTRAINT "caisses_succursaleId_fkey";

-- DropForeignKey
ALTER TABLE "clotures" DROP CONSTRAINT "clotures_succursaleId_fkey";

-- DropForeignKey
ALTER TABLE "clotures" DROP CONSTRAINT "clotures_utilisateurId_fkey";

-- DropForeignKey
ALTER TABLE "depenses" DROP CONSTRAINT "depenses_fournisseurId_fkey";

-- DropForeignKey
ALTER TABLE "depenses" DROP CONSTRAINT "depenses_rubriqueId_fkey";

-- DropForeignKey
ALTER TABLE "depenses" DROP CONSTRAINT "depenses_succursaleId_fkey";

-- DropForeignKey
ALTER TABLE "depenses" DROP CONSTRAINT "depenses_utilisateurId_fkey";

-- DropForeignKey
ALTER TABLE "recettes" DROP CONSTRAINT "recettes_rubriqueId_fkey";

-- DropForeignKey
ALTER TABLE "recettes" DROP CONSTRAINT "recettes_succursaleId_fkey";

-- DropForeignKey
ALTER TABLE "recettes" DROP CONSTRAINT "recettes_utilisateurId_fkey";

-- DropForeignKey
ALTER TABLE "utilisateurs" DROP CONSTRAINT "utilisateurs_succursaleId_fkey";

-- DropForeignKey
ALTER TABLE "versements" DROP CONSTRAINT "versements_compteId_fkey";

-- DropForeignKey
ALTER TABLE "versements" DROP CONSTRAINT "versements_succursaleId_fkey";

-- DropForeignKey
ALTER TABLE "versements" DROP CONSTRAINT "versements_utillisateurId_fkey";

-- DropTable
DROP TABLE "CaisseOperation";

-- DropTable
DROP TABLE "Compte";

-- DropTable
DROP TABLE "Rubrique";

-- DropTable
DROP TABLE "banques";

-- DropTable
DROP TABLE "caisses";

-- DropTable
DROP TABLE "clotures";

-- DropTable
DROP TABLE "depenses";

-- DropTable
DROP TABLE "depenses_planifiees";

-- DropTable
DROP TABLE "fournisseurs";

-- DropTable
DROP TABLE "recettes";

-- DropTable
DROP TABLE "succursales";

-- DropTable
DROP TABLE "utilisateurs";

-- DropTable
DROP TABLE "versements";

-- DropEnum
DROP TYPE "ClotureStatus";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "Status";

-- DropEnum
DROP TYPE "devise";

-- DropEnum
DROP TYPE "typeOperation";

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "nom_client" TEXT,
    "code" TEXT,
    "num_nif" TEXT,
    "adresse" TEXT,
    "telephone" TEXT,
    "email" TEXT,
    "rccm" TEXT,
    "idNat" TEXT,
    "isFacturedForImport" CHAR(1),
    "isFacturedForExport" CHAR(1),
    "isFacturedForTva" CHAR(1),
    "lastPrintedDeclation" TIMESTAMP(3),
    "enabled" TEXT DEFAULT 'A',

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Facture" (
    "id" SERIAL NOT NULL,
    "status" "STATUSFACTURE" NOT NULL DEFAULT 'B',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Facture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paiement" (
    "id" SERIAL NOT NULL,
    "datePaiement" TIMESTAMP(3) NOT NULL,
    "motif" TEXT,
    "montant" DOUBLE PRECISION NOT NULL,
    "idClient" INTEGER NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'A',
    "numeroInvoice" TEXT DEFAULT '',

    CONSTRAINT "Paiement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" CHAR(2) NOT NULL,
    "password" TEXT,
    "status" TEXT NOT NULL DEFAULT 'A',

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- AddForeignKey
ALTER TABLE "Paiement" ADD CONSTRAINT "Paiement_idClient_fkey" FOREIGN KEY ("idClient") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
