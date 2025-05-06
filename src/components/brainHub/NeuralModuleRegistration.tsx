
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ModuleType } from '@/services/neural/types/NeuralService';

const NeuralModuleRegistration: React.FC = () => {
  const [moduleName, setModuleName] = useState('');
  const [moduleType, setModuleType] = useState<ModuleType>(ModuleType.NEURAL);
  const [priority, setPriority] = useState('normal');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!moduleName) return;
    
    setIsLoading(true);
    
    try {
      // Mock API call
      console.log('Registering module:', {
        name: moduleName,
        type: moduleType,
        priority
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear form
      setModuleName('');
    } catch (error) {
      console.error('Failed to register module:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register Neural Module</CardTitle>
        <CardDescription>
          Add a new neural module to the ecosystem
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="module-name">Module Name</Label>
            <Input 
              id="module-name" 
              placeholder="e.g. Content Analysis Engine" 
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="module-type">Module Type</Label>
            <Select value={moduleType} onValueChange={(value) => setModuleType(value as ModuleType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select module type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ModuleType.NEURAL}>Neural Core</SelectItem>
                <SelectItem value={ModuleType.ESCORTS}>Escorts</SelectItem>
                <SelectItem value={ModuleType.CREATORS}>Creators</SelectItem>
                <SelectItem value={ModuleType.LIVECAMS}>LiveCams</SelectItem>
                <SelectItem value={ModuleType.COMPANION}>AI Companions</SelectItem>
                <SelectItem value={ModuleType.SEO}>SEO</SelectItem>
                <SelectItem value={ModuleType.AUTOMATION}>Automation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            type="button" 
            onClick={handleRegister} 
            className="w-full"
            disabled={isLoading || !moduleName}
          >
            {isLoading ? 'Registering...' : 'Register Module'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NeuralModuleRegistration;
