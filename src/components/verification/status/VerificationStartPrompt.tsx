
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';

interface VerificationStartPromptProps {
  onStartVerification?: () => void;
}

const VerificationStartPrompt = ({ onStartVerification }: VerificationStartPromptProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <CardTitle>Start Verification</CardTitle>
        </div>
        <CardDescription>
          Complete your identity verification to unlock all platform features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span className="text-sm text-muted-foreground">
                Upload a valid government-issued ID
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span className="text-sm text-muted-foreground">
                Take a selfie holding your ID for verification
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span className="text-sm text-muted-foreground">
                Process typically takes 24-48 hours
              </span>
            </li>
          </ul>
          
          <Button 
            onClick={onStartVerification} 
            className="w-full"
          >
            Start Verification Process
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationStartPrompt;
