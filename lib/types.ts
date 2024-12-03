export type Country = 'PT' | 'US' | 'UK';

export type Invoice = {
  customer: string;
  workedDays: string;
  rate: string;
  country: Country;
};
