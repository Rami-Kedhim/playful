// Export boost-related types and functions without duplicates
export * from '@/types/pulse-boost';

// Export boost-related hooks
export * from '@/hooks/boost/useBoostAnalytics';
export * from '@/hooks/boost/useBoostManager';
export * from '@/hooks/boost/useBoostStatus';
export * from '@/hooks/boost/usePulseBoost';
export * from '@/hooks/boost/usePulseBoostAdapter';

// Explicitly export single functions to avoid ambiguity
export { calculateBoostScore } from '@/utils/boost/boostCalculation';
export { optimizeBoostPerformance } from '@/utils/boost/boostPerformance';
export { evaluateBoostValue } from '@/utils/boost/boostValue';

// Export components
export { default as BoostAnalytics } from '@/components/boost/BoostAnalytics';
export { default as BoostManager } from '@/components/boost/BoostManager';
export { default as BoostPackageCard } from '@/components/boost/BoostPackageCard';
export { default as BoostStatusIndicator } from '@/components/boost/BoostStatusIndicator';
