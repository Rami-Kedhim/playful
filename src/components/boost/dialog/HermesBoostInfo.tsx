
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HermesBoostStatus, HermesBoostInfoProps } from "../types";
import { Info, Users, TrendingUp } from "lucide-react";

const HermesBoostInfo: React.FC<HermesBoostInfoProps> = ({
  hermesStatus,
  status,
  hermesData
}) => {
  // Use whichever prop is provided (for compatibility)
  const data = hermesData || hermesStatus || status;
  
  if (!data) {
    return null;
  }
  
  return (
    <Card className="mt-4">
      <CardContent className="pt-4">
        <div className="flex items-center gap-2 mb-4">
          <Info className="h-4 w-4 text-blue-500" />
          <h3 className="text-sm font-medium">Hermes-Oxum Analytics</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Queue Position</span>
              <span className="font-medium">#{data.position}</span>
            </div>
            <Progress value={100 - (data.position / data.activeUsers) * 100} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="p-2 bg-muted/50 rounded flex flex-col">
              <span className="text-muted-foreground flex items-center mb-1">
                <Users className="h-3 w-3 mr-1" />
                Active Users
              </span>
              <span className="font-semibold">{data.activeUsers}</span>
            </div>
            
            <div className="p-2 bg-muted/50 rounded flex flex-col">
              <span className="text-muted-foreground flex items-center mb-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                Visibility Score
              </span>
              <span className="font-semibold">{data.estimatedVisibility}%</span>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Last updated: {new Date(data.lastUpdateTime).toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HermesBoostInfo;
