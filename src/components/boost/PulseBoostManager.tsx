
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { usePulseBoost } from '@/hooks/boost/usePulseBoost';
import { BoostStatus } from '@/types/pulse-boost';

interface PulseBoostManagerProps {
  profileId?: string;
}

const PulseBoostManager: React.FC<PulseBoostManagerProps> = ({ profileId }) => {
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    expiresAt: undefined,
    packageName: 'Basic Boost',
    progress: 0,
    timeRemaining: ''
  });
  
  const { 
    activeBoosts, 
    loading, 
    purchaseBoost, 
    cancelBoost, 
    boostPackages 
  } = usePulseBoost(profileId);

  useEffect(() => {
    if (activeBoosts && activeBoosts.length > 0) {
      const boost = activeBoosts[0];
      // Convert string time remaining to hours/minutes
      setBoostStatus({
        isActive: true,
        expiresAt: boost.expiresAt,
        packageName: boost.packageName || 'Active Boost',
        progress: typeof boost.progress === 'string' ? parseInt(boost.progress, 10) : boost.progress || 0,
        timeRemaining: boost.timeRemaining || ''
      });
    }
  }, [activeBoosts]);

  const handleActivateBoost = async () => {
    if (!profileId || !boostPackages || boostPackages.length === 0) return;
    
    // Use the first package for demo purposes
    const result = await purchaseBoost(boostPackages[0].id);
    
    if (result) {
      setBoostStatus({
        isActive: true,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        packageName: boostPackages[0].name,
        progress: 0,
        timeRemaining: '24:00:00'
      });
    }
  };

  const handleCancelBoost = async () => {
    if (!profileId) return;
    
    const result = await cancelBoost();
    
    if (result) {
      setBoostStatus({
        isActive: false,
        expiresAt: undefined,
        packageName: '',
        progress: 0,
        timeRemaining: ''
      });
    }
  };

  const getRecommendedPackage = () => {
    if (!boostPackages || boostPackages.length === 0) return null;
    
    // Find package marked as recommended or most popular
    const recommended = boostPackages.find(pkg => 
      pkg.isRecommended || pkg.isMostPopular
    );
    
    return recommended || boostPackages[0];
  };
  
  const recommendedPackage = getRecommendedPackage();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Boost Manager</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Boost Manager</CardTitle>
      </CardHeader>
      <CardContent>
        {boostStatus.isActive ? (
          <div className="space-y-4">
            <div>
              <p className="font-medium">Active Boost: {boostStatus.packageName}</p>
              <p className="text-sm text-muted-foreground">
                Expires in: {boostStatus.timeRemaining}
              </p>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${boostStatus.progress}%` }}
              ></div>
            </div>
            
            <Button 
              variant="destructive" 
              onClick={handleCancelBoost}
              className="w-full mt-4"
            >
              Cancel Boost
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p>
              No active boost. Enhance your visibility with PULSE boost.
            </p>
            
            {recommendedPackage && (
              <Card className="bg-muted">
                <CardContent className="pt-4">
                  <h3 className="font-medium mb-1">{recommendedPackage.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{recommendedPackage.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{recommendedPackage.price_ubx} UBX</span>
                    <Button 
                      size="sm"
                      onClick={handleActivateBoost}
                      className="flex items-center gap-1"
                    >
                      <Zap className="w-4 h-4" />
                      Activate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <Button 
              onClick={handleActivateBoost}
              className="w-full"
            >
              <Zap className="w-4 h-4 mr-2" />
              Boost My Profile
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PulseBoostManager;
