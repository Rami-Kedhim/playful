
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileCheck, Shield } from 'lucide-react';

interface VerificationStartPromptProps {
  onStartVerification?: () => void;
}

const VerificationStartPrompt = ({ onStartVerification }: VerificationStartPromptProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <Shield className="h-5 w-5 mr-2 text-primary" />
          Verification Required
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Verify your identity to access all features and build trust with potential clients.
            Verified profiles receive higher visibility and priority in search results.
          </p>
          
          <div className="bg-muted p-4 rounded-md space-y-3">
            <h3 className="font-medium">What you'll need:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <FileCheck className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                <span>Government-issued ID (passport, driver's license, or ID card)</span>
              </li>
              <li className="flex items-start">
                <FileCheck className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                <span>A selfie of you holding your ID next to your face</span>
              </li>
              <li className="flex items-start">
                <FileCheck className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                <span>Clear, well-lit photos where all text is readable</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={onStartVerification}
        >
          Start Verification Process
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerificationStartPrompt;
