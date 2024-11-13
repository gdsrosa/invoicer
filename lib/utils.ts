import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Country } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatToCurrency(
  country: Country | string,
  value: number,
): string {
  const countries = {
    PT: 'pt-PT',
    US: 'en-US',
    UK: 'en-UK',
  };

  const currency = {
    PT: 'EUR',
    US: 'USD',
    UK: 'GBP',
  };

  // TODO: fix typescript
  return new Intl.NumberFormat(countries[country], {
    style: 'currency',
    currency: currency[country],
  }).format(value);
}
