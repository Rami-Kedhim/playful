
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle, Shield, ArrowRight } from 'lucide-react';
import { VerificationLevel } from '@/types/verification';

interface VerificationLevelRequirementsProps {
  currentLevel: VerificationLevel;
  targetLevel: VerificationLevel;
  onComplete: () => void;
}

const VerificationLevelRequirements: React.FC<VerificationLevelRequirementsProps> = ({
  currentLevel,
  targetLevel,
  onComplete
}) => {
  const getRequirements = () => {
    // Basic verification requirements
    const basicRequirements = [
      { id: 'government_id', label: 'Valid government-issued photo ID', required: true },
      { id: 'selfie', label: 'Selfie with ID', required: true },
      { id: 'address', label: 'Proof of address', required: false },
    ];
    
    // Enhanced verification adds these requirements
    const enhancedRequirements = [
      ...basicRequirements,
      { id: 'address', label: 'Proof of address', required: true },
      { id: 'phone', label: 'Phone number verification', required: true },
    ];
    
    // Premium verification adds these requirements
    const premiumRequirements = [
      ...enhancedRequirements,
      { id: 'business_doc', label: 'Business documentation', required: true },
      { id: 'payment_method', label: 'Verified payment method', required: true },
    ];
    
    switch (targetLevel) {
      case VerificationLevel.BASIC:
        return basicRequirements;
      case VerificationLevel.ENHANCED:
        return enhancedRequirements;
      case VerificationLevel.PREMIUM:
        return premiumRequirements;
      default:
        return [];
    }
  };
  
  const requirements = getRequirements();
  
  const getVerificationLevelName = (level: VerificationLevel): string => {
    switch (level) {
      case VerificationLevel.BASIC:
        return 'Basic';
      case VerificationLevel.ENHANCED:
        return 'Enhanced';
      case VerificationLevel.PREMIUM:
        return 'Premium';
      default:
        return 'None';
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {currentLevel === VerificationLevel.NONE 
            ? `Requirements for ${getVerificationLevelName(targetLevel)} Verification` 
            : `Upgrade to ${getVerificationLevelName(targetLevel)} Verification`}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-sm text-muted-foreground">
          Complete these requirements to {currentLevel === VerificationLevel.NONE ? 'get verified' : 'upgrade your verification level'}:
        </div>
        
        <ul className="space-y-3">
          {requirements.map((req) => (
            <li key={req.id} className="flex items-start">
              {req.required ? (
                <CheckCircle2 className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2 text-amber-500 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-medium">{req.label}</div>
                {req.required ? (
                  <div className="text-xs text-muted-foreground">Required</div>
                ) : (
                  <div className="text-xs text-amber-500">Optional but recommended</div>
                )}
              </div>
            </li>
          ))}
        </ul>
        
        <div className="bg-muted rounded-md p-4 text-sm">
          <p className="font-medium flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Security & Privacy
          </p>
          <p className="mt-2">
            Your verification documents are encrypted and securely stored. We follow strict privacy guidelines
            and only use your information for verification purposes.
          </p>
        </div>
        
        <Button 
          onClick={onComplete}
          className="w-full mt-4"
        >
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default VerificationLevelRequirements;
