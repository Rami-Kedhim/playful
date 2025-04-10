
import React, { useState, useEffect } from 'react';
import { uberCore } from '@/services/neural';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

// Import the new component tabs
import StatusPanel from './tabs/StatusPanel';
import InteractionPanel from './tabs/InteractionPanel';
import ConfigurationPanel from './tabs/ConfigurationPanel';

const UberCorePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('status');
  const [status, setStatus] = useState<Record<string, any>>({});
  const [initialized, setInitialized] = useState(false);
  const { toast } = useToast();

  // Initialize UberCore
  useEffect(() => {
    const initCore = async () => {
      const success = await uberCore.initialize();
      setInitialized(success);
      
      if (success) {
        updateStatus();
        toast({
          title: "UberCore Initialized",
          description: "The neural architecture is now operational."
        });
      } else {
        toast({
          title: "Initialization Failed",
          description: "Could not initialize UberCore architecture.",
          variant: "destructive"
        });
      }
    };
    
    initCore();
    
    // Cleanup on unmount
    return () => {
      uberCore.shutdown();
    };
  }, [toast]);
  
  // Update status periodically
  useEffect(() => {
    if (!initialized) return;
    
    const intervalId = setInterval(() => {
      updateStatus();
    }, 5000); // Update every 5 seconds
    
    return () => {
      clearInterval(intervalId);
    };
  }, [initialized]);
  
  // Get latest status from UberCore
  const updateStatus = () => {
    const currentStatus = uberCore.getStatus();
    setStatus(currentStatus);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">UberCore Neural Architecture</CardTitle>
              <CardDescription>Unified AI Architecture for UberEscorts Platform</CardDescription>
            </div>
            <Badge variant={initialized ? "default" : "destructive"} className="h-6">
              {initialized ? "Online" : "Offline"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="status">System Status</TabsTrigger>
              <TabsTrigger value="interact">Interaction</TabsTrigger>
              <TabsTrigger value="config">Configuration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="status" className="space-y-4">
              <StatusPanel status={status} />
            </TabsContent>
            
            <TabsContent value="interact" className="space-y-4">
              <InteractionPanel 
                initialized={initialized}
                updateStatus={updateStatus}
              />
            </TabsContent>
            
            <TabsContent value="config" className="space-y-4">
              <ConfigurationPanel 
                status={status}
                updateStatus={updateStatus}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UberCorePanel;
