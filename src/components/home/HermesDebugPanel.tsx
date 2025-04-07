
import React, { useState } from 'react';
import { useAuth } from '@/hooks/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Bug, BarChart2, Layers, User } from 'lucide-react';
import useBehavioralProfile from '@/hooks/useBehavioralProfile';
import useGouldianFilters from '@/hooks/useGouldianFilters';
import useHermesMode from '@/hooks/useHermesMode';

// This component provides a debug panel for Hermes AI system
// It's only visible in development mode or when debugging is enabled
const HermesDebugPanel = () => {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const { profile } = useBehavioralProfile();
  const { filters } = useGouldianFilters();
  const { mode } = useHermesMode();
  
  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button 
        variant="outline" 
        size="sm" 
        className="relative flex items-center bg-background/90 backdrop-blur-sm border-primary"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Hide' : 'Show'} Debug
        <Badge variant="outline" className="ml-2 bg-primary/10">HERMES</Badge>
        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
      </Button>
      
      {isExpanded && (
        <Card className="mt-2 w-96 bg-background/95 backdrop-blur-sm border-primary/20 shadow-lg">
          <CardHeader className="p-3">
            <CardTitle className="text-sm flex items-center justify-between">
              <span className="flex items-center">
                <Bug className="h-4 w-4 mr-2 text-primary" />
                HERMES Control Panel
              </span>
              <Badge variant="outline" className="text-xs">v0.1.3</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 text-xs">
            <Tabs defaultValue="state">
              <TabsList className="w-full">
                <TabsTrigger value="state" className="text-xs">State</TabsTrigger>
                <TabsTrigger value="user" className="text-xs">User</TabsTrigger>
                <TabsTrigger value="metrics" className="text-xs">Metrics</TabsTrigger>
              </TabsList>
              <TabsContent value="state" className="mt-2 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">HERMES Mode:</p>
                    <p className="font-mono bg-muted p-1 rounded text-xs">{mode || 'standard'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Tone Filter:</p>
                    <p className="font-mono bg-muted p-1 rounded text-xs">{filters?.tone || 'neutral'}</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-muted-foreground">Behavior Tags:</p>
                  <div className="flex flex-wrap gap-1">
                    {profile?.behaviorTags?.length ? profile.behaviorTags.map((tag: string, i: number) => (
                      <Badge key={i} variant="secondary" className="text-[10px]">{tag}</Badge>
                    )) : (
                      <p className="text-muted-foreground italic">No tags detected</p>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="user" className="mt-2 space-y-2">
                <div className="space-y-1">
                  <p className="text-muted-foreground">User ID:</p>
                  <p className="font-mono bg-muted p-1 rounded text-xs overflow-hidden overflow-ellipsis">
                    {user?.id || 'Not authenticated'}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-muted-foreground">Trust Score:</p>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${profile?.trustScore || 0}%` }} 
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="metrics" className="mt-2 space-y-2">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Session Interactions:</p>
                  <p className="font-mono bg-muted p-1 rounded text-xs">
                    {Math.floor(Math.random() * 20)}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-muted-foreground">Last Analysis:</p>
                  <p className="font-mono bg-muted p-1 rounded text-xs">
                    {new Date().toLocaleTimeString()}
                  </p>
                </div>
                
                <Button size="sm" variant="outline" className="w-full text-xs mt-2">
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  Refresh Data
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HermesDebugPanel;
