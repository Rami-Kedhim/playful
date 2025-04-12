
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { 
  useBoostManager, formatBoostDuration
} from "@/hooks/boost";
import { AnalyticsData } from "@/hooks/boost/useBoostAnalytics";
import BoostStatus from "./BoostStatus";
import BoostAnalytics from "./BoostAnalytics";
import { toast } from "@/components/ui/use-toast";
import {
  adaptBoostStatus,
  adaptBoostEligibility,
  adaptBoostPackages,
  adaptFormatBoostDuration,
  adaptGetBoostPrice
} from "@/hooks/boost/useBoostAdapters";

interface BoostManagerContainerProps {
  creatorId: string;
  profileCompleteness: number;
  isVerified: boolean;
  rating: number;
  profileCreatedDate: Date;
  country: string;
  role: 'verified' | 'regular' | 'AI';
  ubxBalance: number;
}

const BoostManagerContainer = ({
  creatorId,
  profileCompleteness,
  isVerified,
  rating,
  profileCreatedDate,
  country,
  role,
  ubxBalance
}: BoostManagerContainerProps) => {
  
  const {
    boostStatus: managerBoostStatus,
    eligibility: managerEligibility,
    boostPackages: managerBoostPackages,
    selectedPackage: managerSelectedPackage,
    setSelectedPackage: managerSetSelectedPackage,
    fetchBoostPackages,
    getBoostPrice: managerGetBoostPrice,
    purchaseBoost,
    cancelBoost,
    loading,
    error,
    getBoostAnalytics,
    dailyBoostUsage,
    dailyBoostLimit
  } = useBoostManager(creatorId);
  
  // Adapt types to match expected interfaces
  const boostStatus = adaptBoostStatus(managerBoostStatus);
  const eligibility = adaptBoostEligibility(managerEligibility);
  const boostPackages = adaptBoostPackages(managerBoostPackages);
  
  // Use the updated adapter function
  const formatBoostDurationAdapter = adaptFormatBoostDuration(formatBoostDuration);
  const getBoostPrice = adaptGetBoostPrice(managerGetBoostPrice);

  // Handle selected package conversion
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  // Update selected package when manager selected package changes
  useEffect(() => {
    if (managerSelectedPackage) {
      setSelectedPackage(managerSelectedPackage.id);
    } else {
      setSelectedPackage(null);
    }
  }, [managerSelectedPackage]);

  // Handle package selection
  const handlePackageSelect = (packageId: string) => {
    const pkg = managerBoostPackages.find(p => p.id === packageId);
    if (pkg) {
      managerSetSelectedPackage(pkg);
    }
  };
  
  useEffect(() => {
    fetchBoostPackages();
  }, [fetchBoostPackages]);
  
  const getAnalyticsWrapper = async (): Promise<AnalyticsData | null> => {
    return await getBoostAnalytics();
  };
  
  const handleBoostPurchase = async () => {
    if (!selectedPackage) {
      toast({
        title: "Please select a boost package",
        variant: "destructive",
      });
      return;
    }
    
    // Find the manager package object from the selected package ID
    const packageToBoost = managerBoostPackages.find(p => p.id === selectedPackage);
    
    if (!packageToBoost) {
      toast({
        title: "Package not found",
        description: "The selected package could not be found",
        variant: "destructive",
      });
      return;
    }
    
    const success = await purchaseBoost(packageToBoost);
    
    if (success) {
      toast({
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
        toast({
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
        ubxBalance={ubxBalance}
        boostPackages={boostPackages}
        selectedPackage={selectedPackage}
        onSelectPackage={handlePackageSelect}
        onPurchase={handleBoostPurchase}
        onCancel={handleCancelBoost}
        getBoostPrice={getBoostPrice}
        loading={loading}
      />
      
      <BoostAnalytics 
        isActive={boostStatus.isActive} 
        getAnalytics={getAnalyticsWrapper}
        creatorId={creatorId}
      />
    </div>
  );
};

export default BoostManagerContainer;
