
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, LineChart, Line } from 'recharts';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

// Mock data
const conversionData = [
  { name: 'Jan', ai: 40, real: 24 },
  { name: 'Feb', ai: 30, real: 15 },
  { name: 'Mar', ai: 20, real: 32 },
  { name: 'Apr', ai: 27, real: 38 },
  { name: 'May', ai: 18, real: 45 },
  { name: 'Jun', ai: 23, real: 42 },
  { name: 'Jul', ai: 34, real: 35 },
];

const revenueData = [
  { name: 'Mon', ai_content: 4000, ai_boost: 3400, real_booking: 2400, real_content: 1800 },
  { name: 'Tue', ai_content: 3000, ai_boost: 2398, real_booking: 1800, real_content: 2100 },
  { name: 'Wed', ai_content: 2000, ai_boost: 1900, real_booking: 3800, real_content: 2400 },
  { name: 'Thu', ai_content: 2780, ai_boost: 1908, real_booking: 2900, real_content: 2100 },
  { name: 'Fri', ai_content: 1890, ai_boost: 2800, real_booking: 3300, real_content: 2300 },
  { name: 'Sat', ai_content: 2390, ai_boost: 3800, real_booking: 4300, real_content: 3400 },
  { name: 'Sun', ai_content: 3490, ai_boost: 4300, real_booking: 3800, real_content: 4300 },
];

const ecologyData = [
  { name: '00:00', ai_profile_views: 1400, real_escort_views: 240 },
  { name: '04:00', ai_profile_views: 800, real_escort_views: 120 },
  { name: '08:00', ai_profile_views: 1200, real_escort_views: 700 },
  { name: '12:00', ai_profile_views: 1800, real_escort_views: 1300 },
  { name: '16:00', ai_profile_views: 2400, real_escort_views: 1800 },
  { name: '20:00', ai_profile_views: 2800, real_escort_views: 1100 },
];

const UnifiedEcosystemDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Ecosystem Performance</h2>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" /> Export Data
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total AI Models
            </CardTitle>
            <CardDescription>Active profiles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,854</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Verified Escorts
            </CardTitle>
            <CardDescription>Active profiles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">743</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <CardDescription>AI to real bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.3%</div>
            <p className="text-xs text-muted-foreground">
              +2.5% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Revenue
            </CardTitle>
            <CardDescription>Combined ecosystem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$421,354</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="ecology">Ecosystem Ecology</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Flow</CardTitle>
              <CardDescription>
                AI model users converting to real escort bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={conversionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="ai" stackId="1" stroke="#8884d8" fill="#8884d8" name="AI Engagements" />
                    <Area type="monotone" dataKey="real" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Real Bookings" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>
                Revenue distribution across ecosystem components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ai_content" stackId="a" fill="#8884d8" name="AI Content" />
                    <Bar dataKey="ai_boost" stackId="a" fill="#aa84d8" name="AI Boost" />
                    <Bar dataKey="real_booking" stackId="a" fill="#82ca9d" name="Real Bookings" />
                    <Bar dataKey="real_content" stackId="a" fill="#aaca9d" name="Real Content" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ecology" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Traffic Pattern</CardTitle>
              <CardDescription>
                Hourly activity distribution between AI and real profiles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ecologyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ai_profile_views" stroke="#8884d8" name="AI Profile Views" />
                    <Line type="monotone" dataKey="real_escort_views" stroke="#82ca9d" name="Real Escort Views" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UnifiedEcosystemDashboard;
