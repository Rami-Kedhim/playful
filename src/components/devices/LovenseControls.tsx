
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Loader2, Bluetooth, Power, Vibration as VibrationIcon, RotateCcw, Pulse, PowerOff } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface LovenseControlsProps {
  sessionId?: string;
  deviceId?: string;
}

const LovenseControls: React.FC<LovenseControlsProps> = ({ sessionId, deviceId }) => {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [vibrationIntensity, setVibrationIntensity] = useState(0);
  const [rotationSpeed, setRotationSpeed] = useState(0);
  const [pulsationPattern, setPulsationPattern] = useState(1);
  
  // Connect to device
  const handleConnect = async () => {
    setConnecting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setConnected(true);
      toast({
        title: "Device connected",
        description: "Lovense device connected successfully",
      });
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Could not connect to device",
        variant: "destructive",
      });
    } finally {
      setConnecting(false);
    }
  };
  
  // Disconnect from device
  const handleDisconnect = async () => {
    setConnecting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setConnected(false);
      setVibrationIntensity(0);
      setRotationSpeed(0);
      
      toast({
        title: "Device disconnected",
        description: "Lovense device disconnected successfully",
      });
    } catch (error) {
      toast({
        title: "Disconnection failed",
        description: "Could not disconnect from device",
        variant: "destructive",
      });
    } finally {
      setConnecting(false);
    }
  };
  
  // Set vibration intensity
  const handleVibrationChange = async (value: number[]) => {
    setVibrationIntensity(value[0]);
    
    // In a real app, call API to control device
    if (connected) {
      console.log(`Setting vibration intensity to ${value[0]}`);
      // API call would go here
    }
  };
  
  // Set rotation speed
  const handleRotationChange = async (value: number[]) => {
    setRotationSpeed(value[0]);
    
    // In a real app, call API to control device
    if (connected) {
      console.log(`Setting rotation speed to ${value[0]}`);
      // API call would go here
    }
  };
  
  // Set pulsation pattern
  const handlePulsationChange = async (pattern: number) => {
    setPulsationPattern(pattern);
    
    // In a real app, call API to control device
    if (connected) {
      console.log(`Setting pulsation pattern to ${pattern}`);
      // API call would go here
      
      toast({
        title: "Pattern activated",
        description: `Pulsation pattern ${pattern} activated`,
      });
    }
  };
  
  // Stop all actions
  const handleStop = async () => {
    if (connected) {
      setVibrationIntensity(0);
      setRotationSpeed(0);
      
      console.log('Stopping all device actions');
      // API call would go here
      
      toast({
        title: "Device stopped",
        description: "All device actions stopped",
      });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bluetooth className="h-5 w-5 text-primary" />
          Lovense Device Control
        </CardTitle>
        <CardDescription>
          Connect and control your Lovense device
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!connected ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Button 
              onClick={handleConnect} 
              disabled={connecting}
              className="gap-2"
            >
              {connecting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Power className="h-4 w-4" />
                  Connect Device
                </>
              )}
            </Button>
            <p className="text-sm text-muted-foreground mt-4 text-center max-w-xs">
              Please ensure your Lovense device is turned on and Bluetooth is enabled on your device
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Vibration control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <VibrationIcon className="h-4 w-4" />
                  Vibration
                </Label>
                <span className="text-sm font-medium">{vibrationIntensity}%</span>
              </div>
              <Slider
                value={[vibrationIntensity]}
                onValueChange={handleVibrationChange}
                max={100}
                step={1}
              />
            </div>
            
            {/* Rotation control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Rotation
                </Label>
                <span className="text-sm font-medium">{rotationSpeed}%</span>
              </div>
              <Slider
                value={[rotationSpeed]}
                onValueChange={handleRotationChange}
                max={100}
                step={1}
              />
            </div>
            
            {/* Pulsation patterns */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 mb-3">
                <Pulse className="h-4 w-4" />
                Pulsation Patterns
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((pattern) => (
                  <Button
                    key={pattern}
                    variant={pulsationPattern === pattern ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePulsationChange(pattern)}
                  >
                    Pattern {pattern}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Stop button */}
            <div className="pt-4">
              <Button 
                variant="destructive" 
                onClick={handleStop}
                className="w-full"
              >
                <PowerOff className="h-4 w-4 mr-2" />
                Stop All
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      {connected && (
        <CardFooter className="justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm font-medium">Connected</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleDisconnect}
            disabled={connecting}
          >
            {connecting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Disconnect"
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default LovenseControls;
