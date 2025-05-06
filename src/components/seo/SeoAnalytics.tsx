
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, BarChart, PieChart, AreaChart } from 'lucide-react';
import SeoPerformanceChart from './SeoPerformanceChart';
import SeoContentTable from './SeoContentTable';

const SeoAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [contentType, setContentType] = useState('all');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold">SEO Performance</h2>
          <p className="text-muted-foreground">
            Track your content's performance across search engines
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={contentType} onValueChange={setContentType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Content Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Content</SelectItem>
              <SelectItem value="profiles">Profiles</SelectItem>
              <SelectItem value="articles">Articles</SelectItem>
              <SelectItem value="livecams">Live Streams</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-4">
        <MetricCard 
          title="Visibility Score" 
          value={78.5} 
          change={12.4} 
          timeRange={timeRange} 
          trend="up"
          icon={<LineChart className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Organic Traffic" 
          value={4283} 
          change={7.2} 
          timeRange={timeRange} 
          trend="up"
          icon={<BarChart className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Average Position" 
          value={4.2} 
          change={-0.8} 
          timeRange={timeRange} 
          trend="down"
          icon={<AreaChart className="h-4 w-4" />} 
          decimals={1}
        />
        <MetricCard 
          title="Content Optimized" 
          value={65} 
          change={14} 
          timeRange={timeRange} 
          trend="up"
          icon={<PieChart className="h-4 w-4" />} 
          percentage
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>SEO Performance Over Time</CardTitle>
            <CardDescription>
              Track your visibility score and organic traffic
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <SeoPerformanceChart timeRange={timeRange} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Content</CardTitle>
            <CardDescription>
              Content with the highest SEO scores and traffic
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SeoContentTable contentType={contentType} />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Keyword Rankings</CardTitle>
          <CardDescription>
            Track your positions for target keywords
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* Mock keyword rankings data */}
            {['escorts', 'premium escorts', 'vip escort services', 'escort booking'].map((keyword, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{keyword}</p>
                  <p className="text-sm text-muted-foreground">
                    Monthly searches: {Math.floor(Math.random() * 10000)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{Math.floor(Math.random() * 10) + 1}</p>
                  <p className={`text-sm ${Math.random() > 0.5 ? 'text-green-500' : 'text-red-500'}`}>
                    {Math.random() > 0.5 ? '↑' : '↓'} {Math.floor(Math.random() * 5) + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper component for metric cards
interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  timeRange: string;
  decimals?: number;
  percentage?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  trend,
  icon,
  timeRange,
  decimals = 0,
  percentage = false
}) => {
  // Format value with appropriate decimals
  const formattedValue = value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }) + (percentage ? '%' : '');
  
  // Get appropriate text color for trend
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500';
  
  // Get time range text
  const timeRangeText = timeRange === '7days' ? 'week' : 
                        timeRange === '30days' ? 'month' : 
                        timeRange === '90days' ? '3 months' : 'year';
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-muted-foreground text-sm">{title}</span>
          <span className="bg-primary/10 text-primary p-1 rounded">{icon}</span>
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold">{formattedValue}</p>
          <div className="flex items-center gap-1 text-sm">
            <span className={trendColor}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'} {Math.abs(change).toFixed(1)}%
            </span>
            <span className="text-muted-foreground">vs. last {timeRangeText}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeoAnalytics;
