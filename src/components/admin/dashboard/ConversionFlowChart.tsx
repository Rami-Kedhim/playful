
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ConversionData {
  name: string;
  ai: number;
  real: number;
}

interface ConversionFlowChartProps {
  conversionData: ConversionData[];
}

const ConversionFlowChart: React.FC<ConversionFlowChartProps> = ({ conversionData }) => {
  return (
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
  );
};

export default ConversionFlowChart;
