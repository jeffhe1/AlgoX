/*
  Warnings:

  - The primary key for the `Holding` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Holding` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Holding" DROP CONSTRAINT "Holding_pkey",
DROP COLUMN "id",
ADD COLUMN     "current_price" DOUBLE PRECISION,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "symbol" DROP NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL,
ADD CONSTRAINT "Holding_pkey" PRIMARY KEY ("updateAt");
