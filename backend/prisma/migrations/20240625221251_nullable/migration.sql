/*
  Warnings:

  - Added the required column `password` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Accounts" ALTER COLUMN "closed" DROP NOT NULL,
ALTER COLUMN "coverage" DROP NOT NULL,
ALTER COLUMN "hasLogin" DROP NOT NULL,
ALTER COLUMN "isImporting" DROP NOT NULL,
ALTER COLUMN "isViewOnly" DROP NOT NULL,
ALTER COLUMN "nickName" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "tentantPays" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Electric" ALTER COLUMN "supplyCharge" DROP NOT NULL,
ALTER COLUMN "deliveryCharge" DROP NOT NULL,
ALTER COLUMN "demandCharge" DROP NOT NULL,
ALTER COLUMN "pricePerkWh" DROP NOT NULL,
ALTER COLUMN "kWhPurchased" DROP NOT NULL,
ALTER COLUMN "kWhExported" DROP NOT NULL,
ALTER COLUMN "kVa" DROP NOT NULL,
ALTER COLUMN "rateCode" DROP NOT NULL,
ALTER COLUMN "serviceCharge" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Gas" ALTER COLUMN "therms" DROP NOT NULL,
ALTER COLUMN "supplyCharge" DROP NOT NULL,
ALTER COLUMN "deliveryCharge" DROP NOT NULL,
ALTER COLUMN "energyCharge" DROP NOT NULL,
ALTER COLUMN "pricePerBTU" DROP NOT NULL,
ALTER COLUMN "pricePerTherm" DROP NOT NULL,
ALTER COLUMN "serviceCharge" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Statements" ALTER COLUMN "originalValue" DROP NOT NULL,
ALTER COLUMN "originalMeasureUnit" DROP NOT NULL,
ALTER COLUMN "dueDate" DROP NOT NULL,
ALTER COLUMN "invoiceDate" DROP NOT NULL,
ALTER COLUMN "serviceAddress" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Water" ALTER COLUMN "waterCharge" DROP NOT NULL,
ALTER COLUMN "sewerCharge" DROP NOT NULL,
ALTER COLUMN "sewerServicesCharge" DROP NOT NULL,
ALTER COLUMN "waterServiceCharges" DROP NOT NULL,
ALTER COLUMN "pricePerGallon" DROP NOT NULL,
ALTER COLUMN "pricePerCCF" DROP NOT NULL;
