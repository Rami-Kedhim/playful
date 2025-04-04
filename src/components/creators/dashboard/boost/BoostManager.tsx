import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Zap } from "lucide-react";
import { useBoostManager } from "@/hooks/useBoostManager";
import BoostStatusCard from "./BoostStatusCard";
import BoostPackageGrid from "./BoostPackageGrid";
import BoostAnalyticsCard from "./BoostAnalyticsCard";
import BoostHistoryTable from "./BoostHistoryTable";
import { formatBoostDuration } from "@/utils/boostCalculator";

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
    getBoostAnalytics
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
            {!eligibility.eligible ? (
              <Alert variant="warning" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Not Eligible for Boosting</AlertTitle>
                <AlertDescription>
                  {eligibility.reason || "Your profile doesn't meet the requirements for boosting."}
                </AlertDescription>
              </Alert>
            ) : (
              <>
                {activeStep === 'select' ? (
                  <div className="space-y-6">
                    <div className="bg-secondary/20 p-4 rounded-md mb-4">
                      <div className="flex items-center mb-2">
                        <Zap className="h-5 w-5 mr-2 text-amber-500" />
                        <h3 className="font-medium">Boost Price Calculation</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        The Oxum Algorithm calculates your boost price based on various factors:
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Profile Completeness: {profileCompleteness}%</div>
                        <div>Rating: {rating}</div>
                        <div>Country: {country}</div>
                        <div>Account Type: {role}</div>
                      </div>
                      <div className="mt-2 font-medium">
                        Your base boost price: {getBoostPrice()} LC
                      </div>
                    </div>
                    
                    <BoostPackageGrid 
                      packages={boostPackages}
                      onSelectPackage={(pkg) => setSelectedPackage(pkg.id)}
                      selectedPackageId={selectedPackage}
                    />
                    
                    <div className="flex justify-end">
                      <Button 
                        onClick={() => setActiveStep('confirm')} 
                        disabled={!selectedPackage || loading}
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-muted p-4 rounded-md">
                      <h3 className="font-medium mb-2">Confirm Your Purchase</h3>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm text-muted-foreground">Package:</div>
                        <div>
                          {boostPackages.find(p => p.id === selectedPackage)?.name}
                        </div>
                        
                        <div className="text-sm text-muted-foreground">Duration:</div>
                        <div>
                          {formatBoostDuration(
                            boostPackages.find(p => p.id === selectedPackage)?.duration || ""
                          )}
                        </div>
                        
                        <div className="text-sm text-muted-foreground">Price:</div>
                        <div className="font-medium">
                          {boostPackages.find(p => p.id === selectedPackage)?.price_lucoin} LC
                        </div>
                        
                        <div className="text-sm text-muted-foreground">Current Balance:</div>
                        <div className={lucoinBalance < (boostPackages.find(p => p.id === selectedPackage)?.price_lucoin || 0) 
                          ? "text-red-500" 
                          : ""
                        }>
                          {lucoinBalance} LC
                        </div>
                      </div>
                      
                      {lucoinBalance < (boostPackages.find(p => p.id === selectedPackage)?.price_lucoin || 0) && (
                        <Alert variant="destructive" className="mt-4">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Insufficient Balance</AlertTitle>
                          <AlertDescription>
                            You don't have enough Lucoins to purchase this boost. Please add more credits to your account.
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveStep('select')}
                      >
                        Back
                      </Button>
                      <Button 
                        onClick={handleBoostPurchase} 
                        disabled={
                          loading || 
                          lucoinBalance < (boostPackages.find(p => p.id === selectedPackage)?.price_lucoin || 0)
                        }
                      >
                        Complete Purchase
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BoostAnalyticsCard 
          isActive={boostStatus.isActive} 
          getAnalytics={getBoostAnalytics}
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
