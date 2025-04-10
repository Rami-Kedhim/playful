
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Cpu, Activity, Network, MessageSquare, BarChart2, AlarmCheck, Users, Zap, Brain } from 'lucide-react';

interface StatusPanelProps {
  status: Record<string, any>;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ status }) => {
  const metrics = {
    systemLoad: status.moduleStatuses?.logic ? 78 : 0,
    uptime: status.uptime || 0,
    activeModules: status.activeModules || [],
    eventCount: status.eventCount || 0,
    patternsLearned: status.patternsLearned || 0,
    emotionalProfilesCount: status.emotionalProfilesCount || 0,
    ethicalGuidelinesCount: status.ethicalGuidelinesCount || 0,
    hermesEfficiency: 91,
    oxumPrecision: 86
  };

  const formatUptime = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ${seconds % 60}s`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ${minutes % 60}m`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  };

  return (
    <div className="space-y-4">
      {/* System Overview Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md flex items-center">
            <Activity className="h-4 w-4 mr-2 text-primary" />
            System Overview
          </CardTitle>
          <CardDescription>
            Current neural architecture operational metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-md">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-muted-foreground">System Load</div>
                <Cpu className="h-4 w-4 text-primary/70" />
              </div>
              <div className="text-2xl font-bold">{metrics.systemLoad}%</div>
              <Progress value={metrics.systemLoad} className="mt-2 h-1" />
            </div>
            
            <div className="p-4 border rounded-md">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-muted-foreground">Uptime</div>
                <AlarmCheck className="h-4 w-4 text-primary/70" />
              </div>
              <div className="text-2xl font-bold">{formatUptime(metrics.uptime)}</div>
              <div className="text-xs text-muted-foreground mt-2">Online and functioning</div>
            </div>
            
            <div className="p-4 border rounded-md">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-muted-foreground">Active Modules</div>
                <Network className="h-4 w-4 text-primary/70" />
              </div>
              <div className="text-2xl font-bold">{metrics.activeModules.length}</div>
              <div className="text-xs text-muted-foreground mt-2">All systems operational</div>
            </div>
            
            <div className="p-4 border rounded-md">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-muted-foreground">Event Count</div>
                <BarChart2 className="h-4 w-4 text-primary/70" />
              </div>
              <div className="text-2xl font-bold">{metrics.eventCount.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-2">System events processed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Components Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <MessageSquare className="h-4 w-4 mr-2 text-primary" />
              Logic Module
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-sm">Status</div>
                <Badge variant={status.moduleStatuses?.logic ? "success" : "destructive"}>
                  {status.moduleStatuses?.logic ? "Online" : "Offline"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">Learned Patterns</div>
                <div className="text-sm font-medium">{metrics.patternsLearned.toLocaleString()}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">Performance Mode</div>
                <Badge variant="outline">
                  {status.performanceMode || "Balanced"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">Oxum Precision</div>
                <div className="text-sm font-medium">{metrics.oxumPrecision}%</div>
              </div>
              <Progress value={metrics.oxumPrecision} className="h-1" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <Users className="h-4 w-4 mr-2 text-primary" />
              Emotional Module
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-sm">Status</div>
                <Badge variant={status.moduleStatuses?.emotional ? "success" : "destructive"}>
                  {status.moduleStatuses?.emotional ? "Online" : "Offline"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">Emotional Profiles</div>
                <div className="text-sm font-medium">{metrics.emotionalProfilesCount.toLocaleString()}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">Dominant Emotion</div>
                <Badge variant="outline">Curiosity</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">Adaptation Quality</div>
                <div className="text-sm font-medium">83%</div>
              </div>
              <Progress value={83} className="h-1" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <Brain className="h-4 w-4 mr-2 text-primary" />
              HERMES Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-sm">Status</div>
                <Badge variant="success">Online</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">Efficiency Rating</div>
                <div className="text-sm font-medium">{metrics.hermesEfficiency}%</div>
              </div>
              <Progress value={metrics.hermesEfficiency} className="h-1" />
              <div className="flex justify-between items-center">
                <div className="text-sm">Active Optimizations</div>
                <div className="text-sm font-medium">4</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">Boost Allocation</div>
                <div className="text-sm font-medium">Dynamic</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Integration Status */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md flex items-center">
            <Zap className="h-4 w-4 mr-2 text-primary" />
            Integration Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="text-sm">Ethics Module</div>
                <Badge variant={status.moduleStatuses?.ethics ? "success" : "destructive"}>
                  {status.moduleStatuses?.ethics ? "Online" : "Offline"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">Bridge Module</div>
                <Badge variant={status.moduleStatuses?.bridge ? "success" : "destructive"}>
                  {status.moduleStatuses?.bridge ? "Online" : "Offline"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">Ethical Guidelines</div>
                <div className="text-sm font-medium">{metrics.ethicalGuidelinesCount.toLocaleString()}</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="text-sm">UberCore → HERMES</div>
                <Badge variant="success">Connected</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">UberCore → Oxum</div>
                <Badge variant="success">Connected</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">HERMES → Oxum</div>
                <Badge variant="success">Connected</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusPanel;
