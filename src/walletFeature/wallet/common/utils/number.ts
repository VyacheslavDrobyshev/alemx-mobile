export const roundTo = (value: number, decimals: number) => {
  const factor = 10 ** decimals;
  return Math.floor(value * factor) / factor;
};

export const formatNumber = (
  truncatedNumber: number,
  style: 'decimal' | 'currency' | 'percent' = 'decimal',
  minimumFractionDigits: number = 2,
  maximumFractionDigits: number = 2,
): string => {
  const value = roundTo(truncatedNumber, maximumFractionDigits);
  return new Intl.NumberFormat('en-US', {
    style,
    currency: 'USD',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
};

export const isNumber = (value: string | number) =>
  typeof value === 'number' && !Number.isNaN(value);

export const getDecimals = (item?: number | null) =>
  item ?? 2 > 4 ? 4 : item ?? 2;
