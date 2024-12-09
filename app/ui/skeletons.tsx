import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';

function Skeleton() {
  return <div className="animate-pulse h-5 w-40 rounded-md bg-gray-200" />;
}

export function InvoicesSkeleton() {
  return (
    <div className="container mx-5 mt-1">
      <div className="ml-5">
        <h1 className="text-2xl my-5">
          <Skeleton />
        </h1>
        <div className="pb-2">
          <Skeleton />
        </div>
        <InvoicesTableSkeleton />
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Skeleton />
      </div>
    </div>
  );
}

export function InvoicesTableSkeleton() {
  const items: number[] = Array.from({ length: 10 }, (_, index) => index);
  const heads: number[] = Array.from({ length: 4 }, (_, index) => index);

  return (
    <Table className="border w-full">
      <TableHeader>
        {items.map((item) => (
          <TableRow key={item}>
            {heads.map((head) => (
              <TableHead key={head}>
                <Skeleton />
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
    </Table>
  );
}
