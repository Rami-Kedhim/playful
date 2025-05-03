
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Activity, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { neuralHub } from '@/services/neural/HermesOxumBrainHub';

// Define a proper type for log entries
interface LogEntry {
  timestamp: string;
  severity: string;
  module: string;
  message: string;
  // Optional fields that may be present in some log entries
  decision?: string;
  context?: any;
}

const ModuleActivityMonitor: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');

  useEffect(() => {
    // Fetch logs when component mounts
    if (neuralHub.getDecisionLogs) {
      neuralHub.getDecisionLogs().then(decisionLogs => {
        setLogs(decisionLogs as LogEntry[]);
      });
    }

    // Set up periodic refresh
    const intervalId = setInterval(() => {
      if (neuralHub.getDecisionLogs) {
        neuralHub.getDecisionLogs().then(decisionLogs => {
          setLogs(decisionLogs as LogEntry[]);
        });
      }
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const getBadgeVariant = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'error': return 'destructive';
      case 'warning': return 'warning';
      case 'info': return 'secondary';
      default: return 'secondary';
    }
  };

  const filteredLogs = activeTab === 'all' 
    ? logs 
    : logs.filter(log => log.severity.toLowerCase() === activeTab);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="h-5 w-5 mr-2" />
          Neural Activity Monitor
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="warning">Warnings</TabsTrigger>
            <TabsTrigger value="error">Errors</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-2 max-h-80 overflow-y-auto p-1">
          {filteredLogs.length === 0 ? (
            <Alert variant="default">
              <AlertDescription className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                No activity logs to display
              </AlertDescription>
            </Alert>
          ) : (
            filteredLogs.map((log, index) => (
              <div 
                key={index} 
                className="p-3 border rounded-md bg-background shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <Badge variant={getBadgeVariant(log.severity)}>{log.severity}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-sm font-medium">{log.module}</p>
                  <p className="text-sm">{log.message}</p>
                  
                  {/* Safe access to optional fields */}
                  {log.decision && (
                    <div className="mt-1 pt-1 border-t text-xs text-muted-foreground">
                      <p>Decision: {log.decision}</p>
                    </div>
                  )}
                  
                  {log.context && (
                    <div className="text-xs text-muted-foreground">
                      <p>Context: {typeof log.context === 'object' ? JSON.stringify(log.context) : log.context}</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleActivityMonitor;
