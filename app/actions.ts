'use server';

import { Invoice } from '@/lib/types';
import { sql } from '@vercel/postgres';

type CreateInvoiceProps = {
  invoice: Invoice;
};

export async function createInvoice({ invoice }: CreateInvoiceProps) {
  const { customer, days, rate, country } = invoice;

  try {
    await sql`
      INSERT INTO invoices (customer, worked_days, rate, country)
      VALUES (${customer}, ${days}, ${rate}, ${country})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice. See',
      error,
    };
  }
}
