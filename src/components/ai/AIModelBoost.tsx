
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress'; 
import { Flame, Zap } from 'lucide-react';
import { AIProfile } from '@/types/ai-profile';
import useAIModelMonetizationStore from '@/store/aiModelMonetizationStore';
import { GLOBAL_UBX_RATE } from '@/utils/oxum/globalPricing';

interface AIModelBoostProps {
  profile: AIProfile;
  onBoostComplete?: () => void;
}

const AIModelBoost: React.FC<AIModelBoostProps> = ({ profile, onBoostComplete }) => {
  const [duration, setDuration] = useState<number>(24);
  const [isBoostInProgress, setIsBoostInProgress] = useState<boolean>(false);
  const [boostProgress, setBoostProgress] = useState<number>(0);
  
  const { boostProfile, getProfileBoostLevel } = useAIModelMonetizationStore();
  
  const currentBoostLevel = getProfileBoostLevel(profile.id);
  
  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setDuration(value);
    }
  };
  
  const calculateBoostLevel = () => {
    return Math.ceil(GLOBAL_UBX_RATE / 20);
  };
  
  const handleBoost = async () => {
    setIsBoostInProgress(true);
    setBoostProgress(0);
    
    // Simulate progress animation
    const interval = setInterval(() => {
      setBoostProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 200);
    
    try {
      const result = await boostProfile(profile.id, GLOBAL_UBX_RATE, duration);
      
      if (result && onBoostComplete) {
        // Wait for progress animation to complete
        setTimeout(() => {
          onBoostComplete();
        }, 500);
      }
    } finally {
      setTimeout(() => {
        setIsBoostInProgress(false);
      }, 2200); // Wait for progress animation to complete
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Zap className="mr-2 h-5 w-5 text-yellow-500" />
          Boost {profile.name}'s Profile
        </CardTitle>
        <CardDescription>
          Increase visibility and prominence in search results
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentBoostLevel > 0 && (
          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-3 rounded-md mb-4">
            <p className="text-sm">
              <span className="font-medium">Current boost level:</span> {currentBoostLevel}
            </p>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="boost-amount">Boost Amount (UBX)</Label>
          <div className="flex items-center">
            <Input
              id="boost-amount"
              type="number"
              value={GLOBAL_UBX_RATE}
              disabled={true}
              className="w-full"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Boosts profile to level {calculateBoostLevel()} for better visibility
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="boost-duration">Duration (Hours)</Label>
          <div className="flex items-center">
            <Input
              id="boost-duration"
              type="number"
              min={1}
              value={duration}
              onChange={handleDurationChange}
              className="w-full"
              disabled={isBoostInProgress}
            />
          </div>
        </div>
        
        {isBoostInProgress && (
          <div className="space-y-2 my-2">
            <Label className="text-xs text-muted-foreground">Processing boost...</Label>
            <Progress value={boostProgress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleBoost}
          disabled={isBoostInProgress}
        >
          {isBoostInProgress ? (
            <>Processing...</>
          ) : (
            <>
              <Flame className="mr-2 h-4 w-4" />
              Boost for {GLOBAL_UBX_RATE} UBX
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIModelBoost;
