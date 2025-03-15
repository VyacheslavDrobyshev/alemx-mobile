export const capitalizeFirstLetter = (item: string) =>
  item &&
  item
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
