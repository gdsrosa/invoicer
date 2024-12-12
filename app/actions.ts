'use server';

import { Invoice } from '@/lib/types';

type CreateInvoiceProps = {
  invoice: Invoice;
};

export async function createInvoice({ invoice }: CreateInvoiceProps) {
  const url = `${process.env.BASE_URL}/api/invoices`;

  try {
    const { ok, status } = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ ...invoice, days: invoice.workedDays }),
      headers: { 'Content-Type': 'application/json' },
    });
    return { response: { ok, status } };
  } catch (error) {
    throw new Error(`Unable create Invoice. ${error}`);
  }
}
