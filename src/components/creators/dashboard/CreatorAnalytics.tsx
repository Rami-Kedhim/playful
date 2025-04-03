
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Area, AreaChart 
} from "recharts";
import { 
  Eye, ThumbsUp, Share2, DollarSign,
  TrendingUp, TrendingDown
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import AudienceDemographics from "./AudienceDemographics";
import TopContent from "./TopContent";

interface AnalyticsStat {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  trend: "up" | "down" | "neutral";
  color: string;
}

interface DailyAnalytics {
  date: string;
  views: number;
  likes: number;
  shares: number;
  earnings: number;
}

interface AudienceDemographics {
  age: { group: string; percentage: number }[];
  gender: { type: string; percentage: number }[];
  location: { country: string; percentage: number }[];
}

interface ContentPerformance {
  id: string;
  title: string;
  thumbnail_url: string;
  views_count: number;
  likes_count: number;
  created_at: string;
}

interface CreatorAnalyticsProps {
  analyticsHistory: DailyAnalytics[];
  demographics: AudienceDemographics;
  period: "day" | "week" | "month" | "year";
  setPeriod: React.Dispatch<React.SetStateAction<"day" | "week" | "month" | "year">>;
  loading: boolean;
  analytics: {
    views: number;
    likes: number;
    shares: number;
    earnings: number;
  };
}

const CreatorAnalytics = ({ 
  analyticsHistory, 
  demographics, 
  period, 
  setPeriod, 
  loading,
  analytics 
}: CreatorAnalyticsProps) => {
  // Calculate trend percentages (in a real app, compare with previous period)
  // For demo purposes, we'll use random trends
  const getRandomTrend = () => {
    const isUp = Math.random() > 0.3; // More likely to show up trends
    return {
      trend: isUp ? "up" as const : "down" as const,
      change: `${Math.floor(Math.random() * 30) + 1}%`,
      color: isUp ? "text-green-500" : "text-red-500"
    };
  };

  // Create stats data
  const statsData: AnalyticsStat[] = [
    {
      title: "Total Views",
      value: loading ? "-" : analytics.views.toLocaleString(),
      ...getRandomTrend(),
      icon: <Eye className="h-4 w-4" />,
    },
    {
      title: "Total Likes",
      value: loading ? "-" : analytics.likes.toLocaleString(),
      ...getRandomTrend(),
      icon: <ThumbsUp className="h-4 w-4" />,
    },
    {
      title: "Total Shares",
      value: loading ? "-" : analytics.shares.toLocaleString(),
      ...getRandomTrend(),
      icon: <Share2 className="h-4 w-4" />,
    },
    {
      title: "Total Earnings",
      value: loading ? "-" : `$${analytics.earnings.toFixed(2)}`,
      ...getRandomTrend(),
      icon: <DollarSign className="h-4 w-4" />,
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics</h2>
        <Tabs value={period} onValueChange={(value) => setPeriod(value as "day" | "week" | "month" | "year")}>
          <TabsList>
            <TabsTrigger value="week">7 Days</TabsTrigger>
            <TabsTrigger value="month">30 Days</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="p-4">
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-1/3 mb-2" />
                <Skeleton className="h-4 w-1/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  {stat.icon}
                  <span className="ml-2">{stat.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`flex items-center text-xs ${stat.color}`}>
                  {stat.trend === "up" ? 
                    <TrendingUp className="h-3 w-3 mr-1" /> : 
                    <TrendingDown className="h-3 w-3 mr-1" />
                  }
                  <span>{stat.change} from previous period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Track your content performance over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <Tabs defaultValue="views">
              <TabsList>
                <TabsTrigger value="views">Views</TabsTrigger>
                <TabsTrigger value="engagement">Engagement</TabsTrigger>
                <TabsTrigger value="earnings">Earnings</TabsTrigger>
              </TabsList>
              <TabsContent value="views" className="h-[350px] mt-4">
                {loading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsHistory}>
                      <defs>
                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="views" 
                        stroke="#6366f1" 
                        fillOpacity={1}
                        fill="url(#colorViews)"
                        name="Views"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </TabsContent>
              <TabsContent value="engagement" className="h-[350px] mt-4">
                {loading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="likes" fill="#3b82f6" name="Likes" />
                      <Bar dataKey="shares" fill="#10b981" name="Shares" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </TabsContent>
              <TabsContent value="earnings" className="h-[350px] mt-4">
                {loading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="earnings" 
                        stroke="#f59e0b" 
                        activeDot={{ r: 8 }} 
                        name="Earnings ($)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <AudienceDemographics demographics={demographics} loading={loading} />
      </div>
      
      <TopContent content={loading ? [] : []} loading={loading} />
    </div>
  );
};

export default CreatorAnalytics;
