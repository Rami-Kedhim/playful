
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { formatDistance } from 'date-fns';
import { Zap, Clock, Flame, BarChart3 } from 'lucide-react';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import { usePulseBoost } from '@/modules/pulse-boost/hooks/usePulseBoost';
import { toast } from '@/hooks/use-toast';

interface PulseBoostManagerProps {
  profileId: string;
  onSuccess?: () => void;
  showAnalytics?: boolean;
}

const PulseBoostManager: React.FC<PulseBoostManagerProps> = ({ 
  profileId, 
  onSuccess, 
  showAnalytics = false 
}) => {
  const { 
    packages,
    activeBoost,
    loading,
    purchaseBoost,
    cancelBoost,
    analytics 
  } = usePulseBoost(profileId);
  
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');
  const [processingAction, setProcessingAction] = useState(false);
  
  useEffect(() => {
    if (packages.length > 0 && !selectedPackageId) {
      // Default to the most popular package
      const popularPackage = packages.find(pkg => pkg.isMostPopular);
      setSelectedPackageId(popularPackage?.id || packages[0].id);
    }
  }, [packages, selectedPackageId]);
  
  const handleBoost = async () => {
    if (!selectedPackageId) {
      toast({
        title: "Error",
        description: "Please select a boost package",
        variant: "destructive"
      });
      return;
    }
    
    setProcessingAction(true);
    
    try {
      const success = await purchaseBoost(selectedPackageId);
      if (success && onSuccess) {
        onSuccess();
      }
    } finally {
      setProcessingAction(false);
    }
  };
  
  const handleCancel = async () => {
    setProcessingAction(true);
    
    try {
      const success = await cancelBoost();
      if (success && onSuccess) {
        onSuccess();
      }
    } finally {
      setProcessingAction(false);
    }
  };
  
  const formatDuration = (durationString: string): string => {
    if (!durationString) return '';
    
    if (durationString.includes(':')) {
      const [hours, minutes] = durationString.split(':');
      return `${hours}h ${minutes}m`;
    }
    
    return durationString;
  };
  
  const renderTimeRemaining = () => {
    if (!activeBoost?.expiresAt) return null;
    
    const now = new Date();
    const expiry = new Date(activeBoost.expiresAt);
    
    if (now > expiry) return null;
    
    return formatDistance(expiry, now, { addSuffix: true });
  };
  
  const renderActiveBoost = () => {
    if (!activeBoost?.isActive) return null;
    
    return (
      <Card className="border-2 border-primary/50 mb-6">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 text-amber-500 mr-2" />
                Active Boost
              </CardTitle>
              <CardDescription>
                Your profile is currently boosted
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-amber-500/10 text-amber-600">
              ACTIVE
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <div className="text-sm text-muted-foreground">Package</div>
              <div className="font-medium">{activeBoost.packageName || "PULSE Boost"}</div>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{renderTimeRemaining()}</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{activeBoost.progress || 0}%</span>
              </div>
              <Progress value={activeBoost.progress || 0} />
            </div>
            
            {showAnalytics && analytics && (
              <div className="bg-muted/50 rounded-md p-3 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Boost Analytics</span>
                </div>
                <ul className="space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span>Additional views:</span>
                    <span className="font-medium text-emerald-600">+{analytics.additionalViews}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Engagement increase:</span>
                    <span className="font-medium text-emerald-600">+{analytics.engagementIncrease}%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>New ranking position:</span>
                    <span className="font-medium">#{analytics.rankingPosition}</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleCancel}
            disabled={processingAction}
          >
            {processingAction ? 'Cancelling...' : 'Cancel Boost'}
          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  const renderPackages = () => {
    return (
      <div className="space-y-4">
        {packages.map(pkg => (
          <Card 
            key={pkg.id}
            className={`cursor-pointer transition-all hover:border-primary/50 ${
              selectedPackageId === pkg.id ? 'border-2 border-primary' : ''
            }`}
            onClick={() => setSelectedPackageId(pkg.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div>
                  <CardTitle>{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </div>
                {pkg.isMostPopular && (
                  <Badge variant="secondary" className="bg-amber-500/10 text-amber-600">
                    Popular
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-baseline">
                  <div className="text-2xl font-bold">{pkg.price_ubx} UBX</div>
                  <div className="text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 inline-block mr-1" />
                    {formatDuration(pkg.duration)}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-amber-500" />
                    <span>
                      {pkg.visibility_increase 
                        ? `+${pkg.visibility_increase}% Visibility` 
                        : "Enhanced visibility"}
                    </span>
                  </div>
                  
                  <ul className="text-sm pl-6 list-disc space-y-1">
                    {pkg.features?.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
  if (loading) {
    return <LoadingOverlay message="Loading boost packages..." />;
  }
  
  return (
    <div className="space-y-6">
      {renderActiveBoost()}
      
      {!activeBoost?.isActive && (
        <>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Select a Boost Package</h3>
            {renderPackages()}
          </div>
          
          <Button 
            className="w-full"
            disabled={processingAction || !selectedPackageId}
            onClick={handleBoost}
          >
            <Zap className="mr-2 h-4 w-4" />
            {processingAction ? 'Processing...' : 'Boost My Profile'}
          </Button>
          
          <div className="text-xs text-center text-muted-foreground">
            By boosting your profile, you agree to our terms and conditions.
          </div>
        </>
      )}
    </div>
  );
};

export default PulseBoostManager;
