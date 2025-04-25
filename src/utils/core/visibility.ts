
/**
 * Visibility Utilities for the UberCore Flow System
 * Provides tools for calculating and managing visibility within the ecosystem 
 */
import type { VisibilityFactors } from '@/types/uber-core';

/**
 * Calculate the optimal visibility based on multiple factors
 */
export const calculateVisibilityScore = (factors: VisibilityFactors): number => {
  // Apply weighted calculations
  const baseScore = factors.baseScore;
  const completenessWeight = 0.15;
  const activityWeight = 0.25;
  const popularityWeight = 0.20;
  const timeWeight = 0.10;
  const boostWeight = 0.30;
  
  // Calculate components
  const completenessScore = factors.profileCompleteness * completenessWeight;
  const activityScore = factors.activityLevel * activityWeight; 
  const popularityScore = factors.popularity * popularityWeight;
  const timeScore = factors.timeOfDay * timeWeight;
  const boostScore = factors.boostMultiplier * boostWeight;
  
  // Combined score calculation
  const rawScore = baseScore * (
    completenessScore + 
    activityScore + 
    popularityScore + 
    timeScore + 
    boostScore
  );
  
  // Normalize to 0-100 range
  return Math.min(100, Math.max(0, rawScore));
};

/**
 * Calculate time decay for visibility
 */
export const calculateTimeDecay = (
  lastActivityMinutes: number,
  decayRatePerHour: number = 5
): number => {
  // Convert to hours for calculation
  const hoursSinceActivity = lastActivityMinutes / 60;
  
  // Calculate decay percentage
  const decayPercentage = hoursSinceActivity * decayRatePerHour;
  
  // Return remaining visibility percentage
  return Math.max(0, 100 - decayPercentage);
};

/**
 * Apply boost to visibility based on UBX investment
 */
export const applyBoostMultiplier = (
  baseVisibility: number,
  boostLevel: number,
  boostEffectiveness: number = 1.0
): number => {
  // Calculate boost impact
  const boostMultiplier = 1 + ((boostLevel * boostEffectiveness) / 100);
  
  // Apply boosting with diminishing returns for very high values
  return baseVisibility * (1 + Math.log10(boostMultiplier));
};

/**
 * Calculate optimal time ranges for visibility
 */
export const getOptimalTimeRanges = (): { start: number; end: number }[] => {
  // Return peak hours in 24-hour format
  return [
    { start: 11, end: 14 }, // Midday peak
    { start: 18, end: 22 }, // Evening peak
  ];
};

/**
 * Calculate time of day multiplier
 */
export const getTimeOfDayMultiplier = (hour: number): number => {
  // Early morning (0-5): Low visibility
  if (hour >= 0 && hour < 5) return 0.6;
  
  // Morning (5-11): Medium visibility
  if (hour >= 5 && hour < 11) return 0.8;
  
  // Midday (11-14): High visibility
  if (hour >= 11 && hour < 14) return 1.2;
  
  // Afternoon (14-18): Medium visibility
  if (hour >= 14 && hour < 18) return 0.9;
  
  // Evening (18-22): High visibility
  if (hour >= 18 && hour < 22) return 1.3;
  
  // Night (22-24): Medium visibility
  return 0.7;
};
