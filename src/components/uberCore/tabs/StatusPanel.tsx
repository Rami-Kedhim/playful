
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Cpu, MessageSquare, Zap, Brain, Gauge, Database } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface StatusPanelProps {
  status: Record<string, any>;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ status }) => {
  // Calculate system health percentage
  const calculateHealthPercentage = () => {
    if (!status || !status.moduleStatuses) return 0;
    
    const activeModules = Object.values(status.moduleStatuses).filter(Boolean).length;
    const totalModules = Object.values(status.moduleStatuses).length;
    
    return totalModules > 0 ? Math.round((activeModules / totalModules) * 100) : 0;
  };

  const healthPercentage = calculateHealthPercentage();

  return (
    <div className="space-y-4">
      {/* System Health Overview */}
      <Card className="border-l-4" style={{ borderLeftColor: healthPercentage > 75 ? '#10b981' : healthPercentage > 50 ? '#f59e0b' : '#ef4444' }}>
        <CardHeader className="py-3">
          <CardTitle className="text-sm flex items-center">
            <Gauge className="h-4 w-4 mr-2 text-primary" />
            System Health Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Overall System Health</span>
              <span className="font-medium">{healthPercentage}%</span>
            </div>
            <Progress value={healthPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {healthPercentage > 75 ? 'System running optimally' : 
               healthPercentage > 50 ? 'System functioning with some inactive modules' : 
               'System requires attention - multiple modules inactive'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm flex items-center">
              <Activity className="h-4 w-4 mr-2 text-primary" />
              System Uptime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {status.uptime ? `${status.uptime}s` : 'N/A'}
            </div>
            {status.uptime && (
              <div className="text-xs text-muted-foreground mt-1">
                {status.uptime > 3600 ? `${Math.floor(status.uptime / 3600)}h ${Math.floor((status.uptime % 3600) / 60)}m` : 
                 status.uptime > 60 ? `${Math.floor(status.uptime / 60)}m ${status.uptime % 60}s` : 
                 `${status.uptime} seconds`}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm flex items-center">
              <Cpu className="h-4 w-4 mr-2 text-primary" />
              Performance Mode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {status.performanceMode || 'N/A'}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {status.performanceMode === 'balanced' ? 'Balanced speed and accuracy' :
               status.performanceMode === 'efficiency' ? 'Optimized for speed and resource usage' :
               status.performanceMode === 'quality' ? 'Optimized for accuracy and quality' : ''}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm flex items-center">
              <MessageSquare className="h-4 w-4 mr-2 text-primary" />
              Events Processed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {status.eventCount || '0'}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Total events through UberCore
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm flex items-center">
              <Zap className="h-4 w-4 mr-2 text-primary" />
              Active Modules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {status.activeModules?.length || '0'}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Of {Object.keys(status.moduleStatuses || {}).length} total modules
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Advanced Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Module Status Panel */}
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Module Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {status.moduleStatuses && Object.entries(status.moduleStatuses).map(([module, enabled]) => (
                <div key={module} className="flex items-center justify-between border-b pb-2">
                  <span className="flex items-center">
                    {module === 'logic' && <Brain className="h-4 w-4 mr-2 text-blue-500" />}
                    {module === 'emotional' && <Activity className="h-4 w-4 mr-2 text-pink-500" />}
                    {module === 'ethics' && <Database className="h-4 w-4 mr-2 text-green-500" />}
                    {module === 'bridge' && <MessageSquare className="h-4 w-4 mr-2 text-amber-500" />}
                    <span className="capitalize">{module} Module</span>
                  </span>
                  <Badge variant={enabled ? "default" : "secondary"} className={enabled ? "bg-green-500" : ""}>
                    {enabled ? "Active" : "Inactive"}
                  </Badge>
                </div>
              ))}
              {(!status.moduleStatuses || Object.keys(status.moduleStatuses).length === 0) && (
                <div className="text-center py-3 text-muted-foreground">
                  No module data available
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Advanced System Metrics */}
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Advanced System Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {status.patternsLearned !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-sm">Patterns Learned</span>
                  <Badge variant="outline">{status.patternsLearned}</Badge>
                </div>
              )}
              
              {status.emotionalProfilesCount !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-sm">Emotional Profiles</span>
                  <Badge variant="outline">{status.emotionalProfilesCount}</Badge>
                </div>
              )}
              
              {status.ethicalGuidelinesCount !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-sm">Ethical Guidelines</span>
                  <Badge variant="outline">{status.ethicalGuidelinesCount}</Badge>
                </div>
              )}
              
              {(!status.patternsLearned && !status.emotionalProfilesCount && !status.ethicalGuidelinesCount) && (
                <div className="text-center py-3 text-muted-foreground">
                  No advanced metrics available
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatusPanel;
