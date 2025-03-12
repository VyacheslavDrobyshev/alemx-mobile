export const formatNumber = (
  truncatedNumber: number,
  style?: string,
  minimumFractionDigits: number = 2,
  maximumFractionDigits: number = 2,
): string => {
  return new Intl.NumberFormat('en-US', {
    style,
    currency: 'USD',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(truncatedNumber);
};
