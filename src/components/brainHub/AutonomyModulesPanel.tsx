
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Cpu, Settings, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import autonomyEngine, { AutonomyModule } from '@/services/neural/BrainHubAutonomyEngine';

const AutonomyModulesPanel: React.FC = () => {
  const [modules, setModules] = useState<AutonomyModule[]>(autonomyEngine.getModules());
  
  // Handle module toggle
  const handleToggleModule = (moduleId: string, active: boolean) => {
    autonomyEngine.toggleModule(moduleId, active);
    setModules(autonomyEngine.getModules());
  };
  
  // Handle module settings click (would open configuration in a real app)
  const handleSettingsClick = (moduleId: string) => {
    console.log(`Opening settings for module: ${moduleId}`);
    // This would open a modal or navigate to settings page in a real app
  };
  
  // Get status color class for a module
  const getStatusColorClass = (status: string) => {
    switch (status) {
      case 'active': 
        return 'bg-green-500';
      case 'learning': 
        return 'bg-blue-500';
      case 'error': 
        return 'bg-red-500';
      default: 
        return 'bg-slate-400';
    }
  };
  
  // Get badge variant for a module
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': 
        return 'success';
      case 'learning': 
        return 'secondary';
      case 'error': 
        return 'destructive';
      default: 
        return 'secondary';
    }
  };

  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <Cpu className="mr-2 h-5 w-5" /> 
          Autonomy Modules
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-hidden p-0 pb-2">
        <ScrollArea className="h-[340px] px-4">
          <div className="space-y-3 py-2">
            {modules.map((module) => (
              <div 
                key={module.id}
                className="border border-border rounded-lg p-3 hover:bg-accent/20 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColorClass(module.status)}`} />
                    <h3 className="font-medium">{module.name}</h3>
                    <Badge variant={getStatusBadgeVariant(module.status) as any}>{module.status}</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => handleSettingsClick(module.id)}
                        >
                          <Settings className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Configure module</TooltipContent>
                    </Tooltip>
                    
                    <Switch
                      checked={module.status === 'active'}
                      onCheckedChange={(checked) => handleToggleModule(module.id, checked)}
                    />
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs mt-2">
                  <div className="flex justify-between">
                    <span>Decisions:</span>
                    <span className="font-medium">{module.decisionsMade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Success rate:</span>
                    <span className="font-medium">{(module.successRate * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Learning rate:</span>
                    <span className="font-medium">{(module.config.learningRate * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Confidence threshold:</span>
                    <span className="font-medium">{(module.config.confidenceThreshold * 100).toFixed(0)}%</span>
                  </div>
                </div>
                
                {module.status === 'error' && (
                  <div className="mt-2 p-1.5 bg-destructive/10 text-destructive rounded text-xs flex items-start">
                    <AlertCircle className="h-3 w-3 mt-0.5 mr-1 flex-shrink-0" />
                    <span>Module encountered an error and needs attention.</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AutonomyModulesPanel;
