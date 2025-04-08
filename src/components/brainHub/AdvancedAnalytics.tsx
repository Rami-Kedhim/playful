
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  ScatterChart, Scatter, Cell, XAxis, YAxis, ZAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import {
  ExternalLink,
  Download,
  TrendingUp,
  TrendingDown,
  BarChart2,
  PieChart as PieChartIcon,
  Activity,
  Target,
  Map,
  Users,
  Calendar
} from 'lucide-react';
import { brainHub } from '@/services/neural/HermesOxumBrainHub';

// Define data interfaces
interface MarketInsight {
  id: string;
  category: string;
  insight: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  source: string;
  timestamp: Date;
}

interface Prediction {
  id: string;
  metric: string;
  currentValue: number;
  predictedValue: number;
  timeframe: string;
  confidence: number;
}

interface ClusterData {
  id: string;
  name: string;
  size: number;
  avgSpend: number;
  retentionRate: number;
  growth: number;
  primaryRegion: string;
  x?: number;
  y?: number;
  z?: number;
}

interface GeoPerformance {
  country: string;
  revenue: number;
  users: number;
  growth: number;
  conversionRate: number;
}

interface TimeSeriesData {
  date: string;
  users: number;
  revenue: number;
  conversion: number;
  predicted?: number;
}

const AdvancedAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState("predictions");
  const [timeRange, setTimeRange] = useState("90days");
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  const [insights, setInsights] = useState<MarketInsight[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [segments, setSegments] = useState<ClusterData[]>([]);
  const [geoData, setGeoData] = useState<GeoPerformance[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [loading, setLoading] = useState(true);

  // Generate mock data on component mount
  useEffect(() => {
    loadData();
  }, []);

  // Load data based on selected time range
  useEffect(() => {
    loadTimeSeriesData();
  }, [timeRange]);
  
  // Load all data
  const loadData = () => {
    setLoading(true);
    
    // Generate market insights
    const mockInsights: MarketInsight[] = [
      {
        id: '1',
        category: 'User Behavior',
        insight: 'Users who engage with voice messages are 3.2x more likely to purchase premium content',
        impact: 'high',
        confidence: 92,
        source: 'Neural Analysis',
        timestamp: new Date(Date.now() - 2 * 86400000)
      },
      {
        id: '2',
        category: 'Content Trends',
        insight: 'AI profiles with casual conversation starters receive 47% more engagement than formal ones',
        impact: 'medium',
        confidence: 86,
        source: 'A/B Testing',
        timestamp: new Date(Date.now() - 5 * 86400000)
      },
      {
        id: '3',
        category: 'Regional',
        insight: 'Western European users show 28% higher retention when profiles match their local languages',
        impact: 'high',
        confidence: 91,
        source: 'Cohort Analysis',
        timestamp: new Date(Date.now() - 8 * 86400000)
      },
      {
        id: '4',
        category: 'Pricing',
        insight: 'Weekend price elasticity is 35% lower than weekday elasticity for premium content',
        impact: 'medium',
        confidence: 78,
        source: 'Economic Model',
        timestamp: new Date(Date.now() - 12 * 86400000)
      },
      {
        id: '5',
        category: 'Marketing',
        insight: 'Users acquired through social media have 2.1x higher LTV than search engine acquisitions',
        impact: 'high',
        confidence: 88,
        source: 'Attribution Analysis',
        timestamp: new Date(Date.now() - 15 * 86400000)
      },
    ];
    setInsights(mockInsights);
    
    // Generate predictions
    const mockPredictions: Prediction[] = [
      {
        id: '1',
        metric: 'Monthly Revenue',
        currentValue: 127540,
        predictedValue: 168300,
        timeframe: '3 months',
        confidence: 87
      },
      {
        id: '2',
        metric: 'User Base',
        currentValue: 45720,
        predictedValue: 65000,
        timeframe: '3 months',
        confidence: 92
      },
      {
        id: '3',
        metric: 'Conversion Rate',
        currentValue: 8.2,
        predictedValue: 9.7,
        timeframe: '2 months',
        confidence: 76
      },
      {
        id: '4',
        metric: 'Avg. Session Duration',
        currentValue: 14.5,
        predictedValue: 16.8,
        timeframe: '1 month',
        confidence: 81
      },
      {
        id: '5',
        metric: 'Premium Content Sales',
        currentValue: 3240,
        predictedValue: 4780,
        timeframe: '3 months',
        confidence: 84
      },
    ];
    setPredictions(mockPredictions);
    
    // Generate user segments
    const mockSegments: ClusterData[] = [
      {
        id: '1',
        name: 'High Spenders',
        size: 15,
        avgSpend: 78.5,
        retentionRate: 87,
        growth: 12,
        primaryRegion: 'North America',
        x: 80,
        y: 90,
        z: 15
      },
      {
        id: '2',
        name: 'Regular Engagers',
        size: 34,
        avgSpend: 42.3,
        retentionRate: 75,
        growth: 8,
        primaryRegion: 'Europe',
        x: 70,
        y: 75,
        z: 34
      },
      {
        id: '3',
        name: 'New Users',
        size: 28,
        avgSpend: 15.7,
        retentionRate: 45,
        growth: 25,
        primaryRegion: 'Global',
        x: 30,
        y: 45,
        z: 28
      },
      {
        id: '4',
        name: 'Casual Browsers',
        size: 18,
        avgSpend: 8.2,
        retentionRate: 32,
        growth: 5,
        primaryRegion: 'Asia',
        x: 20,
        y: 32,
        z: 18
      },
      {
        id: '5',
        name: 'Premium Subscribers',
        size: 5,
        avgSpend: 95.1,
        retentionRate: 94,
        growth: 16,
        primaryRegion: 'North America',
        x: 90,
        y: 94,
        z: 5
      },
    ];
    setSegments(mockSegments);
    
    // Generate geo performance data
    const mockGeoData: GeoPerformance[] = [
      {
        country: 'United States',
        revenue: 57230,
        users: 18500,
        growth: 15,
        conversionRate: 12.4
      },
      {
        country: 'Germany',
        revenue: 23150,
        users: 8200,
        growth: 22,
        conversionRate: 10.8
      },
      {
        country: 'United Kingdom',
        revenue: 19850,
        users: 7100,
        growth: 18,
        conversionRate: 11.2
      },
      {
        country: 'Canada',
        revenue: 12720,
        users: 4800,
        growth: 14,
        conversionRate: 10.1
      },
      {
        country: 'France',
        revenue: 10440,
        users: 4100,
        growth: 17,
        conversionRate: 9.6
      },
      {
        country: 'Australia',
        revenue: 9380,
        users: 3700,
        growth: 13,
        conversionRate: 9.2
      },
      {
        country: 'Japan',
        revenue: 8250,
        users: 2900,
        growth: 8,
        conversionRate: 8.5
      },
    ];
    setGeoData(mockGeoData);
    
    loadTimeSeriesData();
  };
  
  // Load time series data
  const loadTimeSeriesData = () => {
    let days: number;
    switch (timeRange) {
      case '30days':
        days = 30;
        break;
      case '90days':
        days = 90;
        break;
      case '180days':
        days = 180;
        break;
      default:
        days = 90;
    }
    
    // Generate time series data
    const mockTimeSeriesData: TimeSeriesData[] = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    for (let i = 0; i < days; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i);
      const dateString = currentDate.toISOString().split('T')[0];
      
      let baseUsers = 400 + (i * 5);
      // Add weekly pattern
      baseUsers += (currentDate.getDay() === 5 || currentDate.getDay() === 6) ? 100 : 0;
      // Add some randomness
      baseUsers += Math.floor(Math.random() * 50);
      
      const conversionRate = 8 + (Math.random() * 3);
      const revenuePerUser = 2.5 + (Math.random() * 1);
      
      mockTimeSeriesData.push({
        date: dateString,
        users: baseUsers,
        revenue: Math.floor(baseUsers * (conversionRate / 100) * revenuePerUser * 10),
        conversion: conversionRate,
      });
    }
    
    // Add predictions for the future
    const lastRealData = mockTimeSeriesData[mockTimeSeriesData.length - 1];
    const predictionDays = 30;
    
    for (let i = 1; i <= predictionDays; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);
      const dateString = currentDate.toISOString().split('T')[0];
      
      const growthFactor = 1 + (0.01 * Math.floor(Math.random() * 5));
      const predictedUsers = Math.floor(lastRealData.users * growthFactor * (1 + (i * 0.01)));
      const predictedRevenue = Math.floor(lastRealData.revenue * growthFactor * (1 + (i * 0.015)));
      const predictedConversion = lastRealData.conversion * (1 + (i * 0.005));
      
      mockTimeSeriesData.push({
        date: dateString,
        users: undefined as any,
        revenue: undefined as any,
        conversion: undefined as any,
        predicted: predictedRevenue
      });
    }
    
    setTimeSeriesData(mockTimeSeriesData);
    setLoading(false);
  };
  
  // Format number with commas
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Generate insights
  const generateNewInsights = () => {
    toast({
      title: "Generating New Insights",
      description: "The AI is analyzing recent data patterns...",
    });
    
    setTimeout(() => {
      const newInsight: MarketInsight = {
        id: Date.now().toString(),
        category: 'User Experience',
        insight: 'Users who customize AI profile appearance spend 2.3x more on premium content',
        impact: 'high',
        confidence: 89,
        source: 'Behavioral Analysis',
        timestamp: new Date()
      };
      
      setInsights([newInsight, ...insights]);
      
      toast({
        title: "New Insight Generated",
        description: "A high-impact insight has been added to your dashboard",
        variant: "success",
      });
    }, 2500);
  };
  
  // Get chart data for the selected metric
  const getChartData = () => {
    if (selectedMetric === 'revenue') {
      return timeSeriesData.map(item => ({
        date: item.date,
        value: item.revenue,
        predicted: item.predicted
      }));
    } else if (selectedMetric === 'users') {
      return timeSeriesData.map(item => ({
        date: item.date,
        value: item.users,
        predicted: item.predicted ? item.predicted / 3 : undefined
      }));
    } else {
      return timeSeriesData.map(item => ({
        date: item.date,
        value: item.conversion,
        predicted: item.predicted ? item.predicted / 100 : undefined
      }));
    }
  };
  
  // Format Y-axis ticks
  const formatYAxis = (value: number) => {
    if (selectedMetric === 'revenue') {
      return value >= 1000 ? `$${(value / 1000).toFixed(0)}k` : `$${value}`;
    } else if (selectedMetric === 'users') {
      return value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value;
    } else {
      return `${value.toFixed(1)}%`;
    }
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Advanced Market Analytics</CardTitle>
            <CardDescription>
              AI-powered insights, predictions, and market analysis
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="90days">Last 90 Days</SelectItem>
                <SelectItem value="180days">Last 180 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="predictions">
              <TrendingUp className="h-4 w-4 mr-2" />
              Predictions
            </TabsTrigger>
            <TabsTrigger value="segments">
              <Users className="h-4 w-4 mr-2" />
              User Segments
            </TabsTrigger>
            <TabsTrigger value="geo">
              <Map className="h-4 w-4 mr-2" />
              Geographic Analysis
            </TabsTrigger>
            <TabsTrigger value="insights">
              <Target className="h-4 w-4 mr-2" />
              Market Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="predictions" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-md">Performance Forecast</CardTitle>
                  <div>
                    <Select 
                      value={selectedMetric} 
                      onValueChange={setSelectedMetric}
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Select Metric" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="revenue">Revenue</SelectItem>
                        <SelectItem value="users">Users</SelectItem>
                        <SelectItem value="conversion">Conversion Rate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => {
                        const d = new Date(date);
                        return `${d.getMonth() + 1}/${d.getDate()}`;
                      }}
                      minTickGap={30}
                    />
                    <YAxis 
                      tickFormatter={formatYAxis}
                    />
                    <Tooltip 
                      formatter={(value: number) => {
                        if (selectedMetric === 'revenue') {
                          return [`$${formatNumber(value)}`, 'Value'];
                        } else if (selectedMetric === 'conversion') {
                          return [`${value.toFixed(2)}%`, 'Value'];
                        }
                        return [formatNumber(value), 'Value'];
                      }}
                      labelFormatter={(label) => new Date(label).toLocaleDateString()}
                    />
                    <Legend />
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8884d8" 
                      fillOpacity={1}
                      fill="url(#colorValue)"
                      name={selectedMetric === 'revenue' ? 'Revenue' : 
                           selectedMetric === 'users' ? 'Users' : 'Conversion Rate'}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#82ca9d" 
                      strokeDasharray="5 5"
                      fillOpacity={1}
                      fill="url(#colorPredicted)"
                      name="Predicted"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {predictions.map((prediction) => (
                <Card key={prediction.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">{prediction.metric}</CardTitle>
                      <Badge>{prediction.timeframe}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Current</p>
                        <p className="text-xl font-bold">
                          {prediction.metric.includes('Rate') 
                            ? `${prediction.currentValue}%`
                            : prediction.metric.includes('Revenue') || prediction.metric.includes('Sales')
                              ? `$${formatNumber(prediction.currentValue)}`
                              : formatNumber(prediction.currentValue)
                          }
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className={`flex items-center ${
                          prediction.predictedValue > prediction.currentValue 
                            ? 'text-green-500' 
                            : 'text-red-500'
                        }`}>
                          {prediction.predictedValue > prediction.currentValue ? (
                            <TrendingUp className="h-5 w-5 mr-1" />
                          ) : (
                            <TrendingDown className="h-5 w-5 mr-1" />
                          )}
                          <span className="font-medium">
                            {Math.abs(
                              ((prediction.predictedValue - prediction.currentValue) / prediction.currentValue) * 100
                            ).toFixed(1)}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {prediction.confidence}% confidence
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Predicted</p>
                        <p className="text-xl font-bold text-primary">
                          {prediction.metric.includes('Rate') 
                            ? `${prediction.predictedValue}%`
                            : prediction.metric.includes('Revenue') || prediction.metric.includes('Sales')
                              ? `$${formatNumber(prediction.predictedValue)}`
                              : formatNumber(prediction.predictedValue)
                          }
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="segments" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">User Segment Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <ScatterChart
                      margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                      }}
                    >
                      <CartesianGrid />
                      <XAxis 
                        type="number" 
                        dataKey="x" 
                        name="Average Spend" 
                        label={{ value: 'Average Spend ($)', position: 'insideBottom', offset: -10 }} 
                        domain={[0, 100]}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="y" 
                        name="Retention" 
                        label={{ value: 'Retention (%)', angle: -90, position: 'insideLeft' }}
                        domain={[0, 100]}
                      />
                      <ZAxis 
                        type="number" 
                        dataKey="z" 
                        range={[100, 1000]} 
                        name="Segment Size" 
                      />
                      <Tooltip 
                        cursor={{ strokeDasharray: '3 3' }}
                        formatter={(value: any, name: string) => {
                          if (name === 'Average Spend') return [`$${value}`, name];
                          if (name === 'Retention') return [`${value}%`, name];
                          return [value, name];
                        }}
                      />
                      <Legend />
                      <Scatter 
                        name="User Segments" 
                        data={segments} 
                        fill="#8884d8"
                        shape="circle"
                      >
                        {segments.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={
                              entry.name === 'High Spenders' ? '#ff7300' :
                              entry.name === 'Regular Engagers' ? '#82ca9d' :
                              entry.name === 'New Users' ? '#8884d8' :
                              entry.name === 'Casual Browsers' ? '#ffc658' : '#ff8042'
                            } 
                          />
                        ))}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">Segment Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={segments}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="size"
                        nameKey="name"
                        label={(entry) => entry.name}
                      >
                        {segments.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={
                              entry.name === 'High Spenders' ? '#ff7300' :
                              entry.name === 'Regular Engagers' ? '#82ca9d' :
                              entry.name === 'New Users' ? '#8884d8' :
                              entry.name === 'Casual Browsers' ? '#ffc658' : '#ff8042'
                            } 
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any) => [`${value}%`, 'Percentage']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  <div className="mt-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Segment</th>
                            <th className="text-right py-2">Size (%)</th>
                            <th className="text-right py-2">Avg. Spend</th>
                            <th className="text-right py-2">Retention</th>
                            <th className="text-right py-2">Growth</th>
                          </tr>
                        </thead>
                        <tbody>
                          {segments.map((segment) => (
                            <tr key={segment.id} className="border-b">
                              <td className="py-2">{segment.name}</td>
                              <td className="text-right py-2">{segment.size}%</td>
                              <td className="text-right py-2">${segment.avgSpend.toFixed(2)}</td>
                              <td className="text-right py-2">{segment.retentionRate}%</td>
                              <td className={`text-right py-2 ${
                                segment.growth > 10 ? 'text-green-500' : 
                                segment.growth > 0 ? 'text-amber-500' : 'text-red-500'
                              }`}>
                                {segment.growth > 0 ? '+' : ''}{segment.growth}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-md">Segment Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Revenue by Segment</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart
                        data={segments.map(s => ({
                          name: s.name,
                          value: Math.round(s.size * s.avgSpend * 100)
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`} />
                        <Tooltip formatter={(value: any) => [`$${formatNumber(value)}`, 'Revenue']} />
                        <Bar dataKey="value" fill="#8884d8">
                          {segments.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={
                                entry.name === 'High Spenders' ? '#ff7300' :
                                entry.name === 'Regular Engagers' ? '#82ca9d' :
                                entry.name === 'New Users' ? '#8884d8' :
                                entry.name === 'Casual Browsers' ? '#ffc658' : '#ff8042'
                              } 
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Growth Potential</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart
                        data={segments.map(s => ({
                          name: s.name,
                          growth: s.growth,
                          potential: Math.round(s.growth * (s.retentionRate / 10))
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="growth" name="Current Growth" fill="#8884d8" />
                        <Bar dataKey="potential" name="Growth Potential" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="geo" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-md">Regional Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Revenue by Country</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                          data={geoData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`} />
                          <YAxis dataKey="country" type="category" width={100} />
                          <Tooltip formatter={(value: any) => [`$${formatNumber(value)}`, 'Revenue']} />
                          <Legend />
                          <Bar dataKey="revenue" name="Revenue" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  
                    <div>
                      <h3 className="text-sm font-medium mb-2">Regional Growth Rate</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                          data={geoData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                          <YAxis dataKey="country" type="category" width={100} />
                          <Tooltip formatter={(value: any) => [`${value}%`, 'Growth Rate']} />
                          <Legend />
                          <Bar dataKey="growth" name="Growth Rate" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-md">Region Comparison</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Conversion Rates</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart
                        data={geoData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="country" tick={false} />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <Tooltip formatter={(value: any) => [`${value}%`, 'Conversion Rate']} />
                        <Bar dataKey="conversionRate" name="Conversion Rate" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Country</th>
                        <th className="text-right py-2">Users</th>
                        <th className="text-right py-2">Conv. Rate</th>
                        <th className="text-right py-2">ARPU</th>
                      </tr>
                    </thead>
                    <tbody>
                      {geoData.slice(0, 5).map((country) => (
                        <tr key={country.country} className="border-b">
                          <td className="py-2">{country.country}</td>
                          <td className="text-right py-2">{formatNumber(country.users)}</td>
                          <td className="text-right py-2">{country.conversionRate}%</td>
                          <td className="text-right py-2">
                            ${(country.revenue / country.users).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    View All Regions
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-md">Expansion Opportunities</CardTitle>
                  <Button variant="outline" size="sm">
                    Generate Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3">Region</th>
                        <th className="text-left py-3">Market Size</th>
                        <th className="text-left py-3">Competition Level</th>
                        <th className="text-right py-3">Growth Potential</th>
                        <th className="text-right py-3">Estimated CAC</th>
                        <th className="text-right py-3">Est. ROI</th>
                        <th className="text-center py-3">Priority</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3">Eastern Europe</td>
                        <td className="py-3">$145M</td>
                        <td className="py-3">Medium</td>
                        <td className="text-right py-3">28%</td>
                        <td className="text-right py-3">$18</td>
                        <td className="text-right py-3">3.2x</td>
                        <td className="text-center py-3">
                          <Badge>High</Badge>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">South America</td>
                        <td className="py-3">$95M</td>
                        <td className="py-3">Low</td>
                        <td className="text-right py-3">32%</td>
                        <td className="text-right py-3">$12</td>
                        <td className="text-right py-3">3.7x</td>
                        <td className="text-center py-3">
                          <Badge>High</Badge>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">South East Asia</td>
                        <td className="py-3">$210M</td>
                        <td className="py-3">Medium</td>
                        <td className="text-right py-3">25%</td>
                        <td className="text-right py-3">$14</td>
                        <td className="text-right py-3">2.9x</td>
                        <td className="text-center py-3">
                          <Badge variant="secondary">Medium</Badge>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Middle East</td>
                        <td className="py-3">$78M</td>
                        <td className="py-3">High</td>
                        <td className="text-right py-3">18%</td>
                        <td className="text-right py-3">$25</td>
                        <td className="text-right py-3">1.8x</td>
                        <td className="text-center py-3">
                          <Badge variant="outline">Low</Badge>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">AI-Generated Market Insights</h3>
              <Button onClick={generateNewInsights}>
                Generate New Insights
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {insights.map((insight) => (
                <Card key={insight.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full ${
                        insight.impact === 'high' 
                          ? 'bg-red-100 text-red-600' 
                          : insight.impact === 'medium'
                            ? 'bg-amber-100 text-amber-600'
                            : 'bg-green-100 text-green-600'
                      }`}>
                        <Target className="h-6 w-6" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Badge variant={
                              insight.impact === 'high' 
                                ? 'default' 
                                : insight.impact === 'medium'
                                  ? 'secondary'
                                  : 'outline'
                            }>
                              {insight.impact} impact
                            </Badge>
                            <Badge variant="outline" className="ml-2">
                              {insight.category}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(insight.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                        
                        <p className="mt-2 text-lg">{insight.insight}</p>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center">
                            <span className="text-sm text-muted-foreground mr-1">Source:</span>
                            <span className="text-sm font-medium">{insight.source}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">
                              {insight.confidence}% confidence
                            </span>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-md">Correlated Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3">Metric A</th>
                          <th className="text-left py-3">Metric B</th>
                          <th className="text-left py-3">Relationship</th>
                          <th className="text-right py-3">Correlation</th>
                          <th className="text-right py-3">Confidence</th>
                          <th className="text-right py-3">Action Item</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3">Session Duration</td>
                          <td className="py-3">In-App Purchases</td>
                          <td className="py-3">Positive</td>
                          <td className="text-right py-3">0.78</td>
                          <td className="text-right py-3">93%</td>
                          <td className="text-right py-3">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3">Profile Customization</td>
                          <td className="py-3">User Retention</td>
                          <td className="py-3">Positive</td>
                          <td className="text-right py-3">0.64</td>
                          <td className="text-right py-3">87%</td>
                          <td className="text-right py-3">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3">Message Response Time</td>
                          <td className="py-3">User Satisfaction</td>
                          <td className="py-3">Negative</td>
                          <td className="text-right py-3">-0.52</td>
                          <td className="text-right py-3">81%</td>
                          <td className="text-right py-3">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3">Voice Message Usage</td>
                          <td className="py-3">Premium Conversion</td>
                          <td className="py-3">Positive</td>
                          <td className="text-right py-3">0.71</td>
                          <td className="text-right py-3">89%</td>
                          <td className="text-right py-3">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedAnalytics;
