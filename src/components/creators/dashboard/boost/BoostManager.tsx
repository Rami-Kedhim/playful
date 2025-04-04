
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { 
  useBoostManager, 
  formatBoostDuration 
} from "@/hooks/boost";
import BoostStatusCard from "./BoostStatusCard";
import BoostAnalyticsCard from "./BoostAnalyticsCard";
import BoostHistoryTable from "./BoostHistoryTable";
import BoostPackageSelection from "./BoostPackageSelection";
import BoostPurchaseConfirmation from "./BoostPurchaseConfirmation";
import BoostEligibilityAlert from "./BoostEligibilityAlert";
import { AlertCircle } from "lucide-react";
import { AnalyticsData } from "@/hooks/boost/useBoostAnalytics"; // Import the interface directly

interface BoostManagerProps {
  creatorId: string;
  profileCompleteness: number;
  isVerified: boolean;
  rating: number;
  profileCreatedDate: Date;
  country: string;
  role: 'verified' | 'regular' | 'AI';
  lucoinBalance: number;
}

const BoostManager = ({
  creatorId,
  profileCompleteness,
  isVerified,
  rating,
  profileCreatedDate,
  country,
  role,
  lucoinBalance
}: BoostManagerProps) => {
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState<'select' | 'confirm'>('select');
  const [boostHistory, setBoostHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  
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
    // Mock fetching boost history
    const timer = setTimeout(() => {
      // This would be an API call in a real app
      setBoostHistory([
        {
          id: "history-1",
          startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          boostPackage: {
            id: "boost-1",
            name: "Weekend Boost",
            duration: "72:00:00",
            price_lucoin: 120
          },
          price: 120
        },
        {
          id: "history-2",
          startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000),
          boostPackage: {
            id: "boost-2",
            name: "24 Hour Boost",
            duration: "24:00:00",
            price_lucoin: 50
          },
          price: 50
        }
      ]);
      setHistoryLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [fetchBoostPackages]);
  
  // Use the imported interface directly
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
    
    const success = await purchaseBoost(selectedPackage);
    
    if (success) {
      toast({
        title: "Boost Purchased",
        description: "Your profile has been boosted successfully!",
      });
      setActiveStep('select');
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

  const selectedBoostPackage = boostPackages.find(p => p.id === selectedPackage);
  
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
      <BoostStatusCard 
        boostStatus={boostStatus}
        onCancel={handleCancelBoost}
        loading={loading}
        dailyBoostUsage={dailyBoostUsage}
        dailyBoostLimit={dailyBoostLimit}
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
                  onSelectPackage={setSelectedPackage}
                  onContinue={() => setActiveStep('confirm')}
                  loading={loading}
                />
              ) : (
                <BoostPurchaseConfirmation
                  selectedPackage={selectedBoostPackage}
                  lucoinBalance={lucoinBalance}
                  onBack={() => setActiveStep('select')}
                  onPurchase={handleBoostPurchase}
                  loading={loading}
                />
              )
            )}
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BoostAnalyticsCard 
          isActive={boostStatus.isActive} 
          getAnalytics={getAnalyticsWrapper}
        />
      </div>
      
      <BoostHistoryTable 
        history={boostHistory}
        loading={historyLoading}
      />
    </div>
  );
};

export default BoostManager;
