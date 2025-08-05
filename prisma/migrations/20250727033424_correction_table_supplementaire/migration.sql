/*
  Warnings:

  - You are about to drop the `FraisAdditionnel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FraisAdditionnel" DROP CONSTRAINT "FraisAdditionnel_journalTypeId_fkey";

-- DropTable
DROP TABLE "FraisAdditionnel";

-- CreateTable
CREATE TABLE "FraisSupplementaire" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "montant" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "devise" "DEVISE" NOT NULL,
    "isFactured" BOOLEAN NOT NULL,
    "journalTypeId" TEXT NOT NULL,

    CONSTRAINT "FraisSupplementaire_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FraisSupplementaire" ADD CONSTRAINT "FraisSupplementaire_journalTypeId_fkey" FOREIGN KEY ("journalTypeId") REFERENCES "JournalType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
