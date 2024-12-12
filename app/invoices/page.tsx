'use client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowLeft, ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fetchInvoices } from '@/lib/api/client';
import { Invoice } from '@/lib/types';
import { formatToCurrency } from '@/lib/utils';
import { InvoicesSkeleton } from '../ui/skeletons';

const columnHelper = createColumnHelper<Invoice>();

const columns = [
  columnHelper.accessor('customer', {
    cell: ({ getValue }) => getValue(),
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="font-bold px-0"
      >
        Customer <ArrowUpDown />
      </Button>
    ),
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
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });
  const loading = !table.getPaginationRowModel().rows.length;

  useEffect(() => {
    fetchInvoices().then((invoices) => setTableData(invoices));
  }, []);

  if (loading) {
    return <InvoicesSkeleton />;
  }

  return (
    <div className="container mx-5 mt-1">
      <Link className="flex " href="/">
        <ArrowLeft className="mr-2" />
        <span>Back</span>
      </Link>

      <div className="ml-5">
        <h1 className="text-2xl my-5">My Invoices</h1>
        <p className="pb-2">
          Total of {table.getPaginationRowModel().rows.length} invoice(s)
        </p>
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
