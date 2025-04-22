
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Clock, Award, Activity } from 'lucide-react';
import BoostPackages from './BoostPackages';
import HermesBoostInfo from './HermesBoostInfo';
import BoostActivePackage from './BoostActivePackage';
import { cx } from 'class-variance-authority';

// Import the types from the newly created types file
import { BoostDialogTabsProps } from './types';

const BoostDialogTabs: React.FC<BoostDialogTabsProps> = ({
  activeTab,
  setActiveTab,
  loading,
  boostStatus,
  eligibility,
  boostPackages,
  selectedPackage,
  setSelectedPackage,
  handleBoost,
  handleCancel,
  dailyBoostUsage,
  dailyBoostLimit,
  hermesStatus,
  formatBoostDuration,
  getBoostPrice,
  handleDialogClose
}) => {
  // Helper function to format the duration string if not provided
  const formatDuration = (duration: string): string => {
    if (formatBoostDuration) {
      return formatBoostDuration(duration);
    }
    
    const [hours, minutes] = duration.split(':').map(Number);
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days} ${days === 1 ? 'day' : 'days'}`;
    }
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  };

  // Helper function to get boost price if not provided
  const getPrice = (pkg?: any): number => {
    if (getBoostPrice) {
      return getBoostPrice();
    }
    return pkg?.price_ubx || pkg?.price || 0;
  };

  return (
    <Tabs
      defaultValue="boost"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full space-y-5"
    >
      <TabsList className="grid grid-cols-3">
        <TabsTrigger value="boost" disabled={loading}>
          Boost Now
        </TabsTrigger>
        <TabsTrigger value="analytics" disabled={loading || !boostStatus?.isActive}>
          Analytics
        </TabsTrigger>
        <TabsTrigger value="settings" disabled={loading}>
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="boost">
        {!eligibility.isEligible && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Not Eligible</AlertTitle>
            <AlertDescription>
              {eligibility.reason || 'You are not eligible for boosting at this time.'}
            </AlertDescription>
          </Alert>
        )}

        {boostStatus?.isActive ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-green-500" />
                  Active Boost
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BoostActivePackage
                  boostStatus={boostStatus}
                  formatDuration={formatDuration}
                  onCancel={handleCancel}
                />

                <div className="mt-6">
                  <Button
                    onClick={handleCancel}
                    variant="destructive"
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? "Cancelling..." : "Cancel Boost"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Boost Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <HermesBoostInfo 
                  hermesStatus={hermesStatus}
                  isActive={boostStatus.isActive}
                />
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Boost Packages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BoostPackages
                  packages={boostPackages}
                  selectedId={selectedPackage}
                  onSelect={setSelectedPackage}
                  formatDuration={formatDuration}
                  dailyUsage={dailyBoostUsage}
                  dailyLimit={dailyBoostLimit}
                  getBoostPrice={getPrice}
                  disabled={loading}
                />
                
                <div className="mt-6 space-x-3 flex justify-end">
                  <Button 
                    variant="outline" 
                    onClick={handleDialogClose}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={!selectedPackage || loading}
                    onClick={handleBoost}
                  >
                    {loading ? "Processing..." : "Boost Profile"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </TabsContent>

      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>Boost Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            {boostStatus?.isActive ? (
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="bg-secondary/20 p-4 rounded-lg">
                    <h3 className="font-medium mb-1 flex items-center">
                      <Award className="h-4 w-4 mr-2 text-amber-500" />
                      Boost Performance
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your profile is currently boosted and receiving extra visibility across the platform.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No active boost to analyze. Start a boost to see performance metrics.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Boost Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-2">
                <h3 className="font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Configure how you want to be notified about your boost activities and performance.
                </p>
              </div>
              
              <div className="grid gap-2">
                <h3 className="font-medium">Auto-Renewal</h3>
                <p className="text-sm text-muted-foreground">
                  Set up auto-renewal options for your boosts to maintain consistent visibility.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default BoostDialogTabs;
