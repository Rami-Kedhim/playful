
import { HermesStatus } from "@/types/boost";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, TrendingUp } from "lucide-react";

interface HermesBoostInfoProps {
  hermesStatus: HermesStatus;
}

const HermesBoostInfo = ({ hermesStatus }: HermesBoostInfoProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Global Position</span>
              <span className="font-medium">#{hermesStatus.position || 'N/A'}</span>
            </div>
            <Progress value={100 - (hermesStatus.position || 0)} />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Active Users</span>
            </div>
            <span className="font-medium">{hermesStatus.activeUsers || 0}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Estimated Visibility</span>
            </div>
            <span className="font-medium">{hermesStatus.estimatedVisibility || 0}%</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Last Updated</span>
            </div>
            <span className="text-sm">
              {new Date(hermesStatus.lastUpdateTime || Date.now()).toLocaleTimeString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HermesBoostInfo;
