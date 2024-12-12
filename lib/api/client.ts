export async function fetchInvoices() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/invoices`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const invoices = await response.json();
    return invoices;
  } catch (error) {
    throw new Error(`Unable to fetch invoices: ${error}`);
  }
}
