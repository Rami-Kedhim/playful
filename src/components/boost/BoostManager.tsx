
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBoostManager } from "@/hooks/boost/useBoostManager";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BoostPackage } from "@/types/boost";
import { Zap, Clock, ArrowRight } from "lucide-react";

const BoostManager: React.FC<{ profileId: string }> = ({ profileId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('packages');
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  
  const { 
    boostStatus, 
    boostPackages, 
    loading, 
    boostProfile,
    cancelBoost
  } = useBoostManager(profileId);
  
  const handleBoost = async () => {
    if (!selectedPackage) return;
    
    const success = await boostProfile(profileId, selectedPackage);
    
    if (success) {
      setIsDialogOpen(false);
    }
  };
  
  const handleCancel = async () => {
    const success = await cancelBoost();
    
    if (success) {
      setIsDialogOpen(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Boost Manager</CardTitle>
          {boostStatus.isActive && (
            <Badge variant="outline" className="gap-1">
              <Zap className="h-3 w-3 fill-current" />
              Boosted
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {boostStatus.isActive ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Active Boost</h4>
                <p className="text-sm text-muted-foreground">
                  {boostStatus.packageName || 'Standard Boost'}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {boostStatus.timeRemaining || 'Unknown'}
                  </span>
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setIsDialogOpen(true)}
            >
              Manage Boost
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Your profile is currently not boosted. Boost your profile to get more visibility and engagement.
            </p>
            
            <Button 
              className="w-full"
              onClick={() => setIsDialogOpen(true)}
            >
              <Zap className="h-4 w-4 mr-2" />
              Boost Profile
            </Button>
          </div>
        )}
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Profile Boost</DialogTitle>
            </DialogHeader>
            
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="packages">Packages</TabsTrigger>
                <TabsTrigger value="active" disabled={!boostStatus.isActive}>
                  Active Boost
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="packages" className="space-y-4 py-4">
                <div className="grid gap-4">
                  {boostPackages.map((pkg: BoostPackage) => (
                    <div 
                      key={pkg.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedPackage === pkg.id ? 'border-primary bg-primary/5' : ''
                      }`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{pkg.name}</h4>
                          <p className="text-sm text-muted-foreground">{pkg.description}</p>
                        </div>
                        <Badge>{pkg.price_ubx} UBX</Badge>
                      </div>
                      
                      <div className="mt-2">
                        <span className="text-xs font-medium text-muted-foreground">
                          {pkg.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full" 
                  disabled={!selectedPackage}
                  onClick={handleBoost}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Boost Now
                </Button>
              </TabsContent>
              
              <TabsContent value="active" className="space-y-4 py-4">
                {boostStatus.isActive && (
                  <>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">{boostStatus.packageName || 'Standard Boost'}</h4>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Time Remaining:</span>
                          <span className="font-medium">{boostStatus.timeRemaining}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Expires:</span>
                          <span className="font-medium">
                            {boostStatus.expiresAt ? new Date(boostStatus.expiresAt).toLocaleString() : 'Unknown'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={handleCancel}
                    >
                      Cancel Boost
                    </Button>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default BoostManager;
