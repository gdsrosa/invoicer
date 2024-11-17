/*
  Warnings:

  - The primary key for the `Invoices` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Invoices" DROP CONSTRAINT "Invoices_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Invoices_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Invoices_id_seq";
