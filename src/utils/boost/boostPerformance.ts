
import { BoostAnalytics, BoostPackage } from "@/types/pulse-boost";

export const calculateBoostPerformance = (analytics: BoostAnalytics): number => {
  // Simple performance calculation based on analytics
  const viewsWeight = 0.4;
  const interactionsWeight = 0.6;

  // Get base values
  const views = analytics.impressions?.value || 0;
  const interactions = analytics.interactions?.value || 0;

  // Calculate performance score (0-100)
  const viewScore = Math.min(views / 1000, 1) * 100; 
  const interactionScore = Math.min(interactions / 100, 1) * 100;

  return (viewScore * viewsWeight) + (interactionScore * interactionsWeight);
};

export const getBoostImpactPercentage = (
  analytics: BoostAnalytics
): number => {
  const regularViews = analytics.impressions?.value || 0;
  const boostedViews = analytics.impressions?.withBoost || 0;
  
  if (regularViews === 0) return 0;
  
  const increase = ((boostedViews - regularViews) / regularViews) * 100;
  return Math.round(increase);
};
