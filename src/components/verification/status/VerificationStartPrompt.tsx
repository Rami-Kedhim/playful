
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, ArrowRight, CheckCircle } from 'lucide-react';

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
          
          <div className="bg-muted/50 p-4 rounded-md">
            <h4 className="font-semibold mb-2 text-sm">Benefits of verification:</h4>
            <ul className="text-sm text-muted-foreground space-y-2 ml-1">
              {[
                'Increased trust with potential clients',
                'Improved visibility in search results',
                'Access to premium features',
                'Boosted profile ranking'
              ].map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-md p-3">
            <p className="text-sm text-amber-700 dark:text-amber-400">
              Verification typically takes 24-48 hours to complete after submission.
            </p>
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
