
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

interface AdaptiveCognitiveCoreProp {
  systemName?: string;
  intelligenceLevel?: number;
  isActive?: boolean;
  adaptivityLevel?: number;
}

const AdaptiveCognitiveCore: React.FC<AdaptiveCognitiveCoreProp> = ({
  systemName = "Adaptive Cognitive Core",
  intelligenceLevel = 72,
  isActive = true,
  adaptivityLevel = 85
}) => {
  const [active, setActive] = useState(isActive);
  const [neuralMode, setNeuralMode] = useState(true);

  // Calculate the intelligence level color based on the value
  const getIntelligenceLevelColor = (level: number) => {
    if (level < 30) return "text-red-500";
    if (level < 60) return "text-amber-500";
    if (level < 80) return "text-emerald-500";
    return "text-indigo-500";
  };

  // Calculate the adaptivity level color based on the value
  const getAdaptivityLevelColor = (level: number) => {
    if (level < 30) return "text-red-500";
    if (level < 60) return "text-amber-500";
    if (level < 80) return "text-emerald-500";
    return "text-blue-500";
  };

  return (
    <Card className="shadow-lg border-t-4 border-t-indigo-500/80">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-semibold">{systemName}</CardTitle>
            <CardDescription>
              Neural Processing Infrastructure
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2 bg-muted/50 p-1 rounded-lg">
            <div className={`h-2.5 w-2.5 rounded-full ${active ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-xs font-medium">{active ? 'Active' : 'Inactive'}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Intelligence Level</span>
              <span className={`text-sm font-bold ${getIntelligenceLevelColor(intelligenceLevel)}`}>
                {intelligenceLevel}%
              </span>
            </div>
            <Progress value={intelligenceLevel} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Adaptivity</span>
              <span className={`text-sm font-bold ${getAdaptivityLevelColor(adaptivityLevel)}`}>
                {adaptivityLevel}%
              </span>
            </div>
            <Progress value={adaptivityLevel} className="h-2" />
          </div>
          
          <div className="pt-2 space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="core-status">Core Status</Label>
                <div className="text-xs text-muted-foreground">Enable or disable the system</div>
              </div>
              <Switch
                checked={active}
                onCheckedChange={() => setActive(!active)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="neural-mode">Neural Mode</Label>
                <div className="text-xs text-muted-foreground">Advanced neural processing</div>
              </div>
              <Switch
                checked={neuralMode}
                onCheckedChange={() => setNeuralMode(!neuralMode)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdaptiveCognitiveCore;
