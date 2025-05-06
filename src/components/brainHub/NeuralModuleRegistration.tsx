
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ModuleType } from '@/services/neural/types/NeuralService';

const NeuralModuleRegistration: React.FC = () => {
  const [moduleName, setModuleName] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [moduleType, setModuleType] = useState<ModuleType>(ModuleType.ESCORTS);
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  
  const handleRegisterModule = async () => {
    if (!moduleName.trim()) return;
    
    setRegistering(true);
    try {
      // Mock registration - in real app this would call an API
      console.log(`Registering module: ${moduleName}, type: ${moduleType}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRegistered(true);
      setTimeout(() => setRegistered(false), 3000);
      
      // Reset form
      setModuleName("");
      setModuleDescription("");
      setModuleType(ModuleType.ESCORTS);
    } catch (err) {
      console.error("Failed to register module:", err);
    } finally {
      setRegistering(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Register Neural Module</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="module-name" className="text-sm font-medium">Module Name</label>
          <Input 
            id="module-name"
            value={moduleName} 
            onChange={e => setModuleName(e.target.value)}
            placeholder="Enter module name"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="module-type" className="text-sm font-medium">Module Type</label>
          <Select 
            value={moduleType} 
            onValueChange={(value: string) => setModuleType(value as ModuleType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ModuleType.ESCORTS}>Escorts</SelectItem>
              <SelectItem value={ModuleType.CREATORS}>Creators</SelectItem>
              <SelectItem value={ModuleType.LIVECAMS}>Livecams</SelectItem>
              <SelectItem value={ModuleType.AI_COMPANIONS}>AI Companions</SelectItem>
              <SelectItem value={ModuleType.SEO}>SEO</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="module-description" className="text-sm font-medium">Description</label>
          <Textarea
            id="module-description"
            value={moduleDescription}
            onChange={e => setModuleDescription(e.target.value)}
            placeholder="Enter module description"
            rows={3}
          />
        </div>
        
        <Button 
          onClick={handleRegisterModule}
          disabled={!moduleName.trim() || registering}
          className="w-full"
        >
          {registering ? "Registering..." : "Register Module"}
        </Button>
        
        {registered && (
          <div className="bg-green-500/20 text-green-700 p-2 rounded text-center">
            Module registered successfully!
          </div>
        )}
        
        {moduleType === ModuleType.AI_COMPANIONS && (
          <div className="bg-blue-500/20 text-blue-700 p-2 rounded text-sm">
            <p>AI Companions modules require additional configuration.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NeuralModuleRegistration;
