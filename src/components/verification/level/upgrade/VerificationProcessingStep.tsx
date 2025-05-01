
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { VerificationLevel } from '@/types/verification';

interface VerificationProcessingStepProps {
  currentLevel: VerificationLevel;
  targetLevel: VerificationLevel;
}

const VerificationProcessingStep: React.FC<VerificationProcessingStepProps> = ({
  currentLevel,
  targetLevel
}) => {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <CheckCircle className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>Upgrade Request Submitted</CardTitle>
        <CardDescription>
          Your verification upgrade from {currentLevel} to {targetLevel} is being processed
        </CardDescription>
      </CardHeader>
      
      <CardContent className="text-center">
        <div className="space-y-4">
          <p className="text-muted-foreground">
            We're processing your upgrade request. This typically takes 1-3 business days, but may take longer during peak times.
          </p>
          
          <div className="space-y-2 mt-4">
            <h4 className="font-medium">What's next?</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Our team will review your verification documents</li>
              <li>You may be contacted for additional information if needed</li>
              <li>You'll receive a notification when your upgrade is complete</li>
            </ul>
          </div>
          
          <div className="bg-muted p-4 rounded-md text-sm mt-4">
            <p>
              Your current verification level ({currentLevel}) will remain active during this process.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationProcessingStep;
