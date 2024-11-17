'use server';

import { Invoice } from '@/lib/types';
import { prisma } from '@/prisma/client';

type CreateInvoiceProps = {
  invoice: Invoice;
};

export async function createInvoice({ invoice }: CreateInvoiceProps) {
  const { customer, days, rate, country } = invoice;

  try {
    const amount = Number(days) * Number(rate);
    // Doing the round the keep only 2 numbers after separator
    const invoiceAmount = parseFloat(amount.toFixed(2));

    await prisma.invoices.create({
      data: {
        customer,
        workedDays: Number(days),
        rate,
        country,
        amount: invoiceAmount,
      },
    });
  } catch (error) {
    return {
      message: `Database Error: Failed to Create Invoice. See ${error}`,
    };
  }
}
