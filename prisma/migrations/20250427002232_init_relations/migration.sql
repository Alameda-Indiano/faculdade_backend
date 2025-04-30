/*
  Warnings:

  - You are about to drop the column `Status` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `status` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "Status",
ADD COLUMN     "status" TEXT NOT NULL,
ALTER COLUMN "recorrency" SET DATA TYPE TEXT;
