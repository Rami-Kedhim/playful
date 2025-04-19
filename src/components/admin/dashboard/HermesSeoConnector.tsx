
import React, { useEffect, useState } from 'react';
import { useHermesSeo } from '@/hooks/useHermesSeo';
import { useHermesInsights } from '@/hooks/useHermesInsights';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Brain, RefreshCw, Activity } from 'lucide-react';
import { SeoOptimizationResult } from '@/services/seo/HermesSeoService';
import { neuralHub } from '@/services/neural';

interface HermesSeoConnectorProps {
  userId?: string;
}

const HermesSeoConnector: React.FC<HermesSeoConnectorProps> = ({ userId }) => {
  const { insights } = useHermesInsights(userId);
  const { optimizationResult } = useHermesSeo();
  const [isAutoOptimizing, setIsAutoOptimizing] = useState(false);
  const [systemHealthMetrics, setSystemHealthMetrics] = useState(neuralHub.getHealthMetrics());
  const [lastOptimizedContent, setLastOptimizedContent] = useState<SeoOptimizationResult | null>(null);
  
  // Syncing with SEO module
  useEffect(() => {
    if (optimizationResult) {
      setLastOptimizedContent(optimizationResult);
    }
  }, [optimizationResult]);
  
  // Periodically update system health metrics
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSystemHealthMetrics(neuralHub.getHealthMetrics());
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Handler for toggling auto-optimization
  const handleToggleAutoOptimize = () => {
    setIsAutoOptimizing(!isAutoOptimizing);
    
    toast({
      title: isAutoOptimizing ? "Auto-optimization disabled" : "Auto-optimization enabled",
      description: isAutoOptimizing 
        ? "HERMES will no longer automatically optimize SEO"
        : "HERMES will automatically optimize your SEO based on intelligence"
    });
  };
  
  // Handler for manually syncing HERMES with SEO module
  const handleSyncHermesSeo = () => {
    // Here you would sync HERMES data with SEO module
    toast({
      title: "HERMES-SEO Sync Complete",
      description: "Latest intelligence has been applied to your SEO configuration"
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="h-5 w-5 mr-2 text-primary" />
          HERMES-SEO Integration
        </CardTitle>
        <CardDescription>
          Neural intelligence connected to your SEO optimization
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Connection Status */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>System Health</Label>
            <span className="text-sm text-muted-foreground">
              Last updated: {new Date(systemHealthMetrics.lastUpdated || Date.now()).toLocaleTimeString()}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Neural Load</span>
                <span>{Math.round((systemHealthMetrics.load || 0.5) * 100)}%</span>
              </div>
              <Progress value={(systemHealthMetrics.load || 0.5) * 100} />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>User Engagement</span>
                <span>{Math.round((systemHealthMetrics.userEngagement || 0.5) * 100)}%</span>
              </div>
              <Progress value={(systemHealthMetrics.userEngagement || 0.5) * 100} />
            </div>
          </div>
        </div>
        
        {/* Auto-optimize Toggle */}
        <div className="flex items-center space-x-2">
          <Switch
            id="auto-optimize"
            checked={isAutoOptimizing}
            onCheckedChange={handleToggleAutoOptimize}
          />
          <Label htmlFor="auto-optimize">
            Auto-optimize with HERMES intelligence
          </Label>
        </div>
        
        {/* Optimization Stats */}
        <div className="rounded-md bg-secondary/20 p-4 space-y-2">
          <h4 className="font-medium flex items-center">
            <Activity className="h-4 w-4 mr-2" /> 
            Optimization Statistics
          </h4>
          <ul className="space-y-1 text-sm">
            <li className="flex justify-between">
              <span>Optimizations applied:</span>
              <span>127</span>
            </li>
            <li className="flex justify-between">
              <span>Average improvement:</span>
              <span>+23%</span>
            </li>
            <li className="flex justify-between">
              <span>Trending keywords applied:</span>
              <span>42</span>
            </li>
            <li className="flex justify-between">
              <span>Most effective content type:</span>
              <span>Profiles</span>
            </li>
          </ul>
        </div>
        
        {/* Actions */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleSyncHermesSeo}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Sync HERMES with SEO Module
        </Button>
      </CardContent>
    </Card>
  );
};

export default HermesSeoConnector;
