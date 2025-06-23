/*
  Warnings:

  - You are about to drop the `Facture` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Facture";

-- CreateTable
CREATE TABLE "Camion" (
    "id" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "Camion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailFacture" (
    "id" TEXT NOT NULL,
    "factureId" TEXT NOT NULL,
    "rubriqueFactureId" TEXT NOT NULL,
    "qte" INTEGER NOT NULL DEFAULT 1,
    "prix" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "DetailFacture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FactureImport" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "manifeste" TEXT,
    "t1" TEXT,
    "camionId" TEXT NOT NULL,
    "marchandiseId" TEXT NOT NULL,
    "declarationId" TEXT,
    "declarationDate" TIMESTAMP(3),
    "liquidationId" TEXT,
    "liquidationDate" TIMESTAMP(3),
    "quittanceId" TEXT,
    "quittanceDate" TIMESTAMP(3),
    "quittanceMontant" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "poids" TEXT,
    "colis" TEXT,
    "status" "STATUSFACTURE" NOT NULL DEFAULT 'B',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FactureImport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Journal" (
    "id" TEXT NOT NULL,
    "journalTypeId" TEXT NOT NULL,
    "numero" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "Journal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JournalType" (
    "id" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "formatJournal" TEXT,

    CONSTRAINT "JournalType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Marchandise" (
    "id" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,

    CONSTRAINT "Marchandise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RubriqueFacture" (
    "id" TEXT NOT NULL,
    "produit" TEXT,
    "libelle" TEXT,
    "identifiant" TEXT NOT NULL,
    "compte" TEXT,
    "compteAnalytique" TEXT,

    CONSTRAINT "RubriqueFacture_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DetailFacture" ADD CONSTRAINT "DetailFacture_factureId_fkey" FOREIGN KEY ("factureId") REFERENCES "FactureImport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailFacture" ADD CONSTRAINT "DetailFacture_rubriqueFactureId_fkey" FOREIGN KEY ("rubriqueFactureId") REFERENCES "RubriqueFacture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FactureImport" ADD CONSTRAINT "FactureImport_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FactureImport" ADD CONSTRAINT "FactureImport_camionId_fkey" FOREIGN KEY ("camionId") REFERENCES "Camion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FactureImport" ADD CONSTRAINT "FactureImport_marchandiseId_fkey" FOREIGN KEY ("marchandiseId") REFERENCES "Marchandise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Journal" ADD CONSTRAINT "Journal_journalTypeId_fkey" FOREIGN KEY ("journalTypeId") REFERENCES "JournalType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
