
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Brain, ShieldCheck, PieChart, UserCheck, Sparkles, Heart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Import brain hub components
import AdaptiveCognitiveCore from './AdaptiveCognitiveCore';
import UberConsolePanel from './UberConsolePanel';
import BrainCore from './BrainCore';
import BrainHubHealthMonitor from '@/components/admin/dashboard/BrainHubHealthMonitor';
import SystemDiagnostics from '@/components/admin/dashboard/SystemDiagnostics';
import QuantumEmotionalPrediction from './QuantumEmotionalPrediction';
import NeurosemanticCluster from './NeurosemanticCluster';

/**
 * SuperlativeBrainHub - Main component for the enhanced Brain Hub
 * Integrates all the advanced AI systems described in the technical report
 */
const SuperlativeBrainHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('intelligence');
  const { toast } = useToast();
  const [systemMode, setSystemMode] = useState<'standard' | 'advanced'>('standard');
  
  const toggleSystemMode = () => {
    const newMode = systemMode === 'standard' ? 'advanced' : 'standard';
    setSystemMode(newMode);
    
    toast({
      title: `${newMode === 'advanced' ? 'Advanced' : 'Standard'} Mode Activated`,
      description: newMode === 'advanced' 
        ? 'Additional neural systems and capabilities are now active.'
        : 'System operating in standard configuration.',
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <Brain className="h-6 w-6 mr-2 text-primary" />
            Superlative Brain Hub
          </h1>
          <p className="text-muted-foreground">
            Advanced neural network control center with adaptive intelligence
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={systemMode === 'standard' ? 'outline' : 'default'}
            onClick={toggleSystemMode}
          >
            {systemMode === 'standard' ? 'Activate Advanced Mode' : 'Return to Standard Mode'}
          </Button>
        </div>
      </div>
      
      {systemMode === 'advanced' && (
        <Alert>
          <ShieldCheck className="h-4 w-4" />
          <AlertTitle>Advanced Mode Active</AlertTitle>
          <AlertDescription>
            The Brain Hub is operating with advanced cognitive systems and enhanced neural capabilities. 
            Monitor all systems carefully.
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="intelligence" className="flex items-center">
              <Brain className="h-4 w-4 mr-2" />
              Intelligence Core
            </TabsTrigger>
            <TabsTrigger value="emotional" className="flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              Emotional System
            </TabsTrigger>
            <TabsTrigger value="neurosemantic" className="flex items-center">
              <Sparkles className="h-4 w-4 mr-2" />
              Neurosemantic Cluster
            </TabsTrigger>
            <TabsTrigger value="control" className="flex items-center">
              <PieChart className="h-4 w-4 mr-2" />
              Control Center
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center">
              <UserCheck className="h-4 w-4 mr-2" />
              System Monitoring
            </TabsTrigger>
          </TabsList>
          
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
        
        <TabsContent value="intelligence">
          <div className="space-y-6">
            {systemMode === 'advanced' ? (
              <AdaptiveCognitiveCore />
            ) : (
              <BrainCore />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-0">
                  <BrainHubHealthMonitor />
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-0">
                  <SystemDiagnostics />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="emotional">
          <div className="space-y-6">
            <QuantumEmotionalPrediction />
          </div>
        </TabsContent>
        
        <TabsContent value="neurosemantic">
          <div className="space-y-6">
            <NeurosemanticCluster />
          </div>
        </TabsContent>
        
        <TabsContent value="control">
          <UberConsolePanel />
        </TabsContent>
        
        <TabsContent value="monitoring">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-0">
                <BrainHubHealthMonitor />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-0">
                <SystemDiagnostics />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperlativeBrainHub;
