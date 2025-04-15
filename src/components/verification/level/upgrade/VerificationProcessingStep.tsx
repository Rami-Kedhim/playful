
import React from 'react';
import { Card } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

interface ProcessingStepProps {
  currentLevel: string;
  targetLevel: string;
}

const VerificationProcessingStep = ({ currentLevel, targetLevel }: ProcessingStepProps) => {
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
};

export default VerificationProcessingStep;
