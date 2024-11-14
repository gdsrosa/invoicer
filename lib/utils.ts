import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Country } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatToCurrency(country: Country, value: number): string {
  const countries = {
    PT: {
      language: 'pt-PT',
      currency: 'EUR',
    },
    US: {
      language: 'en-US',
      currency: 'USD',
    },
    UK: {
      language: 'en-UK',
      currency: 'GBP',
    },
  };

  const { language, currency } = countries[country];

  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency,
  }).format(value);
}
