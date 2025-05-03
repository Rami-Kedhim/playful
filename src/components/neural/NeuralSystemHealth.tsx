
import React, { useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, AlertTriangle, Server, Activity } from 'lucide-react';
import { useNeuralSystemMonitor } from '@/hooks/useNeuralSystemMonitor';
import { toast } from '@/components/ui/use-toast';

interface NeuralSystemHealthProps {
  className?: string;
  showDetails?: boolean;
}

/**
 * Component that displays the current health of the neural system
 */
export const NeuralSystemHealth: React.FC<NeuralSystemHealthProps> = ({
  className = '',
  showDetails = false
}) => {
  const handleAlert = useCallback((alerts: string[]) => {
    if (alerts.length > 0) {
      toast({
        variant: "destructive",
        title: "Neural System Alert",
        description: alerts[0] + (alerts.length > 1 ? ` (+${alerts.length - 1} more)` : ''),
      });
    }
  }, []);
  
  const {
    performanceReport,
    systemStatus,
    isLoading,
    error,
    refreshData
  } = useNeuralSystemMonitor({
    autoStart: true,
    monitorInterval: 60000,
    onAlert: handleAlert
  });
  
  // Determine overall health status
  const getHealthStatus = () => {
    if (error || !systemStatus || !systemStatus.operational) {
      return 'error';
    }
    
    if (!performanceReport) {
      return 'unknown';
    }
    
    const health = performanceReport.overallHealth;
    if (health > 80) return 'healthy';
    if (health > 50) return 'warning';
    return 'critical';
  };
  
  const healthStatus = getHealthStatus();
  
  // Status icon based on health
  const StatusIcon = () => {
    switch (healthStatus) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'critical':
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Server className="h-5 w-5 text-gray-500" />;
    }
  };

  // Status badge
  const StatusBadge = () => {
    let variant: 'default' | 'outline' | 'secondary' | 'destructive' = 'default';
    
    switch (healthStatus) {
      case 'healthy':
        variant = 'default';
        break;
      case 'warning':
        variant = 'secondary';
        break;
      case 'critical':
      case 'error':
        variant = 'destructive';
        break;
    }
    
    return (
      <Badge variant={variant} className="ml-2">
        {healthStatus.charAt(0).toUpperCase() + healthStatus.slice(1)}
      </Badge>
    );
  };
  
  if (error) {
    return (
      <Alert variant="destructive" className={className}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          Neural System Health
          <StatusBadge />
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {isLoading && !performanceReport ? (
          <div className="flex items-center justify-center py-4">
            <div className="w-6 h-6 border-2 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
            <span className="ml-2">Loading system health...</span>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Health Overview */}
            <div className="flex items-center space-x-2">
              <StatusIcon />
              <span className="font-medium">
                System is {systemStatus?.operational ? 'operational' : 'degraded'}
              </span>
            </div>
            
            {performanceReport && (
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span>Overall Health</span>
                  <span>{performanceReport.overallHealth.toFixed(0)}%</span>
                </div>
                <Progress 
                  value={performanceReport.overallHealth} 
                  className="h-2" 
                />
              </div>
            )}
            
            {/* System Metrics */}
            {performanceReport && performanceReport.systemMetrics && (
              <div className="space-y-3 mt-4">
                <h4 className="text-sm font-medium">System Metrics</h4>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <div className="flex items-center">
                        <Server className="h-3 w-3 mr-1" />
                        <span>CPU Usage</span>
                      </div>
                      <span>{performanceReport.systemMetrics.cpuUsage}%</span>
                    </div>
                    <Progress value={performanceReport.systemMetrics.cpuUsage} className="h-1.5" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <div className="flex items-center">
                        <Activity className="h-3 w-3 mr-1" />
                        <span>Memory</span>
                      </div>
                      <span>{performanceReport.systemMetrics.memoryUsage}%</span>
                    </div>
                    <Progress value={performanceReport.systemMetrics.memoryUsage} className="h-1.5" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>Operations: {performanceReport.systemMetrics.operationsPerSecond}/s</div>
                  <div>Response: {performanceReport.systemMetrics.responseTime} ms</div>
                  <div>Error Rate: {performanceReport.systemMetrics.errorRate}%</div>
                </div>
              </div>
            )}
            
            {/* Service Status */}
            {showDetails && performanceReport && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Service Status</h4>
                <div className="space-y-2">
                  {Object.entries(performanceReport.services).map(([id, service]) => (
                    <div key={id} className="flex justify-between text-xs">
                      <span className="font-medium">{id}</span>
                      <Badge 
                        variant={
                          service.status === 'active' ? 'default' : 
                          service.status === 'error' ? 'destructive' : 'secondary'
                        }
                        className="text-xs h-5"
                      >
                        {service.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Recommendations */}
            {performanceReport && performanceReport.recommendations.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-1">Recommendations</h4>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  {performanceReport.recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="text-xs text-gray-500 mt-2">
              Last updated: {performanceReport ? new Date(performanceReport.timestamp).toLocaleTimeString() : 'N/A'}
            </div>
            
            <button 
              onClick={() => refreshData()}
              className="text-xs text-blue-500 hover:underline mt-2"
            >
              Refresh data
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NeuralSystemHealth;
