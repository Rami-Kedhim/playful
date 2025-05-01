
import { Badge } from "@/components/ui/badge";
import { BoostStatus } from "@/types/boost";
import { Clock, Zap } from "lucide-react";

interface BoostActivePackageProps {
  boostStatus: BoostStatus;
  formatDuration?: (duration: string) => string;
  onCancel?: () => Promise<boolean>;
}

const BoostActivePackage = ({
  boostStatus,
  formatDuration = (d) => d,
  onCancel
}: BoostActivePackageProps) => {
  if (!boostStatus || !boostStatus.isActive) return null;

  const pkg = boostStatus.boostPackage || {
    name: boostStatus.packageName || "Unknown",
    boost_power: 0,
    visibility_increase: 0
  };

  // Calculate progress as a percentage
  const calculateProgress = (): number => {
    if (!boostStatus.startedAt && !boostStatus.startTime) return 0;
    if (!boostStatus.expiresAt && !boostStatus.endTime) return 0;
    
    // Use either startedAt/expiresAt or startTime/endTime
    const start = boostStatus.startedAt ? 
      new Date(boostStatus.startedAt).getTime() : 
      new Date(boostStatus.startTime as string).getTime();
      
    const end = boostStatus.expiresAt ? 
      new Date(boostStatus.expiresAt).getTime() : 
      new Date(boostStatus.endTime as string).getTime();
      
    const now = Date.now();
    
    const total = end - start;
    const elapsed = now - start;
    
    const progress = Math.floor((elapsed / total) * 100);
    return Math.min(Math.max(progress, 0), 100); // Clamp between 0-100
  };

  const progress = boostStatus.progress || calculateProgress();
  const remainingFormatted = boostStatus.remainingTime || boostStatus.timeRemaining || "Unknown";

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-xl font-semibold">{pkg.name}</div>
          <div className="text-sm text-muted-foreground">
            Boosting your profile visibility
          </div>
        </div>
        <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
          Active
        </Badge>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="h-2 w-full bg-secondary relative rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary absolute left-0 top-0" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            Started: {(boostStatus.startedAt || boostStatus.startTime) ? 
              new Date(boostStatus.startedAt || boostStatus.startTime as string).toLocaleString() : 
              "Unknown"}
          </span>
          <span>
            Expires: {(boostStatus.expiresAt || boostStatus.endTime) ? 
              new Date(boostStatus.expiresAt || boostStatus.endTime as string).toLocaleString() : 
              "Unknown"}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-secondary/20 p-3 rounded-md flex items-center">
          <Clock className="h-5 w-5 text-blue-500 mr-3" />
          <div>
            <div className="text-sm font-medium">Time Remaining</div>
            <div className="font-semibold">{remainingFormatted}</div>
          </div>
        </div>
        
        <div className="bg-secondary/20 p-3 rounded-md flex items-center">
          <Zap className="h-5 w-5 text-yellow-500 mr-3" />
          <div>
            <div className="text-sm font-medium">Visibility Boost</div>
            <div className="font-semibold">+{pkg.visibility_increase || 0}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoostActivePackage;
