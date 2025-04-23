
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, LineChart, TrendingUp, Users, Zap } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";

interface PulseBoostAnalyticsProps {
  profileId?: string;
  boostActive?: boolean;
  isLoading?: boolean;
}

interface AnalyticsData {
  impressions: number[];
  interactions: number[];
  rankImprovements: number[];
  dates: string[];
}

const PulseBoostAnalytics: React.FC<PulseBoostAnalyticsProps> = ({ 
  profileId, 
  boostActive = false,
  isLoading = false
}) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(isLoading);
  
  useEffect(() => {
    if (!profileId) {
      setLoading(false);
      return;
    }
    
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        // This is mock data - in a real app, you'd fetch from an API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockData: AnalyticsData = {
          impressions: [10, 45, 60, 120, 80, 140, 180],
          interactions: [5, 15, 20, 35, 25, 40, 55],
          rankImprovements: [0, 5, 8, 12, 15, 20, 25],
          dates: [
            'Apr 17', 'Apr 18', 'Apr 19', 'Apr 20', 
            'Apr 21', 'Apr 22', 'Apr 23'
          ]
        };
        
        setData(mockData);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalytics();
  }, [profileId]);
  
  // Transform data for charts
  const getChartData = () => {
    if (!data) return [];
    
    return data.dates.map((date, index) => ({
      name: date,
      impressions: data.impressions[index],
      interactions: data.interactions[index],
      rankImprovements: data.rankImprovements[index],
    }));
  };
  
  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Loading analytics data...</CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[240px] w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!data || !boostActive) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>
              {!boostActive 
                ? "Analytics will be available once you have an active boost" 
                : "No analytics data available"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center text-muted-foreground">
              <Zap className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p className="font-medium">No boost data to analyze</p>
              <p className="text-sm mt-2">
                {!boostActive 
                  ? "Activate a boost to see how it impacts your profile visibility" 
                  : "Check back soon for your boost analytics"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const chartData = getChartData();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Visibility Analytics</CardTitle>
          <CardDescription>
            Track how boosting impacts your profile's performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="impressions" 
                  stroke="#8884d8" 
                  fill="hsl(224.3 76.3% 48% / 0.5)" 
                  name="Impressions"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              Total Impressions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.impressions.reduce((sum, val) => sum + val, 0)}
            </div>
            <p className="text-xs text-muted-foreground">In the last 7 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Engagement Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((data.interactions.reduce((sum, val) => sum + val, 0) / 
                data.impressions.reduce((sum, val) => sum + val, 0)) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Profile interactions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <LineChart className="h-4 w-4 text-purple-500" />
              Rank Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{data.rankImprovements[data.rankImprovements.length - 1]}
            </div>
            <p className="text-xs text-muted-foreground">Positions gained</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PulseBoostAnalytics;
