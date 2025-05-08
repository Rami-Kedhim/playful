
import React from 'react';
import { useBoost } from '@/hooks/useBoost';
import BoostAnalytics from './BoostAnalytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Zap } from 'lucide-react';

const BoostManager = ({ profileId }: { profileId?: string }) => {
  const {
    isActive,
    packages,
    boostProfile,
    cancelBoost,
    loading,
    boostStatus,
    hermesStatus,
    eligibility,
    remainingTime,
    getBoostAnalytics
  } = useBoost();

  return (
    <div className="space-y-6">
      <Tabs defaultValue="status" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="status">Status</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="status" className="space-y-6 mt-4">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Profile Boost</h2>
                  <p className="text-muted-foreground text-sm">
                    Increase your visibility and get more profile views
                  </p>
                </div>
                
                <div className="flex items-center">
                  {loading ? (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </Button>
                  ) : isActive ? (
                    <div className="flex flex-col items-end">
                      <div className="text-sm font-medium text-green-600 flex items-center gap-1">
                        <Zap className="h-4 w-4" /> Boost Active
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {remainingTime} remaining
                      </div>
                    </div>
                  ) : (
                    <Button onClick={() => console.log('Open boost dialog')}>
                      <Zap className="mr-2 h-4 w-4" />
                      Boost Profile
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-4">
          {getBoostAnalytics && (
            <BoostAnalytics 
              isActive={isActive} 
              getAnalytics={getBoostAnalytics}
              creatorId={profileId || ''}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BoostManager;
