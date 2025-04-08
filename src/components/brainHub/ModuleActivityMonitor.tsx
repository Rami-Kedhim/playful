
import React, { useState, useEffect } from 'react';
import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import autonomyEngine from '@/services/neural/BrainHubAutonomyEngine';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, Clock, Check, AlertTriangle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActivityEvent {
  id: string;
  timestamp: Date;
  module: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  details?: string;
}

const ModuleActivityMonitor: React.FC = () => {
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  
  // Initial events load
  useEffect(() => {
    // Get decision logs from the Brain Hub
    const decisions = brainHub.getDecisionLogs();
    
    // Get recent autonomy decisions
    const autonomyDecisions = autonomyEngine.getRecentDecisions(10);
    
    // Convert decisions to activity events
    const brainHubEvents: ActivityEvent[] = decisions.map(decision => ({
      id: `bh_${decision.timestamp}`,
      timestamp: new Date(decision.timestamp),
      module: 'Brain Hub Core',
      type: 'info',
      message: `Decision: ${decision.decision}`,
      details: decision.context ? JSON.stringify(decision.context) : undefined
    }));
    
    const autonomyEvents: ActivityEvent[] = autonomyDecisions.map(decision => ({
      id: decision.id,
      timestamp: decision.timestamp,
      module: decision.moduleId,
      type: decision.confidence > 0.8 ? 'success' : decision.confidence > 0.6 ? 'info' : 'warning',
      message: decision.description,
      details: `Confidence: ${decision.confidence}, Impact: ${decision.impact}`
    }));
    
    // Combine and sort events by timestamp (newest first)
    const allEvents = [...brainHubEvents, ...autonomyEvents].sort((a, b) => 
      b.timestamp.getTime() - a.timestamp.getTime()
    );
    
    setEvents(allEvents);
    
    // Start activity polling
    const interval = setInterval(() => {
      if (isMonitoring) {
        // In a real system, this would poll for new events
        // For now, we'll just add a simulated event occasionally
        if (Math.random() > 0.7) {
          const eventTypes = ['info', 'success', 'warning', 'error'] as const;
          const modules = ['Neural Core', 'Autonomy Engine', 'Security Monitor', 'User Intelligence'];
          const messages = [
            'Processing request',
            'Optimization complete',
            'High resource usage detected',
            'User pattern analyzed',
            'Decision recorded',
            'Anomaly detected'
          ];
          
          const newEvent: ActivityEvent = {
            id: `event_${Date.now()}`,
            timestamp: new Date(),
            module: modules[Math.floor(Math.random() * modules.length)],
            type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
            message: messages[Math.floor(Math.random() * messages.length)]
          };
          
          setEvents(prev => [newEvent, ...prev].slice(0, 50)); // Keep max 50 events
        }
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isMonitoring]);
  
  // Toggle monitoring state
  const toggleMonitoring = () => {
    setIsMonitoring(prev => !prev);
  };
  
  // Clear all events
  const clearEvents = () => {
    setEvents([]);
  };
  
  // Function to render event icon based on type
  const renderEventIcon = (type: ActivityEvent['type']) => {
    switch (type) {
      case 'success':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-lg">
              <Activity className="mr-2 h-5 w-5" /> 
              Module Activity
            </CardTitle>
            <CardDescription>Real-time system events and actions</CardDescription>
          </div>
          <Badge variant={isMonitoring ? "success" : "secondary"}>
            {isMonitoring ? "Live" : "Paused"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-[280px] px-4">
          {events.length > 0 ? (
            <div className="space-y-3 py-2">
              {events.map((event) => (
                <div key={event.id} className="border-b border-border pb-2 last:border-0">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5">{renderEventIcon(event.type)}</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{event.module}</span>
                        <span className="text-xs text-muted-foreground">
                          <Clock className="inline h-3 w-3 mr-1" />
                          {event.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm">{event.message}</p>
                      {event.details && (
                        <p className="text-xs text-muted-foreground">{event.details}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              No activity recorded yet
            </div>
          )}
        </ScrollArea>
      </CardContent>
      
      <CardFooter className="pt-2 border-t flex justify-between">
        <Button 
          variant="outline" 
          size="sm"
          onClick={toggleMonitoring}
        >
          {isMonitoring ? "Pause" : "Resume"}
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={clearEvents}
        >
          Clear
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModuleActivityMonitor;
