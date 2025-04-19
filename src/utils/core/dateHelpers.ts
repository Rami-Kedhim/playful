
// Date utilities for UberEscorts core

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const isRecent = (date: Date, days: number = 7): boolean => {
  const today = new Date();
  const diff = today.getTime() - date.getTime();
  return diff < days * 24 * 60 * 60 * 1000;
};
