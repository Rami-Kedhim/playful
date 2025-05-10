
import React from 'react';
import { useBoostOperations } from '@/hooks/boost/useBoostOperations';
import { BoostPackage, BoostStatus } from '@/types/pulse-boost';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Clock, BarChart, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import BoostPackageCard from '@/components/boost/BoostPackageCard';

interface UseBoostOperationsReturn {
  boostStatus: BoostStatus;
  loading: boolean;
  error: string | null;
  activateBoost: (packageId: string) => Promise<boolean>;
  cancelBoost: () => Promise<boolean>;
  boostEligibility?: any;
  boostPackages?: BoostPackage[];
  getBoostPrice?: () => number;
  hermesMetrics?: any;
  boostProfile?: (profileId: string, packageId: string) => Promise<boolean>;
}

const CreatorBoostTab = ({ creatorId }: { creatorId: string }) => {
  const {
    boostStatus,
    loading,
    error,
    activateBoost,
    cancelBoost,
    boostEligibility,
    boostPackages,
    getBoostPrice,
    hermesMetrics,
    boostProfile,
  } = useBoostOperations(creatorId) as UseBoostOperationsReturn;

  const [selectedPackage, setSelectedPackage] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const handleSubmit = async () => {
    if (!selectedPackage || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      if (boostProfile) {
        await boostProfile(creatorId, selectedPackage);
      } else if (activateBoost) {
        await activateBoost(selectedPackage);
      }
    } catch (err) {
      console.error("Failed to activate boost:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formatTimeRemaining = (date?: Date | string) => {
    if (!date) return "N/A";
    try {
      const expiryDate = typeof date === 'string' ? new Date(date) : date;
      return formatDistanceToNow(expiryDate, { addSuffix: true });
    } catch (err) {
      return "N/A";
    }
  };

  // Function to render current boost status if active
  const renderActiveBoost = () => {
    if (!boostStatus?.isActive) return null;
    
    const boostLevel = boostStatus?.boostPackage?.boost_power || 0;
    const progress = boostStatus?.progress || 0;
    const timeRemaining = boostStatus?.timeRemaining || "Unknown";
    
    return (
      <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Active Boost
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Package</div>
                <div className="font-medium">{boostStatus.packageName || 'Standard Boost'}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Boost Level</div>
                <div className="font-medium flex items-center gap-1">
                  {Array.from({ length: Math.min(5, boostLevel || 1) }).map((_, i) => (
                    <Award key={i} className="h-4 w-4 text-amber-500" />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Expires</div>
                  <div className="font-medium">{formatTimeRemaining(boostStatus.expiresAt)}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BarChart className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Visibility</div>
                  <div className="font-medium">+{boostStatus?.boostPackage?.visibility_increase || 50}%</div>
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => cancelBoost()}
              disabled={isSubmitting}
            >
              Cancel Boost
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return <div>Loading boost information...</div>;
  }

  // Show active boost if exists, otherwise show package selection
  return (
    <div>
      {renderActiveBoost()}
      
      {!boostStatus?.isActive && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Available Boost Packages</h3>
          
          <div className="grid gap-4">
            {(boostPackages || []).map((pkg) => (
              <BoostPackageCard
                key={pkg.id}
                packageData={pkg}
                isSelected={selectedPackage === pkg.id}
                onClick={() => setSelectedPackage(pkg.id)}
              />
            ))}
          </div>
          
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedPackage || isSubmitting}
            className="w-full"
          >
            <Zap className="mr-2 h-4 w-4" />
            Apply Boost
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreatorBoostTab;
