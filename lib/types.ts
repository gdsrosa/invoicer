export type Country = 'PT' | 'US' | 'UK';

export type Invoice = {
  customer: string;
  days: string;
  rate: string;
  country: Country;
};
