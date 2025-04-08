
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BoostDistributionData {
  name: string;
  ai: number;
  real: number;
}

interface BoostDistributionChartProps {
  boostDistributionData: BoostDistributionData[];
}

const BoostDistributionChart: React.FC<BoostDistributionChartProps> = ({ boostDistributionData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Boost Distribution</CardTitle>
        <CardDescription>
          AI vs Real profile boost allocation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={boostDistributionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ai" fill="#8884d8" name="AI Models" />
              <Bar dataKey="real" fill="#82ca9d" name="Real Escorts" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostDistributionChart;
