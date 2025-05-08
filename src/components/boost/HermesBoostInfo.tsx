
import { AlertCircle, BarChart3, RefreshCw, Users, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { HermesStatus } from "@/types/boost";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface HermesBoostInfoProps {
  hermesStatus: HermesStatus;
  isActive?: boolean;
}

const HermesBoostInfo = ({ hermesStatus, isActive = false }: HermesBoostInfoProps) => {
  if (!isActive) {
    return (
      <Alert variant="default" className="bg-secondary/20 border-secondary/30">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No active boost to analyze. Boost your profile to see performance metrics.
        </AlertDescription>
      </Alert>
    );
  }

  const calculateProgressColor = (value: number) => {
    if (value > 80) return "bg-green-500";
    if (value > 50) return "bg-blue-500";
    if (value > 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Extract with default values to avoid null/undefined errors
  const position = hermesStatus.position || 0;
  const activeUsers = hermesStatus.activeUsers || 0;
  const estimatedVisibility = hermesStatus.estimatedVisibility || 0;
  const lastUpdateTime = hermesStatus.lastUpdateTime || new Date().toISOString();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-secondary/20 p-3 rounded-md">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Position</span>
            <span className="text-sm font-bold">#{position}</span>
          </div>
          <Progress 
            value={100 - Math.min(position, 100)} 
            className="h-1" 
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Best</span>
            <span>Worst</span>
          </div>
        </div>

        <div className="bg-secondary/20 p-3 rounded-md">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Active Users</span>
            <span className="text-sm font-bold">{activeUsers}</span>
          </div>
          <div className="flex items-center justify-center h-4">
            <Users className="h-4 w-4 text-blue-500" />
          </div>
        </div>
      </div>

      <div className="bg-secondary/20 p-3 rounded-md">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium">Visibility Score</span>
          <span className="text-sm font-bold">{estimatedVisibility}%</span>
        </div>
        <Progress 
          value={estimatedVisibility} 
          className={`h-2 ${calculateProgressColor(estimatedVisibility)}`} 
        />
        <div className="grid grid-cols-3 gap-1 mt-2">
          <div className="flex items-center text-xs">
            <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
            <span className="text-muted-foreground">Low</span>
          </div>
          <div className="flex items-center justify-center text-xs">
            <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
            <span className="text-muted-foreground">Medium</span>
          </div>
          <div className="flex items-center justify-end text-xs">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
            <span className="text-muted-foreground">High</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <span className="flex items-center">
          <RefreshCw className="h-3 w-3 mr-1" />
          Last updated: {new Date(lastUpdateTime).toLocaleTimeString()}
        </span>
        
        <span className="flex items-center">
          <BarChart3 className="h-3 w-3 mr-1" />
          Real-time metrics
        </span>
      </div>
    </div>
  );
};

export default HermesBoostInfo;
