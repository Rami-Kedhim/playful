
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Zap } from "lucide-react";
import { BoostStatus } from "@/types/boost";
import { formatDistanceToNow } from "date-fns";

interface BoostActivePackageProps {
  boostStatus: BoostStatus;
  hermesData?: {
    position: number;
    activeUsers: number;
    estimatedVisibility: number;
    lastUpdateTime: string;
  };
}

const BoostActivePackage = ({ boostStatus, hermesData }: BoostActivePackageProps) => {
  if (!boostStatus.isActive) {
    return null;
  }

  // Calculate time remaining
  const endTime = boostStatus.endTime ? new Date(boostStatus.endTime) : null;
  const timeRemaining = endTime ? formatDistanceToNow(endTime, { addSuffix: true }) : boostStatus.remainingTime || "Unknown";

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span className="font-medium text-lg">{boostStatus.packageName || "Active Boost"}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Your profile is currently being boosted
            </p>
          </div>
          <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Time Remaining</div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{timeRemaining}</span>
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Visibility Boost</div>
            <div>
              {hermesData?.estimatedVisibility ? `+${hermesData.estimatedVisibility}%` : '+75%'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostActivePackage;
