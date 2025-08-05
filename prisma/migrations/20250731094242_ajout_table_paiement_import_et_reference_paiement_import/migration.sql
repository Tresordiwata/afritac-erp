-- CreateTable
CREATE TABLE "PaiementImport" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "journalTypeId" TEXT NOT NULL,
    "referencePaiementImportId" TEXT,
    "montant" DOUBLE PRECISION NOT NULL,
    "justification" TEXT,
    "fichier" TEXT,

    CONSTRAINT "PaiementImport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferencePaiementImport" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "journalTypeId" TEXT,
    "libelle" TEXT NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "datereReference" TIMESTAMP(3),
    "description" TEXT,

    CONSTRAINT "ReferencePaiementImport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaiementImport" ADD CONSTRAINT "PaiementImport_journalTypeId_fkey" FOREIGN KEY ("journalTypeId") REFERENCES "JournalType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaiementImport" ADD CONSTRAINT "PaiementImport_referencePaiementImportId_fkey" FOREIGN KEY ("referencePaiementImportId") REFERENCES "ReferencePaiementImport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferencePaiementImport" ADD CONSTRAINT "ReferencePaiementImport_journalTypeId_fkey" FOREIGN KEY ("journalTypeId") REFERENCES "JournalType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
