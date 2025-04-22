
// The error was about incorrectly passing a number to a parameter that doesn't accept numbers

// For the formatDurationAdapter function, ensure it's typed correctly:
export const adaptFormatBoostDuration = (formatFn: (duration: string) => string) => {
  // Ensure the adapter function accepts and returns the correct types
  return (duration: string): string => {
    if (typeof duration !== 'string') {
      // Convert number to string if needed (this helps with type safety)
      const durationStr = String(duration);
      return formatFn(durationStr);
    }
    return formatFn(duration);
  };
};
