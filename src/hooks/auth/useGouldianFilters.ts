
import { useMemo, useCallback } from 'react';
import { useBehavioralProfile } from './useBehavioralProfile';
import { GouldianSystemSettings, HermesMode, ToneFilter } from '@/types/behavioral';

/**
 * Hook for applying Gouldian behavioral filters to adjust system responses
 * Part of the HERMES-OXUM architecture's protective layer
 */
export const useGouldianFilters = () => {
  const { profile } = useBehavioralProfile();
  
  // Calculate system settings based on behavioral profile
  const systemSettings: GouldianSystemSettings = useMemo(() => {
    if (!profile) {
      return {
        hermesMode: 'neutral',
        oxumPriceMultiplier: 1.0,
        toneFilter: 'generic',
        responseDelayMs: 0,
        trustScore: 50
      };
    }
    
    // Extract behavior tags
    const behaviors = profile.behaviorTags;
    
    // Determine HERMES mode based on behaviors
    let hermesMode: HermesMode = 'emotional';
    if (behaviors.includes('high-value')) {
      hermesMode = 'premium';
    } else if (behaviors.some(b => ['repeat-no-pay', 'multi-account', 'low-trust'].includes(b))) {
      hermesMode = 'protective';
    } else if (behaviors.length === 1 && behaviors.includes('normal')) {
      hermesMode = 'emotional';
    }
    
    // Calculate price multiplier
    let priceMultiplier = 1.0;
    if (hermesMode === 'protective') {
      priceMultiplier = 1.5;
    } else if (hermesMode === 'premium') {
      priceMultiplier = 0.8; // Discount for high-value users
    }
    
    // Select tone filter
    let toneFilter: ToneFilter = 'authentic';
    if (behaviors.includes('message-mirroring') || behaviors.includes('emotional-baiting')) {
      toneFilter = 'generic'; // Generic responses for manipulative behavior
    } else if (behaviors.includes('high-value')) {
      toneFilter = 'enhanced';
    } else if (behaviors.includes('low-trust')) {
      toneFilter = 'restrained';
    }
    
    // Determine if response delay should be applied
    let responseDelay = 0;
    if (hermesMode === 'protective') {
      responseDelay = 500; // Small delay for suspicious users
    }
    
    return {
      hermesMode,
      oxumPriceMultiplier: priceMultiplier,
      toneFilter,
      responseDelayMs: responseDelay,
      trustScore: profile.trustScore
    };
  }, [profile]);
  
  // Function to calculate price with Gouldian adjustments
  const calculateAdjustedPrice = useCallback((basePrice: number): number => {
    return Math.round(basePrice * systemSettings.oxumPriceMultiplier);
  }, [systemSettings.oxumPriceMultiplier]);
  
  // Function to adjust response based on Gouldian filters
  const applyResponseDelay = useCallback(async (): Promise<void> => {
    if (systemSettings.responseDelayMs > 0) {
      await new Promise(resolve => setTimeout(resolve, systemSettings.responseDelayMs));
    }
  }, [systemSettings.responseDelayMs]);
  
  // Function to check if a user is considered trustworthy
  const isTrustworthy = useCallback((): boolean => {
    return systemSettings.trustScore >= 60;
  }, [systemSettings.trustScore]);
  
  // Function to check if premium features should be offered
  const shouldOfferPremium = useCallback((): boolean => {
    // Only offer premium features to users with sufficient trust score
    return systemSettings.trustScore >= 40;
  }, [systemSettings.trustScore]);
  
  return {
    systemSettings,
    calculateAdjustedPrice,
    applyResponseDelay,
    isTrustworthy,
    shouldOfferPremium
  };
};
