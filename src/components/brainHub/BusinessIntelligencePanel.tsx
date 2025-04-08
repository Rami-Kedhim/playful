
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import {
  BarChart3, TrendingUp, AlertCircle, Globe, DollarSign, 
  Users, LineChart, PieChart, Calendar, Lightbulb, Zap
} from 'lucide-react';
import businessIntelligence, { 
  RevenueMetric, 
  EngagementMetric, 
  PlatformInsight, 
  RegionalPerformance 
} from '@/services/neural/BrainHubBusinessIntelligence';

const BusinessIntelligencePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [revenueMetrics, setRevenueMetrics] = useState<RevenueMetric[]>([]);
  const [engagementMetrics, setEngagementMetrics] = useState<EngagementMetric[]>([]);
  const [insights, setInsights] = useState<PlatformInsight[]>([]);
  const [regionalData, setRegionalData] = useState<Record<string, RegionalPerformance>>({});
  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Initialize data on mount
  useEffect(() => {
    refreshAllData();
    
    // Set up interval to refresh dashboard data
    const interval = setInterval(() => {
      setDashboardData(businessIntelligence.getDashboardSummary());
    }, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Refresh all data
  const refreshAllData = () => {
    setDashboardData(businessIntelligence.getDashboardSummary());
    setRevenueMetrics(businessIntelligence.getRevenueMetrics());
    setEngagementMetrics(businessIntelligence.getEngagementMetrics());
    setInsights(businessIntelligence.getInsights());
    setRegionalData(businessIntelligence.getRegionalPerformance() as Record<string, RegionalPerformance>);
  };
  
  // Run autonomous analysis
  const runAnalysis = async () => {
    setIsRunningAnalysis(true);
    
    try {
      const result = await businessIntelligence.runAutonomousAnalysis();
      setAnalysisResult(result);
      
      if (result.ran) {
        toast({
          title: "Analysis Complete",
          description: `Generated ${result.insightsGenerated} new insights`,
        });
        
        // Refresh our data
        refreshAllData();
      } else {
        toast({
          title: "Analysis Skipped",
          description: result.reason || "Analysis could not be run at this time",
          variant: "warning"
        });
      }
    } catch (error) {
      console.error("Error running analysis:", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error running the analysis",
        variant: "destructive"
      });
    } finally {
      setIsRunningAnalysis(false);
    }
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  // Format date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };
  
  // Get impact badge
  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">High</Badge>;
      case 'medium':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Medium</Badge>;
      case 'low':
      default:
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Low</Badge>;
    }
  };
  
  // Get insight type icon
  const getInsightTypeIcon = (type: string) => {
    switch (type) {
      case 'trend':
        return <TrendingUp className="h-5 w-5" />;
      case 'opportunity':
        return <Lightbulb className="h-5 w-5" />;
      case 'risk':
        return <AlertCircle className="h-5 w-5" />;
      case 'anomaly':
        return <Zap className="h-5 w-5" />;
      default:
        return <LineChart className="h-5 w-5" />;
    }
  };
  
  // Loading state
  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-sm text-muted-foreground">Loading business intelligence data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Business Intelligence</CardTitle>
              <CardDescription>Autonomous business analytics and strategic insights</CardDescription>
            </div>
            <Button 
              onClick={runAnalysis}
              disabled={isRunningAnalysis}
              className="flex items-center"
            >
              {isRunningAnalysis ? (
                <>
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                  Running Analysis...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Run Intelligence Analysis
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="overview">
                <BarChart3 className="h-4 w-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="insights">
                <Lightbulb className="h-4 w-4 mr-2" />
                Insights
              </TabsTrigger>
              <TabsTrigger value="revenue">
                <DollarSign className="h-4 w-4 mr-2" />
                Revenue
              </TabsTrigger>
              <TabsTrigger value="regional">
                <Globe className="h-4 w-4 mr-2" />
                Regional
              </TabsTrigger>
            </TabsList>
            
            {/* Dashboard Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Today's Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{formatCurrency(dashboardData.revenueToday)}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {dashboardData.revenueToday >= dashboardData.revenueGoals.daily ? (
                        <span className="text-green-600">Above daily goal</span>
                      ) : (
                        <span className="text-amber-600">Below daily goal</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Weekly Goal Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* This would normally be a progress bar or chart */}
                    <div className="text-3xl font-bold">67%</div>
                    <div className="w-full bg-gray-200 h-2 mt-2 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{width: '67%'}}></div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Active Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">1,248</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      <span className="text-green-600">+12% vs. last week</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Conversion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">18.4%</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      <span className="text-amber-600">-2.1% vs. last week</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Key Insights</CardTitle>
                    <CardDescription>Priority insights requiring attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.topInsights.length > 0 ? (
                        dashboardData.topInsights.map((insight: PlatformInsight, index: number) => (
                          <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                            <div className={`
                              p-2 rounded-full flex-shrink-0
                              ${insight.impact === 'critical' ? 'bg-red-100 text-red-800' : 
                                insight.impact === 'high' ? 'bg-orange-100 text-orange-800' : 
                                'bg-amber-100 text-amber-800'}
                            `}>
                              {getInsightTypeIcon(insight.insightType)}
                            </div>
                            <div>
                              <div className="flex items-center">
                                <h4 className="font-medium">{insight.title}</h4>
                                <div className="ml-2">
                                  {getImpactBadge(insight.impact)}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                              
                              {insight.suggestedActions && insight.suggestedActions.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-xs font-medium">Suggested Actions:</p>
                                  <ul className="text-xs text-muted-foreground mt-1 list-disc list-inside">
                                    {insight.suggestedActions.slice(0, 2).map((action, i) => (
                                      <li key={i}>{action}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Lightbulb className="h-10 w-10 mx-auto opacity-30 mb-2" />
                          <p>No critical insights at this time</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Regions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.regionSummary.map((region: any, index: number) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-2 text-primary" />
                            <span>{region.region}</span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="font-medium">{formatCurrency(region.revenue)}</span>
                            <span className={`text-xs ${
                              region.growth > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {region.growth > 0 ? '+' : ''}{(region.growth * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Source</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <PieChart className="h-10 w-10 mx-auto opacity-30 mb-2" />
                      <p>Revenue distribution chart would be displayed here</p>
                      <p className="text-sm">AI Chat: 42% | Premium Content: 28% | Subscriptions: 18% | Boosts: 12%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Insights Tab */}
            <TabsContent value="insights" className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setInsights(businessIntelligence.getInsights())}
                  >
                    All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setInsights(businessIntelligence.getInsights({ insightType: 'opportunity' }))}
                  >
                    Opportunities
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setInsights(businessIntelligence.getInsights({ insightType: 'risk' }))}
                  >
                    Risks
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setInsights(businessIntelligence.getInsights({ insightType: 'trend' }))}
                  >
                    Trends
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setInsights(businessIntelligence.getInsights())}
                >
                  Refresh
                </Button>
              </div>
              
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`
                            p-2 rounded-full mr-3
                            ${insight.insightType === 'trend' ? 'bg-blue-100 text-blue-800' : 
                              insight.insightType === 'opportunity' ? 'bg-green-100 text-green-800' : 
                              insight.insightType === 'risk' ? 'bg-red-100 text-red-800' :
                              'bg-purple-100 text-purple-800'}
                          `}>
                            {getInsightTypeIcon(insight.insightType)}
                          </div>
                          <div>
                            <CardTitle>{insight.title}</CardTitle>
                            <div className="flex items-center mt-1">
                              <Badge className="mr-2">{insight.insightType}</Badge>
                              {getImpactBadge(insight.impact)}
                              <span className="text-xs text-muted-foreground ml-2">
                                Confidence: {(insight.confidence * 100).toFixed(0)}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(insight.timestamp)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">{insight.description}</p>
                      
                      {insight.suggestedActions && insight.suggestedActions.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Suggested Actions:</h4>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            {insight.suggestedActions.map((action, i) => (
                              <li key={i}>{action}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="text-xs text-muted-foreground border-t pt-3">
                      Source: {insight.source}
                    </CardFooter>
                  </Card>
                ))}
                
                {insights.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Lightbulb className="h-12 w-12 mx-auto opacity-30 mb-3" />
                    <p>No insights available</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Revenue Tab */}
            <TabsContent value="revenue" className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setRevenueMetrics(businessIntelligence.getRevenueMetrics())}
                  >
                    All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setRevenueMetrics(businessIntelligence.getRevenueMetrics({ source: 'ai_chat' }))}
                  >
                    AI Chat
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setRevenueMetrics(businessIntelligence.getRevenueMetrics({ source: 'premium_content' }))}
                  >
                    Premium Content
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setRevenueMetrics(businessIntelligence.getRevenueMetrics({ timeframe: 'daily' }))}
                  >
                    Daily
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setRevenueMetrics(businessIntelligence.getRevenueMetrics())}
                >
                  Refresh
                </Button>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center mb-4">
                    <div className="text-center text-muted-foreground">
                      <BarChart3 className="h-10 w-10 mx-auto opacity-30 mb-2" />
                      <p>Revenue chart would be displayed here</p>
                    </div>
                  </div>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Source</TableHead>
                          <TableHead>Timeframe</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {revenueMetrics.slice(0, 10).map((metric) => (
                          <TableRow key={metric.id}>
                            <TableCell>{new Date(metric.timestamp).toLocaleDateString()}</TableCell>
                            <TableCell className="capitalize">{metric.source.replace('_', ' ')}</TableCell>
                            <TableCell>{metric.timeframe}</TableCell>
                            <TableCell className="text-right">{formatCurrency(metric.amount)}</TableCell>
                          </TableRow>
                        ))}
                        
                        {revenueMetrics.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                              No revenue data available
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Goal Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Daily Goal</h4>
                      <div className="text-2xl font-bold">{formatCurrency(dashboardData.revenueGoals.daily)}</div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary"
                          style={{width: `${Math.min(100, (dashboardData.revenueToday / dashboardData.revenueGoals.daily) * 100)}%`}}
                        ></div>
                      </div>
                      <div className="text-sm">{Math.round((dashboardData.revenueToday / dashboardData.revenueGoals.daily) * 100)}% achieved</div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Weekly Goal</h4>
                      <div className="text-2xl font-bold">{formatCurrency(dashboardData.revenueGoals.weekly)}</div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{width: '67%'}}></div>
                      </div>
                      <div className="text-sm">67% achieved</div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Monthly Goal</h4>
                      <div className="text-2xl font-bold">{formatCurrency(dashboardData.revenueGoals.monthly)}</div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{width: '42%'}}></div>
                      </div>
                      <div className="text-sm">42% achieved</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Regional Tab */}
            <TabsContent value="regional" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Regional Performance</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setRegionalData(businessIntelligence.getRegionalPerformance() as Record<string, RegionalPerformance>)}
                >
                  Refresh
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.values(regionalData).map((region, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center">
                          <Globe className="h-5 w-5 mr-2 text-primary" />
                          {region.region}
                        </CardTitle>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Revenue</p>
                          <p className="text-xl font-bold">{formatCurrency(region.metrics.revenue)}</p>
                          <p className={`text-xs ${region.trends.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {region.trends.revenueGrowth >= 0 ? '+' : ''}
                            {(region.trends.revenueGrowth * 100).toFixed(1)}% growth
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">Active Users</p>
                          <p className="text-xl font-bold">{region.metrics.userCount.toLocaleString()}</p>
                          <p className={`text-xs ${region.trends.userGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {region.trends.userGrowth >= 0 ? '+' : ''}
                            {(region.trends.userGrowth * 100).toFixed(1)}% growth
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Conversion Rate</span>
                            <span>{(region.metrics.conversionRate * 100).toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${region.metrics.conversionRate > 0.15 ? 'bg-green-500' : 'bg-amber-500'}`}
                              style={{width: `${region.metrics.conversionRate * 100 * 3}%`}}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Engagement Score</span>
                            <span>{region.metrics.engagementScore.toFixed(1)}/100</span>
                          </div>
                          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${region.metrics.engagementScore > 70 ? 'bg-green-500' : 'bg-amber-500'}`}
                              style={{width: `${region.metrics.engagementScore}%`}}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Compliance Score</span>
                            <span>{(region.metrics.contentCompliance * 100).toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                region.metrics.contentCompliance > 0.9 ? 'bg-green-500' : 
                                region.metrics.contentCompliance > 0.8 ? 'bg-amber-500' : 
                                'bg-red-500'
                              }`}
                              style={{width: `${region.metrics.contentCompliance * 100}%`}}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {Object.keys(regionalData).length === 0 && (
                  <div className="md:col-span-2 text-center py-12 text-muted-foreground">
                    <Globe className="h-12 w-12 mx-auto opacity-30 mb-3" />
                    <p>No regional data available</p>
                  </div>
                )}
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Global Distribution Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Globe className="h-12 w-12 mx-auto opacity-30 mb-3" />
                      <p>Geographic distribution map would be displayed here</p>
                      <p className="text-sm mt-2">Showing revenue and user distribution across regions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
          Last updated: {new Date().toLocaleString()} • Autonomous Brain Hub Business Intelligence
        </CardFooter>
      </Card>
    </div>
  );
};

export default BusinessIntelligencePanel;
