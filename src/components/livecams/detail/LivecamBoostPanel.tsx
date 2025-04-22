
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Rocket, TrendingUp, Star, Clock } from 'lucide-react';
import UBXPriceDisplay from '@/components/oxum/UBXPriceDisplay';
import { GLOBAL_UBX_RATE } from '@/utils/oxum/globalPricing';

// This is a simplified version for demonstration purposes
interface LivecamBoostPanelProps {
  livecamId: string;
  isCurrentlyBoosted?: boolean;
  boostRank?: number;
  viewerIncreasePercent?: number;
}

const LivecamBoostPanel: React.FC<LivecamBoostPanelProps> = ({
  livecamId,
  isCurrentlyBoosted = false,
  boostRank = 0,
  viewerIncreasePercent = 0,
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleBoost = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Boost activated!",
        description: "Your livecam is now boosted for 24 hours.",
      });
    } catch (error) {
      toast({
        title: "Boost failed",
        description: "There was an error boosting your livecam.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isCurrentlyBoosted) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-base font-medium">
            <Rocket className="mr-2 h-5 w-5 text-primary" />
            Boost Active
            <Badge variant="outline" className="ml-auto">
              Rank #{boostRank}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Boost Effectiveness</span>
              <span className="font-medium text-green-500">+{viewerIncreasePercent}% viewers</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Time Remaining</span>
              <span className="font-medium">16h 32m</span>
            </div>
            <Progress value={68} className="h-2" />
          </div>
          
          <div className="rounded-lg bg-muted p-3">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span>Your livecam is getting <strong>42%</strong> more visibility</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center">
          <Rocket className="mr-2 h-5 w-5" />
          Boost Your Livecam
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500" />
            <span className="text-sm">Appear at the top of search results</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm">Get up to 300% more viewers</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <span className="text-sm">Boost lasts for 24 hours</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between rounded-lg bg-muted p-3">
          <span className="text-sm font-medium">Price:</span>
          <UBXPriceDisplay amount={GLOBAL_UBX_RATE} size="sm" showConversion isGlobalPrice />
        </div>
        
        <Button 
          className="w-full" 
          onClick={handleBoost}
          disabled={loading}
        >
          {loading ? "Processing..." : "Boost Now"}
        </Button>
        
        <div className="text-center text-xs text-muted-foreground">
          Boost automatically renews unless disabled
        </div>
      </CardContent>
    </Card>
  );
};

export default LivecamBoostPanel;
