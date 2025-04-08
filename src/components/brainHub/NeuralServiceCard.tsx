
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Brain, Power } from "lucide-react";
import { NeuralService } from '@/services/neural';
import { useNeuralService } from '@/hooks/useNeuralService';

interface NeuralServiceCardProps {
  service: NeuralService;
  onRefresh?: () => void;
}

const NeuralServiceCard: React.FC<NeuralServiceCardProps> = ({ service, onRefresh }) => {
  const { toggleEnabled, loading } = useNeuralService(service.moduleId);

  const handleToggleService = async () => {
    await toggleEnabled();
    if (onRefresh) onRefresh();
  };

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
            <span>{service.config.autonomyLevel}%</span>
          </div>
          <Progress value={service.config.autonomyLevel} className="h-2" />
        </div>
        
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span>Priority</span>
            <span>{service.config.priority}/100</span>
          </div>
          <Progress value={service.config.priority} className="h-2" />
        </div>
        
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span>Resource Allocation</span>
            <span>{service.config.resourceAllocation}%</span>
          </div>
          <Progress value={service.config.resourceAllocation} className="h-2" />
        </div>
        
        <div className="pt-2">
          <h4 className="text-sm font-medium mb-2">Capabilities:</h4>
          <div className="flex flex-wrap gap-1">
            {service.getCapabilities().map((cap: string) => (
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
