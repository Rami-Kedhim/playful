
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BoostAnalytics as BoostAnalyticsType } from '@/types/boost';

interface BoostAnalyticsProps {
  analytics: BoostAnalyticsType;
  loading?: boolean;
}

const BoostAnalytics: React.FC<BoostAnalyticsProps> = ({ 
  analytics,
  loading = false
}) => {
  // Handle loading state
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Boost Analytics</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  // Prepare data for chart
  const chartData = analytics.boostHistory.map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    score: item.score
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Boost Performance Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {analytics.totalBoosts}
                </div>
                <p className="text-xs text-muted-foreground">Total Boosts</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {analytics.activeBoosts}
                </div>
                <p className="text-xs text-muted-foreground">Active Boosts</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {analytics.averageBoostScore || 0}
                </div>
                <p className="text-xs text-muted-foreground">Average Boost Score</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Boost Score History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostAnalytics;
