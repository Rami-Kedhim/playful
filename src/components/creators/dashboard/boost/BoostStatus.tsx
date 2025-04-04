
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BoostStatusCard from "./BoostStatusCard";
import BoostEligibilityAlert from "./BoostEligibilityAlert";
import BoostPackageSelection from "./BoostPackageSelection";
import BoostPurchaseConfirmation from "./BoostPurchaseConfirmation";
import { BoostStatus as BoostStatusType } from "@/types/boost";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface BoostStatusProps {
  boostStatus: BoostStatusType;
  eligibility: { eligible: boolean; reason?: string };
  profileCompleteness: number;
  rating: number;
  country: string;
  role: 'verified' | 'regular' | 'AI';
  lucoinBalance: number;
  boostPackages: any[];
  selectedPackage: string | null;
  onSelectPackage: (packageId: string) => void;
  onPurchase: () => Promise<void>;
  onCancel: () => Promise<void>;
  getBoostPrice: () => number;
  loading: boolean;
}

const BoostStatus = ({
  boostStatus,
  eligibility,
  profileCompleteness,
  rating,
  country,
  role,
  lucoinBalance,
  boostPackages,
  selectedPackage,
  onSelectPackage,
  onPurchase,
  onCancel,
  getBoostPrice,
  loading
}: BoostStatusProps) => {
  const [activeStep, setActiveStep] = useState<'select' | 'confirm'>('select');
  const { toast } = useToast();
  const selectedBoostPackage = boostPackages.find(p => p.id === selectedPackage);

  const handleContinueToPayment = () => {
    if (!selectedPackage) {
      toast({
        title: "Please select a boost package",
        variant: "destructive",
      });
      return;
    }
    setActiveStep('confirm');
  };
  
  return (
    <div className="space-y-6">
      <BoostStatusCard 
        boostStatus={boostStatus}
        onCancel={onCancel}
        loading={loading}
        dailyBoostUsage={0}  // These values are passed but not used in this component
        dailyBoostLimit={0}  // Adding them to maintain the interface
      />
      
      {!boostStatus.isActive && (
        <Card>
          <CardHeader>
            <CardTitle>Boost Your Profile</CardTitle>
            <CardDescription>
              Choose a boost package to increase your profile visibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BoostEligibilityAlert 
              eligible={eligibility.eligible} 
              reason={eligibility.reason} 
            />
            
            {eligibility.eligible && (
              activeStep === 'select' ? (
                <BoostPackageSelection
                  profileCompleteness={profileCompleteness}
                  rating={rating}
                  country={country}
                  role={role}
                  getBoostPrice={getBoostPrice}
                  packages={boostPackages}
                  selectedPackage={selectedPackage}
                  onSelectPackage={onSelectPackage}
                  onContinue={handleContinueToPayment}
                  loading={loading}
                />
              ) : (
                <BoostPurchaseConfirmation
                  selectedPackage={selectedBoostPackage}
                  lucoinBalance={lucoinBalance}
                  onBack={() => setActiveStep('select')}
                  onPurchase={onPurchase}
                  loading={loading}
                />
              )
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BoostStatus;
