
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { formatDistanceToNow } from 'date-fns';
import { Zap, Clock, Check, XCircle } from 'lucide-react';
import { usePulseBoost } from '@/modules/pulse-boost/hooks/usePulseBoost';
import { PulseBoost } from '@/types/pulse-boost';
import { Badge } from '@/components/ui/badge';
import LoadingOverlay from '@/components/ui/loading-overlay';

interface PulseBoostManagerProps {
  profileId: string;
  onBoostActivated?: () => void;
  onBoostCancelled?: () => void;
}

const formatDuration = (duration: string): string => {
  if (!duration.includes(':')) return duration;
  const [hours, minutes] = duration.split(':');
  return `${hours}h ${minutes || '00'}m`;
};

const calculateTimeRemaining = (expiresAt?: Date): string => {
  if (!expiresAt) return '00:00:00';
  const now = new Date();
  const diff = Math.max(0, expiresAt.getTime() - now.getTime());
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
};

const PulseBoostCard = ({ boost, onSelect, isActive }: { 
  boost: PulseBoost; 
  onSelect: () => void;
  isActive?: boolean;
}) => {
  const handleClick = () => {
    if (!isActive) {
      onSelect();
    }
  };

  return (
    <Card 
      className={`cursor-pointer ${isActive ? 'border-primary' : 'border-border'} hover:border-primary transition-all`}
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{boost.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{boost.description}</p>
            
            <div className="flex flex-wrap gap-1 mt-2">
              {boost.features?.map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center mt-3">
              <Clock className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-sm">{formatDuration(boost.duration)}</span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-bold">{boost.price_ubx} UBX</div>
            {isActive && (
              <Badge variant="default" className="mt-1">
                <Check className="h-3 w-3 mr-1" />
                Selected
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PulseBoostManager: React.FC<PulseBoostManagerProps> = ({ 
  profileId,
  onBoostActivated,
  onBoostCancelled
}) => {
  const { 
    pulseBoostPackages, 
    boostStatus, 
    isLoading, 
    userEconomy,
    purchaseBoost,
    cancelBoost,
    boostAnalytics
  } = usePulseBoost(profileId);
  
  const [selectedBoost, setSelectedBoost] = useState<string | null>(null);
  const [isPurchasing, setIsPurchasing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<string>('');
  
  // Update progress and remaining time for active boosts
  useEffect(() => {
    if (!boostStatus.isActive || !boostStatus.expiresAt) return;
    
    const calculateProgress = () => {
      const now = new Date();
      if (!boostStatus.startedAt || !boostStatus.expiresAt) return 0;
      
      const start = boostStatus.startedAt.getTime();
      const end = boostStatus.expiresAt.getTime();
      const current = now.getTime();
      
      const totalDuration = end - start;
      const elapsed = current - start;
      
      return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
    };
    
    const updateStatus = () => {
      const progressValue = calculateProgress();
      setProgress(progressValue);
      setRemainingTime(calculateTimeRemaining(boostStatus.expiresAt));
    };
    
    updateStatus();
    const interval = setInterval(updateStatus, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [boostStatus]);
  
  const handleSelectBoost = (id: string) => {
    setSelectedBoost(id);
  };
  
  const handlePurchaseBoost = async () => {
    if (!selectedBoost) return;
    
    const boostPackage = pulseBoostPackages.find(p => p.id === selectedBoost);
    if (!boostPackage) return;
    
    setIsPurchasing(true);
    try {
      const success = await purchaseBoost(boostPackage);
      if (success && onBoostActivated) {
        onBoostActivated();
      }
    } finally {
      setIsPurchasing(false);
    }
  };
  
  const handleCancelBoost = async () => {
    setIsPurchasing(true);
    try {
      const success = await cancelBoost();
      if (success && onBoostCancelled) {
        onBoostCancelled();
      }
    } finally {
      setIsPurchasing(false);
    }
  };
  
  if (isLoading) {
    return <LoadingOverlay text="Loading boost options..." />;
  }
  
  return (
    <div className="space-y-6">
      {boostStatus.isActive ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-500" />
              Active Boost
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{boostStatus.packageName}</h3>
                <p className="text-sm text-muted-foreground">
                  Expires {boostStatus.expiresAt && formatDistanceToNow(boostStatus.expiresAt, { addSuffix: true })}
                </p>
              </div>
              <Badge variant="outline" className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {remainingTime} remaining
              </Badge>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} />
            </div>
            
            {boostAnalytics && (
              <div className="pt-2 space-y-3">
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Additional Views</p>
                    <p className="font-medium">+{boostAnalytics.additionalViews || 0}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Engagement Increase</p>
                    <p className="font-medium">+{boostAnalytics.engagementIncrease || 0}%</p>
                  </div>
                </div>
              </div>
            )}
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleCancelBoost}
              disabled={isPurchasing}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Cancel Boost
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Boost Options</h2>
            <Badge variant="outline">
              Balance: {userEconomy.ubxBalance} UBX
            </Badge>
          </div>
          
          <div className="grid gap-4">
            {pulseBoostPackages.map(boost => (
              <PulseBoostCard
                key={boost.id}
                boost={boost}
                onSelect={() => handleSelectBoost(boost.id)}
                isActive={selectedBoost === boost.id}
              />
            ))}
          </div>
          
          <Button 
            className="w-full" 
            disabled={!selectedBoost || isPurchasing}
            onClick={handlePurchaseBoost}
          >
            <Zap className="h-4 w-4 mr-2" />
            {isPurchasing ? 'Processing...' : 'Activate Boost'}
          </Button>
        </>
      )}
    </div>
  );
};

export default PulseBoostManager;
