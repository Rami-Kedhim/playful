
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft } from 'lucide-react';
import { useVerificationStatus } from '../hooks/useVerificationStatus';
import VerificationLevelOptions from './VerificationLevelOptions';
import VerificationLevelRequirements from './VerificationLevelRequirements';
import VerificationPaymentStep from './upgrade/VerificationPaymentStep';
import VerificationProcessingStep from './upgrade/VerificationProcessingStep';

type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';
type UpgradeStep = 'select' | 'requirements' | 'payment' | 'processing';

const VerificationLevelUpgrade = () => {
  const { verificationRequest } = useVerificationStatus();
  const [currentStep, setCurrentStep] = useState<UpgradeStep>('select');
  const [targetLevel, setTargetLevel] = useState<VerificationLevel | null>(null);
  const [loading, setLoading] = useState(false);
  
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
        if (!targetLevel) return null;
        return (
          <VerificationPaymentStep
            targetLevel={targetLevel}
            loading={loading}
            onBack={handleBack}
            onComplete={handleCompletePurchase}
          />
        );
        
      case 'processing':
        if (!targetLevel) return null;
        return (
          <VerificationProcessingStep
            currentLevel={currentLevel}
            targetLevel={targetLevel}
          />
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
