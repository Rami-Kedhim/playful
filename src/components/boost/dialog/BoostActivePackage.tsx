
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Clock, Calendar } from "lucide-react";
import { BoostStatus } from "@/types/boost";
import { HermesBoostStatus } from "@/types/boost";

interface BoostActivePackageProps {
  boostStatus: BoostStatus;
  hermesData?: HermesBoostStatus;
}

const BoostActivePackage = ({ boostStatus, hermesData }: BoostActivePackageProps) => {
  if (!boostStatus.isActive) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No active boost package</p>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-500" />
              {boostStatus.packageName || "Active Boost"}
            </h3>
            <p className="text-sm text-muted-foreground">
              Boost activated {boostStatus.startTime ? new Date(boostStatus.startTime).toLocaleDateString() : "recently"}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground flex items-center justify-end">
              <Clock className="h-4 w-4 mr-1" />
              {boostStatus.remainingTime || "Time remaining"}
            </div>
            <div className="text-sm text-muted-foreground flex items-center justify-end mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              {boostStatus.endTime ? 
                `Expires ${new Date(boostStatus.endTime).toLocaleString()}` : 
                "Expiration pending"}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm">Progress</span>
            <span className="text-sm">{boostStatus.progress || 0}%</span>
          </div>
          <Progress value={boostStatus.progress || 0} className="h-2" />
        </div>

        {hermesData && (
          <div className="bg-muted/30 p-3 rounded-md mt-4">
            <h4 className="text-sm font-medium mb-2">Current Boost Performance</h4>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Ranking position: <span className="text-foreground">#{hermesData.position}</span></p>
              <p>• Visibility increase: <span className="text-foreground">{hermesData.estimatedVisibility}%</span></p>
              <p>• Total boosting users: <span className="text-foreground">{hermesData.activeUsers}</span></p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BoostActivePackage;
