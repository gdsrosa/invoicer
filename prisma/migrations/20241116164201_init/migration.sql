-- CreateTable
CREATE TABLE "Invoices" (
    "id" SERIAL NOT NULL,
    "customer" TEXT NOT NULL,
    "workedDays" INTEGER NOT NULL,
    "rate" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoices_pkey" PRIMARY KEY ("id")
);
