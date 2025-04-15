
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, ShieldCheck, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useVerificationStatus } from '../hooks/useVerificationStatus';
import VerificationLevelOptions from './VerificationLevelOptions';
import VerificationLevelRequirements from './VerificationLevelRequirements';

type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';
type UpgradeStep = 'select' | 'requirements' | 'payment' | 'processing';

const VerificationLevelUpgrade = () => {
  const { verificationRequest } = useVerificationStatus();
  const [currentStep, setCurrentStep] = useState<UpgradeStep>('select');
  const [targetLevel, setTargetLevel] = useState<VerificationLevel | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Determine current verification level based on verification request
  const currentLevel: VerificationLevel = verificationRequest?.verificationLevel || 'none';
  
  const handleSelectLevel = (level: VerificationLevel) => {
    setTargetLevel(level);
    setCurrentStep('requirements');
  };
  
  const handleBack = () => {
    if (currentStep === 'requirements') {
      setCurrentStep('select');
      setTargetLevel(null);
    } else if (currentStep === 'payment') {
      setCurrentStep('requirements');
    }
  };
  
  const handleCompleteRequirements = () => {
    setCurrentStep('payment');
  };
  
  const handleCompletePurchase = async () => {
    setLoading(true);
    
    try {
      // In a real app, this would call an API to process the upgrade
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Verification upgrade initiated",
        description: `Your verification upgrade to ${targetLevel} level has been initiated. We'll notify you once it's complete.`,
      });
      
      setCurrentStep('processing');
    } catch (error: any) {
      console.error("Error upgrading verification level:", error);
      toast({
        title: "Upgrade failed",
        description: "There was an error processing your upgrade request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 'select':
        return <VerificationLevelOptions currentLevel={currentLevel} onSelectLevel={handleSelectLevel} />;
        
      case 'requirements':
        if (!targetLevel) return null;
        return (
          <VerificationLevelRequirements 
            currentLevel={currentLevel}
            targetLevel={targetLevel}
            onComplete={handleCompleteRequirements}
          />
        );
        
      case 'payment':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Complete Your Upgrade</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>
                  Your card will only be charged after your verification is approved
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-md">
                    <div className="flex justify-between mb-2">
                      <span>Upgrade to {targetLevel} verification</span>
                      <span>
                        {targetLevel === 'enhanced' ? '$9.99' : targetLevel === 'premium' ? '$29.99' : '$0'}
                      </span>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>{targetLevel === 'enhanced' ? '$9.99' : targetLevel === 'premium' ? '$29.99' : '$0'}</span>
                    </div>
                  </div>
                  
                  {/* In a real app, this would be a proper payment form */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Card Number</label>
                      <input 
                        type="text" 
                        placeholder="1234 5678 9012 3456" 
                        className="w-full p-2 border rounded-md"
                        disabled={loading}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Expiration</label>
                        <input 
                          type="text" 
                          placeholder="MM/YY" 
                          className="w-full p-2 border rounded-md"
                          disabled={loading}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">CVC</label>
                        <input 
                          type="text" 
                          placeholder="123" 
                          className="w-full p-2 border rounded-md"
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={handleBack} disabled={loading}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Back
              </Button>
              
              <Button onClick={handleCompletePurchase} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Processing...
                  </>
                ) : (
                  'Complete Purchase'
                )}
              </Button>
            </div>
          </div>
        );
        
      case 'processing':
        return (
          <Card className="flex flex-col items-center p-6 text-center">
            <ShieldCheck className="h-16 w-16 text-primary mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Verification Upgrade In Progress</h2>
            <p className="text-muted-foreground mb-6">
              Your verification upgrade request is being processed. We'll notify you once it's complete.
            </p>
            <div className="w-full max-w-md bg-muted/40 p-4 rounded-md text-sm text-left">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Current level:</span>
                <span>{currentLevel}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Target level:</span>
                <span>{targetLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span>Processing</span>
              </div>
            </div>
          </Card>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      {currentStep !== 'select' && currentStep !== 'processing' && (
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="sm" onClick={handleBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h2 className="text-xl font-semibold">
            Upgrade to {targetLevel} Verification
          </h2>
        </div>
      )}
      
      {renderStepContent()}
    </div>
  );
};

export default VerificationLevelUpgrade;
