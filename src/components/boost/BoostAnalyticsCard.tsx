
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { AlertCircle, RefreshCw, TrendingUp, Eye, MousePointer, BarChart4 } from "lucide-react";
import { AnalyticsData } from '@/components/boost/types';

interface BoostAnalyticsCardProps {
  isActive: boolean;
  getAnalytics: () => Promise<AnalyticsData | null>;
}

const BoostAnalyticsCard: React.FC<BoostAnalyticsCardProps> = ({ isActive, getAnalytics }) => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState('7d'); // 1d, 7d, 30d
  const [activeTab, setActiveTab] = useState('views');

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getViewsChartData = () => {
    // Sample data if analytics not available
    if (!analytics) return [];

    // Generate sample data based on time range
    const days = timeRange === '1d' ? 1 : timeRange === '7d' ? 7 : 30;
    const data = [];
    
    // Initialize with some base data
    const baseWithBoost = analytics.views?.withBoost || 0;
    const baseWithoutBoost = analytics.views?.withoutBoost || 0;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Add some randomness to make the chart more interesting
      const withBoostRandom = Math.random() * 0.3 + 0.85; // 0.85 - 1.15
      const withoutBoostRandom = Math.random() * 0.3 + 0.85; // 0.85 - 1.15
      
      data.push({
        date: date.toLocaleDateString(),
        withBoost: Math.round(baseWithBoost * withBoostRandom),
        withoutBoost: Math.round(baseWithoutBoost * withoutBoostRandom)
      });
    }
    
    return data;
  };

  const getClicksChartData = () => {
    // Sample data if analytics not available
    if (!analytics) return [];

    // Generate sample data based on time range
    const days = timeRange === '1d' ? 1 : timeRange === '7d' ? 7 : 30;
    const data = [];
    
    // Initialize with some base data
    const baseWithBoost = analytics.clicks?.withBoost || 0;
    const baseWithoutBoost = analytics.clicks?.withoutBoost || 0;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Add some randomness to make the chart more interesting
      const withBoostRandom = Math.random() * 0.3 + 0.85; // 0.85 - 1.15
      const withoutBoostRandom = Math.random() * 0.3 + 0.85; // 0.85 - 1.15
      
      data.push({
        date: date.toLocaleDateString(),
        withBoost: Math.round(baseWithBoost * withBoostRandom),
        withoutBoost: Math.round(baseWithoutBoost * withoutBoostRandom)
      });
    }
    
    return data;
  };

  const AnalyticsStat = ({ 
    icon, 
    label, 
    value, 
    change 
  }: { 
    icon: React.ReactNode, 
    label: string, 
    value: string | number, 
    change?: string | number 
  }) => (
    <div className="p-4 bg-muted/40 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium">{label}</span>
        </div>
        {change && (
          <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-1.5 py-0.5 rounded">
            +{change}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold mt-2">{value}</div>
    </div>
  );

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Boost Analytics</CardTitle>
          <CardDescription>
            Loading analytics data...
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[300px] flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
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
            Performance metrics for your boosted profile
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[300px] flex flex-col items-center justify-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-medium text-lg">No analytics data available</h3>
          <p className="text-muted-foreground text-center mt-1 mb-4">
            {isActive 
              ? "Your boost is active, but data is still being collected."
              : "Boost your profile to see analytics data."
            }
          </p>
          <Button onClick={loadAnalytics} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Boost Analytics</CardTitle>
            <CardDescription>
              Performance metrics for your boosted profile
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={timeRange}
              onValueChange={setTimeRange}
            >
              <SelectTrigger className="w-[100px] h-8">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1d">24 hours</SelectItem>
                <SelectItem value="7d">7 days</SelectItem>
                <SelectItem value="30d">30 days</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={loadAnalytics}
              className="h-8 w-8"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AnalyticsStat 
              icon={<Eye className="h-4 w-4 text-blue-500" />}
              label="Additional Views" 
              value={analytics.additionalViews || 0}
              change={15}
            />
            
            <AnalyticsStat 
              icon={<TrendingUp className="h-4 w-4 text-green-500" />}
              label="Engagement Increase" 
              value={`${analytics.engagementIncrease || analytics.engagementRate}%`}
            />
            
            <AnalyticsStat 
              icon={<BarChart4 className="h-4 w-4 text-purple-500" />}
              label="Ranking Position" 
              value={`#${analytics.rankingPosition || 1}`}
              change={4}
            />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="views" className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                Views
              </TabsTrigger>
              <TabsTrigger value="clicks" className="flex items-center gap-1">
                <MousePointer className="h-3 w-3" />
                Clicks
              </TabsTrigger>
            </TabsList>
            
            {activeTab === "views" && (
              <>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={getViewsChartData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="withBoost" 
                        name="With Boost" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="withoutBoost" 
                        name="Without Boost" 
                        stroke="#94a3b8"
                        strokeWidth={2} 
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted/30 p-3 rounded-md">
                    <p className="text-xs text-muted-foreground">Today</p>
                    <p className="text-lg font-semibold mt-1">
                      {analytics.views?.today || 0}
                    </p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                    <p className="text-lg font-semibold mt-1">
                      {analytics.views?.yesterday || 0}
                    </p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <p className="text-xs text-muted-foreground">Weekly Avg</p>
                    <p className="text-lg font-semibold mt-1">
                      {analytics.views?.weeklyAverage || 0}
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-900 p-3 rounded-md">
                    <p className="text-xs text-green-600 dark:text-green-400">With Boost</p>
                    <p className="text-lg font-semibold mt-1 text-green-700 dark:text-green-300">
                      {analytics.views?.withBoost || 0}
                    </p>
                  </div>
                </div>
              </>
            )}
            
            {activeTab === "clicks" && (
              <>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={getClicksChartData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="withBoost" 
                        name="With Boost" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="withoutBoost" 
                        name="Without Boost" 
                        stroke="#94a3b8"
                        strokeWidth={2} 
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted/30 p-3 rounded-md">
                    <p className="text-xs text-muted-foreground">Today</p>
                    <p className="text-lg font-semibold mt-1">
                      {analytics.clicks?.today || 0}
                    </p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                    <p className="text-lg font-semibold mt-1">
                      {analytics.clicks?.yesterday || 0}
                    </p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <p className="text-xs text-muted-foreground">Weekly Avg</p>
                    <p className="text-lg font-semibold mt-1">
                      {analytics.clicks?.weeklyAverage || 0}
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-900 p-3 rounded-md">
                    <p className="text-xs text-green-600 dark:text-green-400">With Boost</p>
                    <p className="text-lg font-semibold mt-1 text-green-700 dark:text-green-300">
                      {analytics.clicks?.withBoost || 0}
                    </p>
                  </div>
                </div>
              </>
            )}
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostAnalyticsCard;
