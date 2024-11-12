'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  customer: z.string().min(2, { message: 'Please pass a valid customer name' }),
  days: z.string().min(1, { message: 'Please pass a valid number of days' }),
});

type FormType = z.infer<typeof formSchema>;

export default function Home() {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer: '',
      days: '',
    },
  });

  function onSubmit(values: FormType) {
    console.log(values);
  }

  return (
    <div className="grid pb-8 sm:p-10">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <h1 className="text-3xl pb-8">Invoicer</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pb-6"
          >
            <FormField
              control={form.control}
              name="customer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="days"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total of Days Worked:</FormLabel>
                  <FormControl>
                    <Input placeholder="30" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Invoice me!</Button>
          </form>
        </Form>

        {parseInt(form.getValues().days) ? (
          <>
            <p>
              {`Total of Invoice is
              ${new Intl.NumberFormat('pt-PT', {
                style: 'currency',
                currency: 'EUR',
              }).format(parseInt(form.getValues().days) * 170)}
              for ${form.getValues().customer}`}
            </p>
          </>
        ) : null}
      </main>
    </div>
  );
}
