
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { NeuralModelParameters } from '@/types/neuralMetrics';
import { RotateCcw, Power, Zap } from 'lucide-react';

interface NeuralSystemControlsProps {
  onReset?: () => Promise<boolean>;
  onOptimize?: () => Promise<boolean>;
  onParameterChange?: (params: Partial<NeuralModelParameters>) => void;
  className?: string;
  initialParameters?: Partial<NeuralModelParameters>;
}

const NeuralSystemControls: React.FC<NeuralSystemControlsProps> = ({
  onReset,
  onOptimize,
  onParameterChange,
  className = '',
  initialParameters = {}
}) => {
  const [parameters, setParameters] = useState<Partial<NeuralModelParameters>>({
    learningRate: 0.01,
    temperature: 0.7,
    ...initialParameters
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleParameterChange = (key: keyof NeuralModelParameters, value: number) => {
    const newParameters = { ...parameters, [key]: value };
    setParameters(newParameters);
    onParameterChange?.(newParameters);
  };

  const handleReset = async () => {
    if (!onReset) return;
    setIsProcessing(true);
    try {
      await onReset();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOptimize = async () => {
    if (!onOptimize) return;
    setIsProcessing(true);
    try {
      await onOptimize();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">System Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Learning Rate Control */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Learning Rate</label>
              <span className="text-sm">{parameters.learningRate?.toFixed(4)}</span>
            </div>
            <Slider
              value={[parameters.learningRate || 0.01]}
              min={0.0001}
              max={0.1}
              step={0.0001}
              onValueChange={([value]) => handleParameterChange('learningRate', value)}
            />
          </div>

          {/* Temperature Control */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Temperature</label>
              <span className="text-sm">{parameters.temperature?.toFixed(2)}</span>
            </div>
            <Slider
              value={[parameters.temperature || 0.7]}
              min={0.1}
              max={1.0}
              step={0.01}
              onValueChange={([value]) => handleParameterChange('temperature', value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleReset}
              disabled={isProcessing || !onReset}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button
              variant="default"
              size="sm"
              className="flex-1"
              onClick={handleOptimize}
              disabled={isProcessing || !onOptimize}
            >
              <Zap className="h-4 w-4 mr-2" />
              Optimize
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NeuralSystemControls;
