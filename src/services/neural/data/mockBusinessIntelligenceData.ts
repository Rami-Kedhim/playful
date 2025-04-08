
// Mock data generators for Business Intelligence

import { v4 as uuidv4 } from 'uuid';
import { 
  RevenueMetric, 
  EngagementMetric, 
  PlatformInsight, 
  RegionalPerformance 
} from '../types/businessIntelligence';

export const generateDemoRevenueData = (): RevenueMetric[] => {
  const sources = ['ai_chat', 'premium_content', 'subscriptions', 'boost_packages', 'verification_fees', 'gifts', 'tips'];
  const timeframes: ('hourly' | 'daily' | 'weekly' | 'monthly')[] = ['hourly', 'daily', 'weekly', 'monthly'];
  const demoData: RevenueMetric[] = [];
  
  const now = Date.now();
  
  // Generate 30 days of daily data
  for (let i = 0; i < 30; i++) {
    const dayTimestamp = now - (i * 24 * 60 * 60 * 1000);
    
    // Generate different revenue sources for each day
    sources.forEach(source => {
      // Base amount for each source with some randomization
      let baseAmount = 0;
      switch (source) {
        case 'ai_chat': baseAmount = 750; break;
        case 'premium_content': baseAmount = 1200; break;
        case 'subscriptions': baseAmount = 2000; break;
        case 'boost_packages': baseAmount = 500; break;
        case 'verification_fees': baseAmount = 300; break;
        case 'gifts': baseAmount = 400; break;
        case 'tips': baseAmount = 300; break;
      }
      
      // Add some randomization to the amount (±20%)
      const randomFactor = 0.8 + (Math.random() * 0.4); // 0.8 to 1.2
      const amount = baseAmount * randomFactor;
      
      demoData.push({
        id: uuidv4(),
        source,
        amount,
        timestamp: dayTimestamp,
        timeframe: 'daily'
      });
      
      // Add weekly data for the first day of each week
      if (i % 7 === 0) {
        demoData.push({
          id: uuidv4(),
          source,
          amount: amount * 7 * (0.9 + Math.random() * 0.2), // Weekly amount with some variation
          timestamp: dayTimestamp,
          timeframe: 'weekly'
        });
      }
      
      // Add monthly data for the first day of the month
      if (i === 0) {
        demoData.push({
          id: uuidv4(),
          source,
          amount: amount * 30 * (0.9 + Math.random() * 0.2), // Monthly amount with some variation
          timestamp: dayTimestamp,
          timeframe: 'monthly'
        });
      }
    });
    
    // Add hourly data for today only
    if (i === 0) {
      for (let h = 0; h < 24; h++) {
        const hourTimestamp = now - (h * 60 * 60 * 1000);
        
        // Only add for a subset of sources to avoid too much data
        ['ai_chat', 'premium_content', 'subscriptions'].forEach(source => {
          let baseAmount = 0;
          switch (source) {
            case 'ai_chat': baseAmount = 30; break;
            case 'premium_content': baseAmount = 50; break;
            case 'subscriptions': baseAmount = 80; break;
          }
          
          // Add time-of-day variation
          let timeOfDayFactor = 1.0;
          if (h >= 9 && h <= 22) { // Higher during waking hours
            timeOfDayFactor = 1.5;
          }
          if (h >= 18 && h <= 21) { // Peak evening hours
            timeOfDayFactor = 2.0;
          }
          
          const randomFactor = 0.7 + (Math.random() * 0.6); // 0.7 to 1.3
          const amount = baseAmount * randomFactor * timeOfDayFactor;
          
          demoData.push({
            id: uuidv4(),
            source,
            amount,
            timestamp: hourTimestamp,
            timeframe: 'hourly'
          });
        });
      }
    }
  }
  
  return demoData;
};

export const generateDemoEngagementData = (): EngagementMetric[] => {
  const types = ['active_users', 'session_duration', 'interaction_rate', 'conversion_rate', 'retention_rate'];
  const demoData: EngagementMetric[] = [];
  
  const now = Date.now();
  
  // Generate 30 days of daily data
  for (let i = 0; i < 30; i++) {
    const dayTimestamp = now - (i * 24 * 60 * 60 * 1000);
    
    types.forEach(type => {
      let baseValue = 0;
      let details: Record<string, any> = {};
      
      switch (type) {
        case 'active_users': 
          baseValue = 12000;
          details = { new_users: Math.floor(baseValue * 0.1), returning_users: Math.floor(baseValue * 0.9) };
          break;
        case 'session_duration': 
          baseValue = 15; // minutes
          break;
        case 'interaction_rate': 
          baseValue = 0.35; // 35% of users interact
          details = { 
            message_rate: 0.25, 
            profile_view_rate: 0.4, 
            feature_usage: {
              chat: 0.65,
              video: 0.22,
              audio: 0.13
            }
          };
          break;
        case 'conversion_rate': 
          baseValue = 0.08; // 8% conversion
          details = { funnel: { viewed: 100, clicked: 35, signed_up: 12, purchased: 8 } };
          break;
        case 'retention_rate': 
          baseValue = 0.65; // 65% retention
          details = { day1: 0.8, day7: 0.65, day30: 0.45 };
          break;
      }
      
      // Add some randomization to the value (±15%)
      const randomFactor = 0.85 + (Math.random() * 0.3); // 0.85 to 1.15
      const value = baseValue * randomFactor;
      
      // If it's an older date, apply a slight downward trend
      const trendFactor = 1.0 - (i * 0.003); // Slight downward trend with time
      
      demoData.push({
        id: uuidv4(),
        type,
        value: value * trendFactor,
        timestamp: dayTimestamp,
        details
      });
    });
  }
  
  return demoData;
};

export const generateDemoInsights = (): PlatformInsight[] => {
  return [
    {
      id: uuidv4(),
      title: 'Premium content consumption increasing by 23%',
      description: 'The consumption of premium content has increased by 23% over the past 14 days, primarily driven by interactive AI companions. This suggests strong user interest in AI-driven premium experiences.',
      insightType: 'trend',
      impact: 'medium',
      confidence: 0.92,
      source: 'usage_analytics',
      timestamp: Date.now() - (2 * 24 * 60 * 60 * 1000),
      suggestedActions: [
        'Increase promotion of premium AI companion features',
        'Consider creating premium content bundles that include AI companion access',
        'Develop more interactive features for premium content'
      ]
    },
    {
      id: uuidv4(),
      title: 'Urgent: Payment processing latency increasing',
      description: 'Payment processing times have increased by 40% in the last 24 hours, potentially affecting user experience during checkout. Several users have reported timeout errors.',
      insightType: 'risk',
      impact: 'critical',
      confidence: 0.95,
      source: 'system_monitoring',
      timestamp: Date.now() - (4 * 60 * 60 * 1000),
      suggestedActions: [
        'Investigate payment gateway connection issues',
        'Enable backup payment processor temporarily',
        'Add monitoring alerts for payment processing times',
        'Contact payment provider support team'
      ]
    },
    {
      id: uuidv4(),
      title: 'User retention opportunity in North America',
      description: 'Users from North America show 22% higher spending but 15% lower retention than the global average. Targeted retention strategies could yield significant revenue increases.',
      insightType: 'opportunity',
      impact: 'high',
      confidence: 0.87,
      source: 'user_analytics',
      timestamp: Date.now() - (5 * 24 * 60 * 60 * 1000),
      suggestedActions: [
        'Develop region-specific loyalty program',
        'Create targeted re-engagement campaign for North American users',
        'Analyze most common drop-off points for this region'
      ]
    },
    {
      id: uuidv4(),
      title: 'AI Companion response quality dropping',
      description: 'User satisfaction scores for AI Companion responses have decreased by 8% over the past week, with reports of repetitive answers increasing.',
      insightType: 'risk',
      impact: 'medium',
      confidence: 0.85,
      source: 'feedback_analysis',
      timestamp: Date.now() - (3 * 24 * 60 * 60 * 1000),
      suggestedActions: [
        'Review recent model training data for quality issues',
        'Analyze user feedback to identify specific weak spots',
        'Consider rolling back to previous model version temporarily'
      ]
    },
    {
      id: uuidv4(),
      title: 'Weekend promotion opportunity identified',
      description: 'Usage patterns show 40% increase in weekend user activity but only 15% increase in weekend purchases. A weekend-specific promotion could close this gap.',
      insightType: 'opportunity',
      impact: 'medium',
      confidence: 0.83,
      source: 'purchase_patterns',
      timestamp: Date.now() - (7 * 24 * 60 * 60 * 1000),
      suggestedActions: [
        'Create weekend-only discount packages',
        'Implement time-limited weekend features',
        'Target users who are active on weekends but rarely purchase'
      ]
    },
    {
      id: uuidv4(),
      title: 'New user onboarding friction detected',
      description: 'First-time users are spending 35% more time on the verification step than two weeks ago, and conversion rate from signup to active user has dropped by 12%.',
      insightType: 'anomaly',
      impact: 'high',
      confidence: 0.89,
      source: 'funnel_analysis',
      timestamp: Date.now() - (1 * 24 * 60 * 60 * 1000),
      suggestedActions: [
        'Review recent changes to verification process',
        'Analyze error logs for verification step',
        'Consider implementing a simplified verification path'
      ]
    },
    {
      id: uuidv4(),
      title: 'Market expansion opportunity: Spanish language',
      description: 'Spanish-speaking users are growing 3x faster than overall user base, but Spanish content and companions are limited compared to English. Expanding Spanish offerings could accelerate growth.',
      insightType: 'opportunity',
      impact: 'high',
      confidence: 0.91,
      source: 'market_analysis',
      timestamp: Date.now() - (14 * 24 * 60 * 60 * 1000),
      suggestedActions: [
        'Prioritize Spanish language AI model training',
        'Recruit more Spanish-speaking content creators',
        'Launch targeted marketing campaign for Spanish-speaking regions'
      ]
    }
  ];
};

export const generateDemoRegionalData = (): Record<string, RegionalPerformance> => {
  const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa'];
  const demoData: Record<string, RegionalPerformance> = {};
  
  regions.forEach(region => {
    let baseRevenue = 0;
    let baseUserCount = 0;
    let baseConversionRate = 0;
    let baseEngagementScore = 0;
    let baseCompliance = 0;
    
    // Set different base values for different regions
    switch (region) {
      case 'North America':
        baseRevenue = 120000;
        baseUserCount = 45000;
        baseConversionRate = 0.12;
        baseEngagementScore = 72;
        baseCompliance = 0.98;
        break;
      case 'Europe':
        baseRevenue = 95000;
        baseUserCount = 38000;
        baseConversionRate = 0.10;
        baseEngagementScore = 68;
        baseCompliance = 0.99;
        break;
      case 'Asia Pacific':
        baseRevenue = 85000;
        baseUserCount = 52000;
        baseConversionRate = 0.08;
        baseEngagementScore = 70;
        baseCompliance = 0.95;
        break;
      case 'Latin America':
        baseRevenue = 32000;
        baseUserCount = 22000;
        baseConversionRate = 0.06;
        baseEngagementScore = 75;
        baseCompliance = 0.94;
        break;
      case 'Middle East & Africa':
        baseRevenue = 18000;
        baseUserCount = 15000;
        baseConversionRate = 0.05;
        baseEngagementScore = 65;
        baseCompliance = 0.92;
        break;
    }
    
    // Add some randomization
    const randomRevenue = baseRevenue * (0.9 + Math.random() * 0.2);
    const randomUserCount = Math.floor(baseUserCount * (0.9 + Math.random() * 0.2));
    const randomConversionRate = baseConversionRate * (0.9 + Math.random() * 0.2);
    const randomEngagementScore = baseEngagementScore * (0.9 + Math.random() * 0.2);
    const randomCompliance = baseCompliance * (0.95 + Math.random() * 0.05);
    
    // Generate random growth trends (between -10% and +30%)
    const revenueGrowth = -0.1 + Math.random() * 0.4;
    const userGrowth = -0.05 + Math.random() * 0.35;
    const conversionRateChange = -0.08 + Math.random() * 0.25;
    
    demoData[region] = {
      region,
      metrics: {
        revenue: randomRevenue,
        userCount: randomUserCount,
        conversionRate: randomConversionRate,
        engagementScore: randomEngagementScore,
        contentCompliance: randomCompliance
      },
      trends: {
        revenueGrowth,
        userGrowth,
        conversionRateChange
      }
    };
  });
  
  return demoData;
};
