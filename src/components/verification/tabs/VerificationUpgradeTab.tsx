
// Fix type usage on VerificationLevel literals to use enum values
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ShieldCheck, ShieldAlert } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { VerificationBadge } from '@/components/verification/VerificationBadge';
import { VerificationLevel } from '@/types/verification';

interface VerificationUpgradeTabProps {
  userId: string;
  currentLevel: VerificationLevel;
}

const VerificationUpgradeTab: React.FC<VerificationUpgradeTabProps> = ({
  currentLevel
}) => {
  const [selectedLevel, setSelectedLevel] = useState<VerificationLevel | ''>('');

  const getAvailableUpgrades = (): VerificationLevel[] => {
    switch (currentLevel) {
      case VerificationLevel.BASIC:
        return [VerificationLevel.ENHANCED, VerificationLevel.PREMIUM];
      case VerificationLevel.ENHANCED:
        return [VerificationLevel.PREMIUM];
      default:
        return [];
    }
  };

  const availableUpgrades = getAvailableUpgrades();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedLevel) {
      toast({
        title: "No level selected",
        description: "Please select a verification level to continue.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Simulate async submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Upgrade request submitted",
        description: "Your verification upgrade request has been submitted.",
      });
      
    } catch (error) {
      toast({
        title: "Request failed",
        description: "There was an error submitting your upgrade request.",
        variant: "destructive"
      });
    }
  };

  if (availableUpgrades.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Verification Upgrade</CardTitle>
          <CardDescription>Upgrade options for your account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <ShieldCheck className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-medium mb-2">You have the highest verification level</h3>
          <p className="text-muted-foreground">
            Your account is already at the premium verification level. There are no further upgrades available.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Verification Upgrade</CardTitle>
          <CardDescription>Select your desired verification level</CardDescription>
        </CardHeader>
        
        <CardContent>
          <RadioGroup value={selectedLevel} onValueChange={(val) => setSelectedLevel(val as VerificationLevel)} className="space-y-4">
            {availableUpgrades.includes(VerificationLevel.ENHANCED) && (
              <div className="flex items-start space-x-3 border rounded-md p-4">
                <RadioGroupItem value={VerificationLevel.ENHANCED} id="enhanced" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="enhanced" className="flex items-center">
                    <VerificationBadge level={VerificationLevel.ENHANCED} size="sm" />
                    <span className="ml-2">Enhanced Level</span>
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Get an enhanced badge and additional features.
                  </p>
                  <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                    <li>ID verification required</li>
                    <li>Selfie with ID verification</li>
                    <li>Processing time: 1-3 business days</li>
                  </ul>
                </div>
              </div>
            )}
            
            {availableUpgrades.includes(VerificationLevel.PREMIUM) && (
              <div className="flex items-start space-x-3 border rounded-md p-4">
                <RadioGroupItem value={VerificationLevel.PREMIUM} id="premium" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="premium" className="flex items-center">
                    <VerificationBadge level={VerificationLevel.PREMIUM} size="sm" />
                    <span className="ml-2">Premium Level</span>
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Premium verification with additional benefits and higher visibility
                  </p>
                  <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                    <li>All enhanced level requirements</li>
                    <li>Professional certification (if applicable)</li>
                    <li>Background check</li>
                    <li>Processing time: 3-5 business days</li>
                  </ul>
                </div>
              </div>
            )}
          </RadioGroup>
          
          {!selectedLevel && (
            <div className="flex items-center mt-4 p-3 bg-muted rounded-md">
              <ShieldAlert className="h-5 w-5 mr-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Select a verification level to continue</p>
            </div>
          )}
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full" disabled={!selectedLevel}>
            { !selectedLevel ? "Request Upgrade" : "Request Upgrade" }
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default VerificationUpgradeTab;
