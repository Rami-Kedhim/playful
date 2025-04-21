
// Export all boost-related hooks
export * from './useBoostManager';
export * from './useBoostAdapters';
export * from './useBoostAnalytics';
export * from './useBoostEffects';
export * from './useBoostOperations';
export * from './useHermesOxumBoost';
export * from './usePulseBoost';
export * from './usePulseBoostAdapter';

// Import the formatter from utils
import { formatDurationString } from '@/utils/formatters';

/**
 * Format a boost duration string into a human-readable format
 */
export function formatBoostDuration(durationStr: string): string {
  return formatDurationString(durationStr);
}
