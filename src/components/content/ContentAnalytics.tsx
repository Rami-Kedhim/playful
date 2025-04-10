
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Eye,
  Heart,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data for analytics
const generateViewsData = () => {
  const data = [];
  const now = new Date();
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      views: Math.floor(Math.random() * 50) + 10,
      likes: Math.floor(Math.random() * 20) + 5,
      earnings: Math.floor(Math.random() * 50) + 10,
    });
  }
  return data;
};

const viewsData = generateViewsData();

const generateTopPerformers = () => {
  return Array(5).fill(0).map((_, idx) => ({
    id: `content-${idx}`,
    title: `Popular Content ${idx + 1}`,
    type: idx % 2 === 0 ? 'video' : 'image',
    views: Math.floor(Math.random() * 1000) + 100,
    likes: Math.floor(Math.random() * 200) + 50,
    earnings: Math.floor(Math.random() * 100) + 20,
  }));
};

const topPerformers = generateTopPerformers();

const ContentAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState('30d');
  const [chartType, setChartType] = React.useState('views');
  
  const stats = {
    totalViews: viewsData.reduce((sum, item) => sum + item.views, 0),
    totalLikes: viewsData.reduce((sum, item) => sum + item.likes, 0),
    totalEarnings: viewsData.reduce((sum, item) => sum + item.earnings, 0),
    viewsGrowth: 12.5,
  };
  
  return (
    <div className="space-y-8">
      {/* Overview cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{stats.totalViews}</p>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Eye className="text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="text-green-500 mr-1 h-4 w-4" />
              <span className="text-green-500 font-medium">{stats.viewsGrowth}% </span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Likes</p>
                <p className="text-2xl font-bold">{stats.totalLikes}</p>
              </div>
              <div className="h-12 w-12 bg-red-500/10 rounded-full flex items-center justify-center">
                <Heart className="text-red-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="text-green-500 mr-1 h-4 w-4" />
              <span className="text-green-500 font-medium">9.2% </span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold">{stats.totalEarnings} LC</p>
              </div>
              <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <DollarSign className="text-green-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="text-green-500 mr-1 h-4 w-4" />
              <span className="text-green-500 font-medium">15.3% </span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Subscribers</p>
                <p className="text-2xl font-bold">28</p>
              </div>
              <div className="h-12 w-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                <TrendingUp className="text-purple-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="text-green-500 mr-1 h-4 w-4" />
              <span className="text-green-500 font-medium">4.1% </span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main chart */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <CardTitle>Performance Analytics</CardTitle>
            <CardDescription>Monitor your content performance metrics</CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Views" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="views">Views</SelectItem>
                <SelectItem value="likes">Likes</SelectItem>
                <SelectItem value="earnings">Earnings</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Last 30 Days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={viewsData.slice(-parseInt(timeRange))}
              margin={{
                top: 5,
                right: 20,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => {
                  const d = new Date(date);
                  return `${d.getDate()}/${d.getMonth() + 1}`;
                }}
              />
              <YAxis />
              <Tooltip 
                formatter={(value: number, name: string) => {
                  if (name === 'earnings') {
                    return [`${value} LC`, 'Earnings'];
                  }
                  return [value, name.charAt(0).toUpperCase() + name.slice(1)];
                }}
                labelFormatter={(date) => {
                  const d = new Date(date);
                  return d.toLocaleDateString();
                }}
              />
              <Line
                type="monotone"
                dataKey={chartType}
                stroke={
                  chartType === 'views' ? '#3b82f6' :
                  chartType === 'likes' ? '#ef4444' :
                  '#10b981'
                }
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Top performing content */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Content</CardTitle>
          <CardDescription>Your most popular content based on views, likes, and earnings</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="views">
            <TabsList className="mb-4">
              <TabsTrigger value="views">Views</TabsTrigger>
              <TabsTrigger value="likes">Likes</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="views">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topPerformers}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="title" 
                      tick={false}
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(idx) => {
                        return topPerformers[idx]?.title || '';
                      }}
                    />
                    <Bar dataKey="views" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-2 mt-4">
                {topPerformers.map((item, idx) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-muted flex items-center justify-center rounded-md mr-3 font-medium">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.type}</p>
                      </div>
                    </div>
                    <div className="font-medium flex items-center">
                      <Eye className="h-4 w-4 mr-2 text-muted-foreground" />
                      {item.views}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="likes">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topPerformers}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="title" 
                      tick={false}
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(idx) => {
                        return topPerformers[idx]?.title || '';
                      }}
                    />
                    <Bar dataKey="likes" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-2 mt-4">
                {topPerformers.map((item, idx) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-muted flex items-center justify-center rounded-md mr-3 font-medium">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.type}</p>
                      </div>
                    </div>
                    <div className="font-medium flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-muted-foreground" />
                      {item.likes}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="earnings">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topPerformers}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="title" 
                      tick={false}
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(idx) => {
                        return topPerformers[idx]?.title || '';
                      }}
                      formatter={(value) => [`${value} LC`, 'Earnings']}
                    />
                    <Bar dataKey="earnings" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-2 mt-4">
                {topPerformers.map((item, idx) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-muted flex items-center justify-center rounded-md mr-3 font-medium">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.type}</p>
                      </div>
                    </div>
                    <div className="font-medium flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                      {item.earnings} LC
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentAnalytics;
