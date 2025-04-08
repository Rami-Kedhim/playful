
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PerformanceData {
  name: string;
  hermes: number;
  oxum: number;
}

interface PerformanceMetricsChartProps {
  performanceData: PerformanceData[];
}

const PerformanceMetricsChart: React.FC<PerformanceMetricsChartProps> = ({ performanceData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>
          Hermes vs Oxum engine efficiency over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="hermes" stroke="#8884d8" name="Hermes (Visibility)" />
              <Line type="monotone" dataKey="oxum" stroke="#82ca9d" name="Oxum (Fairness)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetricsChart;
