
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, AlertCircle } from 'lucide-react';

interface VerificationLevelRequirementsProps {
  currentLevel: string;
  targetLevel: string;
  onComplete: () => void;
}

const LEVEL_REQUIREMENTS = {
  basic: [
    'Government-issued ID',
    'Selfie verification',
    'Valid email address'
  ],
  enhanced: [
    'All Basic requirements',
    'Phone number verification',
    'Proof of address',
    'Background check consent'
  ],
  premium: [
    'All Enhanced requirements',
    'Business registration documents',
    'Professional references',
    'Video verification'
  ]
};

const VerificationLevelRequirements = ({
  currentLevel,
  targetLevel,
  onComplete
}: VerificationLevelRequirementsProps) => {
  const requirements = LEVEL_REQUIREMENTS[targetLevel as keyof typeof LEVEL_REQUIREMENTS] || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-blue-500" />
          Requirements for {targetLevel} Verification
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ul className="space-y-2">
            {requirements.map((requirement, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                <span>{requirement}</span>
              </li>
            ))}
          </ul>
          
          <div className="bg-muted/30 p-4 rounded-md mt-6">
            <h4 className="text-sm font-medium mb-2">Important Notes:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• All documents must be clear and legible</li>
              <li>• Documents must be valid and not expired</li>
              <li>• Verification process may take 24-48 hours</li>
            </ul>
          </div>
          
          <Button onClick={onComplete} className="w-full mt-4">
            Continue with Verification
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationLevelRequirements;
