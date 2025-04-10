
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Cpu, MessageSquare, Zap } from 'lucide-react';

interface StatusPanelProps {
  status: Record<string, any>;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ status }) => {
  return (
    <div className="space-y-4">
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
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm">Module Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {status.moduleStatuses && Object.entries(status.moduleStatuses).map(([module, enabled]) => (
              <div key={module} className="flex items-center justify-between border-b pb-2">
                <span className="capitalize">{module} Module</span>
                <Badge variant={enabled ? "default" : "secondary"}>
                  {enabled ? "Active" : "Inactive"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusPanel;
