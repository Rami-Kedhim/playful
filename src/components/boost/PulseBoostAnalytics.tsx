
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2, TrendingUp, Users, Zap } from 'lucide-react';

interface PulseBoostAnalyticsProps {
  profileId?: string;
  boostActive: boolean;
  isLoading?: boolean;
}

const PulseBoostAnalytics: React.FC<PulseBoostAnalyticsProps> = ({ 
  profileId, 
  boostActive, 
  isLoading = false 
}) => {
  // Simulated data - in a real app, you'd fetch this from your backend
  const viewsData = [
    { name: 'Mon', withBoost: 42, withoutBoost: 18 },
    { name: 'Tue', withBoost: 51, withoutBoost: 22 },
    { name: 'Wed', withBoost: 68, withoutBoost: 28 },
    { name: 'Thu', withBoost: 49, withoutBoost: 21 },
    { name: 'Fri', withBoost: 72, withoutBoost: 30 },
    { name: 'Sat', withBoost: 94, withoutBoost: 41 },
    { name: 'Sun', withBoost: 86, withoutBoost: 37 },
  ];
  
  const engagementData = [
    { name: 'Mon', withBoost: 12, withoutBoost: 5 },
    { name: 'Tue', withBoost: 19, withoutBoost: 8 },
    { name: 'Wed', withBoost: 23, withoutBoost: 10 },
    { name: 'Thu', withBoost: 17, withoutBoost: 7 },
    { name: 'Fri', withBoost: 28, withoutBoost: 12 },
    { name: 'Sat', withBoost: 32, withoutBoost: 14 },
    { name: 'Sun', withBoost: 29, withoutBoost: 13 },
  ];
  
  const rankData = [
    { name: 'Mon', position: 85 },
    { name: 'Tue', position: 68 },
    { name: 'Wed', position: 52 },
    { name: 'Thu', position: 43 },
    { name: 'Fri', position: 31 },
    { name: 'Sat', position: 24 },
    { name: 'Sun', position: 18 },
  ];
  
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 flex items-center justify-center min-h-[300px]">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Loading analytics...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!profileId) {
    return (
      <Card>
        <CardContent className="p-6 flex items-center justify-center min-h-[300px]">
          <p className="text-sm text-muted-foreground">No profile selected</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>PULSE Boost Analytics</CardTitle>
        <CardDescription>
          {boostActive 
            ? "Track how your active boost is improving your visibility and engagement" 
            : "See the potential impact of boosting your profile"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="views" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="views" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Views
            </TabsTrigger>
            <TabsTrigger value="engagement" className="flex items-center">
              <TrendingUp className="mr-2 h-4 w-4" />
              Engagement
            </TabsTrigger>
            <TabsTrigger value="rank" className="flex items-center">
              <Zap className="mr-2 h-4 w-4" />
              Rank
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="views" className="space-y-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={viewsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="withBoost" name="With Boost" fill="#3b82f6" />
                  <Bar dataKey="withoutBoost" name="Without Boost" fill="#94a3b8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              On average, boosted profiles receive 130% more views
            </p>
          </TabsContent>
          
          <TabsContent value="engagement" className="space-y-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="withBoost" name="With Boost" fill="#8b5cf6" />
                  <Bar dataKey="withoutBoost" name="Without Boost" fill="#94a3b8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Boosted profiles receive 123% more interactions on average
            </p>
          </TabsContent>
          
          <TabsContent value="rank" className="space-y-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rankData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis reversed domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="position" name="Rank Position" fill="#ec4899" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Lower is better - see how your ranking improves with boosting
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PulseBoostAnalytics;
