
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface EcologyData {
  name: string;
  ai_profile_views: number;
  real_escort_views: number;
}

interface DailyTrafficChartProps {
  ecologyData: EcologyData[];
}

const DailyTrafficChart: React.FC<DailyTrafficChartProps> = ({ ecologyData }) => {
  return (
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
  );
};

export default DailyTrafficChart;
