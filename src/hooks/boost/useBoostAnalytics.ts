export interface AnalyticsData {
  additionalViews: number;
  engagementIncrease: number;
  rankingPosition: number;
  effectiveness: number;
  views: {
    withoutBoost: number;
    withBoost: number;
    increase: number;
  };
  clicks: {
    withoutBoost: number;
    withBoost: number;
    increase: number;
  };
  searchRanking: {
    withoutBoost: number;
    withBoost: number;
    improvement: number;
  };
}

export const useBoostAnalytics = () => {
  // This hook could be expanded to include analytics fetch/calculation logic
  // For now, it just exports the interface
  return {};
};
