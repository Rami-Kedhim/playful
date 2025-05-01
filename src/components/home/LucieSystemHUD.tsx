
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, Shield, Activity, Zap, AlertTriangle, CheckCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { SystemStatus } from '@/types/shared';

interface LucieSystemHUDProps {
  systemStatus: SystemStatus | null;
  isLoading: boolean;
}

const LucieSystemHUD: React.FC<LucieSystemHUDProps> = ({ systemStatus, isLoading }) => {
  if (isLoading) {
    return (
      <section className="py-12">
        <Skeleton className="h-10 w-64 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </section>
    );
  }

  if (!systemStatus) return null;

  // Helper to determine status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'operational':
        return 'text-green-500';
      case 'warning':
        return 'text-amber-500';
      case 'error':
      case 'offline':
        return 'text-red-500';
      default:
        return 'text-blue-500';
    }
  };

  // Calculate overall system health percentage
  const overallHealth = systemStatus.operational ? 
    (systemStatus.metrics?.processingLoad || 0) > 80 ? 90 : 99 : 60;

  return (
    <section className="py-12">
      <div className="flex items-center gap-2 mb-6">
        <Cpu className="h-6 w-6 text-purple-500" />
        <h2 className="text-3xl font-bold">System Status</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-purple-600/20 bg-gradient-to-br from-purple-900/20 to-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-400" />
              Lucie AI Systems
            </CardTitle>
            <CardDescription>
              Last updated: {systemStatus.lastUpdated.toLocaleTimeString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <span>Conversation Model</span>
              <span className={getStatusColor(systemStatus.aiModels.conversation)}>
                {systemStatus.aiModels.conversation === 'active' ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <AlertTriangle className="h-5 w-5" />
                )}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Generation Engine</span>
              <span className={getStatusColor(systemStatus.aiModels.generation)}>
                {systemStatus.aiModels.generation === 'active' ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <AlertTriangle className="h-5 w-5" />
                )}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Analysis System</span>
              <span className={getStatusColor(systemStatus.aiModels.analysis)}>
                {systemStatus.aiModels.analysis === 'active' ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <AlertTriangle className="h-5 w-5" />
                )}
              </span>
            </div>
            
            <div className="pt-4 border-t border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">System Latency</span>
                <span className={`font-mono ${systemStatus.latency < 150 ? 'text-green-500' : 'text-amber-500'}`}>
                  {systemStatus.latency} ms
                </span>
              </div>
              <div className="bg-gray-700/50 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${systemStatus.latency < 150 ? 'bg-green-500' : 'bg-amber-500'}`}
                  style={{ width: `${Math.min(100, (systemStatus.latency / 5))}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-600/20 bg-gradient-to-br from-blue-900/20 to-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-400" />
              UberCore Status
            </CardTitle>
            <CardDescription>
              Core Subsystems Health Monitoring
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Overall System Health</span>
                <span className={`font-mono ${overallHealth > 90 ? 'text-green-500' : 'text-amber-500'}`}>
                  {overallHealth}%
                </span>
              </div>
              <div className="bg-gray-700/50 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    overallHealth > 90 ? 'bg-green-500' : 
                    overallHealth > 70 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${overallHealth}%` }}
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Active Sessions</span>
              <span className="font-mono text-blue-400">
                {systemStatus.metrics?.activeSessions || 0}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Processing Load</span>
              <span 
                className={`font-mono ${
                  (systemStatus.metrics?.processingLoad || 0) < 50 ? 'text-green-500' : 
                  (systemStatus.metrics?.processingLoad || 0) < 80 ? 'text-amber-500' : 'text-red-500'
                }`}
              >
                {systemStatus.metrics?.processingLoad || 0}%
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Response Time</span>
              <span 
                className={`font-mono ${
                  (systemStatus.metrics?.responseTime || 0) < 200 ? 'text-green-500' : 
                  (systemStatus.metrics?.responseTime || 0) < 500 ? 'text-amber-500' : 'text-red-500'
                }`}
              >
                {systemStatus.metrics?.responseTime || 0} ms
              </span>
            </div>
            
            <div className="pt-4 flex items-center justify-center gap-2">
              <Zap className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-400">
                All subsystems operational
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LucieSystemHUD;
