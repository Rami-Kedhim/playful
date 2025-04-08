
// Business Intelligence service for Brain Hub
import { v4 as uuidv4 } from 'uuid';
import {
  RevenueMetric,
  EngagementMetric,
  PlatformInsight,
  RegionalPerformance,
  DashboardSummary,
  AnalysisResult
} from './types/businessIntelligence';
import {
  generateDemoRevenueData,
  generateDemoEngagementData,
  generateDemoInsights,
  generateDemoRegionalData
} from './data/mockBusinessIntelligenceData';
import {
  generateRandomInsights,
  calculateDashboardSummary
} from './utils/businessIntelligenceUtils';

class BrainHubBusinessIntelligence {
  private revenueData: RevenueMetric[] = [];
  private engagementData: EngagementMetric[] = [];
  private insights: PlatformInsight[] = [];
  private regionalData: Record<string, RegionalPerformance> = {};
  
  // Dashboard summary data structure
  private dashboardSummary: DashboardSummary = {
    revenueToday: 0,
    revenueGoals: {
      daily: 5000,
      weekly: 35000,
      monthly: 150000
    },
    topInsights: [],
    regionSummary: []
  };
  
  // Last analysis timestamp
  private lastAnalysisRun: number = 0;
  
  constructor() {
    this.initializeDemoData();
    this.updateDashboardSummary();
  }
  
  private initializeDemoData() {
    // Generate demo revenue data
    this.revenueData = generateDemoRevenueData();
    
    // Generate demo engagement data
    this.engagementData = generateDemoEngagementData();
    
    // Generate demo insights
    this.insights = generateDemoInsights();
    
    // Generate demo regional data
    this.regionalData = generateDemoRegionalData();
  }
  
  // Update dashboard summary with current data
  private updateDashboardSummary() {
    const summary = calculateDashboardSummary(
      this.revenueData,
      this.insights,
      this.regionalData,
      this.dashboardSummary.revenueGoals
    );
    
    this.dashboardSummary = summary;
  }
  
  // Get dashboard summary
  getDashboardSummary(): DashboardSummary {
    this.updateDashboardSummary();
    return { ...this.dashboardSummary };
  }
  
  // Get revenue metrics with optional filtering
  getRevenueMetrics(filter?: { source?: string; timeframe?: string; startDate?: number; endDate?: number }): RevenueMetric[] {
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
  getEngagementMetrics(filter?: { type?: string; startDate?: number; endDate?: number }): EngagementMetric[] {
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
  getInsights(filter?: { insightType?: string; impact?: string; minConfidence?: number }): PlatformInsight[] {
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
  getRegionalPerformance(region?: string): RegionalPerformance | Record<string, RegionalPerformance> {
    if (region) {
      return this.regionalData[region];
    }
    return this.regionalData;
  }
  
  // Run autonomous analysis to generate new insights
  async runAutonomousAnalysis(): Promise<AnalysisResult> {
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
    const newInsights: PlatformInsight[] = [
      {
        id: uuidv4(),
        title: 'Rising engagement pattern detected in evening hours',
        description: 'User engagement metrics show consistent 35% higher activity between 8PM-11PM compared to other times. Content scheduling should prioritize this window.',
        insightType: 'trend',
        impact: 'medium',
        confidence: 0.88,
        source: 'time_pattern_analysis',
        timestamp: now,
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
        insightType: 'trend',
        impact: 'medium',
        confidence: 0.91,
        source: 'payment_analytics',
        timestamp: now,
        suggestedActions: [
          'Optimize mobile wallet payment experience',
          'Add support for additional mobile payment providers',
          'Create promotions specific to mobile wallet users'
        ]
      }
    ];
    
    // Add random insights based on current data
    if (Math.random() > 0.5) {
      const randomInsight = generateRandomInsights(now)[0];
      newInsights.push(randomInsight);
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
