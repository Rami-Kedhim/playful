
// Export all boost-related components, hooks, and utilities from here
export { useBoost } from '@/hooks/boost/useBoost';
export { useBoostContext } from '@/hooks/boost/useBoostContext';
export { BoostProvider } from '@/contexts/BoostContext';
export * from '@/types/boost';
export * from '@/utils/boost/boostCalculation';
export * from '@/utils/boost/profileCompletion';
export * from '@/utils/boost/interactionScore';
export * from '@/utils/boost/index';

// Export all boost components
export { default as BoostPackage } from '@/components/boost/BoostPackage';
export { default as BoostPackages } from '@/components/boost/BoostPackages';
export { default as BoostActivePackage } from '@/components/boost/BoostActivePackage';
export { default as BoostDialogContainer } from '@/components/boost/BoostDialogContainer';
export { default as BoostDialogTabs } from '@/components/boost/BoostDialogTabs';
export { default as HermesBoostInfo } from '@/components/boost/HermesBoostInfo';
export { default as BoostProfileDialog } from '@/components/boost/BoostProfileDialog';

// Add additional exports as needed for a complete boost module
