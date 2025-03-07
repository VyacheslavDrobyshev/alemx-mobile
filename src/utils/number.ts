export const formatNumber = (
  truncatedNumber: number,
  style?: string,
): string => {
  return new Intl.NumberFormat('en-US', {
    style,
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(truncatedNumber);
};
