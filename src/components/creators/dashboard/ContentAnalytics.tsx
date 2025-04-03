
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Heart, DollarSign, TrendingUp } from "lucide-react";

// Mock data - in a real app, this would come from an API
const generateMockData = (period: string) => {
  const data = [];
  const now = new Date();
  const multiplier = period === 'week' ? 7 : period === 'month' ? 30 : 90;
  
  for (let i = 0; i < multiplier; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.unshift({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      views: Math.floor(Math.random() * 100) + 10,
      likes: Math.floor(Math.random() * 30) + 5,
      revenue: parseFloat((Math.random() * 25 + 5).toFixed(2)),
    });
  }
  
  // For week and month, group by day; for quarter, group by week
  if (period === 'quarter') {
    const weeklyData = [];
    for (let i = 0; i < data.length; i += 7) {
      const weekData = data.slice(i, i + 7);
      const weekStart = weekData[0].date;
      const weekEnd = weekData[weekData.length - 1].date;
      
      weeklyData.push({
        date: `${weekStart} - ${weekEnd}`,
        views: weekData.reduce((sum, day) => sum + day.views, 0),
        likes: weekData.reduce((sum, day) => sum + day.likes, 0),
        revenue: parseFloat(weekData.reduce((sum, day) => sum + day.revenue, 0).toFixed(2)),
      });
    }
    return weeklyData;
  }
  
  return data;
};

// Summary stats cards
const StatCard = ({ title, value, icon, description, trend }: { 
  title: string, 
  value: string | number, 
  icon: React.ReactNode,
  description?: string,
  trend?: number
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div className="p-2 bg-primary/10 rounded-full">
            {icon}
          </div>
        </div>
        {(description || trend !== undefined) && (
          <div className="mt-3 flex items-center">
            {trend !== undefined && (
              <span className={`text-xs font-medium flex items-center ${
                trend >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                <TrendingUp className="h-3 w-3 mr-1" />
                {trend > 0 ? '+' : ''}{trend}%
              </span>
            )}
            {description && (
              <span className="text-xs text-muted-foreground ml-auto">
                {description}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const ContentAnalytics = () => {
  const [period, setPeriod] = useState('week');
  const [metric, setMetric] = useState('views');
  
  const data = generateMockData(period);
  
  // Calculate summary stats
  const totalViews = data.reduce((sum, day) => sum + day.views, 0);
  const totalLikes = data.reduce((sum, day) => sum + day.likes, 0);
  const totalRevenue = data.reduce((sum, day) => sum + day.revenue, 0).toFixed(2);
  
  // Calculate engagement rate (likes / views)
  const engagementRate = totalViews ? ((totalLikes / totalViews) * 100).toFixed(1) : '0.0';
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div>
            <CardTitle>Content Analytics</CardTitle>
            <CardDescription>Track the performance of your content</CardDescription>
          </div>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Past Week</SelectItem>
              <SelectItem value="month">Past Month</SelectItem>
              <SelectItem value="quarter">Past Quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total Views" 
            value={totalViews.toLocaleString()} 
            icon={<Eye className="h-5 w-5 text-primary" />}
            trend={8}
            description="vs previous period"
          />
          <StatCard 
            title="Total Likes" 
            value={totalLikes.toLocaleString()} 
            icon={<Heart className="h-5 w-5 text-rose-500" />}
            trend={12}
            description="vs previous period"
          />
          <StatCard 
            title="Engagement Rate" 
            value={`${engagementRate}%`} 
            icon={<TrendingUp className="h-5 w-5 text-emerald-500" />}
            trend={-2}
            description="vs previous period"
          />
          <StatCard 
            title="Revenue" 
            value={`$${totalRevenue}`} 
            icon={<DollarSign className="h-5 w-5 text-amber-500" />}
            trend={15}
            description="vs previous period"
          />
        </div>
        
        <Tabs defaultValue="views" value={metric} onValueChange={setMetric}>
          <TabsList className="mb-4">
            <TabsTrigger value="views">Views</TabsTrigger>
            <TabsTrigger value="likes">Likes</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 25,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70} 
                  tick={{ fontSize: 12 }} 
                />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => {
                    // Fix: Convert the name parameter to string before using string methods
                    const nameStr = String(name);
                    const displayName = nameStr.charAt(0).toUpperCase() + nameStr.slice(1);
                    return [
                      metric === 'revenue' ? `$${value}` : value, 
                      displayName
                    ];
                  }}
                />
                <Bar 
                  dataKey={metric} 
                  fill={
                    metric === 'views' ? "#9b87f5" : 
                    metric === 'likes' ? "#ec4899" : 
                    "#eab308"
                  } 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContentAnalytics;
