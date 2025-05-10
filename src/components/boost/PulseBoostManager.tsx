
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { pulseBoostService } from '@/services/boost/pulseBoostService';
import { BoostPackage, BoostStatus } from '@/types/pulse-boost';
import { useToast } from "@/components/ui/use-toast";
import BoostDialog from "./dialog/BoostDialog";

const PulseBoostManager: React.FC<{ profileId: string }> = ({ profileId }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState<BoostPackage[]>([]);
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    expiresAt: '',
    remainingTime: '',
    progress: 0,
    boostLevel: 0,
    isExpiring: false
  });
  const [showDialog, setShowDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch packages
        const boostPackages = await pulseBoostService.getBoostPackages();
        setPackages(boostPackages);
        
        // Fetch current boost status
        if (profileId) {
          const status = await pulseBoostService.getBoostStatus(profileId);
          setBoostStatus(status);
        }
        
      } catch (error) {
        console.error('Error fetching boost data:', error);
        toast({
          title: "Error",
          description: "Failed to load boost data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [profileId, toast]);

  const handleApplyClick = () => {
    setShowDialog(true);
    
    // Set default selected package if available
    if (packages.length > 0 && !selectedPackage) {
      setSelectedPackage(packages[0].id);
    }
  };

  const handleBoost = async (packageId: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      const result = await pulseBoostService.purchaseBoost(profileId, packageId);
      
      if (result.success) {
        // Update boost status
        const status = await pulseBoostService.getBoostStatus(profileId);
        
        setBoostStatus({
          ...status,
          isActive: true,
          boostLevel: 1
        });
        
        toast({
          title: "Success",
          description: "Boost applied successfully",
        });
        
        setShowDialog(false);
        return true;
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to apply boost",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('Error applying boost:', error);
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancelBoost = async (): Promise<boolean> => {
    setLoading(true);
    
    try {
      const result = await pulseBoostService.cancelBoost(profileId);
      
      if (result.success) {
        setBoostStatus({
          isActive: false,
          expiresAt: '',
          remainingTime: '',
          progress: 0,
          boostLevel: 0,
          isExpiring: false
        });
        
        toast({
          title: "Success",
          description: "Boost cancelled successfully",
        });
        
        return true;
      } else {
        toast({
          title: "Error",
          description: "Failed to cancel boost",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('Error cancelling boost:', error);
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-primary" />
            PULSE Boost
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            Boost your profile visibility with PULSE (Precision Upgrade Layer for Scalable Exposure).
            Apply a boost to increase your profile's visibility in search results and recommendations.
          </p>
          
          <div className="flex justify-between items-center">
            <div>
              {boostStatus.isActive ? (
                <p className="font-medium flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  Active Boost {boostStatus.isExpiring && "(Expiring soon)"}
                </p>
              ) : (
                <p className="text-muted-foreground">No active boost</p>
              )}
            </div>
            
            <Button
              onClick={handleApplyClick}
              disabled={loading}
              variant={boostStatus.isActive ? "outline" : "default"}
            >
              {boostStatus.isActive ? "Manage Boost" : "Apply Boost"}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <BoostDialog
        profileId={profileId}
        open={showDialog}
        onOpenChange={setShowDialog}
        boostStatus={boostStatus}
        eligibility={{ 
          eligible: true,
          reason: "",
          reasons: []
        }}
        packages={packages}
        onBoost={handleBoost}
        onCancel={handleCancelBoost}
        selectedPackage={selectedPackage}
        setSelectedPackage={setSelectedPackage}
      />
    </>
  );
};

export default PulseBoostManager;
