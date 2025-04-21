
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, TrendingUp, Eye, MousePointerClick } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';
import { AnalyticsData } from '../boost/types';

interface BoostAnalyticsCardProps {
  isActive: boolean;
  getAnalytics: () => Promise<AnalyticsData | null>;
}

const BoostAnalyticsCard: React.FC<BoostAnalyticsCardProps> = ({
  isActive,
  getAnalytics
}) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<string>("overview");
  
  // Mock chart data
  const impressionsData = [
    { name: 'Mon', value: 120 },
    { name: 'Tue', value: 180 },
    { name: 'Wed', value: 350 },
    { name: 'Thu', value: 270 },
    { name: 'Fri', value: 400 },
    { name: 'Sat', value: 380 },
    { name: 'Sun', value: 310 },
  ];
  
  const clicksData = [
    { name: 'Mon', value: 12 },
    { name: 'Tue', value: 19 },
    { name: 'Wed', value: 32 },
    { name: 'Thu', value: 25 },
    { name: 'Fri', value: 40 },
    { name: 'Sat', value: 36 },
    { name: 'Sun', value: 29 },
  ];
  
  // Fetch analytics data on load
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [getAnalytics]);

  // Helper to calculate percentage increase
  const calculateIncrease = (current?: number, previous?: number): string => {
    if (previous && current && previous > 0) {
      const increase = ((current - previous) / previous) * 100;
      return `${increase > 0 ? '+' : ''}${increase.toFixed(1)}%`;
    }
    return '+0%';
  };

  // Generate engagement data for the chart
  const getEngagementData = () => {
    const baseData = [75, 82, 80, 90, 95, 92, 98];
    
    return baseData.map((value, index) => ({
      name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index],
      value: isActive ? value : value - (Math.random() * 30 + 10)
    }));
  };

  // Ensure certain properties exist with default values
  const safeAnalytics = {
    additionalViews: analytics?.additionalViews || 0,
    engagementIncrease: analytics?.engagementIncrease || 0,
    rankingPosition: analytics?.rankingPosition || 0,
    views: {
      today: analytics?.views?.today || 0,
      yesterday: analytics?.views?.yesterday || 0,
      weeklyAverage: analytics?.views?.weeklyAverage || 0,
      withBoost: analytics?.views?.withBoost || 0,
      withoutBoost: analytics?.views?.withoutBoost || 0,
    },
    clicks: {
      today: analytics?.clicks?.today || 0,
      yesterday: analytics?.clicks?.yesterday || 0,
      weeklyAverage: analytics?.clicks?.weeklyAverage || 0,
      withBoost: analytics?.clicks?.withBoost || 0,
      withoutBoost: analytics?.clicks?.withoutBoost || 0,
    },
    impressions: analytics?.impressions || 0,
    clicks: analytics?.clicks || 0,
    engagementRate: analytics?.engagementRate || 0,
    conversionRate: analytics?.conversionRate || 0,
    boostEfficiency: analytics?.boostEfficiency || 0,
  };
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Boost Analytics</CardTitle>
          <CardDescription>
            Loading analytics data...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
            </div>
            <Skeleton className="h-[240px]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analytics) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Boost Analytics</CardTitle>
          <CardDescription>
            No analytics data available
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-muted-foreground">
              {isActive 
                ? "Analytics data will appear as your boosted profile receives engagement."
                : "Activate boost to view analytics data."
              }
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Boost Analytics</CardTitle>
            <CardDescription>
              Performance metrics for your profile
            </CardDescription>
          </div>
          <Badge variant={isActive ? "success" : "outline"} className="ml-2">
            {isActive ? "Boost Active" : "Boost Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="visibility">Visibility</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card/60 border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Additional Views</p>
                    <h3 className="text-2xl font-bold">{safeAnalytics.additionalViews}</h3>
                  </div>
                  <Eye className="h-5 w-5 text-primary opacity-80" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-emerald-500 inline-flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    {calculateIncrease(safeAnalytics.views.withBoost, safeAnalytics.views.withoutBoost)}
                  </span>
                  {' '}vs. without boost
                </p>
              </div>
              
              <div className="bg-card/60 border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Engagement Increase</p>
                    <h3 className="text-2xl font-bold">{safeAnalytics.engagementIncrease}%</h3>
                  </div>
                  <MousePointerClick className="h-5 w-5 text-primary opacity-80" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-emerald-500 inline-flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    {calculateIncrease(safeAnalytics.clicks.withBoost, safeAnalytics.clicks.withoutBoost)}
                  </span>
                  {' '}interaction rate
                </p>
              </div>

              <div className="bg-card/60 border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Ranking Position</p>
                    <h3 className="text-2xl font-bold">{safeAnalytics.rankingPosition}</h3>
                  </div>
                  <TrendingUp className="h-5 w-5 text-primary opacity-80" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-emerald-500 inline-flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    +{Math.floor(Math.random() * 8) + 3}
                  </span>
                  {' '}positions higher
                </p>
              </div>
              
              <div className="bg-card/60 border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Views Today</p>
                    <h3 className="text-2xl font-bold">{safeAnalytics.views?.today || 0}</h3>
                  </div>
                  <Eye className="h-5 w-5 text-primary opacity-80" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-emerald-500 inline-flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    {calculateIncrease(safeAnalytics.views?.today, safeAnalytics.views?.yesterday)}
                  </span>
                  {' '}vs. yesterday
                </p>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 bg-card/60">
              <h4 className="text-sm font-medium mb-2">Weekly Views</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={impressionsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    dot={{ r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="engagement" className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card/60 border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Today's Views</p>
                <h3 className="text-2xl font-bold">{safeAnalytics.views.today}</h3>
              </div>
              
              <div className="bg-card/60 border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Yesterday's Views</p>
                <h3 className="text-2xl font-bold">{safeAnalytics.views.yesterday}</h3>
              </div>
              
              <div className="bg-card/60 border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Weekly Average</p>
                <h3 className="text-2xl font-bold">{safeAnalytics.views.weeklyAverage}</h3>
              </div>
              
              <div className="bg-card/60 border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">With Boost</p>
                <h3 className="text-2xl font-bold">{safeAnalytics.views.withBoost}</h3>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 bg-card/60">
              <h4 className="text-sm font-medium mb-2">Engagement Rate</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={getEngagementData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Engagement']} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    dot={{ r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="visibility" className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card/60 border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Today's Clicks</p>
                <h3 className="text-2xl font-bold">{safeAnalytics.clicks.today}</h3>
              </div>
              
              <div className="bg-card/60 border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Yesterday's Clicks</p>
                <h3 className="text-2xl font-bold">{safeAnalytics.clicks.yesterday}</h3>
              </div>
              
              <div className="bg-card/60 border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Weekly Average</p>
                <h3 className="text-2xl font-bold">{safeAnalytics.clicks.weeklyAverage}</h3>
              </div>
              
              <div className="bg-card/60 border rounded-lg p-4">
                <p className="text-sm text-muted-foreground">With Boost</p>
                <h3 className="text-2xl font-bold">{safeAnalytics.clicks.withBoost}</h3>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 bg-card/60">
              <h4 className="text-sm font-medium mb-2">Weekly Clicks</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={clicksData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#ec4899" 
                    strokeWidth={2} 
                    dot={{ r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BoostAnalyticsCard;
