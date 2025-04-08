
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, TrendingUp, TrendingDown, Eye, FileJson } from 'lucide-react';

interface PerformanceData {
  name: string;
  hermes: number;
  oxum: number;
  benchmark?: number;
}

interface PerformanceMetricsChartProps {
  performanceData?: PerformanceData[];
}

const PerformanceMetricsChart: React.FC<PerformanceMetricsChartProps> = ({ performanceData: initialData }) => {
  const [data, setData] = useState<PerformanceData[]>([]);
  const [loading, setLoading] = useState(false);
  const [showBenchmark, setShowBenchmark] = useState(false);
  const [smoothLine, setSmoothLine] = useState(true);
  const [hermesAverage, setHermesAverage] = useState(0);
  const [oxumAverage, setOxumAverage] = useState(0);
  const [hermesToOxumRatio, setHermesToOxumRatio] = useState(0);
  const { toast } = useToast();
  
  const generatePerformanceData = (): PerformanceData[] => {
    // Generate 24 data points (hourly)
    return Array.from({ length: 24 }, (_, i) => {
      const hermesValue = Math.floor(Math.random() * 30) + 60; // 60-90
      const oxumValue = Math.floor(Math.random() * 25) + 65; // 65-90
      return {
        name: `${i}h`,
        hermes: hermesValue,
        oxum: oxumValue,
        benchmark: 75 // Static benchmark line
      };
    });
  };
  
  const fetchData = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newData = generatePerformanceData();
      setData(newData);
      
      // Calculate metrics
      const hermesTotal = newData.reduce((sum, item) => sum + item.hermes, 0);
      const oxumTotal = newData.reduce((sum, item) => sum + item.oxum, 0);
      
      const hermesAvg = Math.round(hermesTotal / newData.length * 10) / 10;
      const oxumAvg = Math.round(oxumTotal / newData.length * 10) / 10;
      
      setHermesAverage(hermesAvg);
      setOxumAverage(oxumAvg);
      setHermesToOxumRatio(Math.round((hermesAvg / oxumAvg) * 100) / 100);
      
      setLoading(false);
      
      toast({
        title: "Performance Data Updated",
        description: `Hermes avg: ${hermesAvg}, Oxum avg: ${oxumAvg}`,
      });
    }, 1000);
  };
  
  useEffect(() => {
    if (initialData) {
      setData(initialData);
    } else {
      fetchData();
    }
  }, [initialData]);
  
  const exportData = () => {
    try {
      const dataStr = JSON.stringify(data, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      const exportFileDefaultName = `performance-metrics-${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast({
        title: "Data Exported Successfully",
        description: `Saved as ${exportFileDefaultName}`,
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Could not export performance data",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>
              Hermes vs Oxum engine efficiency over time
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="showBenchmark" 
                checked={showBenchmark} 
                onCheckedChange={(checked) => setShowBenchmark(checked as boolean)}
              />
              <Label htmlFor="showBenchmark" className="text-sm">Show benchmark</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="smoothLine" 
                checked={smoothLine} 
                onCheckedChange={setSmoothLine}
              />
              <Label htmlFor="smoothLine" className="text-sm">Smooth lines</Label>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[40, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  type={smoothLine ? "monotone" : "linear"}
                  dataKey="hermes" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="Hermes (Visibility)" 
                />
                <Line 
                  type={smoothLine ? "monotone" : "linear"}
                  dataKey="oxum" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  name="Oxum (Fairness)" 
                />
                {showBenchmark && (
                  <ReferenceLine 
                    y={75} 
                    stroke="red" 
                    strokeDasharray="3 3" 
                    label="Target"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="text-xs text-muted-foreground">Hermes Average</div>
            <div className="text-xl font-bold">{hermesAverage.toFixed(1)}</div>
            <div className="flex items-center gap-1 text-xs">
              {hermesAverage > 75 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">Above target</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">Below target</span>
                </>
              )}
            </div>
          </div>
          
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="text-xs text-muted-foreground">Oxum Average</div>
            <div className="text-xl font-bold">{oxumAverage.toFixed(1)}</div>
            <div className="flex items-center gap-1 text-xs">
              {oxumAverage > 75 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">Above target</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">Below target</span>
                </>
              )}
            </div>
          </div>
          
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="text-xs text-muted-foreground">Hermes/Oxum Ratio</div>
            <div className="text-xl font-bold">{hermesToOxumRatio.toFixed(2)}</div>
            <div className="flex items-center gap-1 text-xs">
              <Eye className="h-3 w-3 text-blue-500" />
              <span className="text-muted-foreground">
                Balance factor
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchData} 
          disabled={loading}
          className="flex items-center gap-1"
        >
          {loading ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Refreshing...</span>
            </>
          ) : (
            <>Refresh Data</>
          )}
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={exportData}
          className="flex items-center gap-1"
        >
          <FileJson className="h-3 w-3 mr-1" />
          Export JSON
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PerformanceMetricsChart;
