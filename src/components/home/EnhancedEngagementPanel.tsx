
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowUpRight, BarChart, User, Settings } from 'lucide-react';

interface EnhancedEngagementPanelProps {
  userId?: string;
  isVisible?: boolean;
}

const EnhancedEngagementPanel: React.FC<EnhancedEngagementPanelProps> = ({ 
  userId,
  isVisible = process.env.NODE_ENV === 'development'
}) => {
  const [activeTab, setActiveTab] = useState('insights');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastAnalyzedAt, setLastAnalyzedAt] = useState<Date>(new Date());

  // Only show in development mode or when explicitly visible
  if (!isVisible && process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLastAnalyzedAt(new Date());
    }, 1500);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className={`bg-background/80 backdrop-blur transition-all duration-300 border-primary/20 shadow-lg ${isCollapsed ? 'w-auto' : 'w-96'}`}>
        <CardHeader className="p-3 flex flex-row items-center justify-between">
          <CardTitle className="text-sm flex items-center">
            {!isCollapsed && (
              <>
                <BarChart className="h-4 w-4 mr-2 text-primary" />
                Engagement Analytics
              </>
            )}
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-2" onClick={toggleCollapsed}>
              <ArrowUpRight className="h-4 w-4" />
              <span className="sr-only">Toggle panel</span>
            </Button>
          </CardTitle>
          
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">v2.1</Badge>
            </div>
          )}
        </CardHeader>
        
        {!isCollapsed && (
          <CardContent className="p-3 pt-0 text-xs">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full">
                <TabsTrigger value="insights" className="text-xs">Insights</TabsTrigger>
                <TabsTrigger value="metrics" className="text-xs">Metrics</TabsTrigger>
                <TabsTrigger value="config" className="text-xs">Config</TabsTrigger>
              </TabsList>
              
              <TabsContent value="insights" className="mt-2 space-y-2">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">User Behavioral Profile</h4>
                    <Badge variant="outline" className="text-[10px]">Beta</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-muted/50 p-2 rounded">
                      <p className="text-muted-foreground mb-1">Trust Level</p>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `75%` }} />
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 p-2 rounded">
                      <p className="text-muted-foreground mb-1">Engagement</p>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `60%` }} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-2 rounded">
                    <p className="text-muted-foreground mb-1">Behavioral Loop</p>
                    <div className="flex justify-between text-[10px]">
                      <Badge variant="outline" className="bg-background/50">Discovery</Badge>
                      <Badge variant="outline" className="bg-primary/10">Engagement</Badge>
                      <Badge variant="outline" className="bg-background/50">Investment</Badge>
                      <Badge variant="outline" className="bg-background/50">Identity</Badge>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="metrics" className="mt-2 space-y-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Engagement Metrics</h4>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-muted/50 p-2 rounded">
                      <p className="text-muted-foreground mb-1">Session Time</p>
                      <p className="font-mono">00:17:42</p>
                    </div>
                    
                    <div className="bg-muted/50 p-2 rounded">
                      <p className="text-muted-foreground mb-1">Page Views</p>
                      <p className="font-mono">12</p>
                    </div>
                    
                    <div className="bg-muted/50 p-2 rounded">
                      <p className="text-muted-foreground mb-1">Return Probability</p>
                      <p className="font-mono">76%</p>
                    </div>
                    
                    <div className="bg-muted/50 p-2 rounded">
                      <p className="text-muted-foreground mb-1">Conversion Rate</p>
                      <p className="font-mono">4.2%</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="config" className="mt-2 space-y-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Configuration</h4>
                  
                  <div className="bg-muted/50 p-2 rounded flex justify-between items-center">
                    <div>
                      <p className="font-medium">Analytics Tracking</p>
                      <p className="text-muted-foreground text-[10px]">User behavior tracking</p>
                    </div>
                    <Button size="sm" variant="outline">Enabled</Button>
                  </div>
                  
                  <div className="bg-muted/50 p-2 rounded flex justify-between items-center">
                    <div>
                      <p className="font-medium">Debug Mode</p>
                      <p className="text-muted-foreground text-[10px]">Show detailed metrics</p>
                    </div>
                    <Button size="sm" variant="outline">Disabled</Button>
                  </div>
                </div>
              </TabsContent>
              
              <div className="flex justify-between items-center mt-4 text-[10px] text-muted-foreground">
                <span>Last analyzed: {lastAnalyzedAt.toLocaleTimeString()}</span>
                <Button size="sm" variant="outline" className="h-7 text-xs" onClick={refreshData}>
                  {isLoading && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
                  Refresh
                </Button>
              </div>
            </Tabs>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default EnhancedEngagementPanel;
