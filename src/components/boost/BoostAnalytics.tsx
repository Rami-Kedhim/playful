
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BoostAnalytics as BoostAnalyticsType } from "@/types/pulse-boost";
import { useBoostOperations } from "@/hooks/boost/useBoostOperations";

interface BoostAnalyticsProps {
  profileId: string;
}

const BoostAnalytics: React.FC<BoostAnalyticsProps> = ({ profileId }) => {
  const { loading, getBoostAnalytics } = useBoostOperations(profileId);
  const [analytics, setAnalytics] = React.useState<BoostAnalyticsType | null>(null);

  React.useEffect(() => {
    const loadAnalytics = async () => {
      const data = await getBoostAnalytics();
      setAnalytics(data);
    };
    
    loadAnalytics();
  }, [profileId, getBoostAnalytics]);

  if (loading || !analytics) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Boost Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground">Total Views</div>
              <div className="text-2xl font-bold mt-1">{analytics.impressions?.value || 0}</div>
              <div className="text-xs text-green-600 mt-1">
                +{analytics.impressions?.change || 0}% from previous period
              </div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground">Interactions</div>
              <div className="text-2xl font-bold mt-1">{analytics.interactions?.value || 0}</div>
              <div className="text-xs text-green-600 mt-1">
                +{analytics.interactions?.change || 0}% from previous period
              </div>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground">Boost Score</div>
              <div className="text-2xl font-bold mt-1">{analytics.averageBoostScore}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Boost History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={analytics.boostHistory.map(item => ({
                  date: new Date(item.date).toLocaleDateString(),
                  score: item.score
                }))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#8b5cf6" 
                  strokeWidth={2} 
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BoostAnalytics;
