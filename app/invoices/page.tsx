'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Invoice } from '@/lib/types';
import { formatToCurrency } from '@/lib/utils';

const columnHelper = createColumnHelper<Invoice>();

const columns = [
  columnHelper.accessor('customer', {
    cell: ({ getValue }) => getValue(),
    header: () => <span className="font-bold">Customer</span>,
  }),
  columnHelper.accessor('country', {
    cell: ({ getValue }) => getValue(),
    header: () => <span className="font-bold">Country</span>,
  }),
  columnHelper.accessor('rate', {
    cell: ({
      getValue,
      row: {
        original: { country },
      },
    }) => formatToCurrency(country, Number(getValue())),
    header: () => <span className="font-bold">Rate</span>,
  }),
  columnHelper.accessor('workedDays', {
    cell: ({ getValue }) => getValue(),
    header: () => <span className="font-bold">Worked Days</span>,
  }),
];

export default function Invoices() {
  const [tableData, setTableData] = useState<Invoice[]>([]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const response = await fetch('http://localhost:3000/api/invoices', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const invoices = await response.json();
        setTableData(invoices);
      } catch (error) {
        throw new Error(`Unable to fetch invoices: ${error}`);
      }
    }
    fetchInvoices();
  }, []);

  return (
    <div>
      <Link className="flex mx-5 mt-1" href="/">
        <ArrowLeft className="mr-2" />
        <span>Back</span>
      </Link>
      <div className="container mx-5">
        <h1 className="text-2xl my-5">My Invoices</h1>
        <Table className="border w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="font-medium">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
