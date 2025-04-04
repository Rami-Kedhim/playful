
import { Zap, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BoostStatus } from "@/types/boost";
import { Card } from "@/components/ui/card";

interface BoostActivePackageProps {
  boostStatus: BoostStatus;
  boostAnalytics: any | null;
  onCancel: () => void;
}

const BoostActivePackage = ({ boostStatus, boostAnalytics, onCancel }: BoostActivePackageProps) => {
  if (!boostStatus.isActive) {
    return (
      <div className="text-center py-8">
        <div className="mb-4">
          <Zap className="h-12 w-12 mx-auto text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No Active Boost</h3>
        <p className="text-muted-foreground mb-4">
          You don't have any active boost. Purchase one to increase your profile visibility.
        </p>
        <Button variant="outline">
          <Zap className="mr-2 h-4 w-4" />
          Purchase Boost
        </Button>
      </div>
    );
  }

  const getScoreColor = (progress: number | undefined) => {
    if (progress === undefined) return 'bg-gray-500';
    if (progress >= 80) return 'bg-red-500'; // Almost expired
    if (progress >= 60) return 'bg-orange-500';
    if (progress >= 40) return 'bg-yellow-500';
    if (progress >= 20) return 'bg-green-500';
    return 'bg-emerald-500'; // Just started
  };

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg bg-muted/30">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="secondary" className="gap-1 px-3 py-1">
            <Award className="h-3.5 w-3.5" />
            {boostStatus.boostPackage?.name}
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            {boostStatus.remainingTime} remaining
          </Badge>
        </div>
        
        <Progress 
          value={boostStatus.progress} 
          className={`h-2 ${getScoreColor(boostStatus.progress)}`}
        />
        
        <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
          <span>Started</span>
          <span>Expires {boostStatus.expiresAt?.toLocaleDateString()}</span>
        </div>
      </div>
      
      {boostAnalytics && (
        <div className="grid grid-cols-3 gap-2 mt-4">
          <Card className="p-3 text-center">
            <h4 className="text-xs text-muted-foreground mb-1">Extra Views</h4>
            <p className="text-xl font-bold">+{boostAnalytics.additionalViews}</p>
          </Card>
          <Card className="p-3 text-center">
            <h4 className="text-xs text-muted-foreground mb-1">Engagement</h4>
            <p className="text-xl font-bold">+{boostAnalytics.engagementIncrease}%</p>
          </Card>
          <Card className="p-3 text-center">
            <h4 className="text-xs text-muted-foreground mb-1">Rank</h4>
            <p className="text-xl font-bold">#{boostAnalytics.rankingPosition}</p>
          </Card>
        </div>
      )}
      
      <div className="flex justify-end mt-4">
        <Button variant="outline" size="sm" onClick={onCancel}>
          Cancel Boost
        </Button>
      </div>
    </div>
  );
};

export default BoostActivePackage;
