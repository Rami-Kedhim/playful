
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ShieldCheck, ShieldAlert } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { VerificationBadge } from '@/components/verification/VerificationBadge';

interface VerificationUpgradeTabProps {
  userId: string;
  currentLevel: 'basic' | 'verified' | 'premium';
}

const VerificationUpgradeTab: React.FC<VerificationUpgradeTabProps> = ({
  currentLevel
}) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get available upgrade options based on current level
  const getAvailableUpgrades = (): Array<'verified' | 'premium'> => {
    switch (currentLevel) {
      case 'basic':
        return ['verified', 'premium'];
      case 'verified':
        return ['premium'];
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
      setIsSubmitting(true);
      
      // In a real app, you would submit this to your backend
      // For demo purpose, we'll just simulate a delay
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
    } finally {
      setIsSubmitting(false);
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
          <RadioGroup value={selectedLevel} onValueChange={setSelectedLevel} className="space-y-4">
            {availableUpgrades.includes('verified') && (
              <div className="flex items-start space-x-3 border rounded-md p-4">
                <RadioGroupItem value="verified" id="verified" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="verified" className="flex items-center">
                    <VerificationBadge level="verified" size="sm" />
                    <span className="ml-2">Verified Level</span>
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Get a verified badge on your profile and unlock additional features
                  </p>
                  <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                    <li>ID verification required</li>
                    <li>Selfie with ID verification</li>
                    <li>Processing time: 1-3 business days</li>
                  </ul>
                </div>
              </div>
            )}
            
            {availableUpgrades.includes('premium') && (
              <div className="flex items-start space-x-3 border rounded-md p-4">
                <RadioGroupItem value="premium" id="premium" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="premium" className="flex items-center">
                    <VerificationBadge level="premium" size="sm" />
                    <span className="ml-2">Premium Level</span>
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Premium verification with additional benefits and higher visibility
                  </p>
                  <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                    <li>All verified level requirements</li>
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
          <Button type="submit" className="w-full" disabled={!selectedLevel || isSubmitting}>
            {isSubmitting ? "Processing..." : "Request Upgrade"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default VerificationUpgradeTab;
