
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, LineChart, TrendingUp, Users, Zap } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AnalyticsData } from "@/components/boost/types";

interface BoostAnalyticsCardProps {
  isActive: boolean;
  getAnalytics: () => Promise<AnalyticsData | null>;
}

const BoostAnalyticsCard = ({ isActive, getAnalytics }: BoostAnalyticsCardProps) => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  
  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!isActive) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (err) {
        console.error("Error fetching boost analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalytics();
    
    // Refresh analytics every 5 minutes
    const interval = setInterval(fetchAnalytics, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [isActive, getAnalytics]);
  
  // Mock chart data for visualization
  const chartData = [
    { name: 'Day 1', views: 10 },
    { name: 'Day 2', views: 25 },
    { name: 'Day 3', views: 40 },
    { name: 'Day 4', views: 35 },
    { name: 'Day 5', views: 45 },
    { name: 'Day 6', views: 60 },
    { name: 'Day 7', views: 55 },
  ];
  
  if (!isActive) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart className="h-5 w-5 mr-2" />
            Boost Analytics
          </CardTitle>
          <CardDescription>
            Analytics will appear here when you have an active boost
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[240px] flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Zap className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>No active boost to analyze</p>
            <p className="text-sm mt-2">Boost your profile to see performance metrics</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (loading) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart className="h-5 w-5 mr-2" />
            Boost Analytics
          </CardTitle>
          <CardDescription>
            Loading boost performance data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-[200px] w-full" />
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart className="h-5 w-5 mr-2" />
          Boost Analytics
        </CardTitle>
        <CardDescription>
          Performance metrics for your active boost
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] mb-4">
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
                dataKey="views" 
                stroke="#8884d8" 
                fill="hsl(224.3 76.3% 48% / 0.5)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {analytics && (
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="flex flex-col items-center p-3 bg-secondary/20 rounded-md">
              <Users className="h-5 w-5 mb-1 text-blue-500" />
              <span className="text-2xl font-bold">{analytics.additionalViews || 0}</span>
              <span className="text-xs text-muted-foreground">additional views</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-secondary/20 rounded-md">
              <TrendingUp className="h-5 w-5 mb-1 text-green-500" />
              <span className="text-2xl font-bold">{analytics.engagementIncrease || 0}%</span>
              <span className="text-xs text-muted-foreground">engagement increase</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-secondary/20 rounded-md">
              <LineChart className="h-5 w-5 mb-1 text-purple-500" />
              <span className="text-2xl font-bold">#{analytics.rankingPosition || 0}</span>
              <span className="text-xs text-muted-foreground">ranking position</span>
            </div>
          </div>
        )}
        
        {/* Display statistics */}
        {analytics?.views && (
          <div className="mt-6">
            <h4 className="text-sm font-semibold mb-2">Views Comparison</h4>
            <div className="grid grid-cols-4 gap-2 text-center text-sm">
              <div className="p-2 bg-secondary/10 rounded">
                <p className="font-bold">{analytics.views.today}</p>
                <p className="text-xs text-muted-foreground">Today</p>
              </div>
              <div className="p-2 bg-secondary/10 rounded">
                <p className="font-bold">{analytics.views.yesterday}</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
              <div className="p-2 bg-secondary/10 rounded">
                <p className="font-bold">{analytics.views.weeklyAverage}</p>
                <p className="text-xs text-muted-foreground">Weekly Avg</p>
              </div>
              <div className="p-2 bg-secondary/10 rounded">
                <p className="font-bold">{analytics.views.withBoost}</p>
                <p className="text-xs text-muted-foreground">With Boost</p>
              </div>
            </div>
          </div>
        )}
        
        {analytics?.clicks && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-2">Click Comparison</h4>
            <div className="grid grid-cols-4 gap-2 text-center text-sm">
              <div className="p-2 bg-secondary/10 rounded">
                <p className="font-bold">{analytics.clicks.today}</p>
                <p className="text-xs text-muted-foreground">Today</p>
              </div>
              <div className="p-2 bg-secondary/10 rounded">
                <p className="font-bold">{analytics.clicks.yesterday}</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
              <div className="p-2 bg-secondary/10 rounded">
                <p className="font-bold">{analytics.clicks.weeklyAverage}</p>
                <p className="text-xs text-muted-foreground">Weekly Avg</p>
              </div>
              <div className="p-2 bg-secondary/10 rounded">
                <p className="font-bold">{analytics.clicks.withBoost}</p>
                <p className="text-xs text-muted-foreground">With Boost</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BoostAnalyticsCard;
