import { Invoice as InvoiceType } from '@/lib/types';
import { formatToCurrency } from '@/lib/utils';

type InvoiceProps = InvoiceType;

export default function Invoice({
  workedDays,
  customer,
  rate,
  country,
}: InvoiceProps) {
  const invoiceTotal = formatToCurrency(
    country,
    Number(workedDays) * Number(rate),
  );
  const username = 'Gabriel Rosa';

  return (
    <div>
      <h2 className="text-xl font-bold">Invoice</h2>

      <ul>
        <li>
          <strong>Tomador:</strong> {customer}
        </li>
        <li>
          <strong>De:</strong> {username}
        </li>
        <li>
          <strong>Período: </strong> {workedDays} days worked
        </li>
        <li>
          <strong>Valor diário: </strong>{' '}
          {formatToCurrency(country, Number(rate))}
        </li>
        <li>
          <strong>Total: </strong> {invoiceTotal}
        </li>
      </ul>
    </div>
  );
}
