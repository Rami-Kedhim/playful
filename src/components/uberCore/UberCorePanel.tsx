
import React, { useState, useEffect } from 'react';
import { uberCore } from '@/services/neural';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { AlertCircle, Activity, Cpu, MessageSquare, Zap } from 'lucide-react';

const UberCorePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('status');
  const [status, setStatus] = useState<Record<string, any>>({});
  const [userInput, setUserInput] = useState('');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Record<string, any> | null>(null);
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
  
  // Process user input through UberCore
  const handleProcessInput = async () => {
    if (!userInput.trim()) {
      toast({
        title: "Empty Input",
        description: "Please enter some text to process.",
        variant: "destructive"
      });
      return;
    }
    
    setProcessing(true);
    
    try {
      const response = await uberCore.processUserInput(
        'user-1',  // Demo user ID
        userInput,
        {
          source: 'web-interface',
          sessionId: `session-${Date.now()}`
        }
      );
      
      setResult(response);
      updateStatus();
      
      toast({
        title: "Processing Complete",
        description: `Processed with ${Math.round(response.confidence * 100)}% confidence.`
      });
    } catch (error) {
      console.error('Error processing input:', error);
      toast({
        title: "Processing Error",
        description: "An error occurred while processing your input.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  // Reset user input and results
  const handleReset = () => {
    setUserInput('');
    setResult(null);
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center">
                      <Activity className="h-4 w-4 mr-2 text-primary" />
                      System Uptime
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {status.uptime ? `${status.uptime}s` : 'N/A'}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center">
                      <Cpu className="h-4 w-4 mr-2 text-primary" />
                      Performance Mode
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold capitalize">
                      {status.performanceMode || 'N/A'}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                      Events Processed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {status.eventCount || '0'}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-primary" />
                      Active Modules
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {status.activeModules?.length || '0'}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Module Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {status.moduleStatuses && Object.entries(status.moduleStatuses).map(([module, enabled]) => (
                      <div key={module} className="flex items-center justify-between border-b pb-2">
                        <span className="capitalize">{module} Module</span>
                        <Badge variant={enabled ? "default" : "secondary"}>
                          {enabled ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="interact" className="space-y-4">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">User Input Processing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter text to process through UberCore..."
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      disabled={processing || !initialized}
                    />
                    <Button 
                      onClick={handleProcessInput} 
                      disabled={processing || !initialized || !userInput.trim()}
                    >
                      {processing ? (
                        <>
                          <span className="animate-spin mr-2">⚙️</span>
                          Processing
                        </>
                      ) : 'Process'}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleReset}
                      disabled={!userInput && !result}
                    >
                      Reset
                    </Button>
                  </div>
                  
                  {result && (
                    <Card className="mt-4">
                      <CardHeader className="py-2">
                        <CardTitle className="text-sm">Processing Results</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="p-3 bg-muted rounded-md">
                          <p className="font-mono">{result.output || 'No output generated'}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <h4 className="text-sm font-semibold mb-1">Confidence</h4>
                            <div className="bg-primary/10 rounded-full h-2 w-full">
                              <div 
                                className="bg-primary rounded-full h-2"
                                style={{ width: `${(result.confidence || 0) * 100}%` }}
                              ></div>
                            </div>
                            <div className="text-right text-xs mt-1">
                              {Math.round((result.confidence || 0) * 100)}%
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-semibold mb-1">Emotional State</h4>
                            <Badge>
                              {result.emotionalState?.dominantEmotion || 'neutral'}
                            </Badge>
                            <div className="text-xs mt-1">
                              Intensity: {Math.round((result.emotionalState?.emotionIntensity || 0) * 100)}%
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-semibold mb-1">UI Adaptation</h4>
                            <div className="space-x-1">
                              <Badge variant="outline">
                                {result.uiAdaptation?.tone || 'standard'}
                              </Badge>
                              <Badge variant="outline">
                                {result.uiAdaptation?.visualMode || 'standard'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {!result && !processing && initialized && (
                    <div className="text-center py-8 text-muted-foreground">
                      <AlertCircle className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p>Enter text above to process through the UberCore architecture</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="config" className="space-y-4">
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
                            onClick={() => {
                              uberCore.configure({ performanceMode: mode as any });
                              updateStatus();
                              toast({
                                title: "Configuration Updated",
                                description: `Performance mode set to ${mode}.`
                              });
                            }}
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
                              onClick={() => {
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
                              }}
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UberCorePanel;
