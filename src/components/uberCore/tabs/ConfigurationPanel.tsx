
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { uberCore } from '@/services/neural';

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

  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="text-sm">System Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-muted-foreground text-sm">
            Configure the UberCore neural architecture parameters.
          </p>
          
          <div className="border rounded-md p-4 mb-4">
            <h3 className="text-sm font-medium mb-3">Performance Mode</h3>
            <div className="grid grid-cols-3 gap-2">
              {['balanced', 'efficiency', 'quality'].map((mode) => (
                <Button 
                  key={mode}
                  variant={status.performanceMode === mode ? "default" : "outline"}
                  onClick={() => handlePerformanceModeChange(mode as any)}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="border rounded-md p-4 mb-4">
            <h3 className="text-sm font-medium mb-3">Module Activation</h3>
            <div className="space-y-3">
              {status.moduleStatuses && Object.entries(status.moduleStatuses).map(([module, enabled]) => (
                <div key={module} className="flex items-center justify-between">
                  <span className="capitalize">{module} Module</span>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => handleModuleToggle(module, !!enabled)}
                  >
                    {enabled ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigurationPanel;
