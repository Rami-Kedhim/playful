
import { Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, TrendingUp, DollarSign, Play } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import AnalyticsSummary from "./AnalyticsSummary";
import AudienceDemographics from "./AudienceDemographics";
import { AnalyticsStat } from "./AnalyticsSummary";

export interface CreatorAnalyticsProps {
  analyticsData: {
    views: number;
    likes: number;
    shares: number;
    earnings: number;
  };
  analyticsHistory: {
    date: string;
    views: number;
    likes: number;
    shares: number;
    earnings: number;
  }[];
  demographics: {
    age: { group: string; percentage: number }[];
    gender: { type: string; percentage: number }[];
    location: { country: string; percentage: number }[];
  };
  period: 'week' | 'month' | 'year';
  setPeriod: Dispatch<SetStateAction<'week' | 'month' | 'year'>>;
  loading: boolean;
}

const CreatorAnalytics = ({ 
  analyticsData, 
  analyticsHistory, 
  demographics, 
  period, 
  setPeriod,
  loading 
}: CreatorAnalyticsProps) => {
  
  const analyticsStats: AnalyticsStat[] = [
    {
      title: "Total Views",
      value: analyticsData.views.toLocaleString(),
      icon: <Play className="h-4 w-4" />,
      trend: "up" as const, // Explicitly type as const
      change: "12%",
      color: "text-green-500"
    },
    {
      title: "Engagement",
      value: analyticsData.likes.toLocaleString(),
      icon: <TrendingUp className="h-4 w-4" />,
      trend: "up" as const, // Explicitly type as const
      change: "8%",
      color: "text-green-500"
    },
    {
      title: "Shares",
      value: analyticsData.shares.toLocaleString(),
      icon: <Users className="h-4 w-4" />,
      trend: "up" as const, // Explicitly type as const
      change: "5%",
      color: "text-green-500"
    },
    {
      title: "Earnings",
      value: `$${analyticsData.earnings.toLocaleString()}`,
      icon: <DollarSign className="h-4 w-4" />,
      trend: "up" as const, // Explicitly type as const
      change: "15%",
      color: "text-green-500"
    }
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics Overview</CardTitle>
        <CardDescription>Track your performance and audience engagement</CardDescription>
        <div className="flex justify-end mt-2">
          <Tabs value={period} onValueChange={(v) => setPeriod(v as 'week' | 'month' | 'year')}>
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <AnalyticsSummary stats={analyticsStats} loading={loading} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                  <CardDescription>Your content performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="h-[300px] flex items-center justify-center">
                      <p>Loading chart data...</p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={analyticsHistory}>
                        <defs>
                          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="views" 
                          stroke="#8884d8" 
                          fillOpacity={1} 
                          fill="url(#colorViews)" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="likes" 
                          stroke="#82ca9d" 
                          fillOpacity={1} 
                          fill="url(#colorLikes)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </div>
            <div>
              <AudienceDemographics demographics={demographics} loading={loading} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatorAnalytics;
