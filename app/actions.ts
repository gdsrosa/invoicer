'use server';

import { Invoice } from '@/lib/types';

type CreateInvoiceProps = {
  invoice: Invoice;
};

export async function createInvoice({ invoice }: CreateInvoiceProps) {
  try {
    await fetch('http://localhost:3000/api/invoices', {
      method: 'POST',
      body: JSON.stringify(invoice),
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    throw new Error(`Unable create Invoice. ${error}`);
  }
}
