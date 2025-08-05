-- CreateEnum
CREATE TYPE "DEVISE" AS ENUM ('USD', 'CDF');

-- CreateTable
CREATE TABLE "FraisAdditionnel" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "montant" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "devise" "DEVISE" NOT NULL,
    "isFactured" BOOLEAN NOT NULL,
    "journalTypeId" TEXT NOT NULL,

    CONSTRAINT "FraisAdditionnel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FraisAdditionnel" ADD CONSTRAINT "FraisAdditionnel_journalTypeId_fkey" FOREIGN KEY ("journalTypeId") REFERENCES "JournalType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
