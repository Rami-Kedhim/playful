
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Eye, Calendar, DollarSign, TrendingUp, MessageSquare, Clock, Users } from "lucide-react";
import { useEscortProfileAnalytics } from '@/hooks/escort/useEscortProfileAnalytics';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface EscortAnalyticsProps {
  escortId: string;
}

const EscortAnalytics: React.FC<EscortAnalyticsProps> = ({ escortId }) => {
  const { analytics, loading, timeframe, setTimeframe } = useEscortProfileAnalytics(escortId);
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>Loading performance data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
            <Skeleton className="h-64 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!analytics) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-6">
          <p className="text-muted-foreground text-center">
            Analytics data is currently unavailable for this profile.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const viewsData = analytics.views.weekly.map((value, index) => ({ name: days[index], value }));
  const bookingsData = analytics.bookings.weekly.map((value, index) => ({ name: days[index], value }));
  const revenueData = analytics.revenue.weekly.map((value, index) => ({ name: days[index], value }));
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const servicesData = analytics.popularServices.map(service => ({
    name: service.name,
    value: service.bookings
  }));
  
  const StatCard = ({ title, value, change, icon: Icon }: { 
    title: string; 
    value: string | number;
    change?: number;
    icon: React.ElementType;
  }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Icon className="h-5 w-5 text-muted-foreground" />
          <div className={`text-xs px-2 py-1 rounded-full ${
            change === undefined ? 'bg-muted text-muted-foreground' : 
            change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {change !== undefined ? `${change >= 0 ? '+' : ''}${change}%` : 'N/A'}
          </div>
        </div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs text-muted-foreground mt-1">{title}</div>
      </CardContent>
    </Card>
  );
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Performance Analytics</CardTitle>
            <CardDescription>Track profile engagement and revenue</CardDescription>
          </div>
          <div className="space-x-2">
            <Button 
              size="sm" 
              variant={timeframe === 'week' ? "default" : "outline"}
              onClick={() => setTimeframe('week')}
            >
              Week
            </Button>
            <Button 
              size="sm" 
              variant={timeframe === 'month' ? "default" : "outline"}
              onClick={() => setTimeframe('month')}
            >
              Month
            </Button>
            <Button 
              size="sm" 
              variant={timeframe === 'year' ? "default" : "outline"}
              onClick={() => setTimeframe('year')}
            >
              Year
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard 
              title="Profile Views" 
              value={analytics.views.total} 
              change={analytics.views.change}
              icon={Eye} 
            />
            <StatCard 
              title="Total Bookings" 
              value={analytics.bookings.total} 
              change={analytics.bookings.change}
              icon={Calendar} 
            />
            <StatCard 
              title="Total Revenue" 
              value={`$${analytics.revenue.total}`} 
              change={analytics.revenue.change}
              icon={DollarSign} 
            />
            <StatCard 
              title="Ranking" 
              value={`#${analytics.ranking.position}`} 
              change={analytics.ranking.change}
              icon={TrendingUp} 
            />
          </div>
          
          {/* Detailed Analytics */}
          <Tabs defaultValue="views" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="views">Views & Engagement</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
            </TabsList>
            
            <TabsContent value="views" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Views Trend</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={viewsData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Engagement Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Message Rate</span>
                      </div>
                      <span className="font-medium">{analytics.engagement.messageRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Response Time</span>
                      </div>
                      <span className="font-medium">{analytics.engagement.responseTime} min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Client Retention</span>
                      </div>
                      <span className="font-medium">{analytics.engagement.clientRetention}%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="bookings">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Bookings Trend</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={bookingsData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Top Services</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={servicesData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {servicesData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="revenue">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Revenue Trend</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={revenueData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                          <Bar dataKey="value" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md">Revenue Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Average Per Booking</div>
                      <span className="font-medium">${analytics.revenue.averagePerBooking}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Completion Rate</div>
                      <span className="font-medium">{analytics.bookings.completionRate}%</span>
                    </div>
                    <Card className="bg-muted">
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground">Projected Monthly</div>
                        <div className="text-xl font-bold">
                          ${(analytics.revenue.total * 4).toLocaleString()}
                        </div>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default EscortAnalytics;
