
import React from 'react';
import { useBehavioralProfile } from '@/hooks/auth';
import { useGouldianFilters } from '@/hooks/auth';
import { useHermesMode } from '@/hooks/auth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Activity, Shield, Brain, User, DollarSign } from 'lucide-react';

/**
 * Debug panel for HERMES-OXUM and Gouldian systems
 * Only visible in development mode
 */
const HermesDebugPanel: React.FC = () => {
  const { profile } = useBehavioralProfile();
  const { systemSettings, calculateAdjustedPrice } = useGouldianFilters();
  const { getCurrentMode, getToneFilter, shouldUseEmotionalResponses } = useHermesMode();
  
  // Don't show in production
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  
  if (!profile) {
    return (
      <Card className="fixed bottom-4 right-4 w-80 bg-background/80 backdrop-blur-sm border border-primary/20 shadow-xl z-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center">
            <Activity size={16} className="mr-2 text-primary" />
            HERMES-OXUM Debug
          </CardTitle>
          <CardDescription className="text-xs">
            Not authenticated
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <Card className="fixed bottom-4 right-4 w-80 bg-background/80 backdrop-blur-sm border border-primary/20 shadow-xl z-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center">
          <Activity size={16} className="mr-2 text-primary" />
          HERMES-OXUM Debug
        </CardTitle>
        <CardDescription className="text-xs">
          Behavioral Analysis System
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 pb-2">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs flex items-center">
              <Shield size={12} className="mr-1" /> Trust Score
            </Label>
            <Badge variant={
              profile.trustScore > 70 ? "success" : 
              profile.trustScore > 40 ? "outline" : 
              "destructive"
            }>
              {profile.trustScore}/100
            </Badge>
          </div>
          <Progress value={profile.trustScore} className="h-1" />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs flex items-center mb-1">
              <Brain size={12} className="mr-1" /> HERMES Mode
            </Label>
            <Badge variant="outline" className="w-full justify-center">
              {getCurrentMode()}
            </Badge>
          </div>
          <div>
            <Label className="text-xs flex items-center mb-1">
              <User size={12} className="mr-1" /> Tone Filter
            </Label>
            <Badge variant="outline" className="w-full justify-center">
              {getToneFilter()}
            </Badge>
          </div>
        </div>
        
        <div>
          <Label className="text-xs flex items-center mb-1">
            <DollarSign size={12} className="mr-1" /> Price Multiplier
          </Label>
          <div className="text-xs">
            Base 10 Lucoins → <span className="font-bold">{calculateAdjustedPrice(10)} Lucoins</span>
          </div>
        </div>
        
        <div>
          <Label className="text-xs flex items-center mb-1">Behavior Tags</Label>
          <div className="flex flex-wrap gap-1">
            {profile.behaviorTags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="text-[10px] text-muted-foreground">
          Emotional: {shouldUseEmotionalResponses() ? "enabled" : "disabled"} | 
          Delay: {systemSettings.responseDelayMs}ms
        </div>
      </CardFooter>
    </Card>
  );
};

export default HermesDebugPanel;
