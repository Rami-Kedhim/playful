
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BoostDistributionData {
  name: string;
  ai: number;
  real: number;
}

interface BoostDistributionChartProps {
  boostDistributionData?: BoostDistributionData[];
}

const BoostDistributionChart: React.FC<BoostDistributionChartProps> = ({ boostDistributionData: initialData }) => {
  const [timeFrame, setTimeFrame] = useState<'day' | 'week' | 'month'>('day');
  const [activeTab, setActiveTab] = useState<'chart' | 'summary'>('chart');
  const [data, setData] = useState<BoostDistributionData[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalAI, setTotalAI] = useState(0);
  const [totalReal, setTotalReal] = useState(0);
  
  const generateDayData = (): BoostDistributionData[] => [
    { name: '12am', ai: Math.floor(Math.random() * 15) + 5, real: Math.floor(Math.random() * 10) + 2 },
    { name: '4am', ai: Math.floor(Math.random() * 10) + 3, real: Math.floor(Math.random() * 5) + 1 },
    { name: '8am', ai: Math.floor(Math.random() * 20) + 10, real: Math.floor(Math.random() * 15) + 5 },
    { name: '12pm', ai: Math.floor(Math.random() * 30) + 20, real: Math.floor(Math.random() * 25) + 15 },
    { name: '4pm', ai: Math.floor(Math.random() * 40) + 25, real: Math.floor(Math.random() * 35) + 20 },
    { name: '8pm', ai: Math.floor(Math.random() * 50) + 30, real: Math.floor(Math.random() * 40) + 25 },
  ];
  
  const generateWeekData = (): BoostDistributionData[] => [
    { name: 'Mon', ai: Math.floor(Math.random() * 100) + 50, real: Math.floor(Math.random() * 80) + 40 },
    { name: 'Tue', ai: Math.floor(Math.random() * 100) + 50, real: Math.floor(Math.random() * 80) + 40 },
    { name: 'Wed', ai: Math.floor(Math.random() * 120) + 60, real: Math.floor(Math.random() * 100) + 50 },
    { name: 'Thu', ai: Math.floor(Math.random() * 130) + 70, real: Math.floor(Math.random() * 110) + 60 },
    { name: 'Fri', ai: Math.floor(Math.random() * 150) + 80, real: Math.floor(Math.random() * 130) + 70 },
    { name: 'Sat', ai: Math.floor(Math.random() * 170) + 90, real: Math.floor(Math.random() * 150) + 80 },
    { name: 'Sun', ai: Math.floor(Math.random() * 140) + 70, real: Math.floor(Math.random() * 120) + 60 },
  ];
  
  const generateMonthData = (): BoostDistributionData[] => [
    { name: 'Week 1', ai: Math.floor(Math.random() * 600) + 300, real: Math.floor(Math.random() * 500) + 250 },
    { name: 'Week 2', ai: Math.floor(Math.random() * 650) + 320, real: Math.floor(Math.random() * 550) + 270 },
    { name: 'Week 3', ai: Math.floor(Math.random() * 700) + 350, real: Math.floor(Math.random() * 600) + 300 },
    { name: 'Week 4', ai: Math.floor(Math.random() * 750) + 400, real: Math.floor(Math.random() * 650) + 320 },
  ];
  
  const fetchData = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      let newData: BoostDistributionData[];
      
      switch (timeFrame) {
        case 'day':
          newData = generateDayData();
          break;
        case 'week':
          newData = generateWeekData();
          break;
        case 'month':
          newData = generateMonthData();
          break;
        default:
          newData = generateDayData();
      }
      
      setData(newData);
      
      // Calculate totals
      const aiTotal = newData.reduce((sum, item) => sum + item.ai, 0);
      const realTotal = newData.reduce((sum, item) => sum + item.real, 0);
      setTotalAI(aiTotal);
      setTotalReal(realTotal);
      
      setLoading(false);
    }, 800);
  };
  
  useEffect(() => {
    if (initialData) {
      setData(initialData);
    } else {
      fetchData();
    }
  }, [timeFrame, initialData]);
  
  const handleTimeFrameChange = (value: string) => {
    setTimeFrame(value as 'day' | 'week' | 'month');
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Boost Distribution</CardTitle>
            <CardDescription>
              AI vs Real profile boost allocation
            </CardDescription>
          </div>
          <Select value={timeFrame} onValueChange={handleTimeFrameChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Last 24h</SelectItem>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'chart' | 'summary')}>
          <TabsList className="mb-2 grid w-[200px] grid-cols-2">
            <TabsTrigger value="chart">Chart</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chart" className="space-y-4">
            <div className="h-[300px]">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-muted-foreground">Loading chart data...</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ai" fill="#8884d8" name="AI Models" />
                    <Bar dataKey="real" fill="#82ca9d" name="Real Escorts" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="summary">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground">AI Boosts</div>
                  <div className="text-2xl font-bold">{totalAI}</div>
                  <div className="flex items-center justify-between mt-2">
                    <Badge className="bg-purple-500">{Math.round((totalAI / (totalAI + totalReal)) * 100)}%</Badge>
                    <span className="text-xs text-muted-foreground">of total</span>
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground">Real Boosts</div>
                  <div className="text-2xl font-bold">{totalReal}</div>
                  <div className="flex items-center justify-between mt-2">
                    <Badge className="bg-green-500">{Math.round((totalReal / (totalAI + totalReal)) * 100)}%</Badge>
                    <span className="text-xs text-muted-foreground">of total</span>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>Distribution of boost allocations between AI-generated profiles and real escort profiles during the selected time period.</p>
              </div>
              
              {timeFrame === 'day' && (
                <div className="text-sm">
                  <div className="font-medium">Key insights:</div>
                  <ul className="text-muted-foreground space-y-1 mt-1 list-disc pl-5">
                    <li>Peak boost usage occurs between 4-8pm</li>
                    <li>AI profiles receive {Math.round((totalAI / (totalAI + totalReal)) * 100)}% of total boost allocation</li>
                    <li>Early morning hours show lowest boost activity</li>
                  </ul>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BoostDistributionChart;
