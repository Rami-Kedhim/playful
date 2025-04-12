
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Zap, X, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { Livecam } from '@/types/livecams';
import { GLOBAL_UBX_RATE } from '@/utils/oxum/globalPricing';
import UBXPriceDisplay from '@/components/oxum/UBXPriceDisplay';

interface LivecamBoostControlsProps {
  livecam: Livecam;
  isBoosted: boolean;
  onBoost: (livecamId: string, intensity: number, durationHours: number) => boolean;
  onCancel: (livecamId: string) => boolean;
}

const LivecamBoostControls = ({
  livecam,
  isBoosted,
  onBoost,
  onCancel
}: LivecamBoostControlsProps) => {
  const [boostIntensity, setBoostIntensity] = useState(30); // Default intensity
  const [boostDuration, setBoostDuration] = useState(24); // Default duration in hours
  
  const handleBoost = () => {
    onBoost(livecam.id, boostIntensity, boostDuration);
  };
  
  const handleCancel = () => {
    onCancel(livecam.id);
  };
  
  if (isBoosted) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-yellow-500" 
              onClick={handleCancel}
            >
              <X className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Cancel boost</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Zap className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Boost this livecam</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Boost Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="px-3 py-2">
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-xs">Boost Intensity</span>
              <span className="text-xs font-medium">{boostIntensity}%</span>
            </div>
            <Slider 
              value={[boostIntensity]}
              min={10}
              max={100}
              step={10}
              onValueChange={(value) => setBoostIntensity(value[0])}
              className="mb-1"
            />
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-xs">Duration</span>
              <span className="text-xs font-medium">{boostDuration} hours</span>
            </div>
            <Slider 
              value={[boostDuration]}
              min={1}
              max={72}
              step={1}
              onValueChange={(value) => setBoostDuration(value[0])}
              className="mb-1"
            />
          </div>
          
          <div className="flex justify-between text-xs mb-2 mt-3">
            <span>Fixed Price (Oxum Rule #001):</span>
            <UBXPriceDisplay 
              amount={GLOBAL_UBX_RATE} 
              size="sm" 
              isGlobalPrice={true} 
              showTooltip={true}
              showConversion={false}
            />
          </div>
        </div>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button 
            variant="default" 
            size="sm" 
            className="w-full cursor-pointer"
            onClick={handleBoost}
          >
            <Zap className="h-3 w-3 mr-1" /> Boost Now
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LivecamBoostControls;
