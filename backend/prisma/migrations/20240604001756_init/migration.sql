-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Water', 'Gas', 'Electric');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "emailVerifiedAt" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UtilityCompanies" (
    "id" SERIAL NOT NULL,
    "utilityName" TEXT NOT NULL,
    "type" "Type" NOT NULL,

    CONSTRAINT "UtilityCompanies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Developments" (
    "id" SERIAL NOT NULL,
    "developmentName" TEXT NOT NULL,

    CONSTRAINT "Developments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Buildings" (
    "id" SERIAL NOT NULL,
    "buildingName" TEXT NOT NULL,
    "developmentId" INTEGER NOT NULL,

    CONSTRAINT "Buildings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accounts" (
    "id" SERIAL NOT NULL,
    "accountNumber" INTEGER NOT NULL,
    "closed" BOOLEAN NOT NULL,
    "coverage" TEXT NOT NULL,
    "hasLogin" BOOLEAN NOT NULL,
    "isImporting" BOOLEAN NOT NULL,
    "isViewOnly" BOOLEAN NOT NULL,
    "nickName" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "tentantPays" BOOLEAN NOT NULL,
    "utilityCompanyId" INTEGER NOT NULL,
    "lastDataPoint" TIMESTAMP(3),
    "billingInterval" INTEGER,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statements" (
    "id" SERIAL NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "originalValue" INTEGER NOT NULL,
    "originalMeasureUnit" TEXT NOT NULL,
    "totalCharge" DOUBLE PRECISION NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "invoiceDate" TIMESTAMP(3) NOT NULL,
    "serviceAddress" TEXT NOT NULL,
    "accountNumber" INTEGER NOT NULL,
    "customerCharge" DOUBLE PRECISION,
    "serviceCharge" DOUBLE PRECISION,
    "lateCharge" DOUBLE PRECISION,
    "balanceForward" DOUBLE PRECISION,
    "billingAdjustment" DOUBLE PRECISION,
    "amountDue" DOUBLE PRECISION,
    "invoiceNumber" INTEGER,
    "rateCode" TEXT,
    "type" "Type" NOT NULL,
    "waterId" INTEGER,
    "gasId" INTEGER,
    "electricId" INTEGER,

    CONSTRAINT "Statements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Water" (
    "id" SERIAL NOT NULL,
    "ccf" DOUBLE PRECISION NOT NULL,
    "waterCharge" DOUBLE PRECISION NOT NULL,
    "sewerCharge" DOUBLE PRECISION NOT NULL,
    "sewerServicesCharge" DOUBLE PRECISION NOT NULL,
    "waterServiceCharges" DOUBLE PRECISION NOT NULL,
    "pricePerGallon" DOUBLE PRECISION NOT NULL,
    "pricePerCCF" DOUBLE PRECISION NOT NULL,
    "statementId" INTEGER NOT NULL,

    CONSTRAINT "Water_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gas" (
    "id" SERIAL NOT NULL,
    "btu" INTEGER NOT NULL,
    "therms" DOUBLE PRECISION NOT NULL,
    "supplyCharge" DOUBLE PRECISION NOT NULL,
    "deliveryCharge" DOUBLE PRECISION NOT NULL,
    "energyCharge" DOUBLE PRECISION NOT NULL,
    "pricePerBTU" DOUBLE PRECISION NOT NULL,
    "pricePerTherm" DOUBLE PRECISION NOT NULL,
    "serviceCharge" DOUBLE PRECISION NOT NULL,
    "statementId" INTEGER NOT NULL,

    CONSTRAINT "Gas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Electric" (
    "id" SERIAL NOT NULL,
    "kWh" DOUBLE PRECISION NOT NULL,
    "supplyCharge" DOUBLE PRECISION NOT NULL,
    "deliveryCharge" DOUBLE PRECISION NOT NULL,
    "demandCharge" DOUBLE PRECISION NOT NULL,
    "solarGenerationCharge" DOUBLE PRECISION,
    "solarGenerationCredit" DOUBLE PRECISION,
    "pricePerkWh" DOUBLE PRECISION NOT NULL,
    "kWhPurchased" DOUBLE PRECISION NOT NULL,
    "kWhExported" DOUBLE PRECISION NOT NULL,
    "kVa" DOUBLE PRECISION NOT NULL,
    "rateCode" TEXT NOT NULL,
    "serviceCharge" DOUBLE PRECISION NOT NULL,
    "statementId" INTEGER NOT NULL,

    CONSTRAINT "Electric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BuildingsAccounts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Statements_waterId_key" ON "Statements"("waterId");

-- CreateIndex
CREATE UNIQUE INDEX "Statements_gasId_key" ON "Statements"("gasId");

-- CreateIndex
CREATE UNIQUE INDEX "Statements_electricId_key" ON "Statements"("electricId");

-- CreateIndex
CREATE UNIQUE INDEX "Water_statementId_key" ON "Water"("statementId");

-- CreateIndex
CREATE UNIQUE INDEX "Gas_statementId_key" ON "Gas"("statementId");

-- CreateIndex
CREATE UNIQUE INDEX "Electric_statementId_key" ON "Electric"("statementId");

-- CreateIndex
CREATE UNIQUE INDEX "_BuildingsAccounts_AB_unique" ON "_BuildingsAccounts"("A", "B");

-- CreateIndex
CREATE INDEX "_BuildingsAccounts_B_index" ON "_BuildingsAccounts"("B");

-- AddForeignKey
ALTER TABLE "Buildings" ADD CONSTRAINT "Buildings_developmentId_fkey" FOREIGN KEY ("developmentId") REFERENCES "Developments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_utilityCompanyId_fkey" FOREIGN KEY ("utilityCompanyId") REFERENCES "UtilityCompanies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statements" ADD CONSTRAINT "Statements_accountNumber_fkey" FOREIGN KEY ("accountNumber") REFERENCES "Accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Water" ADD CONSTRAINT "Water_statementId_fkey" FOREIGN KEY ("statementId") REFERENCES "Statements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gas" ADD CONSTRAINT "Gas_statementId_fkey" FOREIGN KEY ("statementId") REFERENCES "Statements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Electric" ADD CONSTRAINT "Electric_statementId_fkey" FOREIGN KEY ("statementId") REFERENCES "Statements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BuildingsAccounts" ADD CONSTRAINT "_BuildingsAccounts_A_fkey" FOREIGN KEY ("A") REFERENCES "Accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BuildingsAccounts" ADD CONSTRAINT "_BuildingsAccounts_B_fkey" FOREIGN KEY ("B") REFERENCES "Buildings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
