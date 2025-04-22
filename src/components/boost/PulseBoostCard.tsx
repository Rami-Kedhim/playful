
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatPulseBoostDuration } from "@/constants/pulseBoostConfig";
import { PulseBoost } from "@/types/boost";
import { Clock, Star, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";

interface PulseBoostCardProps {
  boost: PulseBoost;
  isActive?: boolean;
  timeRemaining?: string;
  onActivate?: (boostId: string) => Promise<boolean>;
  onCancel?: (boostId: string) => Promise<boolean>;
  userBalance?: number;
  disabled?: boolean;
}

const PulseBoostCard = ({
  boost,
  isActive = false,
  timeRemaining,
  onActivate,
  onCancel,
  userBalance = 0,
  disabled = false
}: PulseBoostCardProps) => {
  const [loading, setLoading] = useState(false);
  const hasEnoughBalance = userBalance >= boost.costUBX;
  
  const getVisibilityIcon = () => {
    switch (boost.visibility) {
      case 'homepage': 
        return <Star className="h-4 w-4 text-yellow-500" />;
      case 'search': 
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
      case 'global': 
        return <Zap className="h-4 w-4 text-purple-500" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };
  
  const handleActivate = async () => {
    if (disabled || !onActivate || loading) return;
    
    setLoading(true);
    try {
      await onActivate(boost.id);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancel = async () => {
    if (disabled || !onCancel || loading) return;
    
    setLoading(true);
    try {
      await onCancel(boost.id);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className={`${isActive ? 'border-primary' : ''} transition-all hover:shadow-md`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            {getVisibilityIcon()}
            <span className="ml-2">{boost.name}</span>
          </CardTitle>
          <Badge 
            variant={isActive ? "default" : "outline"}
            style={{ backgroundColor: isActive ? boost.badgeColor : undefined }}
          >
            {isActive ? 'Active' : formatPulseBoostDuration(boost.durationMinutes)}
          </Badge>
        </div>
        <CardDescription>
          {boost.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isActive && timeRemaining ? (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                Time remaining
              </span>
              <span className="font-medium">{timeRemaining}</span>
            </div>
            <Progress value={75} className="h-1" />
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">{boost.costUBX} UBX</span>
            <span className="text-sm text-muted-foreground">
              Visibility: {boost.visibility.replace('_', ' ')}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {isActive ? (
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleCancel}
            disabled={disabled || loading || !onCancel}
          >
            {loading ? "Processing..." : "Cancel Boost"}
          </Button>
        ) : (
          <Button 
            className="w-full" 
            onClick={handleActivate}
            disabled={disabled || loading || !hasEnoughBalance || !onActivate}
            variant={hasEnoughBalance ? "default" : "outline"}
          >
            {loading ? "Processing..." : hasEnoughBalance ? "Activate Boost" : "Insufficient Balance"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PulseBoostCard;
