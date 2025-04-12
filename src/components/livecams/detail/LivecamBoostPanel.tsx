
import React, { useState } from "react";
import { LivecamModel } from "@/types/livecams";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Zap, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { formatDistanceToNow } from "date-fns";
import { GLOBAL_UBX_RATE } from "@/utils/oxum/globalPricing";

interface LivecamBoostPanelProps {
  model: LivecamModel;
  isBoosted?: boolean;
  boostStatus?: {
    timeRemaining?: number;
    intensity?: number;
  } | null;
  onBoost?: () => void;
  onCancelBoost?: () => void;
}

const LivecamBoostPanel: React.FC<LivecamBoostPanelProps> = ({ 
  model,
  isBoosted = false,
  boostStatus = null,
  onBoost = () => {},
  onCancelBoost = () => {}
}) => {
  const [boostIntensity, setBoostIntensity] = useState<number[]>([50]);
  
  // Calculate time remaining in format like "2 hours 30 minutes"
  const getTimeRemaining = () => {
    if (!boostStatus?.timeRemaining) return "None";
    
    // Convert to milliseconds and add to current time to get end time
    const endTime = new Date(Date.now() + boostStatus.timeRemaining * 1000);
    return formatDistanceToNow(endTime, { addSuffix: false });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-400">
            Stream Boost
          </h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Boost this stream to increase its visibility in search results and on the homepage.
                  Higher boost intensity gives greater visibility.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {isBoosted && boostStatus ? (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Boost Active</span>
                <span className="text-sm font-medium text-green-500">
                  {boostStatus.intensity}% Power
                </span>
              </div>
              <Progress value={boostStatus.intensity} className="h-2" />
            </div>
            
            <div className="bg-muted/40 rounded-md p-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Time Remaining:</span>
                <span className="font-medium">{getTimeRemaining()}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-muted-foreground">Viewers Gained:</span>
                <span className="font-medium text-green-500">+{Math.round(boostStatus.intensity / 2)}</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={onCancelBoost}
            >
              Cancel Boost
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Boost Intensity</span>
                <span className="text-sm font-medium">{boostIntensity[0]}%</span>
              </div>
              <Slider
                defaultValue={[50]}
                max={100}
                step={10}
                onValueChange={setBoostIntensity}
              />
            </div>
            
            <div className="flex items-center justify-between text-sm mb-4">
              <span>Cost:</span>
              <span className="font-medium">{GLOBAL_UBX_RATE} UBX</span>
            </div>
            
            <Button 
              className="w-full" 
              onClick={onBoost}
            >
              <Zap className="h-4 w-4 mr-2" />
              Boost Stream
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LivecamBoostPanel;
