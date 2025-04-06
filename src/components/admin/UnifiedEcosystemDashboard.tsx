
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, TrendingUp, DollarSign, Users, Bot, Info } from 'lucide-react';
import { AIAnalyticsService } from '@/services/ai/aiAnalyticsService';

const UnifiedEcosystemDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [analyticsData, setAnalyticsData] = useState({
    monetization: {},
    userEngagement: {},
    profileAnalytics: {},
    isLoading: true,
    error: null as string | null
  });

  useEffect(() => {
    const fetchAllAnalytics = async () => {
      try {
        const [monetizationData, userEngagementData, profileAnalyticsData] = await Promise.all([
          AIAnalyticsService.getMonetizationAnalytics(),
          AIAnalyticsService.getUserEngagementAnalytics(),
          AIAnalyticsService.getProfileAnalytics()
        ]);
        
        setAnalyticsData({
          monetization: monetizationData,
          userEngagement: userEngagementData,
          profileAnalytics: profileAnalyticsData,
          isLoading: false,
          error: null
        });
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setAnalyticsData(prev => ({
          ...prev,
          isLoading: false,
          error: "Failed to load analytics data"
        }));
      }
    };
    
    fetchAllAnalytics();
  }, []);

  if (analyticsData.error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {analyticsData.error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unified Ecosystem Dashboard</CardTitle>
        <CardDescription>
          Monitor and analyze real escort and AI model performance metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ai-metrics">AI Metrics</TabsTrigger>
            <TabsTrigger value="escort-metrics">Escort Metrics</TabsTrigger>
            <TabsTrigger value="conversion">Conversion</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Total Revenue"
                value={`$${(analyticsData.monetization as any).totalRevenue?.toLocaleString() || '0'}`}
                icon={<DollarSign className="h-4 w-4" />}
                description="Combined revenue from AI and escorts"
              />
              
              <MetricCard
                title="Active Users"
                value={(analyticsData.userEngagement as any).totalActiveUsers?.toLocaleString() || '0'}
                icon={<Users className="h-4 w-4" />}
                description="Users active in the last 30 days"
              />
              
              <MetricCard
                title="AI Engagements"
                value={(analyticsData.profileAnalytics as any).conversations?.toLocaleString() || '0'}
                icon={<Bot className="h-4 w-4" />}
                description="Total AI interactions"
              />
              
              <MetricCard
                title="Conversion Rate"
                value={`${((analyticsData.monetization as any).conversionsByPersonality?.flirty * 100).toFixed(1)}%`}
                icon={<TrendingUp className="h-4 w-4" />}
                description="AI to real escort conversion"
              />
            </div>
            
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Ecosystem Synergy</AlertTitle>
              <AlertDescription>
                The unified ecosystem is showing a healthy balance between AI engagement and real escort bookings. 
                AI profiles are successfully funneling users toward verified escorts after initial engagement.
              </AlertDescription>
            </Alert>
          </TabsContent>
          
          <TabsContent value="ai-metrics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">AI Profile Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Messages Sent</span>
                      <span className="text-sm font-medium">{(analyticsData.profileAnalytics as any).messages?.toLocaleString() || '0'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Content Views</span>
                      <span className="text-sm font-medium">{(analyticsData.profileAnalytics as any).contentViews?.toLocaleString() || '0'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Content Purchases</span>
                      <span className="text-sm font-medium">{(analyticsData.profileAnalytics as any).contentPurchases?.toLocaleString() || '0'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Average Session Time</span>
                      <span className="text-sm font-medium">{(analyticsData.profileAnalytics as any).averageSessionTime?.toLocaleString() || '0'}s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">AI Revenue Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Chat Revenue</span>
                      <span className="text-sm font-medium">${(analyticsData.monetization as any).revenueByContentType?.chat?.toLocaleString() || '0'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Photo Revenue</span>
                      <span className="text-sm font-medium">${(analyticsData.monetization as any).revenueByContentType?.photo?.toLocaleString() || '0'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Video Revenue</span>
                      <span className="text-sm font-medium">${(analyticsData.monetization as any).revenueByContentType?.video?.toLocaleString() || '0'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Lucoins Earned</span>
                      <span className="text-sm font-medium">{(analyticsData.profileAnalytics as any).lucoinsEarned?.toLocaleString() || '0'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="escort-metrics">
            <div className="grid grid-cols-1 gap-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Real Escort Metrics</AlertTitle>
                <AlertDescription>
                  Real escort metrics are collected separately. Please visit the Escort Analytics dashboard to view detailed metrics.
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
          
          <TabsContent value="conversion">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">AI to Escort Conversion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">View Conversion Rate</span>
                      <span className="text-sm font-medium">24.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Message Conversion Rate</span>
                      <span className="text-sm font-medium">18.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Booking Conversion Rate</span>
                      <span className="text-sm font-medium">7.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Repeat Booking Rate</span>
                      <span className="text-sm font-medium">42.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Best Performing Funnels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">AI Chat → Real Profile View</span>
                      <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-full">67.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">AI Photo → Real Gallery View</span>
                      <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-full">52.1%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">AI Video → Real Booking</span>
                      <span className="text-sm font-medium bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">12.6%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">AI Message → Real Contact</span>
                      <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-full">28.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, description }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-full">
              {icon}
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-medium">{title}</p>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </div>
          <div className="text-lg font-bold">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnifiedEcosystemDashboard;
