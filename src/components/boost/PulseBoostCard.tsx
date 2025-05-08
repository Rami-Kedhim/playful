
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap } from "lucide-react";
import { BoostPackage } from "@/types/pulse-boost";

interface PulseBoostCardProps {
  boost: BoostPackage;  // Changed from PulseBoost to BoostPackage
  isActive: boolean;
  timeRemaining?: string;
  onActivate: (boost: BoostPackage) => Promise<boolean>;
  onCancel: (boostId: string) => Promise<boolean>;
  userBalance: number;
  disabled?: boolean;
}

const PulseBoostCard: React.FC<PulseBoostCardProps> = ({
  boost,
  isActive,
  timeRemaining = '',
  onActivate,
  onCancel,
  userBalance = 0,
  disabled = false
}) => {
  if (!boost) return null;
  
  const handleActivate = () => {
    if (!boost || disabled || userBalance < (boost.price_ubx || 0)) return;
    return onActivate(boost);
  };
  
  const handleCancel = () => {
    if (!boost.id || disabled) return;
    return onCancel(boost.id);
  };
  
  const getProgress = () => {
    if (!timeRemaining || !isActive || !boost.durationMinutes) return 0;
    
    let hours = 0;
    let minutes = 0;
    
    // Handle different time formatting variants
    if (timeRemaining.includes('h')) {
      const parts = timeRemaining.split('h ');
      hours = parseInt(parts[0]) || 0;
      minutes = parseInt(parts[1]) || 0;
    } else if (timeRemaining.includes(':')) {
      const [h, m] = timeRemaining.split(':').map(Number);
      hours = h || 0;
      minutes = m || 0;
    }
    
    const totalMinutes = boost.durationMinutes;
    const remainingMinutes = (hours * 60) + minutes;
    return Math.max(0, Math.min(100, ((totalMinutes - remainingMinutes) / totalMinutes) * 100));
  };

  const badgeColorClass = boost.badgeColor || 'primary';
  const borderClass = isActive ? `border-${badgeColorClass}` : 'border-transparent';

  return (
    <Card className={`relative overflow-hidden border-2 ${borderClass}`}>
      {isActive && (
        <div className="absolute top-0 left-0 w-full px-6 pt-2">
          <Progress value={getProgress()} className="h-1" />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-xl">
              {boost.name || 'Unnamed Boost'}
              {isActive && <Zap className="ml-2 h-5 w-5 text-yellow-400 animate-pulse" />}
            </CardTitle>
            <CardDescription>{boost.description || ''}</CardDescription>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">{boost.price_ubx || 0} UBX</p>
            <p className="text-sm text-muted-foreground">
              {(boost.durationMinutes || 0) / 60} hours
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ul className="space-y-2">
            {(boost.features || []).map((feature, index) => (
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
              disabled={disabled || userBalance < (boost.price_ubx || 0)}
            >
              {userBalance < (boost.price_ubx || 0) ? "Insufficient UBX Balance" : "Activate Boost"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PulseBoostCard;
