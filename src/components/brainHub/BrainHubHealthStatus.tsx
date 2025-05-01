
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { checkBrainHubHealth } from '@/services/brainHubHealth';
import { BrainHubHealth } from '@/types/brainHubHealth';

const BrainHubHealthStatus: React.FC = () => {
  const [healthStatus, setHealthStatus] = useState<BrainHubHealth | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Changed from "loading" to true
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealthStatus = () => {
      try {
        const status = checkBrainHubHealth();
        setHealthStatus(status);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch Brain Hub health status');
        setLoading(false);
      }
    };

    fetchHealthStatus();
    const intervalId = setInterval(fetchHealthStatus, 60000); // Refresh every minute

    return () => clearInterval(intervalId);
  }, []);

  const getStatusIcon = () => {
    if (loading) return <Info className="h-6 w-6 text-blue-500 animate-pulse" />;
    if (!healthStatus) return <AlertCircle className="h-6 w-6 text-red-500" />;

    switch (healthStatus.status) {
      case 'healthy':
      case 'online':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'warning':
      case 'degraded':
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case 'error':
      case 'offline':
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      case 'maintenance':
        return <Info className="h-6 w-6 text-blue-500" />;
      default:
        return <Info className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    if (loading || !healthStatus) return 'bg-gray-100';

    switch (healthStatus.status) {
      case 'healthy':
      case 'online':
        return 'bg-green-100 border-green-300';
      case 'warning':
      case 'degraded':
        return 'bg-yellow-100 border-yellow-300';
      case 'error':
      case 'offline':
        return 'bg-red-100 border-red-300';
      case 'maintenance':
        return 'bg-blue-100 border-blue-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Brain Hub Health Status</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
            <p>Checking status...</p>
          </div>
        ) : (
          <>
            <div className={`p-4 rounded-md border ${getStatusColor()}`}>
              <div className="flex items-center space-x-3">
                {getStatusIcon()}
                <div>
                  <h3 className="font-medium">
                    Status: {healthStatus?.status.charAt(0).toUpperCase() + healthStatus?.status.slice(1)}
                  </h3>
                  {healthStatus?.message && <p className="text-sm">{healthStatus.message}</p>}
                </div>
              </div>
            </div>

            {healthStatus?.metrics && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium">System Metrics</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>CPU Usage: {healthStatus.metrics.cpuUsage.toFixed(1)}%</div>
                  <div>Memory: {healthStatus.metrics.memoryUsage.toFixed(1)}%</div>
                  <div>Requests/min: {healthStatus.metrics.requestsPerMinute}</div>
                  <div>Last optimized: {new Date(healthStatus.metrics.lastOptimized).toLocaleTimeString()}</div>
                </div>

                {healthStatus.metrics.neuralMetrics && (
                  <div className="mt-2">
                    <h4 className="text-sm font-medium">Neural Performance</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Accuracy: {(healthStatus.metrics.neuralMetrics.accuracy * 100).toFixed(1)}%</div>
                      <div>Efficiency: {(healthStatus.metrics.neuralMetrics.efficiency * 100).toFixed(1)}%</div>
                      <div>Latency: {healthStatus.metrics.neuralMetrics.latency}ms</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {healthStatus?.warnings && healthStatus.warnings.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-yellow-800">Warnings</h4>
                <ul className="list-disc list-inside text-sm text-yellow-800">
                  {healthStatus.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}

            {healthStatus?.errors && healthStatus.errors.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-red-800">Errors</h4>
                <ul className="list-disc list-inside text-sm text-red-800">
                  {healthStatus.errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BrainHubHealthStatus;
