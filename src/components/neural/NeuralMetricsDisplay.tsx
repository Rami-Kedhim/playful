
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { neuralMetrics } from '@/services/neural/reporting/neuralMetrics';
import { PerformanceReport } from '@/types/neuralMetrics';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Activity, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NeuralMetricsDisplayProps {
  className?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

const NeuralMetricsDisplay: React.FC<NeuralMetricsDisplayProps> = ({
  className = '',
  autoRefresh = true,
  refreshInterval = 30000
}) => {
  const [report, setReport] = useState<PerformanceReport | null>(null);
  const [historicalReports, setHistoricalReports] = useState<PerformanceReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = () => {
    try {
      const latestReport = neuralMetrics.getLatestReport();
      setReport(latestReport);
      
      // Get historical reports for the last 24 hours
      const endTime = new Date();
      const startTime = new Date();
      startTime.setHours(startTime.getHours() - 24);
      
      const history = neuralMetrics.getHistoricalReports(startTime, endTime);
      setHistoricalReports(history);
      
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch neural metrics');
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial report
  useEffect(() => {
    fetchReport();
  }, []);

  // Set up auto-refresh
  useEffect(() => {
    if (!autoRefresh) return;
    
    const intervalId = setInterval(fetchReport, refreshInterval);
    return () => clearInterval(intervalId);
  }, [autoRefresh, refreshInterval]);

  // Prepare chart data
  const chartData = historicalReports.map(report => ({
    time: report.timestamp,
    health: report.overallHealth,
    cpuUsage: report.systemMetrics.cpuUsage,
    memoryUsage: report.systemMetrics.memoryUsage,
    errorRate: report.systemMetrics.errorRate
  }));

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="pt-6 flex justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!report) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No metrics data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Neural System Health</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchReport}
          className="h-8 w-8 p-0"
        >
          <RefreshCw className="h-4 w-4" />
          <span className="sr-only">Refresh</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Overall Health Status */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Overall System Health</span>
              <Badge variant={report.overallHealth > 80 ? "default" : "warning"}>
                {report.overallHealth}%
              </Badge>
            </div>
            <Progress 
              value={report.overallHealth} 
              className="h-2"
              style={{
                backgroundColor: 'rgba(0,0,0,0.1)',
                '--progress-color': report.overallHealth > 80 ? 'var(--primary)' : 'var(--warning)'
              } as React.CSSProperties}
            />
          </div>

          {/* System Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-secondary/20 p-3 rounded-md">
              <div className="text-xs text-muted-foreground">CPU Usage</div>
              <div className="text-lg font-bold">{Math.round(report.systemMetrics.cpuUsage)}%</div>
            </div>
            <div className="bg-secondary/20 p-3 rounded-md">
              <div className="text-xs text-muted-foreground">Memory Usage</div>
              <div className="text-lg font-bold">{Math.round(report.systemMetrics.memoryUsage)}%</div>
            </div>
            <div className="bg-secondary/20 p-3 rounded-md">
              <div className="text-xs text-muted-foreground">Response Time</div>
              <div className="text-lg font-bold">{Math.round(report.systemMetrics.responseTime)}ms</div>
            </div>
            <div className="bg-secondary/20 p-3 rounded-md">
              <div className="text-xs text-muted-foreground">Error Rate</div>
              <div className="text-lg font-bold">{report.systemMetrics.errorRate.toFixed(2)}%</div>
            </div>
          </div>

          {/* Historical Chart */}
          {chartData.length > 1 && (
            <div className="h-64 mt-4">
              <h3 className="text-sm font-medium mb-2">Performance Trends</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="time" 
                    tickFormatter={(time) => new Date(time).toLocaleTimeString()} 
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(label) => new Date(label).toLocaleString()}
                    formatter={(value, name) => {
                      if (name === 'errorRate') return [`${value.toFixed(2)}%`, 'Error Rate'];
                      return [`${Math.round(Number(value))}${name === 'health' ? '%' : ''}`, 
                        name === 'health' ? 'System Health' : 
                        name === 'cpuUsage' ? 'CPU Usage' : 
                        name === 'memoryUsage' ? 'Memory Usage' : name];
                    }}
                  />
                  <Line type="monotone" dataKey="health" stroke="#8884d8" />
                  <Line type="monotone" dataKey="cpuUsage" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="memoryUsage" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Recommendations */}
          {report.recommendations.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">System Recommendations</h3>
              <ul className="space-y-2">
                {report.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <Activity className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                    <span className="text-sm">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NeuralMetricsDisplay;
