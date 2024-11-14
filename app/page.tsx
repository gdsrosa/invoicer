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
import { useState } from 'react';
import { formatToCurrency } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Country } from '@/lib/types';

const formSchema = z.object({
  customer: z.string().min(2, { message: 'Please pass a valid customer name' }),
  days: z.string().min(1, { message: 'Please pass a valid number of days' }),
  rate: z.string().min(1, { message: 'Please Rate is required' }),
  country: z.custom<Country>(),
});

const countries = [
  { name: 'Portugal', id: 'PT' },
  { name: 'United States', id: 'US' },
  { name: 'England', id: 'UK' },
];

type FormType = z.infer<typeof formSchema>;

export default function Home() {
  const [message, setMessage] = useState<string>('');
  const [currency, setCurrency] = useState<string | Country>('');

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer: '',
      days: '',
      rate: '',
      country: 'PT',
    },
  });

  function onSubmit(values: FormType) {
    const { days, customer, rate, country } = values;
    const invoiceTotal = formatToCurrency(country, Number(days) * Number(rate));
    const username = 'Gabriel';

    setMessage(
      `Please can you generate an invoice for ${customer} regarding the ${days} days worked with rate of ${formatToCurrency(country, Number(rate))} giving the total of ${invoiceTotal}
       Best regards, ${username}`,
    );
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
              name="country"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value === 'PT') {
                          setCurrency('EUR');
                        } else if (value === 'UK') {
                          setCurrency('GBP');
                        } else {
                          setCurrency('USD');
                        }
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country for the Invoice" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.id} value={country.id}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
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
                    <Input placeholder="30 days" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Current rate {currency && <>(in {currency})</>}:
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="170€" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Invoice me!</Button>
          </form>
        </Form>

        {message && <p>{message}</p>}
      </main>
    </div>
  );
}
