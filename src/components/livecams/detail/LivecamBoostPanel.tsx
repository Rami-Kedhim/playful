
import React, { useState } from "react";
import { LivecamModel } from "@/types/livecams";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Clock, ChevronDown, ChevronUp, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

interface LivecamBoostPanelProps {
  model: LivecamModel;
  isBoosted: boolean;
  boostStatus: {
    timeRemaining?: number;
    intensity?: number;
  } | null;
  onBoost: () => void;
  onCancelBoost: () => void;
}

const LivecamBoostPanel: React.FC<LivecamBoostPanelProps> = ({
  model,
  isBoosted,
  boostStatus,
  onBoost,
  onCancelBoost,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [customBoostIntensity, setCustomBoostIntensity] = useState(30);
  
  const formatTimeRemaining = (hours: number): string => {
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days} day${days !== 1 ? 's' : ''}`;
    }
    
    if (hours < 1) {
      return "Less than an hour";
    }
    
    return `${Math.round(hours)} hour${hours !== 1 ? 's' : ''}`;
  };
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Boost Profile</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setExpanded(!expanded)}
            className="h-8 w-8"
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        
        {isBoosted ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 flex items-center gap-1">
                <Zap className="h-3 w-3" />
                Active Boost
              </Badge>
              
              {boostStatus?.timeRemaining && (
                <span className="text-xs text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatTimeRemaining(boostStatus.timeRemaining)} remaining
                </span>
              )}
            </div>
            
            {boostStatus?.intensity && (
              <div className="pt-2">
                <div className="flex justify-between mb-1 text-xs">
                  <span>Boost Power</span>
                  <span className="font-medium">{boostStatus.intensity}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full" 
                    style={{ width: `${boostStatus.intensity}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <Button 
              variant="outline" 
              className="w-full mt-2" 
              onClick={onCancelBoost}
              size="sm"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel Boost
            </Button>
          </div>
        ) : (
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Increase {model.displayName}'s visibility in search results
            </p>
            
            {expanded && (
              <div className="space-y-3 mt-3">
                <div>
                  <div className="flex justify-between mb-1 text-xs">
                    <span>Boost Power</span>
                    <span className="font-medium">{customBoostIntensity}%</span>
                  </div>
                  <Slider 
                    value={[customBoostIntensity]}
                    min={10}
                    max={100}
                    step={10}
                    onValueChange={(value) => setCustomBoostIntensity(value[0])}
                  />
                </div>
                
                <Separator className="my-3" />
              </div>
            )}
            
            <Button 
              className="w-full mt-2"
              onClick={onBoost}
            >
              <Zap className="h-4 w-4 mr-2" />
              Boost Now
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LivecamBoostPanel;
