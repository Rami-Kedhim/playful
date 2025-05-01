
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { usePulseBoost } from '@/modules/pulse-boost/hooks/usePulseBoost';
import { formatBoostDuration } from '@/utils/boost/boostCalculator';
import { BoostPackage } from '@/types/pulse-boost';
import { useToast } from '@/hooks/use-toast';

interface PulseBoostManagerProps {
  profileId: string;
}

const PulseBoostManager: React.FC<PulseBoostManagerProps> = ({ profileId }) => {
  const [selectedBoostPackage, setSelectedBoostPackage] = useState<string>('');
  const { toast } = useToast();
  const {
    pulseBoostPackages,
    boostStatus,
    isLoading,
    error,
    userEconomy,
    purchaseBoost,
    cancelBoost,
    boostAnalytics
  } = usePulseBoost(profileId);

  useEffect(() => {
    // If there are packages and none selected, select the first one
    if (pulseBoostPackages.length > 0 && !selectedBoostPackage) {
      setSelectedBoostPackage(pulseBoostPackages[0].id);
    }
  }, [pulseBoostPackages, selectedBoostPackage]);

  const handleBoostActivation = async () => {
    if (!selectedBoostPackage) {
      toast({
        title: "Error",
        description: "Please select a boost package first",
        variant: "destructive",
      });
      return;
    }

    const boostPackage = pulseBoostPackages.find(pkg => pkg.id === selectedBoostPackage);
    if (!boostPackage) {
      toast({
        title: "Error",
        description: "Selected package not found",
        variant: "destructive",
      });
      return;
    }

    const success = await purchaseBoost(boostPackage);
    if (success) {
      toast({
        title: "Boost Activated",
        description: `Your profile has been boosted with the ${boostPackage.name} package`,
        variant: "default",
      });
    } else {
      toast({
        title: "Activation Failed",
        description: "There was an error activating your boost",
        variant: "destructive",
      });
    }
  };

  const handleCancelBoost = async () => {
    const success = await cancelBoost();
    
    if (success) {
      toast({
        title: "Boost Cancelled",
        description: "Your profile boost has been cancelled",
        variant: "default",
      });
    } else {
      toast({
        title: "Cancellation Failed",
        description: "There was an error cancelling your boost",
        variant: "destructive",
      });
    }
  };

  const calculateTimeRemaining = () => {
    if (!boostStatus.expiresAt) return '0%';
    
    const now = new Date();
    const expiryDate = new Date(boostStatus.expiresAt);
    const startDate = boostStatus.startedAt ? new Date(boostStatus.startedAt) : new Date(now.getTime() - 24 * 60 * 60 * 1000); // Default to 24 hours ago
    
    const totalDuration = expiryDate.getTime() - startDate.getTime();
    const elapsed = now.getTime() - startDate.getTime();
    const percentComplete = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
    
    return `${Math.round(percentComplete)}%`;
  };

  const getSelectedPackage = (): BoostPackage | undefined => {
    return pulseBoostPackages.find(pkg => pkg.id === selectedBoostPackage);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center text-destructive">
            <AlertTriangle className="mr-2" />
            <span>There was an error loading boost information</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show active boost
  if (boostStatus.isActive) {
    const timeRemaining = calculateTimeRemaining();
    const selectedPackage = boostStatus.boostPackage;
    const packageName = boostStatus.packageName || selectedPackage?.name || 'Active Boost';
    
    return (
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center">
              <Zap className="text-primary mr-2" /> Active Boost
            </CardTitle>
            <Badge variant="outline" className="bg-primary/10">
              {packageName}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {/* Remaining time */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" /> Time Remaining
                </span>
                <span className="font-medium">{boostStatus.timeRemaining || '00:00:00'}</span>
              </div>
              <Progress 
                value={boostStatus.progress || parseInt(timeRemaining)} 
                className="h-2"
              />
            </div>
            
            {/* Boost effects */}
            {selectedPackage && (
              <div className="rounded-lg bg-muted p-3">
                <p className="text-sm flex items-center mb-2">
                  <TrendingUp className="h-4 w-4 mr-2 text-green-500" /> 
                  <span>Visibility increased by {selectedPackage.visibility || '300%'}</span>
                </p>
                
                {boostAnalytics?.additionalViews && (
                  <p className="text-sm">
                    +{boostAnalytics.additionalViews} additional profile views
                  </p>
                )}
              </div>
            )}
            
            {/* Cancel button */}
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleCancelBoost}
            >
              Cancel Boost
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show boost packages
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <Zap className="text-primary mr-2" /> Boost Your Profile
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Package selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pulseBoostPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                  selectedBoostPackage === pkg.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedBoostPackage(pkg.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{pkg.name}</h3>
                  {pkg.isMostPopular && (
                    <Badge size="sm" variant="secondary">Popular</Badge>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{pkg.description}</p>
                
                <div className="flex justify-between">
                  <span className="text-sm">
                    Duration: {formatBoostDuration(pkg.duration)}
                  </span>
                  <span className="font-medium">
                    {pkg.price_ubx} UBX
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Features of selected package */}
          {getSelectedPackage() && (
            <div className="rounded-lg bg-muted p-3">
              <h4 className="font-medium mb-2">Package Features:</h4>
              <ul className="text-sm space-y-1">
                {getSelectedPackage()?.features?.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Zap className="h-3 w-3 mr-2 text-primary" /> {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* UBX balance */}
          <div className="flex justify-between items-center text-sm">
            <span>Your UBX Balance:</span>
            <span className="font-medium">{userEconomy.ubxBalance} UBX</span>
          </div>
          
          {/* Boost button */}
          <Button 
            className="w-full" 
            onClick={handleBoostActivation}
            disabled={!selectedBoostPackage || (getSelectedPackage()?.price_ubx || 0) > userEconomy.ubxBalance}
          >
            Activate Boost
          </Button>
          
          {/* Insufficient balance warning */}
          {selectedBoostPackage && 
            (getSelectedPackage()?.price_ubx || 0) > userEconomy.ubxBalance && (
            <p className="text-xs text-center text-destructive">
              Insufficient UBX balance. Please top up your account.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PulseBoostManager;
