
// Export all boost-related hooks
export * from './useBoostManager';
export * from './useBoostAdapters';
export * from './useBoostAnalytics';
export * from './useBoostEffects';
export * from './useBoostOperations';
export * from './useHermesOxumBoost';
export * from './usePulseBoost';
export * from './usePulseBoostAdapter';

/**
 * Format a boost duration string into a human-readable format
 */
export function formatBoostDuration(durationStr: string): string {
  const regex = /^(\d{2}):(\d{2}):(\d{2})$/;
  const match = durationStr.match(regex);
  
  if (!match) return durationStr;
  
  const hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const seconds = parseInt(match[3]);
  
  if (hours === 0 && minutes === 0) {
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  } else if (hours === 0) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  } else {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    
    if (remainingHours === 0) {
      return `${days} day${days !== 1 ? 's' : ''}`;
    }
    
    return `${days} day${days !== 1 ? 's' : ''} ${remainingHours} hour${remainingHours !== 1 ? 's' : ''}`;
  }
}
