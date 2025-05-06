
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Brain, Zap } from 'lucide-react';

interface AdaptiveCognitiveProps {
  moduleId: string;
}

const AdaptiveCognitiveCore: React.FC<AdaptiveCognitiveProps> = ({ moduleId }) => {
  const [metrics, setMetrics] = useState({
    neuralDensity: 78,
    algorithmEfficiency: 65,
    adaptationRate: 92,
  });
  
  const [config, setConfig] = useState({
    enabled: true,
    autonomyLevel: 65,
    priority: 'high' as 'low' | 'normal' | 'high' | 'critical',
    adaptiveElements: true,
    selfOptimizing: true
  });
  
  const toggleEnabled = () => {
    setConfig(prev => ({ ...prev, enabled: !prev.enabled }));
  };
  
  const updateMetrics = () => {
    // Simulate metric updates
    setMetrics({
      neuralDensity: Math.floor(Math.random() * 20) + 70,
      algorithmEfficiency: Math.floor(Math.random() * 30) + 60,
      adaptationRate: Math.floor(Math.random() * 15) + 80,
    });
  };
  
  useEffect(() => {
    updateMetrics();
    const interval = setInterval(updateMetrics, 30000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-primary" />
            <CardTitle>Adaptive Cognitive Core</CardTitle>
          </div>
          <Switch
            checked={config.enabled}
            onCheckedChange={toggleEnabled}
          />
        </div>
        <div className="text-sm text-muted-foreground">
          Module ID: {moduleId}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm mb-1">
            <span>Neural Density</span>
            <span>{metrics.neuralDensity}%</span>
          </div>
          <Progress value={metrics.neuralDensity} className="h-1.5" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm mb-1">
            <span>Algorithm Efficiency</span>
            <span>{metrics.algorithmEfficiency}%</span>
          </div>
          <Progress value={metrics.algorithmEfficiency} className="h-1.5" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm mb-1">
            <span>Adaptation Rate</span>
            <span>{metrics.adaptationRate}%</span>
          </div>
          <Progress value={metrics.adaptationRate} className="h-1.5" />
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm">Self-Optimizing</span>
            <Switch 
              checked={config.selfOptimizing} 
              onCheckedChange={() => setConfig(prev => ({...prev, selfOptimizing: !prev.selfOptimizing}))}
              size="sm"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Adaptive Elements</span>
            <Switch 
              checked={config.adaptiveElements} 
              onCheckedChange={() => setConfig(prev => ({...prev, adaptiveElements: !prev.adaptiveElements}))}
              size="sm"
            />
          </div>
        </div>
        
        <Button size="sm" variant="outline" className="w-full mt-2">
          <Zap className="h-4 w-4 mr-2" />
          Optimize Core
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdaptiveCognitiveCore;
