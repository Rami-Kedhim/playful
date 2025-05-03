
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  VibrateIcon, 
  Pause
} from 'lucide-react';

interface LovenseControlsProps {
  onVibrateChange: (level: number) => void;
  onPulseChange: (level: number) => void;
  deviceConnected: boolean;
}

const LovenseControls: React.FC<LovenseControlsProps> = ({
  onVibrateChange,
  onPulseChange,
  deviceConnected
}) => {
  const [vibrateLevel, setVibrateLevel] = useState(0);
  const [pulseLevel, setPulseLevel] = useState(0);
  
  const handleVibrateChange = (value: number[]) => {
    const level = value[0];
    setVibrateLevel(level);
    onVibrateChange(level);
  };
  
  const handlePulseChange = (value: number[]) => {
    const level = value[0];
    setPulseLevel(level);
    onPulseChange(level);
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <VibrateIcon className="h-5 w-5 mr-2" />
            <span>Vibration</span>
          </div>
          <span className="text-sm font-mono">{vibrateLevel}%</span>
        </div>
        <Slider 
          defaultValue={[0]} 
          max={100} 
          step={1} 
          disabled={!deviceConnected}
          onValueChange={handleVibrateChange}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Pause className="h-5 w-5 mr-2" />
            <span>Pulse</span>
          </div>
          <span className="text-sm font-mono">{pulseLevel}%</span>
        </div>
        <Slider 
          defaultValue={[0]} 
          max={100} 
          step={1}
          disabled={!deviceConnected}
          onValueChange={handlePulseChange}
        />
      </div>
      
      <div className="flex justify-between gap-2">
        <Button 
          onClick={() => handleVibrateChange([0])}
          disabled={!deviceConnected || vibrateLevel === 0}
          variant="outline"
          className="flex-1"
        >
          Stop Vibration
        </Button>
        <Button 
          onClick={() => handlePulseChange([0])}
          disabled={!deviceConnected || pulseLevel === 0}
          variant="outline"
          className="flex-1"
        >
          Stop Pulse
        </Button>
      </div>
    </div>
  );
};

export default LovenseControls;
