
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { useResponsive } from '@/hooks/useMobileResponsive';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Download, TrendingUp, TrendingDown, Users, Eye, Clock, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

// Sample data - in a real app this would come from your analytics service
const pageViewsData = [
  { date: '2023-04-07', views: 420 },
  { date: '2023-04-08', views: 380 },
  { date: '2023-04-09', views: 450 },
  { date: '2023-04-10', views: 520 },
  { date: '2023-04-11', views: 550 },
  { date: '2023-04-12', views: 480 },
  { date: '2023-04-13', views: 600 }
];

const userEngagementData = [
  { date: '2023-04-07', activeUsers: 180, newUsers: 45 },
  { date: '2023-04-08', activeUsers: 165, newUsers: 38 },
  { date: '2023-04-09', activeUsers: 190, newUsers: 52 },
  { date: '2023-04-10', activeUsers: 210, newUsers: 60 },
  { date: '2023-04-11', activeUsers: 230, newUsers: 65 },
  { date: '2023-04-12', activeUsers: 205, newUsers: 58 },
  { date: '2023-04-13', activeUsers: 250, newUsers: 70 }
];

const contentDistributionData = [
  { name: 'Escorts', value: 35 },
  { name: 'Creators', value: 25 },
  { name: 'AI Companions', value: 20 },
  { name: 'Articles', value: 15 },
  { name: 'Livecams', value: 5 }
];

const COLORS = ['#8B5CF6', '#D946EF', '#1EAEDB', '#F97316', '#0EA5E9'];

const StatCard = ({ title, value, change, icon, trend }: { 
  title: string; 
  value: string | number; 
  change?: number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            
            {change !== undefined && (
              <div className="flex items-center mt-1">
                {trend === 'up' && <TrendingUp className="h-4 w-4 mr-1 text-green-500" />}
                {trend === 'down' && <TrendingDown className="h-4 w-4 mr-1 text-red-500" />}
                <span className={`text-xs ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500'}`}>
                  {change > 0 ? '+' : ''}{change}% from last week
                </span>
              </div>
            )}
          </div>
          <div className="p-2 bg-primary/10 rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export function AnalyticsDashboard() {
  const { isMobile, isTablet } = useResponsive();
  const [activeTab, setActiveTab] = useState("overview");
  
  // In a real app, this would fetch data from your analytics service
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState("7d");
  
  const handleExportData = () => {
    // In a real app, this would generate and download a report
    alert("Exporting analytics data...");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor user engagement and platform performance metrics
          </p>
        </div>
        
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button variant="outline" size="sm" className="gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span className="hidden md:inline">Date Range:</span>
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm py-0 pl-1 pr-6"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </Button>
          
          <Button size="sm" variant="outline" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Users" 
          value="8,249"
          change={12.5}
          trend="up" 
          icon={<Users className="h-5 w-5 text-primary" />} 
        />
        <StatCard 
          title="Page Views" 
          value="143,921"
          change={8.2}
          trend="up" 
          icon={<Eye className="h-5 w-5 text-primary" />} 
        />
        <StatCard 
          title="Avg. Session Time" 
          value="8m 24s"
          change={-2.1}
          trend="down" 
          icon={<Clock className="h-5 w-5 text-primary" />} 
        />
        <StatCard 
          title="Total Messages" 
          value="29,842"
          change={15.3}
          trend="up" 
          icon={<MessageSquare className="h-5 w-5 text-primary" />} 
        />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Page Views</CardTitle>
                <CardDescription>Daily page views over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pageViewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => format(new Date(value), 'MMM dd')}
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(value) => format(new Date(value), 'MMM dd, yyyy')}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="views" 
                      name="Page Views"
                      stroke="#8B5CF6" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Content Distribution</CardTitle>
                <CardDescription>Content types breakdown</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={contentDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {contentDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`${value}%`, 'Percentage']}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>Active and new users over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => format(new Date(value), 'MMM dd')}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => format(new Date(value), 'MMM dd, yyyy')}
                  />
                  <Legend />
                  <Bar dataKey="activeUsers" name="Active Users" fill="#8B5CF6" />
                  <Bar dataKey="newUsers" name="New Users" fill="#D946EF" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                User engagement metrics show {userEngagementData.slice(-1)[0].activeUsers} active users in the last day.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Analytics</CardTitle>
              <CardDescription>Detailed user metrics and demographics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Select the Users tab to view detailed user analytics and demographic information.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Analytics</CardTitle>
              <CardDescription>Content performance and engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Select the Content tab to analyze how users engage with different types of content.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Application performance and error tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Select the Performance tab to monitor system health and error rates.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AnalyticsDashboard;
