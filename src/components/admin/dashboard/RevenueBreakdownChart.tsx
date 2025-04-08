
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RevenueData {
  name: string;
  ai_content: number;
  ai_boost: number;
  real_booking: number;
  real_content: number;
}

interface RevenueBreakdownChartProps {
  revenueData: RevenueData[];
}

const RevenueBreakdownChart: React.FC<RevenueBreakdownChartProps> = ({ revenueData }) => {
  return (
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
  );
};

export default RevenueBreakdownChart;
