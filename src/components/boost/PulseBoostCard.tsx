
import { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Clock, Zap, ChevronRight, CheckCircle, AlertCircle } from "lucide-react";
import { PulseBoost } from '@/types/pulse-boost';
import { BoostPackage } from '@/types/boost';
import { toast } from '@/hooks/use-toast';

interface PulseBoostCardProps {
  boost: PulseBoost;
  isActive: boolean;
  timeRemaining?: string;
  onActivate?: (pkg: BoostPackage) => Promise<boolean>; // Updated type to accept BoostPackage
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
  const [actionSuccess, setActionSuccess] = useState<boolean | null>(null);
  
  // Format duration to readable string safely
  const formatDuration = (minutes?: number): string => {
    if (!minutes && minutes !== 0) return "Unknown";
    if (minutes < 60) return `${minutes} minutes`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)} hours`;
    return `${Math.floor(minutes / 1440)} days`;
  };

  // Safely get formatted duration string
  const formattedDuration = boost.durationMinutes !== undefined ? 
    formatDuration(boost.durationMinutes) : 
    (boost.duration || "Unknown");
  
  // Check if user can afford this boost safely
  const boostCost = boost.costUBX ?? boost.price_ubx ?? boost.price ?? 0;
  const canAfford = userBalance >= boostCost;
  
  const handleActivate = async () => {
    if (loading || !onActivate) return;
    
    setLoading(true);
    setActionSuccess(null);
    
    try {
      // Convert the PulseBoost to BoostPackage for the onActivate call
      const boostPackage: BoostPackage = {
        id: boost.id,
        name: boost.name,
        description: boost.description || '',
        duration: boost.duration || '00:00:00',
        price: boost.price || 0,
        price_ubx: boost.price_ubx || boost.costUBX || 0,
        features: boost.features || [],
        visibility_increase: typeof boost.visibility_increase === 'number' ? boost.visibility_increase : 50,
        color: boost.color
      };
      
      const success = await onActivate(boostPackage);
      setActionSuccess(success);
      
      if (success) {
        toast({
          title: "Boost Activated",
          description: `Your ${boost.name} has been successfully activated.`,
          variant: "default"
        });
      } else {
        toast({
          title: "Activation Failed",
          description: "There was an issue activating your boost.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error activating boost:", error);
      setActionSuccess(false);
      
      toast({
        title: "Activation Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancel = async () => {
    if (loading) return;
    
    setLoading(true);
    setActionSuccess(null);
    
    try {
      const success = await onCancel(boost.id);
      setActionSuccess(success);
      
      if (success) {
        toast({
          title: "Boost Cancelled",
          description: `Your ${boost.name} has been cancelled.`,
          variant: "default"
        });
      } else {
        toast({
          title: "Cancellation Failed",
          description: "There was an issue cancelling your boost.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error cancelling boost:", error);
      setActionSuccess(false);
      
      toast({
        title: "Cancellation Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Card background style based on boost type or if active
  const cardStyle = isActive
    ? { borderColor: boost.badgeColor || boost.color || '#3b82f6', backgroundColor: (boost.badgeColor || boost.color || '#3b82f6') + '10' }
    : {};
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md" style={cardStyle}>
      <CardContent className="p-5 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-lg">{boost.name || 'Unnamed Boost'}</h3>
          <Badge style={{ backgroundColor: boost.badgeColor || boost.color || '#3b82f6' }}>
            {isActive ? 'Active' : `${boostCost} UBX`}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground">
          {boost.description || `Increases profile visibility across ${boost.visibility || 'platform'}`}
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-background/50 p-3 rounded-md flex flex-col items-center">
            <Clock className="h-4 w-4 mb-1 text-muted-foreground" />
            <span className="text-sm font-semibold">{formattedDuration}</span>
            <span className="text-xs text-muted-foreground">Duration</span>
          </div>
          <div className="bg-background/50 p-3 rounded-md flex flex-col items-center">
            <Zap className="h-4 w-4 mb-1 text-muted-foreground" />
            <span className="text-sm font-semibold">{boost.visibility || 'Standard'}</span>
            <span className="text-xs text-muted-foreground">Visibility</span>
          </div>
        </div>
        
        {isActive && timeRemaining && (
          <div className="mt-2 bg-background/80 p-2 rounded-md text-center">
            <span className="text-sm font-medium">{timeRemaining} remaining</span>
          </div>
        )}
        
        {!isActive && !canAfford && (
          <div className="mt-2 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-2 rounded-md text-center">
            <span className="text-sm font-medium flex items-center justify-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              Insufficient balance
            </span>
          </div>
        )}
        
        {actionSuccess === false && (
          <div className="mt-2 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-2 rounded-md text-center">
            <span className="text-sm font-medium">Action failed. Please try again.</span>
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
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cancelling...
              </>
            ) : (
              <>Cancel Boost</>
            )}
          </Button>
        ) : (
          <Button 
            onClick={handleActivate} 
            disabled={loading || !canAfford || disabled || !onActivate}
            className="w-full"
            variant={canAfford ? "default" : "outline"}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Activating...
              </>
            ) : actionSuccess ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Activated
              </>
            ) : (
              <>
                Activate
                <ChevronRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PulseBoostCard;
