
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Zap } from "lucide-react";
import { Livecam } from "@/types/livecams";

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
  const [open, setOpen] = useState(false);
  const [intensity, setIntensity] = useState(30);
  const [duration, setDuration] = useState(24);
  
  const handleBoost = () => {
    const success = onBoost(livecam.id, intensity, duration);
    if (success) {
      setOpen(false);
    }
  };
  
  const handleCancel = () => {
    const success = onCancel(livecam.id);
    if (success) {
      setOpen(false);
    }
  };
  
  return (
    <>
      <Button 
        variant={isBoosted ? "destructive" : "outline"} 
        size="sm" 
        className="flex items-center gap-1"
        onClick={() => setOpen(true)}
      >
        <Zap className="h-4 w-4" />
        {isBoosted ? "Cancel Boost" : "Boost Stream"}
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isBoosted ? "Cancel Stream Boost" : "Boost This Stream"}
            </DialogTitle>
          </DialogHeader>
          
          {!isBoosted ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="intensity">Boost Intensity: {intensity}</Label>
                <Slider
                  id="intensity"
                  min={10}
                  max={50}
                  step={5}
                  value={[intensity]}
                  onValueChange={(value) => setIntensity(value[0])}
                />
                <p className="text-xs text-muted-foreground">Higher intensity means more visibility in listings</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (hours): {duration}</Label>
                <Slider
                  id="duration"
                  min={1}
                  max={72}
                  step={1}
                  value={[duration]}
                  onValueChange={(value) => setDuration(value[0])}
                />
                <p className="text-xs text-muted-foreground">How long the boost will remain active</p>
              </div>
            </div>
          ) : (
            <p>Are you sure you want to cancel the boost for {livecam.name || livecam.username}?</p>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant={isBoosted ? "destructive" : "default"} 
              onClick={isBoosted ? handleCancel : handleBoost}
            >
              {isBoosted ? "Cancel Boost" : "Apply Boost"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LivecamBoostControls;
