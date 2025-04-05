
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, Zap } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { BoostStatus } from "@/types/boost";
import { AnalyticsData } from "@/hooks/boost/useBoostAnalytics";

interface BoostActivePackageProps {
  boostStatus: BoostStatus;
  boostAnalytics: AnalyticsData | null;
  onCancel: () => Promise<boolean>;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
}

const BoostActivePackage = ({ 
  boostStatus,
  boostAnalytics,
  onCancel,
  dailyBoostUsage,
  dailyBoostLimit
}: BoostActivePackageProps) => {
  const [cancelling, setCancelling] = useState(false);
  
  const handleCancel = async () => {
    setCancelling(true);
    await onCancel();
    setCancelling(false);
  };
  
  if (!boostStatus.isActive) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>No Active Boost</AlertTitle>
        <AlertDescription>
          You don't have an active boost. Select a package to boost your profile.
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted/20 border border-muted rounded-md">
        <div className="flex justify-between mb-3">
          <div>
            <h4 className="text-sm font-medium">
              {boostStatus.boostPackage?.name || "Active Boost"}
            </h4>
            <div className="text-xs text-muted-foreground">
              Expires in {boostStatus.remainingTime}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm">{boostStatus.progress}% Complete</div>
            <div className="text-xs text-muted-foreground">
              Ends at {boostStatus.expiresAt?.toLocaleTimeString()}
            </div>
          </div>
        </div>

        <Progress value={boostStatus.progress} className="h-2" />
        
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span>Daily usage</span>
            <span>{dailyBoostUsage} of {dailyBoostLimit}</span>
          </div>
          <Progress value={(dailyBoostUsage / dailyBoostLimit) * 100} className="h-1.5" />
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleCancel}
            disabled={cancelling}
          >
            {cancelling ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cancelling...
              </>
            ) : (
              'Cancel Boost'
            )}
          </Button>
        </div>
      </div>

      {boostAnalytics && (
        <div className="p-4 bg-muted/10 border border-muted rounded-md">
          <h4 className="text-sm font-medium flex items-center mb-3">
            <Zap className="h-4 w-4 text-amber-500 mr-2" />
            Boost Performance
          </h4>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-2 bg-muted/20 rounded-md">
              <div className="text-lg font-bold">+{boostAnalytics.additionalViews}</div>
              <div className="text-xs text-muted-foreground">Views</div>
            </div>
            <div className="p-2 bg-muted/20 rounded-md">
              <div className="text-lg font-bold">{boostAnalytics.engagementIncrease}%</div>
              <div className="text-xs text-muted-foreground">Engagement</div>
            </div>
            <div className="p-2 bg-muted/20 rounded-md">
              <div className="text-lg font-bold">#{boostAnalytics.rankingPosition}</div>
              <div className="text-xs text-muted-foreground">Rank</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoostActivePackage;
