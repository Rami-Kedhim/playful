
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PulseBoost } from "@/types/pulse-boost";
import { Zap } from "lucide-react";

interface PulseBoostCardProps {
  boost: PulseBoost;
  isActive: boolean;
  timeRemaining?: string;
  onActivate: (boost: PulseBoost) => Promise<boolean>;
  onCancel: (boostId: string) => Promise<boolean>;
  userBalance: number;
  disabled?: boolean;
}

const PulseBoostCard: React.FC<PulseBoostCardProps> = ({
  boost,
  isActive,
  timeRemaining,
  onActivate,
  onCancel,
  userBalance,
  disabled = false
}) => {
  const handleActivate = () => onActivate(boost);
  const handleCancel = () => onCancel(boost.id);
  
  const getProgress = () => {
    if (!timeRemaining || !isActive) return 0;
    const [hours, minutes] = timeRemaining.split('h ')[0].split(':').map(Number);
    const totalMinutes = boost.durationMinutes;
    const remainingMinutes = (hours * 60) + (minutes || 0);
    return Math.max(0, Math.min(100, ((totalMinutes - remainingMinutes) / totalMinutes) * 100));
  };

  return (
    <Card className={`relative overflow-hidden border-2 ${isActive ? `border-${boost.badgeColor}` : 'border-transparent'}`}>
      {isActive && (
        <div className="absolute top-0 left-0 w-full px-6 pt-2">
          <Progress value={getProgress()} className="h-1" />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-xl">
              {boost.name}
              {isActive && <Zap className="ml-2 h-5 w-5 text-yellow-400 animate-pulse" />}
            </CardTitle>
            <CardDescription>{boost.description}</CardDescription>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">{boost.costUBX} UBX</p>
            <p className="text-sm text-muted-foreground">
              {boost.durationMinutes / 60} hours
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ul className="space-y-2">
            {boost.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm">
                <Zap className="mr-2 h-4 w-4 text-primary" />
                {feature}
              </li>
            ))}
          </ul>
          
          {isActive ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Time Remaining:</span>
                <span className="font-semibold">{timeRemaining}</span>
              </div>
              <Button 
                variant="destructive" 
                className="w-full" 
                onClick={handleCancel}
                disabled={disabled}
              >
                Cancel Boost
              </Button>
            </div>
          ) : (
            <Button 
              className="w-full" 
              onClick={handleActivate}
              disabled={disabled || userBalance < boost.costUBX}
            >
              {userBalance < boost.costUBX ? "Insufficient UBX Balance" : "Activate Boost"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PulseBoostCard;
