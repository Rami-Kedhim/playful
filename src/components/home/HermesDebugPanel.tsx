
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  ArrowDown, 
  ArrowUp, 
  Brain,
  Braces,
  BarChart, 
  HeartPulse, 
  Settings, 
  User,
  RefreshCw, 
  EyeOff, 
  Eye
} from 'lucide-react';

import { useAuth, useBehavioralProfile, useGouldianFilters, useHermesMode } from '@/hooks/auth';
import { useEnhancedBehavioral } from '@/hooks/useEnhancedBehavioral';
import { neuralHub, SystemHealthMetrics } from '@/services/neural/HermesOxumNeuralHub';
import EnhancedEngagementPanel from './EnhancedEngagementPanel';

const HermesDebugPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [healthMetrics, setHealthMetrics] = useState<SystemHealthMetrics>(neuralHub.getHealthMetrics());
  
  const { user } = useAuth();
  const { profile } = useBehavioralProfile();
  const { systemSettings } = useGouldianFilters();
  const { getCurrentMode, getToneFilter } = useHermesMode();
  const { enhancedProfile, analyzeUser } = useEnhancedBehavioral();
  
  // Register for health metrics updates
  useEffect(() => {
    const updateMetrics = (metrics: SystemHealthMetrics) => {
      setHealthMetrics(metrics);
    };
    
    neuralHub.addObserver(updateMetrics);
    
    return () => {
      neuralHub.removeObserver(updateMetrics);
    };
  }, []);
  
  // Toggle visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  
  // Toggle expanded view
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Reset system
  const handleReset = () => {
    neuralHub.resetSystem();
  };
  
  if (!isVisible) {
    return (
      <Button
        className="fixed left-4 bottom-4 p-2 h-auto opacity-30 hover:opacity-100 transition-opacity"
        variant="outline"
        size="icon"
        onClick={toggleVisibility}
      >
        <Brain className="h-4 w-4" />
      </Button>
    );
  }
  
  return (
    <div className={`fixed bottom-4 left-4 z-50 transition-all duration-300 ${isExpanded ? 'w-[30rem]' : 'w-60'}`}>
      <Card className="shadow-lg border-primary/10">
        <CardHeader className="p-3 pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center">
              <HeartPulse className="h-4 w-4 mr-2 text-primary" />
              HERMES-OXUM Debug
            </CardTitle>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={toggleExpanded}
              >
                {isExpanded ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={toggleVisibility}
              >
                <EyeOff className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <CardDescription className="text-xs">
            System Health: {(healthMetrics.stability * 100).toFixed(0)}% Stable
          </CardDescription>
        </CardHeader>
        
        {isExpanded ? (
          <>
            <CardContent className="px-3 py-2">
              <Tabs defaultValue="system">
                <TabsList className="grid grid-cols-4 h-8">
                  <TabsTrigger value="system" className="text-xs">System</TabsTrigger>
                  <TabsTrigger value="user" className="text-xs">User</TabsTrigger>
                  <TabsTrigger value="enhanced" className="text-xs">Enhanced</TabsTrigger>
                  <TabsTrigger value="insights" className="text-xs">Insights</TabsTrigger>
                </TabsList>
                
                <TabsContent value="system" className="mt-2 space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>System Load</span>
                      <span>{(healthMetrics.load * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={healthMetrics.load * 100} />
                    
                    <div className="flex justify-between text-xs">
                      <span>User Engagement</span>
                      <span>{(healthMetrics.userEngagement * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={healthMetrics.userEngagement * 100} className="bg-blue-100" />
                    
                    <div className="flex justify-between text-xs">
                      <span>Economic Balance</span>
                      <span>{(healthMetrics.economicBalance * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={healthMetrics.economicBalance * 100} className="bg-green-100" />
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <h4 className="text-xs font-medium mb-1">HERMES Mode</h4>
                      <Badge variant="outline" className="capitalize">{getCurrentMode()}</Badge>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium mb-1">Tone Filter</h4>
                      <Badge variant="outline" className="capitalize">{getToneFilter()}</Badge>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="user" className="mt-2 space-y-3">
                  {user ? (
                    <>
                      <div className="flex items-center space-x-2">
                        <User className="h-6 w-6 text-primary" />
                        <div>
                          <p className="text-xs font-medium">{user.username || user.id}</p>
                          <p className="text-xs text-muted-foreground">Logged In</p>
                        </div>
                      </div>
                      
                      {profile && (
                        <div className="space-y-2">
                          <div>
                            <h4 className="text-xs font-medium mb-1">Behavior Tags</h4>
                            <div className="flex flex-wrap gap-1">
                              {profile.behaviorTags.map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs capitalize">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-xs font-medium mb-1">Trust Score</h4>
                            <div className="flex items-center space-x-2">
                              <Progress value={profile.trustScore} className="flex-1" />
                              <span className="text-xs">{profile.trustScore}/100</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-1">
                            <div>
                              <h4 className="text-xs font-medium">Messages</h4>
                              <p className="text-xs">{profile.interactionHistory.messagesExchanged}</p>
                            </div>
                            <div>
                              <h4 className="text-xs font-medium">Voice</h4>
                              <p className="text-xs">{profile.interactionHistory.voiceInteractions}</p>
                            </div>
                            <div>
                              <h4 className="text-xs font-medium">Content Views</h4>
                              <p className="text-xs">{profile.interactionHistory.contentViews}</p>
                            </div>
                            <div>
                              <h4 className="text-xs font-medium">Total Spent</h4>
                              <p className="text-xs">${profile.interactionHistory.totalSpent.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center text-xs py-6 text-muted-foreground">
                      User Not Logged In
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="enhanced" className="mt-2">
                  <EnhancedEngagementPanel />
                </TabsContent>
                
                <TabsContent value="insights" className="mt-2">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xs font-medium mb-1">Model Parameters</h4>
                      <div className="bg-muted rounded-md p-2">
                        <pre className="text-xs overflow-auto max-h-24">
                          <code>{JSON.stringify(neuralHub.getModelParameters(), null, 2)}</code>
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-medium mb-2 flex items-center">
                        <Braces className="h-3 w-3 mr-1" />
                        System Debug Flags
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="debug1" className="text-xs">Enhanced Logging</Label>
                          <Switch id="debug1" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="debug2" className="text-xs">User Analytics</Label>
                          <Switch id="debug2" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="debug3" className="text-xs">Content Tracking</Label>
                          <Switch id="debug3" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter className="flex justify-between px-3 py-2">
              <div className="text-xs text-muted-foreground">
                Last Updated: {new Date(healthMetrics.lastUpdated).toLocaleTimeString()}
              </div>
              
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={analyzeUser}>
                  <BarChart className="h-3 w-3 mr-1" />
                  Analyze
                </Button>
                <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={handleReset}>
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              </div>
            </CardFooter>
          </>
        ) : (
          <CardContent className="px-3 py-2">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>System Health</span>
                <span>{(healthMetrics.stability * 100).toFixed(0)}%</span>
              </div>
              <Progress value={healthMetrics.stability * 100} />
              
              <div className="flex justify-between mt-1">
                <Badge variant="outline" className="text-[10px]">Mode: {getCurrentMode()}</Badge>
                <Button size="sm" variant="ghost" className="h-6 px-2 text-xs" onClick={handleReset}>
                  <Settings className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default HermesDebugPanel;
