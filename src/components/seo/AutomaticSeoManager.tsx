
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { automaticSeoService } from '@/services/seo/AutomaticSeoService';
import { Progress } from '@/components/ui/progress';
import { RefreshCw, PauseCircle, PlayCircle } from 'lucide-react';

interface AutomaticSeoStatus {
  active: boolean;
  queueLength: number;
  processing: boolean;
  lastScan: Date | null;
  optimizedPages: number;
}

const AutomaticSeoManager: React.FC = () => {
  const [status, setStatus] = useState<AutomaticSeoStatus>({
    active: false,
    queueLength: 0,
    processing: false,
    lastScan: null,
    optimizedPages: 0
  });

  // Update status periodically
  useEffect(() => {
    const updateStatus = () => {
      const currentStatus = automaticSeoService.getStatus();
      setStatus(currentStatus);
    };
    
    updateStatus(); // Initial update
    
    const interval = setInterval(updateStatus, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);
  
  // Toggle automatic SEO monitoring
  const toggleMonitoring = () => {
    if (status.active) {
      automaticSeoService.stopAutoMonitoring();
    } else {
      automaticSeoService.startAutoMonitoring();
    }
    
    // Update status immediately after toggle
    setStatus(automaticSeoService.getStatus());
  };
  
  // Trigger a manual scan
  const triggerManualScan = () => {
    automaticSeoService.performScan();
    // Update status immediately
    setStatus(automaticSeoService.getStatus());
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Automatic SEO Optimization</CardTitle>
            <CardDescription>Neural-powered SEO monitoring and optimization</CardDescription>
          </div>
          <Badge variant={status.active ? "default" : "outline"}>
            {status.active ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Automatic monitoring</span>
          <Switch 
            checked={status.active}
            onCheckedChange={toggleMonitoring}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Queue status</span>
            <span>{status.queueLength} pages waiting</span>
          </div>
          <Progress value={(1 - status.queueLength / 10) * 100} max={100} />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="border rounded-md p-3">
            <div className="text-sm text-muted-foreground">Last scan</div>
            <div className="font-medium">
              {status.lastScan ? new Date(status.lastScan).toLocaleString() : 'Never'}
            </div>
          </div>
          <div className="border rounded-md p-3">
            <div className="text-sm text-muted-foreground">Pages optimized</div>
            <div className="font-medium">{status.optimizedPages}</div>
          </div>
        </div>
        
        {status.processing && (
          <div className="flex items-center gap-2 text-amber-600 mt-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Processing queue...</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={triggerManualScan}
          disabled={status.processing}
        >
          Run Manual Scan
        </Button>
        <Button 
          variant={status.active ? "destructive" : "default"} 
          onClick={toggleMonitoring}
        >
          {status.active ? (
            <><PauseCircle className="mr-1 h-4 w-4" /> Pause Monitoring</>
          ) : (
            <><PlayCircle className="mr-1 h-4 w-4" /> Start Monitoring</>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AutomaticSeoManager;
