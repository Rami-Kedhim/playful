
// The issue is in the getBoostAnalytics function:

export const getBoostAnalytics = async (): Promise<AnalyticsData | null> => {
  try {
    // This would call an analytics API in a real implementation
    
    // Generate some mock analytics data
    const viewsBase = Math.floor(Math.random() * 300) + 100;
    const engagementBase = Math.floor(Math.random() * 50) + 20;
    
    const mockData: AnalyticsData = {
      views: {
        withoutBoost: Math.floor(viewsBase * 0.7),
        withBoost: viewsBase,
        increase: Math.floor(((viewsBase * 0.7) / viewsBase) * 100)
      },
      engagement: {
        withoutBoost: Math.floor(engagementBase * 0.6),
        withBoost: engagementBase,
        increase: Math.floor(((engagementBase * 0.6) / engagementBase) * 100)
      },
      conversion: {
        previous: Math.floor(Math.random() * 5) + 2,
        current: Math.floor(Math.random() * 10) + 5,
        change: Math.floor(Math.random() * 40) + 10
      },
      timeData: Array.from({ length: 24 }, (_, i) => ({
        hour: `${i}:00`,
        views: Math.floor(Math.random() * 50) + 10,
        engagement: Math.floor(Math.random() * 10) + 5
      }))
    };
    
    return mockData;
  } catch (err) {
    console.error('Error fetching boost analytics:', err);
    return null;
  }
};
