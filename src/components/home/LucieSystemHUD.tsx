
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Bell, Shield, Database } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';

interface LucieSystemHUDProps {
  systemStatus: {
    operational: boolean;
    latency: number;
    aiModels: {
      conversation: string;
      generation: string;
      analysis: string;
    };
    lastUpdated: Date;
  } | null;
  isLoading: boolean;
}

const LucieSystemHUD: React.FC<LucieSystemHUDProps> = ({ systemStatus, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }
  
  if (!systemStatus) return null;
  
  // Calculate latency score where lower is better (100ms -> 100%, 200ms -> 50%, etc)
  const latencyScore = Math.max(0, 100 - (systemStatus.latency / 2));
  
  // Map model statuses to health percentages
  const modelHealth = {
    conversation: systemStatus.aiModels.conversation === 'active' ? 100 : 
                 systemStatus.aiModels.conversation === 'degraded' ? 60 : 30,
    generation: systemStatus.aiModels.generation === 'active' ? 100 : 
              systemStatus.aiModels.generation === 'degraded' ? 60 : 30,
    analysis: systemStatus.aiModels.analysis === 'active' ? 100 : 
            systemStatus.aiModels.analysis === 'degraded' ? 60 : 30
  };
  
  // Format last updated time
  const lastUpdated = new Date(systemStatus.lastUpdated);
  const timeAgo = Math.floor((Date.now() - lastUpdated.getTime()) / 60000); // minutes
  const timeAgoText = timeAgo < 1 ? 'just now' : 
                      timeAgo === 1 ? '1 minute ago' : 
                      `${timeAgo} minutes ago`;

  return (
    <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-background">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-400" />
          <CardTitle>Lucie System HUD</CardTitle>
        </div>
        <CardDescription>AI Orchestration Status and Neural Systems</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 rounded-md bg-card/50 flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-blue-400" />
                <span className="font-medium">System Status</span>
              </div>
              <div className={`px-2 py-0.5 rounded-full text-xs ${systemStatus.operational ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {systemStatus.operational ? 'Operational' : 'Degraded'}
              </div>
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Response Latency</span>
                <span>{systemStatus.latency}ms</span>
              </div>
              <Progress value={latencyScore} className="h-1" />
            </div>
            <div className="text-xs text-muted-foreground mt-4">
              Last updated: {timeAgoText}
            </div>
          </div>
          
          <div className="p-4 rounded-md bg-card/50 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-4 w-4 text-blue-400" />
              <span className="font-medium">Neural Models</span>
            </div>
            <div className="space-y-3 grow">
              {Object.entries(modelHealth).map(([model, health]) => (
                <div key={model} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize text-muted-foreground">{model}</span>
                    <span className={health > 80 ? 'text-green-400' : health > 50 ? 'text-amber-400' : 'text-red-400'}>
                      {health}%
                    </span>
                  </div>
                  <Progress value={health} className="h-1" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 rounded-md bg-card/50 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Database className="h-4 w-4 text-blue-400" />
              <span className="font-medium">Memory Allocation</span>
            </div>
            <div className="grid grid-cols-2 gap-4 grow">
              {['Language', 'Vision', 'Ethics', 'Context'].map((component) => (
                <div key={component} className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">{component}</span>
                  <div className="text-sm font-medium">{Math.floor(Math.random() * 300) + 200} MB</div>
                  <Progress value={Math.floor(Math.random() * 60) + 40} className="h-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LucieSystemHUD;
