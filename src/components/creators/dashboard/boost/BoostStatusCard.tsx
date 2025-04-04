
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, AlertCircle, CheckCircle2, Zap } from "lucide-react";
import { BoostStatus } from "@/types/boost";
import { formatBoostDuration } from "@/utils/boostCalculator";

interface BoostStatusCardProps {
  boostStatus: BoostStatus;
  onCancel: () => void;
  loading: boolean;
}

const BoostStatusCard = ({ boostStatus, onCancel, loading }: BoostStatusCardProps) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Boost Status</CardTitle>
          <CardDescription>Loading your boost status...</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-[100px]" />
        </CardContent>
      </Card>
    );
  }

  if (!boostStatus.isActive) {
    return (
      <Card className="bg-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-muted-foreground" />
            No Active Boost
          </CardTitle>
          <CardDescription>
            Your profile is currently not boosted
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-6">
            <div className="text-center">
              <Zap className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-muted-foreground">
                Boost your profile to increase visibility and engagement
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const expiryDate = boostStatus.expiresAt?.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-primary" />
              Active Boost
            </CardTitle>
            <CardDescription>
              Your profile is currently boosted with {boostStatus.boostPackage?.name}
            </CardDescription>
          </div>
          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
            Active
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Package</div>
              <div className="font-medium">{boostStatus.boostPackage?.name}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Duration</div>
              <div className="font-medium">
                {boostStatus.boostPackage ? formatBoostDuration(boostStatus.boostPackage.duration) : "-"}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Expires</div>
              <div className="font-medium">{expiryDate}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Remaining</div>
              <div className="font-medium flex items-center">
                <Clock className="h-4 w-4 mr-1 text-amber-500" />
                {boostStatus.remainingTime}
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(boostStatus.progress || 0)}%</span>
            </div>
            <Progress value={boostStatus.progress} className="h-2" />
          </div>
          
          <div className="bg-primary/10 rounded-md p-3 flex items-start space-x-3">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Your profile is being boosted</p>
              <p className="text-muted-foreground mt-1">
                Your profile is featured in search results, receives priority placement, 
                and is highlighted to potential clients
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" onClick={onCancel} className="w-full">
          Cancel Boost
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BoostStatusCard;
