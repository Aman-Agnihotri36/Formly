/*
  Warnings:

  - Added the required column `amount` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formAllowed` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `razorpayId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "formAllowed" INTEGER NOT NULL,
ADD COLUMN     "level" TEXT NOT NULL,
ADD COLUMN     "razorpayId" TEXT NOT NULL;
