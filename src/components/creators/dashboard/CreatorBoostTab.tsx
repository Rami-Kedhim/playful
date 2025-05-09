import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BoostPackage, BoostStatus, BoostEligibility } from "@/types/boost";
import { useBoostManager } from "@/hooks/boost/useBoostManager";
import BoostPackages from "@/components/boost/BoostPackageSelection";
import BoostActivePackage from "@/components/boost/BoostActivePackage";
import BoostEligibilityAlert from "@/components/creators/dashboard/boost/BoostEligibilityAlert";
import { HermesOxumQueueVisualization } from "@/components/creators/dashboard/boost/HermesOxumQueueVisualization";
import { HermesStatus } from '@/types/pulse-boost';

interface CreatorBoostTabProps {
  profileId?: string;
  creatorId?: string;
  profileCompleteness?: number;
  isVerified?: boolean;
  rating?: number;
  profileCreatedDate?: Date;
  country?: string;
  role?: "verified" | "regular" | "AI";
  ubxBalance?: number;
}

const CreatorBoostTab: React.FC<CreatorBoostTabProps> = ({
  profileId,
  creatorId,
  profileCompleteness,
  isVerified,
  rating,
  profileCreatedDate,
  country,
  role,
  ubxBalance
}) => {
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<BoostPackage | null>(null);
  const [boostPackages, setBoostPackages] = useState<BoostPackage[]>([]);
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({ isActive: false });
  const [eligibility, setEligibility] = useState<BoostEligibility>({ isEligible: false });
  const [hermesStatus, setHermesStatus] = useState<HermesStatus>({
    position: 0,
    activeUsers: 0,
    estimatedVisibility: 0,
    lastUpdateTime: '',
    boostScore: 0,
    effectivenessScore: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dailyBoostUsage, setDailyBoostUsage] = useState<number>(0);
  const [dailyBoostLimit, setDailyBoostLimit] = useState<number>(3);

  const {
    boostStatus: managedBoostStatus,
    eligibility: managedEligibility,
    packages,
    dailyBoostUsage: managedDailyBoostUsage,
    dailyBoostLimit: managedDailyBoostLimit,
    purchaseBoost,
    cancelBoost,
    formatBoostDuration,
    getBoostAnalytics,
    fetchBoostPackages,
    adaptGetBoostPrice,
    hermesStatus: managedHermesStatus
  } = useBoostManager({ profileId: profileId || creatorId });

  useEffect(() => {
    if (managedBoostStatus) {
      setBoostStatus(managedBoostStatus);
    }
    if (managedEligibility) {
      setEligibility(managedEligibility);
    }
    if (packages) {
      setBoostPackages(packages);
    }
    if (managedDailyBoostUsage !== undefined) {
      setDailyBoostUsage(managedDailyBoostUsage);
    }
    if (managedDailyBoostLimit !== undefined) {
      setDailyBoostLimit(managedDailyBoostLimit);
    }
    if (managedHermesStatus) {
      setHermesStatus(managedHermesStatus);
    }
  }, [
    managedBoostStatus,
    managedEligibility,
    packages,
    managedDailyBoostUsage,
    managedDailyBoostLimit,
    managedHermesStatus
  ]);

  const handleSelectPackage = (packageId: string) => {
    const selected = boostPackages.find((pkg) => pkg.id === packageId);
    setSelectedPackage(selected || null);
  };

  const handleBoost = async () => {
    if (!selectedPackage) {
      toast({
        title: "No package selected",
        description: "Please select a boost package to continue.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const success = await purchaseBoost(selectedPackage);
      if (success) {
        toast({
          title: "Boost activated",
          description: `Your profile is now boosted with ${selectedPackage.name}.`,
        });
      } else {
        toast({
          title: "Failed to activate boost",
          description: "There was an error activating your boost. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      setError(error.message || "Failed to purchase boost");
      toast({
        title: "Failed to activate boost",
        description: error.message || "There was an error activating your boost. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    setLoading(true);
    try {
      const success = await cancelBoost();
      if (success) {
        toast({
          title: "Boost cancelled",
          description: "Your active boost has been cancelled.",
        });
      } else {
        toast({
          title: "Failed to cancel boost",
          description: "There was an error cancelling your boost. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      setError(error.message || "Failed to cancel boost");
      toast({
        title: "Failed to cancel boost",
        description: error.message || "There was an error cancelling your boost. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
    return true;
  };

  const renderBoostPackages = () => {
    return (
      <BoostPackages 
        packages={boostPackages}
        selected={selectedPackage?.id || ""}
        onSelect={(id) => handleSelectPackage(id)}
        onBoost={handleBoost}
        isLoading={loading}
        eligibility={eligibility}
        boostStatus={boostStatus}
      />
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Boost Status</CardTitle>
          <CardDescription>View your current boost status and manage your active boosts.</CardDescription>
        </CardHeader>
        <CardContent>
          {boostStatus.isActive ? (
            <BoostActivePackage
              boostStatus={boostStatus}
              formatDuration={formatBoostDuration}
              onCancel={handleCancel}
            />
          ) : (
            <BoostEligibilityAlert eligible={eligibility.isEligible} reason={eligibility.reason} />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Boost Packages</CardTitle>
          <CardDescription>Select a boost package to increase your profile visibility.</CardDescription>
        </CardHeader>
        <CardContent>
          {eligibility.isEligible ? (
            renderBoostPackages()
          ) : (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You are not eligible for boosting at this time. {eligibility.reason}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Hermes Queue Position</CardTitle>
          <CardDescription>
            Your position in the visibility queue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HermesOxumQueueVisualization 
            userId={profileId} 
            activeBoosts={boostStatus?.isActive ? 1 : 0}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatorBoostTab;
