
// Business Intelligence service for Brain Hub
import { v4 as uuidv4 } from 'uuid';

export interface RevenueMetric {
  id: string;
  source: string;
  amount: number;
  timestamp: number;
  timeframe: 'hourly' | 'daily' | 'weekly' | 'monthly';
}

export interface EngagementMetric {
  id: string;
  type: string;
  value: number;
  timestamp: number;
  details?: Record<string, any>;
}

export interface PlatformInsight {
  id: string;
  title: string;
  description: string;
  insightType: 'trend' | 'opportunity' | 'risk' | 'anomaly';
  impact: 'critical' | 'high' | 'medium' | 'low';
  confidence: number;
  source: string;
  timestamp: number;
  suggestedActions?: string[];
  relatedMetrics?: string[];
}

export interface RegionalPerformance {
  region: string;
  metrics: {
    revenue: number;
    userCount: number;
    conversionRate: number;
    engagementScore: number;
    contentCompliance: number;
  };
  trends: {
    revenueGrowth: number;
    userGrowth: number;
    conversionRateChange: number;
  };
}

class BrainHubBusinessIntelligence {
  private revenueData: RevenueMetric[] = [];
  private engagementData: EngagementMetric[] = [];
  private insights: PlatformInsight[] = [];
  private regionalData: Record<string, RegionalPerformance> = {};
  
  // Dashboard summary data structure
  private dashboardSummary = {
    revenueToday: 0,
    revenueGoals: {
      daily: 5000,
      weekly: 35000,
      monthly: 150000
    },
    topInsights: [] as PlatformInsight[],
    regionSummary: [] as any[]
  };
  
  // Last analysis timestamp
  private lastAnalysisRun: number = 0;
  
  constructor() {
    this.initializeDemoData();
    this.updateDashboardSummary();
  }
  
  private initializeDemoData() {
    // Generate demo revenue data
    this.revenueData = this.generateDemoRevenueData();
    
    // Generate demo engagement data
    this.engagementData = this.generateDemoEngagementData();
    
    // Generate demo insights
    this.insights = this.generateDemoInsights();
    
    // Generate demo regional data
    this.regionalData = this.generateDemoRegionalData();
  }
  
  // Generate demo revenue data
  private generateDemoRevenueData(): RevenueMetric[] {
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
  }
  
  // Generate demo engagement data
  private generateDemoEngagementData(): EngagementMetric[] {
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
  }
  
  // Generate demo insights
  private generateDemoInsights(): PlatformInsight[] {
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
  }
  
  // Generate demo regional data
  private generateDemoRegionalData(): Record<string, RegionalPerformance> {
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
  }
  
  // Update dashboard summary with current data
  private updateDashboardSummary() {
    // Calculate revenue today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();
    
    const todayRevenue = this.revenueData
      .filter(r => r.timestamp >= todayTimestamp && r.timeframe === 'daily')
      .reduce((sum, r) => sum + r.amount, 0);
    
    this.dashboardSummary.revenueToday = todayRevenue;
    
    // Get top insights (high impact and confidence)
    this.dashboardSummary.topInsights = this.insights
      .filter(i => i.impact === 'critical' || i.impact === 'high')
      .sort((a, b) => {
        // Sort by impact first, then confidence
        if (a.impact === 'critical' && b.impact !== 'critical') return -1;
        if (a.impact !== 'critical' && b.impact === 'critical') return 1;
        return b.confidence - a.confidence;
      })
      .slice(0, 3);
    
    // Get region summary
    this.dashboardSummary.regionSummary = Object.values(this.regionalData)
      .map(r => ({
        region: r.region,
        revenue: r.metrics.revenue,
        growth: r.trends.revenueGrowth
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }
  
  // Get dashboard summary
  getDashboardSummary() {
    this.updateDashboardSummary();
    return { ...this.dashboardSummary };
  }
  
  // Get revenue metrics with optional filtering
  getRevenueMetrics(filter?: { source?: string; timeframe?: string; startDate?: number; endDate?: number }) {
    let filteredData = [...this.revenueData];
    
    if (filter?.source) {
      filteredData = filteredData.filter(r => r.source === filter.source);
    }
    
    if (filter?.timeframe) {
      filteredData = filteredData.filter(r => r.timeframe === filter.timeframe);
    }
    
    if (filter?.startDate) {
      filteredData = filteredData.filter(r => r.timestamp >= filter.startDate);
    }
    
    if (filter?.endDate) {
      filteredData = filteredData.filter(r => r.timestamp <= filter.endDate);
    }
    
    // Sort by timestamp (newest first)
    return filteredData.sort((a, b) => b.timestamp - a.timestamp);
  }
  
  // Get engagement metrics with optional filtering
  getEngagementMetrics(filter?: { type?: string; startDate?: number; endDate?: number }) {
    let filteredData = [...this.engagementData];
    
    if (filter?.type) {
      filteredData = filteredData.filter(r => r.type === filter.type);
    }
    
    if (filter?.startDate) {
      filteredData = filteredData.filter(r => r.timestamp >= filter.startDate);
    }
    
    if (filter?.endDate) {
      filteredData = filteredData.filter(r => r.timestamp <= filter.endDate);
    }
    
    // Sort by timestamp (newest first)
    return filteredData.sort((a, b) => b.timestamp - a.timestamp);
  }
  
  // Get insights with optional filtering
  getInsights(filter?: { insightType?: string; impact?: string; minConfidence?: number }) {
    let filteredData = [...this.insights];
    
    if (filter?.insightType) {
      filteredData = filteredData.filter(i => i.insightType === filter.insightType);
    }
    
    if (filter?.impact) {
      filteredData = filteredData.filter(i => i.impact === filter.impact);
    }
    
    if (filter?.minConfidence) {
      filteredData = filteredData.filter(i => i.confidence >= filter.minConfidence);
    }
    
    // Sort by timestamp (newest first) and then by impact
    return filteredData.sort((a, b) => {
      if (b.timestamp !== a.timestamp) return b.timestamp - a.timestamp;
      
      const impactOrder = { 'critical': 0, 'high': 1, 'medium': 2, 'low': 3 };
      return (impactOrder[a.impact as keyof typeof impactOrder] - impactOrder[b.impact as keyof typeof impactOrder]);
    });
  }
  
  // Get regional performance data
  getRegionalPerformance(region?: string) {
    if (region) {
      return this.regionalData[region];
    }
    return this.regionalData;
  }
  
  // Run autonomous analysis to generate new insights
  async runAutonomousAnalysis() {
    // Check if we've run analysis recently (limit to once per hour)
    const now = Date.now();
    if (now - this.lastAnalysisRun < 60 * 60 * 1000) {
      return {
        ran: false,
        reason: 'Analysis was run recently',
        nextAvailableRun: new Date(this.lastAnalysisRun + 60 * 60 * 1000)
      };
    }
    
    // In a real system, this would run actual analysis algorithms
    // For demo purposes, we'll simulate analysis with a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate a couple of new insights
    const newInsights = [
      {
        id: uuidv4(),
        title: 'Rising engagement pattern detected in evening hours',
        description: 'User engagement metrics show consistent 35% higher activity between 8PM-11PM compared to other times. Content scheduling should prioritize this window.',
        insightType: 'trend' as const,
        impact: 'medium' as const,
        confidence: 0.88,
        source: 'time_pattern_analysis',
        timestamp: Date.now(),
        suggestedActions: [
          'Schedule premium content releases during 8PM-11PM window',
          'Increase support staff availability during evening hours',
          'Consider evening-specific promotional campaigns'
        ]
      },
      {
        id: uuidv4(),
        title: 'Payment method preference shifting towards mobile wallets',
        description: 'Mobile wallet payments have increased by 27% in the last 30 days while credit card usage decreased by 12%. User preference is shifting towards faster payment methods.',
        insightType: 'trend' as const,
        impact: 'medium' as const,
        confidence: 0.91,
        source: 'payment_analytics',
        timestamp: Date.now(),
        suggestedActions: [
          'Optimize mobile wallet payment experience',
          'Add support for additional mobile payment providers',
          'Create promotions specific to mobile wallet users'
        ]
      }
    ];
    
    // Add random insights based on current data
    if (Math.random() > 0.5) {
      const warningTitles = [
        'Unusual drop in conversion rate detected',
        'API response time degradation detected',
        'Search feature usage declining rapidly',
        'Security anomaly: unusual login patterns detected'
      ];
      
      const randomTitle = warningTitles[Math.floor(Math.random() * warningTitles.length)];
      
      newInsights.push({
        id: uuidv4(),
        title: randomTitle,
        description: `An anomaly has been detected in recent system metrics that requires attention. This pattern deviates significantly from historical trends.`,
        insightType: 'anomaly' as const,
        impact: 'high' as const,
        confidence: 0.85,
        source: 'anomaly_detection',
        timestamp: Date.now(),
        suggestedActions: [
          'Investigate recent system changes',
          'Review affected metrics for correlation',
          'Compare with historical patterns'
        ]
      });
    }
    
    // Add the new insights to our collection
    this.insights = [...newInsights, ...this.insights];
    
    // Update last analysis run time
    this.lastAnalysisRun = now;
    
    return {
      ran: true,
      insightsGenerated: newInsights.length,
      completedAt: new Date(),
      insights: newInsights
    };
  }
}

// Create singleton instance
const businessIntelligence = new BrainHubBusinessIntelligence();

export default businessIntelligence;
