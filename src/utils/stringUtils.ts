
/**
 * Truncates a string in the middle, preserving characters at the start and end.
 * Useful for displaying wallet addresses.
 */
export const truncateMiddle = (
  str: string,
  startChars: number = 4,
  endChars: number = 4,
  ellipsis: string = '...'
): string => {
  if (!str) return '';
  if (str.length <= startChars + endChars) return str;
  
  return `${str.substring(0, startChars)}${ellipsis}${str.substring(str.length - endChars)}`;
};
