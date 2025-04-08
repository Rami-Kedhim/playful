
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Plus, Brain, AlertCircle } from "lucide-react";
import { 
  ModuleType, 
  neuralServiceRegistry, 
  NeuralService 
} from '@/services/neural/registry/NeuralServiceRegistry';
import { 
  EscortsNeuralService 
} from '@/services/neural/modules/EscortsNeuralService';
import { 
  CreatorsNeuralService 
} from '@/services/neural/modules/CreatorsNeuralService';
import { 
  LivecamsNeuralService 
} from '@/services/neural/modules/LivecamsNeuralService';
import { 
  AICompanionNeuralService 
} from '@/services/neural/modules/AICompanionNeuralService';

interface NeuralModuleRegistrationProps {
  onRegistered?: () => void;
}

const NeuralModuleRegistration: React.FC<NeuralModuleRegistrationProps> = ({ onRegistered }) => {
  const [moduleType, setModuleType] = useState<ModuleType>('escorts');
  const [moduleId, setModuleId] = useState('');
  const [priority, setPriority] = useState(50);
  const [autonomyLevel, setAutonomyLevel] = useState(50);
  const [error, setError] = useState<string | null>(null);
  
  const handleRegister = () => {
    if (!moduleId) {
      setError('Module ID is required');
      return;
    }
    
    try {
      // Check if a service with this ID already exists
      const existingService = neuralServiceRegistry.getService(moduleId);
      if (existingService) {
        setError(`A service with ID ${moduleId} already exists`);
        return;
      }
      
      // Create a new service instance based on the selected module type
      let service: NeuralService;
      
      switch (moduleType) {
        case 'escorts':
          service = new EscortsNeuralService(moduleId);
          break;
        case 'creators':
          service = new CreatorsNeuralService(moduleId);
          break;
        case 'livecams':
          service = new LivecamsNeuralService(moduleId);
          break;
        case 'ai-companion':
          service = new AICompanionNeuralService(moduleId);
          break;
        default:
          setError('Invalid module type');
          return;
      }
      
      // Update the service config after creation
      service.updateConfig({
        priority,
        autonomyLevel,
        enabled: true
      });
      
      // Register the service
      const success = neuralServiceRegistry.registerService(service);
      
      if (success) {
        setError(null);
        setModuleId('');
        if (onRegistered) {
          onRegistered();
        }
      } else {
        setError('Failed to register neural service');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while registering the neural service');
    }
  };
  
  const getModuleTypeLabel = (type: ModuleType): string => {
    switch (type) {
      case 'escorts': return 'Escorts';
      case 'creators': return 'Content Creators';
      case 'livecams': return 'Livecams';
      case 'ai-companion': return 'AI Companion';
      default: return type;
    }
  };
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Plus className="w-5 h-5 mr-2 text-primary" />
          Register Neural Service
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="bg-destructive/20 p-3 rounded-md flex items-start gap-2 text-sm">
            <AlertCircle className="w-4 h-4 text-destructive mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="module-type">Module Type</Label>
          <select 
            id="module-type"
            value={moduleType}
            onChange={(e) => setModuleType(e.target.value as ModuleType)}
            className="w-full p-2 border border-border rounded-md bg-background"
          >
            <option value="escorts">Escorts</option>
            <option value="creators">Content Creators</option>
            <option value="livecams">Livecams</option>
            <option value="ai-companion">AI Companion</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="module-id">Module ID</Label>
          <Input
            id="module-id"
            value={moduleId}
            onChange={(e) => setModuleId(e.target.value)}
            placeholder={`${moduleType}-neural-service`}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="priority">Priority</Label>
            <span className="text-sm">{priority}/100</span>
          </div>
          <Slider 
            id="priority"
            value={[priority]} 
            onValueChange={(values) => setPriority(values[0])} 
            min={1} 
            max={100} 
            step={1}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="autonomy">Autonomy Level</Label>
            <span className="text-sm">{autonomyLevel}/100</span>
          </div>
          <Slider 
            id="autonomy"
            value={[autonomyLevel]} 
            onValueChange={(values) => setAutonomyLevel(values[0])} 
            min={1} 
            max={100} 
            step={1}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleRegister} className="w-full">
          <Brain className="mr-2 h-4 w-4" />
          Register {getModuleTypeLabel(moduleType)} Neural Service
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NeuralModuleRegistration;
