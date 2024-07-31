/*
  Warnings:

  - The primary key for the `Holding` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Holding` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Portfolio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Portfolio` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `portfolioexists` on the `User` table. All the data in the column will be lost.
  - Added the required column `price` to the `Holding` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `portfolioId` on the `Holding` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Holding" DROP CONSTRAINT "Holding_portfolioId_fkey";

-- DropIndex
DROP INDEX "Holding_id_key";

-- AlterTable
ALTER TABLE "Holding" DROP CONSTRAINT "Holding_pkey",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "portfolioId",
ADD COLUMN     "portfolioId" INTEGER NOT NULL,
ADD CONSTRAINT "Holding_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Portfolio" DROP CONSTRAINT "Portfolio_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "portfolioexists",
ADD COLUMN     "profileImage" TEXT;

-- CreateTable
CREATE TABLE "Testing" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Testing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Testing_id_key" ON "Testing"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_id_key" ON "Portfolio"("id");

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
