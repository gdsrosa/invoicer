import { prisma } from '@/prisma/client';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { days, rate, customer, country } = await req.json();

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

    return NextResponse.json({ status: 'Created' });
  } catch (error) {
    return {
      message: 'Error: Failed to Create Invoice',
      error,
    };
  }
}
