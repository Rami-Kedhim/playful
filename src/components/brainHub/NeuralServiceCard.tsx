
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Brain, Power } from "lucide-react";
import { BaseNeuralService } from '@/services/neural/types/NeuralService';
import { useNeuralService } from '@/hooks/useNeuralService';

interface NeuralServiceCardProps {
  service: BaseNeuralService;
  onRefresh?: () => void;
}

const NeuralServiceCard: React.FC<NeuralServiceCardProps> = ({ service, onRefresh }) => {
  const { toggleEnabled, loading } = useNeuralService(service.moduleId);

  const handleToggleService = async () => {
    await toggleEnabled();
    if (onRefresh) onRefresh();
  };

  // Convert string or number priorities to numbers for Progress component
  const getPriorityValue = (priority: number | 'low' | 'normal' | 'high' | 'critical' | undefined): number => {
    if (typeof priority === 'number') {
      return Math.min(100, Math.max(0, priority));
    }
    
    switch (priority) {
      case 'critical': return 100;
      case 'high': return 75;
      case 'normal': return 50;
      case 'low': return 25;
      default: return 50;
    }
  };

  // Safe access to capabilities with fallback
  const getCapabilities = () => {
    if (service.getCapabilities && typeof service.getCapabilities === 'function') {
      return service.getCapabilities();
    }
    return ['basic'];
  };

  // Default value for autonomy level
  const autonomyLevel = service.config.autonomyLevel ?? 50;
  
  // Default value for resource allocation
  const resourceAllocation = service.config.resourceAllocation ?? 30;

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <Brain className="w-5 h-5 mr-2 text-primary" />
            {service.moduleId}
          </CardTitle>
          <Badge 
            variant={service.config.enabled ? "default" : "outline"}
            className="cursor-pointer"
            onClick={handleToggleService}
          >
            {service.config.enabled ? "Enabled" : "Disabled"}
          </Badge>
        </div>
        <CardDescription>
          {service.moduleType} neural service
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span>Autonomy Level</span>
            <span>{autonomyLevel}%</span>
          </div>
          <Progress value={autonomyLevel} className="h-2" />
        </div>
        
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span>Priority</span>
            <span>{service.config.priority}</span>
          </div>
          <Progress value={getPriorityValue(service.config.priority)} className="h-2" />
        </div>
        
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span>Resource Allocation</span>
            <span>{resourceAllocation}%</span>
          </div>
          <Progress value={resourceAllocation} className="h-2" />
        </div>
        
        <div className="pt-2">
          <h4 className="text-sm font-medium mb-2">Capabilities:</h4>
          <div className="flex flex-wrap gap-1">
            {getCapabilities().map((cap: string) => (
              <Badge key={cap} variant="secondary" className="text-xs">
                {cap}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NeuralServiceCard;
