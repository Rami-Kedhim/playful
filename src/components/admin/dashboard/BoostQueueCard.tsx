
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertCircle, RefreshCcw, Settings } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import LoadingIndicator from '@/components/common/LoadingIndicator';
import Alert from '@/components/common/Alert';

interface BoostQueueCardProps {
  isFairRotationEnabled: boolean;
  setIsFairRotationEnabled: (value: boolean) => void;
}

const BoostQueueCard: React.FC<BoostQueueCardProps> = ({ 
  isFairRotationEnabled, 
  setIsFairRotationEnabled 
}) => {
  const [queueSize, setQueueSize] = useState(243);
  const [aiModels, setAiModels] = useState(96);
  const [realEscorts, setRealEscorts] = useState(147);
  const [aiRealRatio, setAiRealRatio] = useState(40); // Percentage of AI models (0-100)
  const [isUpdating, setIsUpdating] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Generate queue data simulation
  const generateQueueData = () => {
    setIsUpdating(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      try {
        // Simulate random failure (10% chance)
        if (Math.random() < 0.1) {
          throw new Error("Failed to fetch queue data");
        }
        
        // Generate new queue size (between 200-300)
        const newQueueSize = Math.floor(Math.random() * 100) + 200;
        
        // Calculate AI and real based on ratio
        const newAiModels = Math.floor(newQueueSize * aiRealRatio / 100);
        const newRealEscorts = newQueueSize - newAiModels;
        
        setQueueSize(newQueueSize);
        setAiModels(newAiModels);
        setRealEscorts(newRealEscorts);
        
        toast({
          title: "Queue Updated",
          description: `New queue size: ${newQueueSize} profiles`,
          variant: "success",
        });
      } catch (err: any) {
        console.error("Error generating queue data:", err);
        setError(err.message || "An error occurred while updating queue data");
        
        toast({
          title: "Update Failed",
          description: err.message || "Failed to update queue data",
          variant: "destructive",
        });
      } finally {
        setIsUpdating(false);
        setIsLoading(false);
      }
    }, 800);
  };
  
  // Apply AI/Real ratio
  const applyRatio = () => {
    try {
      // Validate ratio
      if (aiRealRatio < 0 || aiRealRatio > 100) {
        throw new Error("Ratio must be between 0-100%");
      }
      
      // Recalculate based on current queue size but new ratio
      const newAiModels = Math.floor(queueSize * aiRealRatio / 100);
      const newRealEscorts = queueSize - newAiModels;
      
      setAiModels(newAiModels);
      setRealEscorts(newRealEscorts);
      setIsConfiguring(false);
      
      toast({
        title: "Queue Ratio Updated",
        description: `AI: ${aiRealRatio}%, Real: ${100 - aiRealRatio}%`,
        variant: "success",
      });
    } catch (err: any) {
      console.error("Error applying ratio:", err);
      setError(err.message || "Failed to apply ratio");
      
      toast({
        title: "Update Failed",
        description: err.message || "Failed to update ratio",
        variant: "destructive",
      });
    }
  };
  
  // Toggle queue active state
  const toggleQueueActive = () => {
    try {
      setIsActive(!isActive);
      
      toast({
        title: isActive ? "Queue Paused" : "Queue Activated",
        description: isActive ? "The boost queue has been paused" : "The boost queue is now active",
        variant: isActive ? "warning" : "success",
      });
    } catch (err: any) {
      console.error("Error toggling queue state:", err);
      setError(err.message || "Failed to toggle queue state");
      
      toast({
        title: "Action Failed",
        description: "Failed to change queue state",
        variant: "destructive",
      });
    }
  };
  
  // Dismiss error message
  const handleDismissError = () => {
    setError(null);
  };
  
  // Initialize data on mount
  useEffect(() => {
    generateQueueData();
  }, []);
  
  // Toggle fair rotation
  const handleFairRotationToggle = (checked: boolean) => {
    try {
      setIsFairRotationEnabled(checked);
      
      toast({
        title: checked ? "Fair Rotation Enabled" : "Fair Rotation Disabled",
        description: checked 
          ? "Boost queue will now prioritize fair distribution" 
          : "Boost queue will follow standard allocation rules",
        variant: "success",
      });
    } catch (err: any) {
      console.error("Error toggling fair rotation:", err);
      setError(err.message || "Failed to toggle fair rotation");
      
      toast({
        title: "Action Failed",
        description: "Failed to change fair rotation setting",
        variant: "destructive",
      });
    }
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Boost Queue Size</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 pb-4">
          <LoadingIndicator size="sm" text="Loading queue data..." centered />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Boost Queue Size
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6"
              onClick={() => setIsConfiguring(!isConfiguring)}
            >
              <Settings className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={generateQueueData}
              disabled={isUpdating}
              className="h-6 w-6"
            >
              <RefreshCcw className={`h-3.5 w-3.5 ${isUpdating ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert
            variant="destructive"
            message={error}
            onClose={handleDismissError}
            className="mb-4"
            showIcon
          />
        )}
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{queueSize}</div>
          <Badge 
            variant={isActive ? "default" : "outline"}
            className={isActive ? "bg-green-500" : ""}
            onClick={toggleQueueActive}
          >
            {isActive ? 'Active' : 'Paused'}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {aiModels} AI models, {realEscorts} real escorts in queue
        </p>
        
        {isConfiguring && (
          <div className="mt-4 p-3 border rounded-md">
            <div className="text-xs font-medium mb-2">AI/Real Ratio Configuration</div>
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>AI Models: {aiRealRatio}%</span>
                  <span>Real Escorts: {100 - aiRealRatio}%</span>
                </div>
                <Slider
                  value={[aiRealRatio]}
                  onValueChange={(value) => setAiRealRatio(value[0])}
                  max={100}
                  step={5}
                />
              </div>
              <Button size="sm" onClick={applyRatio} className="w-full text-xs" disabled={isUpdating}>
                Apply Ratio
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="fair-rotation" 
                      checked={isFairRotationEnabled} 
                      onCheckedChange={handleFairRotationToggle} 
                      disabled={isUpdating}
                    />
                    <Label htmlFor="fair-rotation">Fair rotation enabled</Label>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-[220px]">
                  <p className="text-xs">When enabled, the system ensures fair distribution of visibility between AI and real profiles</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          {isFairRotationEnabled && (
            <div className="flex items-start gap-1 mt-2 text-xs text-amber-500">
              <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
              <span>Fair rotation might reduce total system efficiency by ~8%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostQueueCard;
