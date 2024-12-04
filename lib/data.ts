'use server';

import { prisma } from '@/prisma/client';

export async function getInvoices() {
  const invoices = await prisma.invoices.findMany();

  return invoices;
}
