import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNeuralAnalytics } from '@/hooks/useNeuralAnalytics';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { 
  NeuralAnalyticsReport, 
  PerformanceTrend 
} from '@/services/neural/types/neuralAnalytics';

interface ServiceMetricsProps {
  serviceMetrics: NeuralAnalyticsReport['serviceMetrics'];
}

const ServiceMetrics: React.FC<ServiceMetricsProps> = ({ serviceMetrics }) => {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle>Service Metrics</CardTitle>
        <CardDescription>Real-time performance of individual services</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {serviceMetrics.map((service) => (
            <div key={service.id} className="border rounded-md p-3">
              <h4 className="font-semibold">{service.name}</h4>
              <p className="text-sm text-muted-foreground">{service.type}</p>
              <div className="mt-2">
                {Object.entries(service.metrics).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-xs">
                    <span>{key}:</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface SystemMetricsProps {
  systemMetrics: NeuralAnalyticsReport['systemMetrics'];
}

const SystemMetrics: React.FC<SystemMetricsProps> = ({ systemMetrics }) => {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle>System Metrics</CardTitle>
        <CardDescription>Overall system performance indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">CPU Utilization</p>
            <p className="text-2xl font-bold">{systemMetrics.cpuUtilization.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Memory Usage</p>
            <p className="text-2xl font-bold">{systemMetrics.memoryUtilization.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Requests/sec</p>
            <p className="text-2xl font-bold">{systemMetrics.requestsPerSecond}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Response Time</p>
            <p className="text-2xl font-bold">{systemMetrics.responseTimeMs}ms</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Error Rate</p>
            <p className="text-2xl font-bold">{systemMetrics.errorRate.toFixed(2)}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface AnomaliesProps {
  anomalies: NeuralAnalyticsReport['anomalies'];
}

const Anomalies: React.FC<AnomaliesProps> = ({ anomalies }) => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Anomalies</CardTitle>
        <CardDescription>Detected anomalies in the system</CardDescription>
      </CardHeader>
      <CardContent>
        {anomalies.length === 0 ? (
          <p>No anomalies detected</p>
        ) : (
          <ul className="list-disc pl-5">
            {anomalies.map((anomaly) => (
              <li key={anomaly.id} className="py-1">
                <span className="font-semibold">{anomaly.type}:</span> {anomaly.description}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

interface TrendsProps {
  trends: NeuralAnalyticsReport['trends'];
}

const Trends: React.FC<TrendsProps> = ({ trends }) => {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle>Trends</CardTitle>
        <CardDescription>System performance trends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Request Volume</p>
            <p className="text-2xl font-bold">{trends.requestVolume}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Error Rate</p>
            <p className="text-2xl font-bold">{trends.errorRate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Response Time</p>
            <p className="text-2xl font-bold">{trends.responseTime}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface RecommendationsProps {
  recommendations: NeuralAnalyticsReport['recommendations'];
}

const Recommendations: React.FC<RecommendationsProps> = ({ recommendations }) => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Recommendations</CardTitle>
        <CardDescription>Suggestions for system improvements</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="py-1">
              {recommendation}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

interface ModelPerformanceProps {
  modelPerformance: NeuralAnalyticsReport['modelPerformance'];
}

const ModelPerformance: React.FC<ModelPerformanceProps> = ({ modelPerformance }) => {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle>Model Performance</CardTitle>
        <CardDescription>Key metrics for model evaluation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Accuracy</p>
            <p className="text-2xl font-bold">{modelPerformance.accuracy.toFixed(3)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Precision</p>
            <p className="text-2xl font-bold">{modelPerformance.precision.toFixed(3)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Recall</p>
            <p className="text-2xl font-bold">{modelPerformance.recall.toFixed(3)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">F1 Score</p>
            <p className="text-2xl font-bold">{modelPerformance.f1Score.toFixed(3)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Latency</p>
            <p className="text-2xl font-bold">{modelPerformance.latency}ms</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Throughput</p>
            <p className="text-2xl font-bold">{modelPerformance.throughput}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface OperationalMetricsProps {
  operationalMetrics: NeuralAnalyticsReport['operationalMetrics'];
}

const OperationalMetrics: React.FC<OperationalMetricsProps> = ({ operationalMetrics }) => {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle>Operational Metrics</CardTitle>
        <CardDescription>Metrics related to system operations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Requests</p>
            <p className="text-xl font-bold">{operationalMetrics.totalRequests.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Successful Requests</p>
            <p className="text-xl font-bold">{operationalMetrics.successfulRequests.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Failed Requests</p>
            <p className="text-xl font-bold">{operationalMetrics.failedRequests.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Avg Response Time</p>
            <p className="text-xl font-bold">{operationalMetrics.averageResponseTime.toFixed(1)}ms</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">P95 Response Time</p>
            <p className="text-xl font-bold">{operationalMetrics.p95ResponseTime}ms</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">P99 Response Time</p>
            <p className="text-xl font-bold">{operationalMetrics.p99ResponseTime}ms</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface UsageMetricsProps {
  usageMetrics: NeuralAnalyticsReport['usageMetrics'];
}

const UsageMetrics: React.FC<UsageMetricsProps> = ({ usageMetrics }) => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Usage Metrics</CardTitle>
        <CardDescription>User engagement and resource allocation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Daily Active Users</p>
            <p className="text-xl font-bold">{usageMetrics.dailyActiveUsers.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Monthly Active Users</p>
            <p className="text-xl font-bold">{usageMetrics.monthlyActiveUsers.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-xl font-bold">{usageMetrics.totalUsers.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Sessions Per User</p>
            <p className="text-xl font-bold">{usageMetrics.sessionsPerUser.toFixed(1)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface AdvancedMetricsProps {
  advancedMetrics: NeuralAnalyticsReport['advancedMetrics'];
}

const AdvancedMetrics: React.FC<AdvancedMetricsProps> = ({ advancedMetrics }) => {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle>Advanced Metrics</CardTitle>
        <CardDescription>In-depth system performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Resource Utilization</p>
            <p className="text-xl font-bold">{advancedMetrics.resourceUtilization.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Efficient Use Score</p>
            <p className="text-xl font-bold">{advancedMetrics.efficientUseScore.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Load Balancing Efficiency</p>
            <p className="text-xl font-bold">{advancedMetrics.loadBalancingEfficiency.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Caching Effectiveness</p>
            <p className="text-xl font-bold">{advancedMetrics.cachingEffectiveness.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface CorrelationMatrixProps {
  correlationMatrix: NeuralAnalyticsReport['correlationMatrix'];
}

const CorrelationMatrix: React.FC<CorrelationMatrixProps> = ({ correlationMatrix }) => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Correlation Matrix</CardTitle>
        <CardDescription>Relationships between different metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th></th>
                {correlationMatrix.labels.map((label) => (
                  <th key={label} className="text-left py-2 px-4">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {correlationMatrix.labels.map((label, i) => (
                <tr key={label}>
                  <td className="py-2 px-4">{label}</td>
                  {correlationMatrix.values[i].map((value, j) => (
                    <td key={j} className="py-2 px-4">{value.toFixed(2)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

interface PerformanceTrendChartProps {
  forecastData: PerformanceTrend[];
}

const PerformanceTrendChart: React.FC<PerformanceTrendChartProps> = ({ forecastData }) => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Performance Trend Forecast</CardTitle>
        <CardDescription>Predicted performance trends for the next 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="metrics.predictedResponseTime" stroke="#8884d8" name="Response Time" />
            <Line type="monotone" dataKey="metrics.predictedErrorRate" stroke="#82ca9d" name="Error Rate" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

interface ModelPerformanceChartProps {
  mapData: NeuralAnalyticsReport['modelPerformance']['mapData'];
}

const ModelPerformanceChart: React.FC<ModelPerformanceChartProps> = ({ mapData }) => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Model Performance Metrics</CardTitle>
        <CardDescription>Visualization of key model performance indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mapData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="key" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const NeuralAnalyticsPanel = () => {
  const { analyticsData, loading, error } = useNeuralAnalytics();

  if (loading) {
    return <div>Loading analytics...</div>;
  }

  if (error || !analyticsData) {
    return <div>Failed to load analytics data</div>;
  }

  return (
    <div className="grid gap-4">
      {/* Replace the incorrect > symbol with &gt; in the JSX */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">CPU Utilization</p>
            <p className="text-2xl font-bold">{analyticsData.systemMetrics.cpuUtilization.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Memory Usage</p>
            <p className="text-2xl font-bold">{analyticsData.systemMetrics.memoryUtilization.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Response Time</p>
            <p className="text-2xl font-bold">{analyticsData.systemMetrics.responseTimeMs}ms</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Requests/sec</p>
            <p className="text-2xl font-bold">{analyticsData.systemMetrics.requestsPerSecond}&gt;/s</p>
          </div>
        </div>
      </Card>

      <ServiceMetrics serviceMetrics={analyticsData.serviceMetrics} />
      <SystemMetrics systemMetrics={analyticsData.systemMetrics} />
      <Anomalies anomalies={analyticsData.anomalies} />
      <Trends trends={analyticsData.trends} />
      <Recommendations recommendations={analyticsData.recommendations} />
      <ModelPerformance modelPerformance={analyticsData.modelPerformance} />
      <OperationalMetrics operationalMetrics={analyticsData.operationalMetrics} />
      <UsageMetrics usageMetrics={analyticsData.usageMetrics} />
      <AdvancedMetrics advancedMetrics={analyticsData.advancedMetrics} />
      <CorrelationMatrix correlationMatrix={analyticsData.correlationMatrix} />
      <PerformanceTrendChart forecastData={analyticsData.forecastData || []} />
      <ModelPerformanceChart mapData={analyticsData.modelPerformance.mapData} />
    </div>
  );
};

export default NeuralAnalyticsPanel;
