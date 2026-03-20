// 🎯 Configuración central de comisiones - EVITAR MAGIA

export const PLATFORM_FEE_PERCENT = 10;

export function calculatePlatformFee(amount: number): number {
  return Math.round(amount * (PLATFORM_FEE_PERCENT / 100));
}

export function calculateSellerNetAmount(amount: number): number {
  return amount - calculatePlatformFee(amount);
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount / 100); // Stripe usa centavos
}
