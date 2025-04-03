
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { 
  Eye, ArrowUpRight, ThumbsUp, Share2, DollarSign
} from "lucide-react";
import { fetchCreatorAnalytics } from "@/services/creatorService";
import { Skeleton } from "@/components/ui/skeleton";
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { useCreatorAnalytics } from "@/hooks/useCreatorAnalytics";

interface AnalyticsStat {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  trend: "up" | "down" | "neutral";
}

interface CreatorAnalyticsProps {
  creatorId: string;
}

const CreatorAnalytics = ({ creatorId }: CreatorAnalyticsProps) => {
  const [statsData, setStatsData] = useState<AnalyticsStat[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("7days");
  const { analytics } = useCreatorAnalytics(timeRange === "7days" ? "week" : timeRange === "30days" ? "month" : "year");

  useEffect(() => {
    if (creatorId) {
      loadAnalytics();
    }
  }, [creatorId, timeRange]);

  const loadAnalytics = async () => {
    setIsLoading(true);
    
    let startDate: Date;
    const endDate = endOfDay(new Date());
    
    switch (timeRange) {
      case "30days":
        startDate = startOfDay(subDays(new Date(), 30));
        break;
      case "90days":
        startDate = startOfDay(subDays(new Date(), 90));
        break;
      default: // 7days
        startDate = startOfDay(subDays(new Date(), 7));
        break;
    }
    
    const data = await fetchCreatorAnalytics(creatorId, startDate, endDate);
    
    // Process data for charts
    const formattedData = data.map((item: any) => ({
      date: format(new Date(item.date), 'MMM dd'),
      views: item.views,
      likes: item.likes,
      shares: item.shares,
      earnings: parseFloat(item.earnings)
    }));
    
    setChartData(formattedData.reverse());
    
    // Calculate summary stats
    const totalViews = data.reduce((sum: number, item: any) => sum + item.views, 0);
    const totalLikes = data.reduce((sum: number, item: any) => sum + item.likes, 0);
    const totalShares = data.reduce((sum: number, item: any) => sum + item.shares, 0);
    const totalEarnings = data.reduce((sum: number, item: any) => sum + parseFloat(item.earnings), 0);
    
    // Mock previous period data for trends (in a real app, you'd compare with actual previous period)
    const prevTotalViews = totalViews * 0.9; // assume 10% growth
    const viewsChange = totalViews > 0 ? 
      `${Math.round((totalViews - prevTotalViews) / prevTotalViews * 100)}%` : "0%";
    
    // Create stats cards data
    setStatsData([
      {
        title: "Total Views",
        value: totalViews.toLocaleString(),
        change: viewsChange,
        icon: <Eye className="h-4 w-4" />,
        trend: "up"
      },
      {
        title: "Total Likes",
        value: totalLikes.toLocaleString(),
        change: "+5%",
        icon: <ThumbsUp className="h-4 w-4" />,
        trend: "up"
      },
      {
        title: "Total Shares",
        value: totalShares.toLocaleString(),
        change: "+12%",
        icon: <Share2 className="h-4 w-4" />,
        trend: "up"
      },
      {
        title: "Total Earnings",
        value: `$${totalEarnings.toFixed(2)}`,
        change: "+8%",
        icon: <DollarSign className="h-4 w-4" />,
        trend: "up"
      }
    ]);
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics</h2>
        <Tabs value={timeRange} onValueChange={setTimeRange}>
          <TabsList>
            <TabsTrigger value="7days">7 Days</TabsTrigger>
            <TabsTrigger value="30days">30 Days</TabsTrigger>
            <TabsTrigger value="90days">90 Days</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {isLoading ? (
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
                <div className={`flex items-center text-xs ${
                  stat.trend === "up" ? "text-green-500" : 
                  stat.trend === "down" ? "text-red-500" : "text-gray-500"
                }`}>
                  {stat.trend === "up" ? <ArrowUpRight className="h-3 w-3 mr-1" /> : null}
                  <span>{stat.change} from previous period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Track your content performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="views">
              <TabsList>
                <TabsTrigger value="views">Views</TabsTrigger>
                <TabsTrigger value="engagement">Engagement</TabsTrigger>
                <TabsTrigger value="earnings">Earnings</TabsTrigger>
              </TabsList>
              <TabsContent value="views" className="h-[400px] mt-4">
                {isLoading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="views" 
                        stroke="#6366f1" 
                        activeDot={{ r: 8 }} 
                        name="Views"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </TabsContent>
              <TabsContent value="engagement" className="h-[400px] mt-4">
                {isLoading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
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
              <TabsContent value="earnings" className="h-[400px] mt-4">
                {isLoading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
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
      </div>
    </div>
  );
};

export default CreatorAnalytics;
