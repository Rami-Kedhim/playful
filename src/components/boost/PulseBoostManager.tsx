
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { PulseBoost, BoostPackage, EnhancedBoostStatus } from '@/types/pulse-boost';
import { formatBoostDuration, calculateRemainingTime } from '@/utils/boost/boostCalculator';
import { Rocket, Star, Clock, TrendingUp } from 'lucide-react';

interface PulseBoostManagerProps {
  profileId?: string;
  onBoostActivated?: () => void;
  currentBoost?: EnhancedBoostStatus | null;
  availablePackages?: PulseBoost[];
  onPurchase?: (packageId: string) => Promise<boolean>;
}

const PulseBoostManager = ({
  profileId,
  onBoostActivated,
  currentBoost,
  availablePackages = [],
  onPurchase
}: PulseBoostManagerProps) => {
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [progressPercentage, setProgressPercentage] = useState(0);

  // Effect to update time remaining and progress
  useEffect(() => {
    if (!currentBoost?.isActive || !currentBoost.expiresAt) return;

    const updateTimeAndProgress = () => {
      if (!currentBoost?.expiresAt) return;

      // Calculate time remaining
      const remaining = calculateRemainingTime(currentBoost.expiresAt);
      setTimeRemaining(remaining);

      // Calculate progress percentage
      if (currentBoost.startedAt && currentBoost.expiresAt) {
        const total = currentBoost.expiresAt.getTime() - currentBoost.startedAt.getTime();
        const elapsed = Date.now() - currentBoost.startedAt.getTime();
        const progress = (elapsed / total) * 100;
        setProgressPercentage(100 - Math.min(Math.max(progress, 0), 100));
      }
    };

    updateTimeAndProgress();
    const interval = setInterval(updateTimeAndProgress, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [currentBoost]);

  const handlePurchase = async () => {
    if (!selectedPackage || !profileId) return;
    
    setIsProcessing(true);
    try {
      if (onPurchase) {
        const success = await onPurchase(selectedPackage);
        if (success) {
          toast({
            title: "Boost activated!",
            description: "Your profile visibility has been boosted.",
            variant: "default",
          });
          if (onBoostActivated) onBoostActivated();
        } else {
          toast({
            title: "Failed to activate boost",
            description: "There was an error while processing your request.",
            variant: "destructive",
          });
        }
      } else {
        // Mock success if no onPurchase handler provided
        toast({
          title: "Boost activated!",
          description: "Your profile visibility has been boosted.",
          variant: "default",
        });
        if (onBoostActivated) onBoostActivated();
      }
    } catch (error) {
      console.error("Error activating boost:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (currentBoost?.isActive) {
    return (
      <Card className="border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Rocket className="mr-2 h-5 w-5 text-primary" />
            Active Boost
            <Badge variant="outline" className="ml-auto">
              {currentBoost.packageName || "Premium"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Time Remaining</span>
              <span className="font-medium">{timeRemaining}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          <div className="rounded-lg bg-muted p-3">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span>Your profile is <strong>featured</strong> and getting more visibility</span>
            </div>
          </div>
          
          <Button variant="outline" className="w-full" disabled>
            Currently Active
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Boost Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {availablePackages.map((pkg) => (
            <div 
              key={pkg.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedPackage === pkg.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              <div className="flex items-center justify-between">
                <div className="font-medium">{pkg.name}</div>
                {pkg.isMostPopular && (
                  <Badge variant="secondary">
                    Popular
                  </Badge>
                )}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{pkg.description}</div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{formatBoostDuration(pkg.duration)}</span>
                </div>
                <div className="font-medium">{pkg.price} Credits</div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {pkg.features?.map((feature, index) => (
                  <div key={index} className="flex items-center gap-1 text-xs bg-secondary/50 text-secondary-foreground px-2 py-1 rounded-full">
                    <Star className="h-3 w-3" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <Button 
          className="w-full" 
          disabled={!selectedPackage || isProcessing}
          onClick={handlePurchase}
        >
          {isProcessing ? "Processing..." : "Activate Boost"}
        </Button>
        
        <div className="text-center text-xs text-muted-foreground">
          Boost your visibility and get more profile views
        </div>
      </CardContent>
    </Card>
  );
};

export default PulseBoostManager;
