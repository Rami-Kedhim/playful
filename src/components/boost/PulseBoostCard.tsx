
import { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Clock, Zap, ChevronRight } from "lucide-react";
import { formatPulseBoostDuration } from '@/constants/pulseBoostConfig';
import { PulseBoost } from '@/types/boost';

interface PulseBoostCardProps {
  boost: PulseBoost;
  isActive: boolean;
  timeRemaining?: string;
  onActivate?: (boostId: string) => Promise<boolean>;
  onCancel: (boostId: string) => Promise<boolean>;
  userBalance?: number;
  disabled?: boolean;
}

const PulseBoostCard: React.FC<PulseBoostCardProps> = ({
  boost,
  isActive,
  timeRemaining,
  onActivate,
  onCancel,
  userBalance = 0,
  disabled = false
}) => {
  const [loading, setLoading] = useState(false);
  
  // Format duration to readable string
  const formattedDuration = formatPulseBoostDuration(boost.durationMinutes);
  
  // Check if user can afford this boost
  const canAfford = userBalance >= boost.costUBX;
  
  const handleActivate = async () => {
    if (loading || !onActivate) return;
    
    setLoading(true);
    try {
      await onActivate(boost.id);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancel = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      await onCancel(boost.id);
    } finally {
      setLoading(false);
    }
  };
  
  // Card background style based on boost type or if active
  const cardStyle = isActive
    ? { borderColor: boost.badgeColor || '#3b82f6', backgroundColor: (boost.badgeColor || '#3b82f6') + '10' }
    : {};
  
  return (
    <Card className="overflow-hidden" style={cardStyle}>
      <CardContent className="p-5 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-lg">{boost.name}</h3>
          <Badge style={{ backgroundColor: boost.badgeColor || '#3b82f6' }}>
            {isActive ? 'Active' : `${boost.costUBX} UBX`}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground">
          {boost.description || `Increases profile visibility across ${boost.visibility}`}
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-background/50 p-3 rounded-md flex flex-col items-center">
            <Clock className="h-4 w-4 mb-1 text-muted-foreground" />
            <span className="text-sm font-semibold">{formattedDuration}</span>
            <span className="text-xs text-muted-foreground">Duration</span>
          </div>
          <div className="bg-background/50 p-3 rounded-md flex flex-col items-center">
            <Zap className="h-4 w-4 mb-1 text-muted-foreground" />
            <span className="text-sm font-semibold">{boost.visibility}</span>
            <span className="text-xs text-muted-foreground">Visibility</span>
          </div>
        </div>
        
        {isActive && (
          <div className="mt-2 bg-background/80 p-2 rounded-md text-center">
            <span className="text-sm font-medium">{timeRemaining || formattedDuration} remaining</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="px-5 pb-5 pt-0">
        {isActive ? (
          <Button 
            variant="outline" 
            onClick={handleCancel} 
            disabled={loading || disabled}
            className="w-full"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Cancel Boost
          </Button>
        ) : (
          <Button 
            onClick={handleActivate} 
            disabled={loading || !canAfford || disabled || !onActivate}
            className="w-full"
            variant={canAfford ? "default" : "outline"}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ChevronRight className="h-4 w-4 ml-2" />
            )}
            {canAfford ? 'Activate' : 'Not Enough UBX'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PulseBoostCard;
