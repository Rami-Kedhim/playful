
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UnifiedBehavioralInsights from '@/components/behavioral/UnifiedBehavioralInsights';
import { useUnifiedBehavioral } from '@/hooks/useUnifiedBehavioral';
import { RefreshCcw, Brain, LineChart, Settings } from 'lucide-react';

const BehavioralDashboard: React.FC = () => {
  const { analyzeUser, isAnalyzing, lastAnalyzed } = useUnifiedBehavioral();
  
  const handleRefresh = () => {
    analyzeUser();
  };
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">HERMES-OXUM Behavioral Dashboard</h1>
          <p className="text-muted-foreground">
            Unified behavioral analysis and engagement optimization
          </p>
        </div>
        
        <Button 
          variant="outline" 
          onClick={handleRefresh}
          disabled={isAnalyzing}
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Refresh Analysis
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-5 w-5 text-primary" />
              Behavioral Engine
            </CardTitle>
            <CardDescription>
              HERMES-OXUM Neural Analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <div className="flex justify-between py-1 border-b">
                <span className="text-muted-foreground">Engine Status</span>
                <span className="font-medium text-green-600">Active</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-muted-foreground">Neural Mode</span>
                <span className="font-medium">Adaptive</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-medium">
                  {lastAnalyzed ? new Date(lastAnalyzed).toLocaleTimeString() : 'Never'}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Active Frameworks</span>
                <span className="font-medium">HERMES + Chase Hughes</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <LineChart className="mr-2 h-5 w-5 text-primary" />
              Engagement Analysis
            </CardTitle>
            <CardDescription>
              Real-time metrics and insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  System Load
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  Neural Hub Performance
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  Behavioral Analysis Confidence
                </div>
                <div className="w-full bg-secondary rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5 text-primary" />
              System Configuration
            </CardTitle>
            <CardDescription>
              Engine settings and parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <div className="flex justify-between py-1 border-b">
                <span className="text-muted-foreground">HERMES Mode</span>
                <span className="font-medium">Active</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-muted-foreground">OXUM Integration</span>
                <span className="font-medium">Connected</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-muted-foreground">Chase Hughes</span>
                <span className="font-medium">Enabled</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Assessment</span>
                <span className="font-medium">Auto-generated</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="insights" className="space-y-4">
        <TabsList>
          <TabsTrigger value="insights">Behavioral Insights</TabsTrigger>
          <TabsTrigger value="configuration">System Configuration</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="insights">
          <div className="grid grid-cols-1 gap-6">
            <UnifiedBehavioralInsights />
          </div>
        </TabsContent>
        
        <TabsContent value="configuration">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>
                Configure the HERMES-OXUM behavioral engine parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                The unified behavioral engine combines HERMES visibility algorithms, OXUM fair rotation systems,
                and Chase Hughes behavioral frameworks to create a comprehensive user engagement system.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Neural Hub Sensitivity</label>
                  <input type="range" min="1" max="100" value="75" className="w-full" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Behavioral Loop Detection</label>
                  <input type="range" min="1" max="100" value="85" className="w-full" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Trust Score Threshold</label>
                  <input type="range" min="1" max="100" value="65" className="w-full" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Engagement Score Threshold</label>
                  <input type="range" min="1" max="100" value="60" className="w-full" />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button>Save Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documentation">
          <Card>
            <CardHeader>
              <CardTitle>HERMES-OXUM Behavioral Engine Documentation</CardTitle>
              <CardDescription>
                Understanding the unified behavioral analysis system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Overview</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  The HERMES-OXUM Behavioral Engine combines several powerful frameworks:
                </p>
                <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
                  <li>HERMES visibility decay and time-based algorithms</li>
                  <li>OXUM fair rotation system and equity principles</li>
                  <li>Chase Hughes behavioral analysis framework</li>
                  <li>Enhanced Behavioral Profiling for comprehensive user understanding</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Key Components</h3>
                <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground space-y-1">
                  <li><strong>Neural Hub:</strong> Core mathematical modeling using non-linear dynamics</li>
                  <li><strong>Behavioral Loop Detection:</strong> Identifying user's current engagement stage</li>
                  <li><strong>Psychographic Profiling:</strong> Personality traits, motivations, and preferences</li>
                  <li><strong>Engagement Optimization:</strong> Personalized UI and content recommendations</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Implementation Guide</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  To implement the unified behavioral engine in your components:
                </p>
                <pre className="bg-secondary p-3 rounded mt-2 text-xs overflow-x-auto">
                  {`// Import the hook
import { useUnifiedBehavioral } from '@/hooks/useUnifiedBehavioral';

// Use in your component
const { 
  profile, 
  uiSettings, 
  engagementStrategy, 
  insights 
} = useUnifiedBehavioral();

// Apply UI optimizations
const colorScheme = uiSettings?.colorScheme || 'default';`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BehavioralDashboard;
