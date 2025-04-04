
import { BoostStatus } from "@/types/boost";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap, Clock, Award } from "lucide-react";
import { formatBoostDuration } from "@/utils/boostCalculator";

interface BoostStatusCardProps {
  boostStatus: BoostStatus;
  onBoostProfile: () => void;
  isLoading?: boolean;
}

const BoostStatusCard = ({ 
  boostStatus, 
  onBoostProfile,
  isLoading = false 
}: BoostStatusCardProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center">
            <Zap className="h-5 w-5 text-yellow-500 mr-2" />
            Profile Boost
          </CardTitle>
          <CardDescription>Loading boost status...</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="h-20 flex items-center justify-center">
            <div className="animate-pulse flex space-x-4">
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!boostStatus.isActive) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center">
            <Zap className="h-5 w-5 text-yellow-500 mr-2" />
            Profile Boost
          </CardTitle>
          <CardDescription>
            Increase your profile visibility and get more engagement
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground mb-4">
            Your profile is currently not boosted. Get up to 10x more views with a profile boost!
          </p>
          <Button onClick={onBoostProfile} className="w-full">
            <Zap className="h-4 w-4 mr-2" />
            Boost Profile
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl flex items-center">
              <Zap className="h-5 w-5 text-yellow-500 mr-2" />
              Active Boost
            </CardTitle>
            <CardDescription>
              {boostStatus.boostPackage?.name || "Standard Boost"}
            </CardDescription>
          </div>
          <div className="px-2 py-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded text-xs font-medium flex items-center">
            <Award className="h-3 w-3 mr-1" />
            Active
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1 text-sm">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">Time Remaining:</span>
              </div>
              <span className="font-medium">{boostStatus.remainingTime}</span>
            </div>
            <Progress value={boostStatus.progress || 0} className="h-2" />
          </div>
          
          {boostStatus.boostPackage?.features && (
            <div className="bg-muted/50 p-3 rounded-md">
              <p className="text-sm font-medium mb-2">Active Benefits:</p>
              <ul className="text-xs space-y-1 text-muted-foreground">
                {boostStatus.boostPackage.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={onBoostProfile}
        >
          <Zap className="h-4 w-4 mr-2" />
          Extend Boost
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BoostStatusCard;
