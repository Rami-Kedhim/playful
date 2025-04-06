
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useHermesSeoHistory } from '@/hooks/useHermesSeoHistory';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, LineChart as LineChartIcon, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

interface HermesSeoHistoryProps {
  contentId?: string;
  contentType?: 'profile' | 'content' | 'livecam' | 'event';
}

const HermesSeoHistory: React.FC<HermesSeoHistoryProps> = ({ contentId, contentType }) => {
  const { history, isLoading, clearHistory } = useHermesSeoHistory(contentId);
  const [timeRange, setTimeRange] = useState<'all' | 'week' | 'month'>('all');
  const [chartView, setChartView] = useState<'visibility' | 'improvements'>('visibility');
  
  // Filter history based on selected time range
  const filteredHistory = React.useMemo(() => {
    if (timeRange === 'all') return history;
    
    const now = Date.now();
    const filterTime = timeRange === 'week' ? 7 * 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000;
    
    return history.filter(entry => (now - entry.timestamp) <= filterTime);
  }, [history, timeRange]);
  
  // Prepare chart data
  const chartData = React.useMemo(() => {
    return filteredHistory.map(entry => ({
      date: new Date(entry.timestamp).toLocaleDateString(),
      timestamp: entry.timestamp,
      visibilityScore: entry.result.visibilityScore,
      improvements: Object.values(entry.result.seoImprovements || {}).filter(Boolean).length,
      contentType: entry.contentType,
    }));
  }, [filteredHistory]);
  
  // Handle clear history
  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all SEO history? This action cannot be undone.')) {
      clearHistory();
    }
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>SEO History</CardTitle>
          <CardDescription>Loading optimization history...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-[250px] w-full" />
            <div className="flex space-x-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>SEO History</CardTitle>
          <CardDescription>Track your content optimization progress</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              No SEO optimization history available. Run optimizations to start tracking performance.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <LineChartIcon className="h-5 w-5 mr-2 text-primary" />
            SEO History
          </CardTitle>
          <CardDescription>
            {contentId ? 'Tracking optimization for selected content' : 'Tracking all content optimizations'}
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={handleClearHistory}>
          <Trash2 className="h-4 w-4 mr-2" />
          Clear History
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
          <Tabs value={chartView} onValueChange={(value) => setChartView(value as 'visibility' | 'improvements')}>
            <TabsList>
              <TabsTrigger value="visibility">Visibility Score</TabsTrigger>
              <TabsTrigger value="improvements">Improvements</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex-1" />
          
          <Select value={timeRange} onValueChange={(value) => setTimeRange(value as 'all' | 'week' | 'month')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                domain={chartView === 'visibility' ? [0, 100] : [0, 'auto']}
              />
              <Tooltip 
                formatter={(value, name) => [value, name === 'visibilityScore' ? 'Visibility Score' : 'Improvements']}
                labelFormatter={(date) => {
                  const entry = chartData.find(entry => entry.date === date);
                  if (entry) {
                    return `${date} (${formatDistanceToNow(entry.timestamp, { addSuffix: true })})`;
                  }
                  return date;
                }}
              />
              <Legend />
              {chartView === 'visibility' ? (
                <Line 
                  type="monotone" 
                  dataKey="visibilityScore" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="Visibility Score"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ) : (
                <Line 
                  type="monotone" 
                  dataKey="improvements" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  name="Improvements"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Recent Optimizations</h4>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {filteredHistory.slice(0, 5).map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    entry.result.visibilityScore > 80 ? "bg-green-500" : 
                    entry.result.visibilityScore > 60 ? "bg-yellow-500" : "bg-red-500"
                  }`} />
                  <div>
                    <p className="text-sm font-medium">
                      {entry.contentType.charAt(0).toUpperCase() + entry.contentType.slice(1)} optimization
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Score: {entry.result.visibilityScore}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDistanceToNow(entry.timestamp, { addSuffix: true })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HermesSeoHistory;
