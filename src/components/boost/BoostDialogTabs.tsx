
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PULSE_BOOSTS, formatPulseBoostDuration } from "@/constants/pulseBoostConfig";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, BarChart, Clock, Gauge, Info, Zap } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import BoostPackages from "./dialog/BoostPackages";
import BoostActivePackage from "./dialog/BoostActivePackage";
import HermesBoostInfo from "./dialog/HermesBoostInfo";
import { PulseBoost } from "@/types/pulse-boost";

interface BoostDialogTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  boostStatus: any;
  eligibility: { eligible: boolean; reason?: string };
  boostPackages: any[];
  selectedPackage: string | null;
  setSelectedPackage: (packageId: string) => void;
  handlePurchase: () => Promise<void>;
  handleCancel: () => Promise<void>;
  handleDialogClose: () => void;
  boostAnalytics: any;
  formatBoostDuration: (duration: string) => string;
  getBoostPrice: () => number;
  loading: boolean;
  dailyBoostUsage?: number;
  dailyBoostLimit?: number;
  hermesBoostStatus?: any;
}

const BoostDialogTabs: React.FC<BoostDialogTabsProps> = ({
  activeTab,
  setActiveTab,
  boostStatus,
  eligibility,
  boostPackages,
  selectedPackage,
  setSelectedPackage,
  handlePurchase,
  handleCancel,
  handleDialogClose,
  boostAnalytics,
  formatBoostDuration,
  getBoostPrice,
  loading,
  dailyBoostUsage = 0,
  dailyBoostLimit = 4,
  hermesBoostStatus
}) => {
  // Map legacy boost packages to include Pulse boost data if available
  const enhancedPackages = boostPackages.map(pkg => {
    // Try to find a matching Pulse boost
    const pulseBoost = PULSE_BOOSTS.find(pb => pb.id === pkg.id);
    
    if (pulseBoost) {
      return {
        ...pkg,
        pulseData: {
          visibility: pulseBoost.visibility,
          durationMinutes: pulseBoost.durationMinutes,
          badgeColor: pulseBoost.badgeColor
        }
      };
    }
    
    return pkg;
  });

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-3">
        <TabsTrigger value="packages" disabled={loading}>
          Packages
        </TabsTrigger>
        <TabsTrigger value="active" disabled={loading}>
          Active
        </TabsTrigger>
        <TabsTrigger value="analytics" disabled={loading}>
          Analytics
        </TabsTrigger>
      </TabsList>
      
      <ScrollArea className="mt-4 max-h-[400px] overflow-y-auto pr-4">
        <TabsContent value="packages" className="space-y-4">
          {/* Oxum Pulse Boost explanation */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>PULSE Boost System</AlertTitle>
            <AlertDescription className="text-sm">
              Precision Upgrade Layer for Scalable Exposure - enhance your visibility with targeted boosts
            </AlertDescription>
          </Alert>
          
          {/* Daily Usage Limit */}
          <div className="mb-4">
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                Daily Boost Usage
              </span>
              <span>
                {dailyBoostUsage} of {dailyBoostLimit}
              </span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all" 
                style={{ width: `${(dailyBoostUsage / dailyBoostLimit) * 100}%` }}
              />
            </div>
          </div>

          {!eligibility.eligible && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Not Eligible</AlertTitle>
              <AlertDescription>
                {eligibility.reason || "You are not eligible to boost at this time."}
              </AlertDescription>
            </Alert>
          )}
          
          <BoostPackages 
            boostPackages={enhancedPackages}
            selectedPackage={selectedPackage}
            setSelectedPackage={setSelectedPackage}
            formatDuration={(duration) => {
              // Check if this is a Pulse boost (which has pulse data)
              const matchingPackage = enhancedPackages.find(p => p.id === duration);
              if (matchingPackage?.pulseData) {
                return formatPulseBoostDuration(matchingPackage.pulseData.durationMinutes);
              }
              // Fall back to regular formatting
              return formatBoostDuration(duration);
            }}
            disabled={!eligibility.eligible || loading}
          />
          
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={handleDialogClose}
              disabled={loading}
            >
              Close
            </Button>
            <Button
              onClick={handlePurchase}
              disabled={!selectedPackage || !eligibility.eligible || loading}
            >
              {loading ? "Processing..." : `Purchase (${getBoostPrice()} UBX)`}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="active" className="space-y-4">
          {boostStatus.isActive ? (
            <>
              <Alert className="bg-primary/10 border-primary/30">
                <Zap className="h-4 w-4 text-primary" />
                <AlertTitle>Active Boost</AlertTitle>
                <AlertDescription>
                  Your profile is currently boosted{boostStatus.pulseData ? 
                    ` with ${boostStatus.pulseData.boostType}` : ''}
                </AlertDescription>
              </Alert>
              
              <BoostActivePackage
                boostStatus={boostStatus}
                onCancel={handleCancel}
                loading={loading}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <Zap className="mx-auto h-12 w-12 text-muted-foreground/30 mb-3" />
              <h3 className="text-lg font-medium">No Active Boost</h3>
              <p className="text-muted-foreground mt-1 max-w-md mx-auto">
                You don't have any active boosts. Go to the packages tab to boost your profile.
              </p>
              <Button onClick={() => setActiveTab('packages')} className="mt-4">
                View Packages
              </Button>
            </div>
          )}
          
          {/* Hermes AI Boost integration */}
          {hermesBoostStatus && (
            <HermesBoostInfo status={hermesBoostStatus} />
          )}
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="space-y-6">
            <Alert>
              <BarChart className="h-4 w-4" />
              <AlertTitle>Boost Analytics</AlertTitle>
              <AlertDescription>
                Track the performance and impact of your profile boosts
              </AlertDescription>
            </Alert>
            
            {/* Pulse Boost Meter */}
            {boostStatus.pulseData && (
              <Card className="p-4">
                <h3 className="text-sm font-medium mb-2">Pulse Boost Level</h3>
                <div className="flex items-center gap-3">
                  <Gauge className="h-5 w-5 text-primary" />
                  <div className="w-full h-2 bg-muted rounded-full">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-primary"
                      style={{ width: `${boostStatus.pulseData.pulseLevel}%` }} 
                    />
                  </div>
                  <span className="text-sm font-medium">{boostStatus.pulseData.pulseLevel}%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Current visibility: {boostStatus.pulseData.visibility.replace('_', ' ')}
                </p>
              </Card>
            )}
            
            {boostAnalytics ? (
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-3">
                  <div className="text-sm text-muted-foreground">Profile Views</div>
                  <div className="text-2xl font-bold">
                    +{boostAnalytics.viewsIncrease || 0}
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="text-sm text-muted-foreground">Engagement</div>
                  <div className="text-2xl font-bold">
                    +{boostAnalytics.engagementRate || 0}%
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="text-sm text-muted-foreground">Impressions</div>
                  <div className="text-2xl font-bold">
                    {boostAnalytics.impressions || 0}
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="text-sm text-muted-foreground">Ranking</div>
                  <div className="text-2xl font-bold text-green-500">
                    +{boostAnalytics.rankingImprovement || 0}
                  </div>
                </Card>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Boost your profile to see analytics data</p>
              </div>
            )}
          </div>
        </TabsContent>
      </ScrollArea>
    </Tabs>
  );
};

export default BoostDialogTabs;
