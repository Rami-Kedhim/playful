
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertCircle, InfoIcon, RefreshCcw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import LoadingIndicator from '@/components/common/LoadingIndicator';
import Alert from '@/components/common/Alert';

interface TimeImpactData {
  visibilityScore: number;
  peakTime: string;
  isCurrentlyPeak: boolean;
}

const TimeImpactCard: React.FC = () => {
  const [timeData, setTimeData] = useState<TimeImpactData>({
    visibilityScore: 78,
    peakTime: "20:00",
    isCurrentlyPeak: true
  });
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Simulate fetching time impact data
  const fetchTimeImpactData = () => {
    setIsUpdating(true);
    setError(null);
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        // Simulate random failure (10% chance)
        if (Math.random() < 0.1) {
          throw new Error("Failed to fetch time impact data");
        }
        
        // Generate a slightly different visibility score for demonstration
        const newScore = Math.floor(Math.random() * 15) + 70; // 70-85% range
        
        // Determine if current time is peak time
        const currentHour = new Date().getHours();
        const peakHour = parseInt(timeData.peakTime.split(':')[0], 10);
        const isPeakTime = Math.abs(currentHour - peakHour) <= 2; // Within 2 hours of peak
        
        setTimeData({
          visibilityScore: newScore,
          peakTime: timeData.peakTime,
          isCurrentlyPeak: isPeakTime
        });
        
        toast({
          title: "Time Impact Data Updated",
          description: `Current visibility score: ${newScore}%`,
        });
      } catch (err: any) {
        console.error("Error fetching time impact data:", err);
        setError(err.message || "An error occurred while updating time impact data");
        
        toast({
          title: "Update Failed",
          description: err.message || "Failed to update time impact data",
          variant: "destructive",
        });
      } finally {
        setIsUpdating(false);
        setIsLoading(false);
      }
    }, 800);
  };
  
  // Handle peak hour adjustment
  const handlePeakTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeData({
      ...timeData,
      peakTime: e.target.value
    });
  };
  
  // Save peak time changes
  const handleSavePeakTime = () => {
    try {
      // Validate the time format
      const [hours, minutes] = timeData.peakTime.split(':').map(num => parseInt(num, 10));
      if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        throw new Error("Invalid time format");
      }
      
      toast({
        title: "Peak Time Updated",
        description: `New peak time set to ${timeData.peakTime}`,
        variant: "success",
      });
      
      // Re-evaluate if we're in peak time
      const currentHour = new Date().getHours();
      const peakHour = parseInt(timeData.peakTime.split(':')[0], 10);
      const isPeakTime = Math.abs(currentHour - peakHour) <= 2;
      
      setTimeData({
        ...timeData,
        isCurrentlyPeak: isPeakTime
      });
    } catch (err: any) {
      console.error("Error saving peak time:", err);
      setError(err.message || "Invalid time format");
      
      toast({
        title: "Update Failed",
        description: err.message || "Failed to update peak time",
        variant: "destructive",
      });
    }
  };
  
  // Dismiss error message
  const handleDismissError = () => {
    setError(null);
  };
  
  // Initialize data when component mounts
  useEffect(() => {
    fetchTimeImpactData();
  }, []);
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Time-Based Impact</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 pb-4">
          <LoadingIndicator size="sm" text="Loading time impact data..." centered />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Time-Based Impact
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={fetchTimeImpactData}
            disabled={isUpdating}
            className="h-6 w-6"
          >
            <RefreshCcw className={`h-3.5 w-3.5 ${isUpdating ? 'animate-spin' : ''}`} />
          </Button>
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
          <div className="text-2xl font-bold">{timeData.visibilityScore}%</div>
          <Badge className={timeData.isCurrentlyPeak ? 'bg-green-500' : 'bg-blue-500'}>
            {timeData.isCurrentlyPeak ? 'Peak Time' : 'Off-Peak'}
          </Badge>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <p className="text-xs text-muted-foreground">
            Current time-of-day visibility multiplier
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-3 w-3 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>This score represents how visible profiles are based on current time of day. 
                Higher during peak hours.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="mt-4">
          <Label className="text-xs">Peak hours adjustment</Label>
          <div className="flex gap-2 mt-1">
            <Input 
              type="time" 
              value={timeData.peakTime} 
              onChange={handlePeakTimeChange} 
              className="flex-1"
            />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSavePeakTime}
              className="text-xs"
              disabled={isUpdating}
            >
              Apply
            </Button>
          </div>
          <p className="text-xs mt-1 text-muted-foreground">
            Set peak traffic hours to maximize visibility
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeImpactCard;
