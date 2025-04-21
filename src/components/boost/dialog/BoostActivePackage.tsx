
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, Users, BarChart } from "lucide-react";
import { BoostStatus } from "@/types/boost";

export interface BoostActivePackageProps {
  boostStatus: BoostStatus;
  hermesStatus?: {
    position: number;
    activeUsers: number;
    estimatedVisibility: number;
    lastUpdateTime: string;
  };
}

const BoostActivePackage = ({ boostStatus, hermesStatus }: BoostActivePackageProps) => {
  // Calculate time remaining in percentage
  const progress = boostStatus.progress || 0;
  
  // Format date and time display
  const formatTime = (timeString?: string) => {
    if (!timeString) return "N/A";
    const date = new Date(timeString);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center">
          <Zap className="h-5 w-5 mr-2 text-primary" />
          {boostStatus.packageName || "Active Boost"}
        </h3>
        <Badge variant="outline" className="px-2 py-1">
          Active
        </Badge>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>
        <Progress value={progress * 100} className="h-2" />
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">Started</span>
          <p>{formatTime(boostStatus.startTime)}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Ends</span>
          <p>{formatTime(boostStatus.endTime)}</p>
        </div>
      </div>
      
      {hermesStatus && (
        <Card className="mt-4">
          <CardContent className="pt-4">
            <h4 className="text-sm font-medium mb-3">Boost Analytics</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <BarChart className="h-4 w-4 mr-2 text-primary" />
                <div>
                  <div className="text-sm font-medium">#{hermesStatus.position}</div>
                  <div className="text-xs text-muted-foreground">Position</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-primary" />
                <div>
                  <div className="text-sm font-medium">{hermesStatus.activeUsers}</div>
                  <div className="text-xs text-muted-foreground">Active Users</div>
                </div>
              </div>
              
              <div className="flex items-center col-span-2">
                <Clock className="h-4 w-4 mr-2 text-primary" />
                <div>
                  <div className="text-sm font-medium">{hermesStatus.estimatedVisibility}% higher</div>
                  <div className="text-xs text-muted-foreground">Visibility</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BoostActivePackage;
