export type CountryCode = 'US' | 'GB' | 'NG' | 'GH' | 'KE' | 'UG' | 'ZA' | 'IN' | 'ID' | 'BR' | 'PK' | 'MX' | 'EG' | 'CO' | 'INTL';

export interface PricingTier {
  country: string;
  code: CountryCode;
  currencyCode: string;
  currencySymbol: string;
  amount: number;
  originalAmount: number;
  gateways: ('paystack' | 'flutterwave' | 'paypal')[];
  defaultGateway: 'paystack' | 'flutterwave' | 'paypal';
}

export const PRICING_CONFIG: Record<CountryCode, PricingTier> = {
  US: { country: 'United States', code: 'US', currencyCode: 'USD', currencySymbol: '$', amount: 47, originalAmount: 497, gateways: ['paypal', 'flutterwave'], defaultGateway: 'paypal' },
  GB: { country: 'United Kingdom', code: 'GB', currencyCode: 'GBP', currencySymbol: '£', amount: 29, originalAmount: 299, gateways: ['paypal', 'flutterwave'], defaultGateway: 'paypal' },
  NG: { country: 'Nigeria', code: 'NG', currencyCode: 'NGN', currencySymbol: '₦', amount: 7900, originalAmount: 97000, gateways: ['paystack', 'flutterwave'], defaultGateway: 'paystack' },
  GH: { country: 'Ghana', code: 'GH', currencyCode: 'GHS', currencySymbol: '₵', amount: 150, originalAmount: 1500, gateways: ['paystack', 'flutterwave'], defaultGateway: 'paystack' },
  KE: { country: 'Kenya', code: 'KE', currencyCode: 'KES', currencySymbol: 'KSh ', amount: 1970, originalAmount: 19700, gateways: ['flutterwave'], defaultGateway: 'flutterwave' },
  UG: { country: 'Uganda', code: 'UG', currencyCode: 'UGX', currencySymbol: 'UGX ', amount: 49900, originalAmount: 499000, gateways: ['flutterwave'], defaultGateway: 'flutterwave' },
  ZA: { country: 'South Africa', code: 'ZA', currencyCode: 'ZAR', currencySymbol: 'R', amount: 499, originalAmount: 4990, gateways: ['paystack', 'flutterwave'], defaultGateway: 'paystack' },
  IN: { country: 'India', code: 'IN', currencyCode: 'INR', currencySymbol: '₹', amount: 1499, originalAmount: 14990, gateways: ['paypal', 'flutterwave'], defaultGateway: 'paypal' },
  ID: { country: 'Indonesia', code: 'ID', currencyCode: 'IDR', currencySymbol: 'Rp ', amount: 200000, originalAmount: 2000000, gateways: ['paypal'], defaultGateway: 'paypal' },
  BR: { country: 'Brazil', code: 'BR', currencyCode: 'BRL', currencySymbol: 'R$', amount: 97, originalAmount: 970, gateways: ['paypal'], defaultGateway: 'paypal' },
  PK: { country: 'Pakistan', code: 'PK', currencyCode: 'PKR', currencySymbol: 'PKR ', amount: 4000, originalAmount: 40000, gateways: ['paypal'], defaultGateway: 'paypal' },
  MX: { country: 'Mexico', code: 'MX', currencyCode: 'MXN', currencySymbol: 'MX$', amount: 500, originalAmount: 5000, gateways: ['paypal'], defaultGateway: 'paypal' },
  EG: { country: 'Egypt', code: 'EG', currencyCode: 'EGP', currencySymbol: 'EGP ', amount: 600, originalAmount: 6000, gateways: ['paypal', 'flutterwave'], defaultGateway: 'paypal' },
  CO: { country: 'Colombia', code: 'CO', currencyCode: 'COP', currencySymbol: 'COP ', amount: 100000, originalAmount: 1000000, gateways: ['paypal'], defaultGateway: 'paypal' },
  INTL: { country: 'International', code: 'INTL', currencyCode: 'USD', currencySymbol: '$', amount: 47, originalAmount: 497, gateways: ['paypal', 'flutterwave'], defaultGateway: 'paypal' },
};

export const getPricingForCountry = (countryCode: string): PricingTier => {
  return PRICING_CONFIG[countryCode as CountryCode] || PRICING_CONFIG.INTL;
};
