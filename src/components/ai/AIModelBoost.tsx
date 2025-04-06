
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ProgressBar } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Zap, ZapOff, Coins } from "lucide-react";
import { useAIModelMonetization } from "@/hooks/ai/useAIModelMonetization";
import { useAuth } from "@/hooks/auth";
import { supabase } from "@/integrations/supabase/client";

interface BoostPackage {
  id: string;
  name: string;
  hours: number;
  price: number;
  description: string;
}

const boostPackages: BoostPackage[] = [
  {
    id: "boost-1",
    name: "Quick Boost",
    hours: 1,
    price: 10,
    description: "Boost visibility for 1 hour"
  },
  {
    id: "boost-2",
    name: "Daily Boost",
    hours: 24,
    price: 50,
    description: "Boost visibility for 24 hours"
  },
  {
    id: "boost-3",
    name: "Weekend Boost",
    hours: 72,
    price: 120,
    description: "Boost visibility for 3 days"
  },
];

interface BoostStatus {
  isActive: boolean;
  remainingTime: number; // in milliseconds
  totalTime: number; // in milliseconds
  progress: number; // percentage
}

interface AIModelBoostProps {
  profileId: string;
}

const AIModelBoost = ({ profileId }: AIModelBoostProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(boostPackages[0].id);
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    remainingTime: 0,
    totalTime: 0,
    progress: 0
  });
  
  const { boostAIProfile, isProcessing } = useAIModelMonetization();
  const { user } = useAuth();
  
  useEffect(() => {
    fetchBoostStatus();
    const interval = setInterval(fetchBoostStatus, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [profileId]);
  
  const fetchBoostStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('active_boosts')
        .select('*')
        .eq('profile_id', profileId)
        .eq('status', 'active')
        .order('end_time', { ascending: false })
        .limit(1)
        .single();
      
      if (error || !data) {
        // No active boost
        setBoostStatus({
          isActive: false,
          remainingTime: 0,
          totalTime: 0,
          progress: 0
        });
        return;
      }
      
      const now = new Date();
      const endTime = new Date(data.end_time);
      const startTime = new Date(data.start_time);
      
      const totalDuration = endTime.getTime() - startTime.getTime();
      const remainingTime = Math.max(0, endTime.getTime() - now.getTime());
      const progress = Math.floor(((totalDuration - remainingTime) / totalDuration) * 100);
      
      setBoostStatus({
        isActive: remainingTime > 0,
        remainingTime,
        totalTime: totalDuration,
        progress
      });
    } catch (error) {
      console.error("Error fetching boost status:", error);
    }
  };
  
  const handleBoost = async () => {
    if (!selectedPackage || !user) return;
    
    const packageToUse = boostPackages.find(pkg => pkg.id === selectedPackage);
    if (!packageToUse) return;
    
    const success = await boostAIProfile(
      profileId,
      packageToUse.price,
      packageToUse.hours
    );
    
    if (success) {
      setIsDialogOpen(false);
      fetchBoostStatus(); // Refresh status
    }
  };
  
  const formatRemainingTime = (ms: number): string => {
    if (ms <= 0) return "Expired";
    
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)));
    
    return `${hours}h ${minutes}m ${seconds}s`;
  };
  
  return (
    <>
      {boostStatus.isActive ? (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base flex items-center">
                <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                Boost Active
              </CardTitle>
              <Badge variant="default" className="bg-yellow-500">
                {boostStatus.progress}% Complete
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <ProgressBar value={boostStatus.progress} className="h-2" />
              <div className="text-sm text-muted-foreground text-right">
                Time Remaining: {formatRemainingTime(boostStatus.remainingTime)}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setIsDialogOpen(true)}
            >
              Extend Boost
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setIsDialogOpen(true)}
        >
          <ZapOff className="h-4 w-4" />
          <span>Boost Profile</span>
        </Button>
      )}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Boost AI Model Visibility
            </DialogTitle>
            <DialogDescription>
              Increase visibility and ranking in search results
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <RadioGroup 
              value={selectedPackage} 
              onValueChange={setSelectedPackage}
              className="space-y-3"
            >
              {boostPackages.map(pkg => (
                <div 
                  key={pkg.id} 
                  className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50"
                >
                  <RadioGroupItem value={pkg.id} id={pkg.id} />
                  <Label htmlFor={pkg.id} className="flex-1 cursor-pointer">
                    <div className="font-medium">{pkg.name}</div>
                    <div className="text-sm text-muted-foreground">{pkg.description}</div>
                  </Label>
                  <div className="flex items-center text-primary font-medium">
                    <Coins className="h-4 w-4 mr-1" />
                    {pkg.price}
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <DialogFooter>
            <Button
              onClick={handleBoost}
              disabled={!selectedPackage || isProcessing || !user}
            >
              {isProcessing ? (
                <>Processing...</>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Boost Now
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIModelBoost;
