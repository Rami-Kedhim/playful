
export interface NeuralMetricsDisplayProps {
  metrics: {
    accuracy: number;
    speed: number;
    completeness: number;
    consistency: number;
  };
  showDetails?: boolean;
}

export interface AnalyticsData {
  totalBoosts: number;
  activeBoosts: number;
  averageBoostScore: number;
  views: number;
  impressions: {
    value: number;
    change: number;
  };
  interactions: {
    value: number;
    change: number;
  };
  additionalViews: number;
  engagementIncrease: number;
  rankingPosition: number;
}
