export const formatNumber = (
  truncatedNumber: number,
  style: 'decimal' | 'currency' | 'percent' = 'decimal',
  minimumFractionDigits: number = 2,
  maximumFractionDigits: number = 2,
): string =>
  new Intl.NumberFormat('en-US', {
    style,
    currency: 'USD',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(truncatedNumber);
