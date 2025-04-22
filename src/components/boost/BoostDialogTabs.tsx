
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
  hermesStatus
}) => {
  // Helper function to format the duration string
  const formatDuration = (duration: string): string => {
    const [hours, minutes] = duration.split(':').map(Number);
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days} ${days === 1 ? 'day' : 'days'}`;
    }
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
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
                  hermesData={{
                    position: hermesStatus.position,
                    activeUsers: hermesStatus.activeUsers,
                    estimatedVisibility: hermesStatus.estimatedVisibility,
                    lastUpdateTime: hermesStatus.lastUpdateTime
                  }}
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
                  disabled={!eligibility.isEligible || loading}
                />

                <div className="mt-6">
                  <Button
                    onClick={handleBoost}
                    variant="default"
                    disabled={!eligibility.isEligible || loading || !selectedPackage}
                    className={cx(
                      "w-full",
                      boostStatus?.isActive && "bg-red-600 hover:bg-red-700"
                    )}
                  >
                    {loading
                      ? "Processing..."
                      : boostStatus?.isActive
                      ? "Cancel Boost"
                      : "Activate Boost"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Visibility Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <HermesBoostInfo 
                  hermesStatus={hermesStatus}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </TabsContent>

      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>Boost Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-6">
              <p className="text-muted-foreground">
                Analytics data is being processed. Check back soon.
              </p>
            </div>
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
              <div className="flex justify-between items-center">
                <span>Auto-renew boost</span>
                <div className="flex h-6 w-11 rounded-full bg-gray-200 p-1 transition-all dark:bg-gray-700">
                  <div className="h-4 w-4 rounded-full bg-white transition-all"></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Receive boost notifications</span>
                <div className="flex h-6 w-11 rounded-full bg-primary p-1 transition-all">
                  <div className="h-4 w-4 translate-x-5 rounded-full bg-white transition-all"></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Show boost badge on profile</span>
                <div className="flex h-6 w-11 rounded-full bg-primary p-1 transition-all">
                  <div className="h-4 w-4 translate-x-5 rounded-full bg-white transition-all"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default BoostDialogTabs;
