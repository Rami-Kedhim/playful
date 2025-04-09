
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, ArrowRight } from 'lucide-react';

interface VerificationStartPromptProps {
  onStartVerification?: () => void;
}

const VerificationStartPrompt = ({ onStartVerification }: VerificationStartPromptProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2 text-primary" />
          Verify Your Identity
        </CardTitle>
        <CardDescription>Complete verification to unlock all platform features</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            You haven't started the verification process yet. Verifying your identity helps maintain a safe and reliable community.
          </p>
          
          <div className="bg-muted/50 p-3 rounded-md">
            <h4 className="font-semibold mb-2 text-sm">Benefits of verification:</h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-5 list-disc">
              <li>Increased trust with potential clients</li>
              <li>Improved visibility in search results</li>
              <li>Access to premium features</li>
              <li>Boosted profile ranking</li>
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onStartVerification} className="w-full">
          Start Verification <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerificationStartPrompt;
