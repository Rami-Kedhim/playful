
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast, useToast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";
import { 
  useBoostManager, 
  formatBoostDuration 
} from "@/hooks/boost";
import { AnalyticsData } from "@/hooks/boost/useBoostAnalytics";
import BoostStatus from "./BoostStatus";
import BoostAnalytics from "./BoostAnalytics";

interface BoostManagerContainerProps {
  creatorId: string;
  profileCompleteness: number;
  isVerified: boolean;
  rating: number;
  profileCreatedDate: Date;
  country: string;
  role: 'verified' | 'regular' | 'AI';
  lucoinBalance: number;
}

const BoostManagerContainer = ({
  creatorId,
  profileCompleteness,
  isVerified,
  rating,
  profileCreatedDate,
  country,
  role,
  lucoinBalance
}: BoostManagerContainerProps) => {
  const { toast: toastNotification } = useToast();
  
  const {
    boostStatus,
    eligibility,
    boostPackages,
    selectedPackage,
    setSelectedPackage,
    fetchBoostPackages,
    getBoostPrice,
    purchaseBoost,
    cancelBoost,
    loading,
    error,
    getBoostAnalytics,
    dailyBoostUsage,
    dailyBoostLimit
  } = useBoostManager(creatorId);
  
  useEffect(() => {
    fetchBoostPackages();
  }, [fetchBoostPackages]);
  
  // Wrapper for analytics data to match the expected interface
  const getAnalyticsWrapper = async (): Promise<AnalyticsData | null> => {
    return await getBoostAnalytics();
  };
  
  const handleBoostPurchase = async () => {
    if (!selectedPackage) {
      toastNotification({
        title: "Please select a boost package",
        variant: "destructive",
      });
      return;
    }
    
    const success = await purchaseBoost(selectedPackage);
    
    if (success) {
      toastNotification({
        title: "Boost Purchased",
        description: "Your profile has been boosted successfully!",
      });
    }
  };
  
  const handleCancelBoost = async () => {
    const confirmed = window.confirm("Are you sure you want to cancel your active boost?");
    
    if (confirmed) {
      const success = await cancelBoost();
      
      if (success) {
        toastNotification({
          title: "Boost Cancelled",
          description: "Your profile boost has been cancelled",
        });
      }
    }
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div className="space-y-6">
      <BoostStatus
        boostStatus={boostStatus}
        eligibility={eligibility}
        profileCompleteness={profileCompleteness}
        rating={rating}
        country={country}
        role={role}
        lucoinBalance={lucoinBalance}
        boostPackages={boostPackages}
        selectedPackage={selectedPackage}
        onSelectPackage={setSelectedPackage}
        onPurchase={handleBoostPurchase}
        onCancel={handleCancelBoost}
        getBoostPrice={getBoostPrice}
        loading={loading}
      />
      
      <BoostAnalytics 
        isActive={boostStatus.isActive} 
        getAnalytics={getAnalyticsWrapper}
        creatorId={creatorId} // Pass creatorId to BoostAnalytics
      />
    </div>
  );
};

export default BoostManagerContainer;
