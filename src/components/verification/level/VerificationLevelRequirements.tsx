
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

type VerificationLevel = 'none' | 'basic' | 'enhanced' | 'premium';

interface Requirement {
  id: string;
  title: string;
  description: string;
  required: boolean;
}

interface VerificationLevelRequirementsProps {
  currentLevel: VerificationLevel;
  targetLevel: VerificationLevel;
  onComplete?: () => void;
}

const LEVEL_REQUIREMENTS: Record<VerificationLevel, Requirement[]> = {
  none: [],
  basic: [
    {
      id: 'id_verification',
      title: 'ID Verification',
      description: 'Government-issued photo ID (passport, driver\'s license, or national ID card)',
      required: true
    },
    {
      id: 'selfie',
      title: 'Selfie with ID',
      description: 'A photo of yourself holding your ID next to your face',
      required: true
    }
  ],
  enhanced: [
    {
      id: 'id_verification',
      title: 'ID Verification',
      description: 'Government-issued photo ID (passport, driver\'s license, or national ID card)',
      required: true
    },
    {
      id: 'selfie',
      title: 'Selfie with ID',
      description: 'A photo of yourself holding your ID next to your face',
      required: true
    },
    {
      id: 'proof_of_address',
      title: 'Proof of Address',
      description: 'Recent utility bill or bank statement (less than 3 months old)',
      required: true
    }
  ],
  premium: [
    {
      id: 'id_verification',
      title: 'ID Verification',
      description: 'Government-issued photo ID (passport, driver\'s license, or national ID card)',
      required: true
    },
    {
      id: 'selfie',
      title: 'Selfie with ID',
      description: 'A photo of yourself holding your ID next to your face',
      required: true
    },
    {
      id: 'proof_of_address',
      title: 'Proof of Address',
      description: 'Recent utility bill or bank statement (less than 3 months old)',
      required: true
    },
    {
      id: 'video_verification',
      title: 'Video Verification',
      description: 'Short video call with our verification team',
      required: true
    }
  ]
};

const VerificationLevelRequirements = ({
  currentLevel,
  targetLevel,
  onComplete
}: VerificationLevelRequirementsProps) => {
  const requirements = LEVEL_REQUIREMENTS[targetLevel];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Requirements for {targetLevel} Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requirements.map((requirement) => (
              <div
                key={requirement.id}
                className={cn(
                  "p-4 rounded-lg border",
                  requirement.required ? "bg-muted/50" : "bg-muted/30"
                )}
              >
                <div className="flex items-start space-x-3">
                  {requirement.required ? (
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <h3 className="font-medium">
                      {requirement.title}
                      {requirement.required && (
                        <span className="text-xs text-red-500 ml-2">(Required)</span>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {requirement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationLevelRequirements;
