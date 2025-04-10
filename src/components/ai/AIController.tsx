
import React, { useEffect, useState } from 'react';
import { useNeuralRegistry } from '@/hooks/useNeuralRegistry';
import { useOxumLearning } from '@/hooks/ai/useOxumLearning';
import { useBrainHubAI } from '@/hooks/ai/useBrainHubAI';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Settings, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface AIControllerProps {
  userId?: string;
  showControls?: boolean;
}

const AIController: React.FC<AIControllerProps> = ({ 
  userId,
  showControls = true
}) => {
  const { services, loading, error, optimizeResources } = useNeuralRegistry();
  const [aiEnabled, setAiEnabled] = useState(true);
  const [optimizationInProgress, setOptimizationInProgress] = useState(false);
  const { toast } = useToast();
  
  // Initialize Oxum Learning service for personalization
  const oxumLearning = useOxumLearning({
    componentId: 'ai-controller',
    autoSync: true,
    culturalContext: {
      userPreferences: {
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    }
  });
  
  // Connect to BrainHub for advanced AI capabilities
  const brainHub = useBrainHubAI({
    componentId: 'ai-controller-hub',
    capabilities: [
      'user_personalization',
      'content_enhancement',
      'recommendation_engine'
    ],
    userContext: {
      userId: userId,
      preferences: {
        aiEnabled: aiEnabled
      }
    }
  });

  // Initialize AI services when component mounts
  useEffect(() => {
    const initializeAI = async () => {
      if (!oxumLearning.isInitialized) {
        await oxumLearning.init;
      }
      
      if (!brainHub.isConnected) {
        brainHub.connectToBrainHub();
      }
    };
    
    initializeAI();
  }, []);
  
  // Handle AI toggle
  const handleAIToggle = (enabled: boolean) => {
    setAiEnabled(enabled);
    
    // Record this preference change
    brainHub.recordInteraction('toggle_ai_features', { enabled });
    
    toast({
      title: enabled ? "AI Features Enabled" : "AI Features Disabled",
      description: enabled 
        ? "All intelligent features are now active across the platform" 
        : "AI-powered features have been disabled",
      variant: enabled ? "default" : "secondary"
    });
  };
  
  // Run optimization across all AI systems
  const handleOptimize = async () => {
    setOptimizationInProgress(true);
    
    try {
      // Optimize neural service resources
      optimizeResources();
      
      // Use BrainHub to optimize AI models
      await brainHub.processRequest('optimize_models', {
        aggressiveness: 'moderate',
        targetServices: services.map(service => service.moduleId)
      });
      
      toast({
        title: "AI Optimization Complete",
        description: "Neural systems have been optimized for your usage patterns",
      });
    } catch (err) {
      toast({
        title: "Optimization Failed",
        description: "Unable to optimize AI systems at this time",
        variant: "destructive"
      });
    } finally {
      setOptimizationInProgress(false);
    }
  };
  
  if (!showControls) {
    return null;
  }
  
  return (
    <Card className="shadow-md border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center space-x-2">
          <Brain className="h-5 w-5 text-primary" />
          <span>AI System Controller</span>
          {loading && <RefreshCw className="h-4 w-4 animate-spin ml-2" />}
        </CardTitle>
        <CardDescription>
          Manage intelligent features and neural systems
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Main AI Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="font-medium">AI Features</div>
            <div className="text-xs text-muted-foreground">
              Control AI-powered experiences
            </div>
          </div>
          <Switch 
            checked={aiEnabled}
            onCheckedChange={handleAIToggle}
          />
        </div>
        
        {/* Active Services */}
        {aiEnabled && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Active Neural Services</div>
            <div className="flex flex-wrap gap-1">
              {services.filter(s => s.config.enabled).map(service => (
                <Badge key={service.moduleId} variant="outline" className="bg-primary/5">
                  {service.moduleName}
                </Badge>
              ))}
              {services.filter(s => s.config.enabled).length === 0 && (
                <span className="text-xs text-muted-foreground">No active services</span>
              )}
            </div>
          </div>
        )}
        
        {/* Optimization Button */}
        {aiEnabled && (
          <Button 
            variant="outline" 
            size="sm"
            className="w-full mt-2"
            disabled={optimizationInProgress}
            onClick={handleOptimize}
          >
            {optimizationInProgress ? (
              <>
                <RefreshCw className="h-3 w-3 mr-2 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Zap className="h-3 w-3 mr-2" />
                Optimize AI Systems
              </>
            )}
          </Button>
        )}
        
        {/* Error State */}
        {error && (
          <div className="text-destructive text-xs mt-2">
            Error: {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIController;
