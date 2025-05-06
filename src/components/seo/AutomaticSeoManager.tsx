
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Activity, CheckCircle2, Clock, RefreshCw, Settings } from 'lucide-react';
import { automaticSeoService } from '@/services/seo/AutomaticSeoService';
import { useToast } from '@/components/ui/use-toast';

interface AutomaticSeoManagerProps {
  onSettingsClick?: () => void;
}

/**
 * Automatic SEO Manager component that provides controls and status 
 * for the automated SEO optimization service
 */
const AutomaticSeoManager: React.FC<AutomaticSeoManagerProps> = ({ onSettingsClick }) => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [queueLength, setQueueLength] = useState(0);
  const [interval, setInterval] = useState(3600000); // 1 hour default
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastScanTime, setLastScanTime] = useState<Date | null>(null);
  
  // Load status on mount
  useEffect(() => {
    const status = automaticSeoService.getStatus();
    setIsActive(status.active);
    setQueueLength(status.queueLength);
    setInterval(status.interval);
    setIsProcessing(status.processing);
  }, []);
  
  // Update status every 5 seconds
  useEffect(() => {
    const statusTimer = setInterval(() => {
      const status = automaticSeoService.getStatus();
      setQueueLength(status.queueLength);
      setIsProcessing(status.processing);
    }, 5000);
    
    return () => clearInterval(statusTimer);
  }, []);
  
  // Toggle automatic SEO
  const handleToggleAutoSeo = () => {
    if (isActive) {
      automaticSeoService.stopAutoMonitoring();
      setIsActive(false);
      toast({
        title: "Automatic SEO Disabled",
        description: "SEO monitoring and optimization has been disabled",
      });
    } else {
      automaticSeoService.startAutoMonitoring(interval);
      setIsActive(true);
      setLastScanTime(new Date());
      toast({
        title: "Automatic SEO Enabled",
        description: "SEO monitoring and optimization has started",
        variant: "success",
      });
    }
  };
  
  // Run manual scan
  const handleRunScan = async () => {
    toast({
      title: "SEO Scan Started",
      description: "Scanning site for SEO optimization opportunities...",
    });
    
    try {
      setLastScanTime(new Date());
      await automaticSeoService.performSiteScan();
      
      toast({
        title: "SEO Scan Complete",
        description: `Found ${queueLength} items to optimize`,
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "SEO Scan Failed",
        description: "There was an error performing the SEO scan",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="h-5 w-5 mr-2 text-primary" />
            Automatic SEO Manager
          </div>
          {isActive && (
            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
              Active
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Continuously monitor and optimize SEO across the entire ecosystem
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch 
              id="auto-seo"
              checked={isActive}
              onCheckedChange={handleToggleAutoSeo}
            />
            <Label htmlFor="auto-seo">Enable automatic SEO optimization</Label>
          </div>
          
          <Button variant="outline" size="sm" onClick={onSettingsClick}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Status Card */}
          <div className="bg-muted/50 p-3 rounded-lg flex flex-col justify-between">
            <span className="text-xs text-muted-foreground">Status</span>
            <div className="flex items-center mt-2">
              <div className={`h-2 w-2 rounded-full mr-2 ${isActive ? 'bg-green-500' : 'bg-amber-500'}`} />
              <span className="font-medium">{isActive ? 'Active' : 'Disabled'}</span>
            </div>
          </div>
          
          {/* Processing Status */}
          <div className="bg-muted/50 p-3 rounded-lg flex flex-col justify-between">
            <span className="text-xs text-muted-foreground">Queue</span>
            <div className="flex items-center mt-2">
              {isProcessing ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin text-primary" />
              ) : (
                <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
              )}
              <span className="font-medium">
                {isProcessing 
                  ? `Processing (${queueLength} left)`
                  : queueLength > 0 
                    ? `${queueLength} waiting` 
                    : 'All processed'
                }
              </span>
            </div>
          </div>
          
          {/* Last Scan */}
          <div className="bg-muted/50 p-3 rounded-lg flex flex-col justify-between">
            <span className="text-xs text-muted-foreground">Last Scan</span>
            <div className="flex items-center mt-2">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="font-medium">
                {lastScanTime 
                  ? lastScanTime.toLocaleTimeString() 
                  : 'Never'
                }
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex justify-between text-sm">
            <span>System-wide SEO health</span>
            <span className="font-medium">78%</span>
          </div>
          <Progress value={78} className="h-2" />
        </div>
        
        <Button onClick={handleRunScan} disabled={isProcessing} className="w-full">
          {isProcessing ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Run SEO Scan Now"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AutomaticSeoManager;
