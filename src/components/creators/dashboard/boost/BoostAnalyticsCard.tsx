
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AnalyticsData } from '@/types/pulse-boost';

interface BoostAnalyticsCardProps {
  data: AnalyticsData | null;
  loading: boolean;
}

const BoostAnalyticsCard: React.FC<BoostAnalyticsCardProps> = ({
  data,
  loading
}) => {
  // Safely access nested properties or provide defaults
  const impressionsValue = data?.impressions && typeof data.impressions === 'object' ? 
    data.impressions.value || 0 : (typeof data?.impressions === 'number' ? data.impressions : 0);
  
  const impressionsChange = data?.impressions && typeof data.impressions === 'object' ? 
    data.impressions.change || 0 : 0;

  const interactionsValue = data?.interactions && typeof data.interactions === 'object' ? 
    data.interactions.value || 0 : (typeof data?.interactions === 'number' ? data.interactions : 0);
  
  const interactionsChange = data?.interactions && typeof data.interactions === 'object' ? 
    data.interactions.change || 0 : 0;

  // Create sample data for charts if we don't have real data
  const sampleData = [
    { name: 'Day 1', value: 40 },
    { name: 'Day 2', value: 30 },
    { name: 'Day 3', value: 20 },
    { name: 'Day 4', value: 27 },
    { name: 'Day 5', value: 18 },
    { name: 'Day 6', value: 23 },
    { name: 'Day 7', value: 34 },
  ];

  // Get the right color class for changes
  const getChangeColorClass = (change?: number) => {
    if (!change) return 'text-gray-500';
    return change > 0 ? 'text-green-500' : 'text-red-500';
  };

  // Format change with plus/minus sign
  const formatChange = (change?: number) => {
    if (change === undefined || change === null) return '';
    return `${change > 0 ? '+' : ''}${change}%`;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>Loading analytics data...</CardDescription>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center">
          <div className="animate-pulse w-full h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Boost Analytics</CardTitle>
        <CardDescription>How your profile is performing with boost</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Impressions</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold">{impressionsValue}</span>
              <span className={getChangeColorClass(impressionsChange)}>
                {formatChange(impressionsChange)}
              </span>
            </div>
            <div className="h-36 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.impressions?.valueOf || sampleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Interactions</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold">{interactionsValue}</span>
              <span className={getChangeColorClass(interactionsChange)}>
                {formatChange(interactionsChange)}
              </span>
            </div>
            <div className="h-36 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data?.interactions?.valueOf || sampleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Additional Views</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold">{data?.additionalViews || 0}</span>
              <span className="text-green-500">from boost</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostAnalyticsCard;
