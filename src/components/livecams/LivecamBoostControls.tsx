
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Rocket, Zap } from "lucide-react";
import type { Livecam } from "@/types/livecams";

interface LivecamBoostControlsProps {
  livecam: Livecam;
  isBoosted: boolean;
  onBoost: (livecamId: string, intensity?: number, durationHours?: number) => boolean;
  onCancel: (livecamId: string) => boolean;
}

export const LivecamBoostControls = ({
  livecam,
  isBoosted,
  onBoost,
  onCancel
}: LivecamBoostControlsProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [boostIntensity, setBoostIntensity] = useState(30);
  const [boostDuration, setBoostDuration] = useState(24);
  const [activeTab, setActiveTab] = useState("packages");
  
  const handleBoost = (intensity: number, duration: number) => {
    onBoost(livecam.id, intensity, duration);
    setShowDialog(false);
  };
  
  const handleCancel = () => {
    onCancel(livecam.id);
    setShowDialog(false);
  };
  
  return (
    <>
      <Button
        size="sm"
        variant={isBoosted ? "destructive" : "default"}
        className="flex items-center gap-2"
        onClick={() => setShowDialog(true)}
      >
        <Zap size={16} />
        {isBoosted ? "Cancel Boost" : "Boost Stream"}
      </Button>
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isBoosted ? "Manage Boost" : "Boost This Livecam"}
            </DialogTitle>
            <DialogDescription>
              {isBoosted 
                ? "Manage or cancel your active boost"
                : `Boost ${livecam.name || livecam.username}'s visibility across the platform`}
            </DialogDescription>
          </DialogHeader>
          
          {isBoosted ? (
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Rocket className="h-5 w-5 text-primary" />
                      <span className="font-medium">Active Boost</span>
                    </div>
                    <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                      Enhanced Visibility
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button variant="destructive" onClick={handleCancel}>
                  Cancel Boost
                </Button>
              </div>
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="packages">Packages</TabsTrigger>
                <TabsTrigger value="custom">Custom</TabsTrigger>
              </TabsList>
              
              <TabsContent value="packages" className="space-y-4 pt-2">
                <div className="grid grid-cols-3 gap-4">
                  <Card className="cursor-pointer border-2 hover:border-primary transition-colors" onClick={() => handleBoost(20, 24)}>
                    <CardContent className="p-4">
                      <h3 className="font-medium">Basic</h3>
                      <p className="text-2xl font-bold">24h</p>
                      <p className="text-sm text-muted-foreground">Low intensity</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer border-2 hover:border-primary transition-colors" onClick={() => handleBoost(40, 48)}>
                    <CardContent className="p-4">
                      <h3 className="font-medium">Standard</h3>
                      <p className="text-2xl font-bold">48h</p>
                      <p className="text-sm text-muted-foreground">Medium intensity</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer border-2 hover:border-primary transition-colors" onClick={() => handleBoost(60, 72)}>
                    <CardContent className="p-4">
                      <h3 className="font-medium">Premium</h3>
                      <p className="text-2xl font-bold">72h</p>
                      <p className="text-sm text-muted-foreground">High intensity</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="custom" className="space-y-4 pt-2">
                <div>
                  <h3 className="font-medium mb-2">Boost Intensity</h3>
                  <Slider
                    value={[boostIntensity]}
                    onValueChange={(values) => setBoostIntensity(values[0])}
                    min={10}
                    max={75}
                    step={5}
                    className="mb-6"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Duration (hours)</h3>
                  <Input
                    type="number"
                    value={boostDuration}
                    onChange={(e) => setBoostDuration(Number(e.target.value))}
                    min={1}
                    max={168}
                    className="mb-2"
                  />
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Maximum duration is 168 hours (7 days)
                  </p>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button onClick={() => handleBoost(boostIntensity, boostDuration)}>
                    Apply Custom Boost
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LivecamBoostControls;
