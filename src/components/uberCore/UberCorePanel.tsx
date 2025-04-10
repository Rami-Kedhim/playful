
import React, { useState, useEffect } from 'react';
import { uberCore } from '@/services/neural';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { ActivitySquare, Settings, MessageSquare, AlertTriangle, CheckCircle2, BarChart3, Sigma } from 'lucide-react';

// Import the component tabs
import StatusPanel from './tabs/StatusPanel';
import InteractionPanel from './tabs/InteractionPanel';
import ConfigurationPanel from './tabs/ConfigurationPanel';
import NeuralMonitorPanel from './NeuralMonitorPanel';
import HermesOptimizationPanel from './HermesOptimizationPanel';

const UberCorePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('status');
  const [status, setStatus] = useState<Record<string, any>>({});
  const [initialized, setInitialized] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const { toast } = useToast();

  // Initialize UberCore
  useEffect(() => {
    const initCore = async () => {
      setInitializing(true);
      
      try {
        const success = await uberCore.initialize();
        setInitialized(success);
        
        if (success) {
          updateStatus();
          toast({
            title: "UberCore Initialized",
            description: "The neural architecture is now operational.",
            variant: "default"
          });
        } else {
          toast({
            title: "Initialization Failed",
            description: "Could not initialize UberCore architecture.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error initializing UberCore:", error);
        toast({
          title: "Initialization Error",
          description: "An unexpected error occurred during initialization.",
          variant: "destructive"
        });
      } finally {
        setInitializing(false);
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
    try {
      const currentStatus = uberCore.getStatus();
      setStatus(currentStatus);
    } catch (error) {
      console.error("Error fetching UberCore status:", error);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-l-4" style={{ 
        borderLeftColor: initialized ? '#10b981' : initializing ? '#f59e0b' : '#ef4444' 
      }}>
        <CardHeader className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center">
                <ActivitySquare className="h-6 w-6 mr-2 text-primary" />
                UberCore Neural Architecture
              </CardTitle>
              <CardDescription>Advanced AI Processing and Neural Network Management</CardDescription>
            </div>
            <StatusBadge status={initialized} initializing={initializing} />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-5 w-full md:w-auto">
              <TabsTrigger value="status" className="flex items-center">
                <ActivitySquare className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">System Status</span>
                <span className="md:hidden">Status</span>
              </TabsTrigger>
              <TabsTrigger value="interact" className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Interaction</span>
                <span className="md:hidden">Interact</span>
              </TabsTrigger>
              <TabsTrigger value="monitor" className="flex items-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Monitoring</span>
                <span className="md:hidden">Monitor</span>
              </TabsTrigger>
              <TabsTrigger value="optimization" className="flex items-center">
                <Sigma className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Optimization</span>
                <span className="md:hidden">Optimize</span>
              </TabsTrigger>
              <TabsTrigger value="config" className="flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Configuration</span>
                <span className="md:hidden">Config</span>
              </TabsTrigger>
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
            
            <TabsContent value="monitor" className="space-y-4">
              <NeuralMonitorPanel />
            </TabsContent>
            
            <TabsContent value="optimization" className="space-y-4">
              <HermesOptimizationPanel />
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

// Status badge component to show system operational status
const StatusBadge: React.FC<{status: boolean, initializing: boolean}> = ({ status, initializing }) => {
  if (initializing) {
    return (
      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700 animate-pulse">
        <AlertTriangle className="h-3 w-3 mr-1" />
        Initializing...
      </Badge>
    );
  }
  
  return status ? (
    <Badge variant="default" className="bg-green-600">
      <CheckCircle2 className="h-3 w-3 mr-1" />
      Online
    </Badge>
  ) : (
    <Badge variant="destructive">
      <AlertTriangle className="h-3 w-3 mr-1" />
      Offline
    </Badge>
  );
};

export default UberCorePanel;
