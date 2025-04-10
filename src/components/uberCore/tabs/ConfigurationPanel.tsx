
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { uberCore } from '@/services/neural';
import { Badge } from '@/components/ui/badge';
import { Check, X, Settings, Layers, Shield, Cpu, Activity } from 'lucide-react';

interface ConfigurationPanelProps {
  status: Record<string, any>;
  updateStatus: () => void;
}

const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({ status, updateStatus }) => {
  const { toast } = useToast();

  const handlePerformanceModeChange = (mode: 'balanced' | 'efficiency' | 'quality') => {
    uberCore.configure({ performanceMode: mode });
    updateStatus();
    toast({
      title: "Configuration Updated",
      description: `Performance mode set to ${mode}.`
    });
  };

  const handleModuleToggle = (module: string, enabled: boolean) => {
    // Get current status and build the configuration
    const currentStatus = uberCore.getStatus();
    const currentModuleStatuses = currentStatus.moduleStatuses || {};
    
    // Create enabledModules object with the proper type structure
    const enabledModules: {
      logic: boolean;
      emotional: boolean;
      ethics: boolean;
      bridge: boolean;
    } = {
      logic: false,
      emotional: false,
      ethics: false,
      bridge: false
    };
    
    // Copy all current module statuses
    Object.entries(currentModuleStatuses).forEach(([key, value]) => {
      if (key === 'logic' || key === 'emotional' || key === 'ethics' || key === 'bridge') {
        enabledModules[key as keyof typeof enabledModules] = 
          key === module ? !enabled : !!value;
      }
    });
    
    // Configure UberCore with the updated module statuses
    uberCore.configure({ enabledModules });
    updateStatus();
    
    toast({
      title: `Module ${!enabled ? 'Activated' : 'Deactivated'}`,
      description: `${module} module has been ${!enabled ? 'activated' : 'deactivated'}.`
    });
  };

  // Get module icon component based on name
  const getModuleIcon = (module: string) => {
    switch(module) {
      case 'logic':
        return <Cpu className="h-5 w-5 mr-2 text-blue-500" />;
      case 'emotional':
        return <Activity className="h-5 w-5 mr-2 text-pink-500" />;
      case 'ethics':
        return <Shield className="h-5 w-5 mr-2 text-green-500" />;
      case 'bridge':
        return <Layers className="h-5 w-5 mr-2 text-amber-500" />;
      default:
        return <Settings className="h-5 w-5 mr-2 text-gray-500" />;
    }
  };

  // Get module description based on name
  const getModuleDescription = (module: string) => {
    switch(module) {
      case 'logic':
        return "Core reasoning and pattern recognition functionality";
      case 'emotional':
        return "Emotional state detection and adaptation";
      case 'ethics':
        return "Content evaluation and ethical decision making";
      case 'bridge':
        return "Inter-module communication and event processing";
      default:
        return "System module";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm flex items-center">
            <Settings className="h-4 w-4 mr-2 text-primary" />
            System Configuration
          </CardTitle>
          <CardDescription>
            Configure the UberCore neural architecture parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="border rounded-md p-4">
              <h3 className="text-sm font-medium mb-3">Performance Mode</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Select how the system should balance between speed, quality, and resource usage
              </p>
              <div className="grid grid-cols-3 gap-2">
                {['balanced', 'efficiency', 'quality'].map((mode) => (
                  <Button 
                    key={mode}
                    variant={status.performanceMode === mode ? "default" : "outline"}
                    onClick={() => handlePerformanceModeChange(mode as any)}
                    className="flex flex-col h-auto py-3"
                  >
                    <span className="capitalize">{mode}</span>
                    {status.performanceMode === mode && (
                      <Badge className="mt-1 text-xs">Active</Badge>
                    )}
                  </Button>
                ))}
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                <p>
                  <strong>Balanced:</strong> Equal emphasis on speed and quality
                </p>
                <p>
                  <strong>Efficiency:</strong> Prioritize speed and resource usage
                </p>
                <p>
                  <strong>Quality:</strong> Prioritize quality and accuracy
                </p>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="text-sm font-medium mb-3">Module Configuration</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Activate or deactivate individual UberCore neural modules
              </p>
              <div className="space-y-4">
                {status.moduleStatuses && Object.entries(status.moduleStatuses).map(([module, enabled]) => (
                  <Card key={module} className={`border ${enabled ? 'border-green-200 dark:border-green-900' : 'border-gray-200 dark:border-gray-800'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <div className="mt-1">
                            {getModuleIcon(module)}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium capitalize">{module} Module</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {getModuleDescription(module)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Badge 
                            variant={enabled ? "default" : "outline"} 
                            className={enabled ? "bg-green-500 mr-3" : "mr-3"}
                          >
                            {enabled ? (
                              <span className="flex items-center">
                                <Check className="h-3 w-3 mr-1" /> Active
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <X className="h-3 w-3 mr-1" /> Inactive
                              </span>
                            )}
                          </Badge>
                          <Button 
                            variant={enabled ? "outline" : "default"}
                            size="sm"
                            onClick={() => handleModuleToggle(module, !!enabled)}
                          >
                            {enabled ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfigurationPanel;
