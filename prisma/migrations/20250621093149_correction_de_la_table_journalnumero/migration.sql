/*
  Warnings:

  - You are about to alter the column `numero` on the `Journal` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Journal" ALTER COLUMN "numero" SET DATA TYPE INTEGER;
