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

export const isNumber = (value: string | number) =>
  typeof value === 'number' && !Number.isNaN(value);

export const getDecimals = (item?: number | null) =>
  item ?? 2 > 4 ? 4 : item ?? 2;
