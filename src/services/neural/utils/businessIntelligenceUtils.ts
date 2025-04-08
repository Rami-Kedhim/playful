
// Business Intelligence utility functions

import { PlatformInsight } from '../types/businessIntelligence';

/**
 * Generates new random insights based on current system state
 * @returns Array of newly generated insights
 */
export const generateRandomInsights = (currentTime: number = Date.now()): PlatformInsight[] => {
  const warningTitles = [
    'Unusual drop in conversion rate detected',
    'API response time degradation detected',
    'Search feature usage declining rapidly',
    'Security anomaly: unusual login patterns detected'
  ];
  
  const randomTitle = warningTitles[Math.floor(Math.random() * warningTitles.length)];
  
  return [
    {
      id: crypto.randomUUID(),
      title: randomTitle,
      description: `An anomaly has been detected in recent system metrics that requires attention. This pattern deviates significantly from historical trends.`,
      insightType: 'anomaly',
      impact: 'high',
      confidence: 0.85,
      source: 'anomaly_detection',
      timestamp: currentTime,
      suggestedActions: [
        'Investigate recent system changes',
        'Review affected metrics for correlation',
        'Compare with historical patterns'
      ]
    }
  ];
};

/**
 * Updates dashboard summary with current metrics
 */
export const calculateDashboardSummary = (
  revenueData: any[], 
  insights: PlatformInsight[],
  regionalData: Record<string, any>,
  goalConfig: { daily: number, weekly: number, monthly: number }
) => {
  // Calculate revenue today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTimestamp = today.getTime();
  
  const todayRevenue = revenueData
    .filter(r => r.timestamp >= todayTimestamp && r.timeframe === 'daily')
    .reduce((sum, r) => sum + r.amount, 0);
  
  // Get top insights (high impact and confidence)
  const topInsights = insights
    .filter(i => i.impact === 'critical' || i.impact === 'high')
    .sort((a, b) => {
      // Sort by impact first, then confidence
      if (a.impact === 'critical' && b.impact !== 'critical') return -1;
      if (a.impact !== 'critical' && b.impact === 'critical') return 1;
      return b.confidence - a.confidence;
    })
    .slice(0, 3);
  
  // Get region summary
  const regionSummary = Object.values(regionalData)
    .map((r: any) => ({
      region: r.region,
      revenue: r.metrics.revenue,
      growth: r.trends.revenueGrowth
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
  
  return {
    revenueToday: todayRevenue,
    revenueGoals: goalConfig,
    topInsights,
    regionSummary
  };
};
