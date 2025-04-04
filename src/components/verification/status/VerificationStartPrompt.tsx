
import React from 'react';
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface VerificationStartPromptProps {
  onStartVerification?: () => void;
}

const VerificationStartPrompt = ({ onStartVerification }: VerificationStartPromptProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Verification Required</CardTitle>
        <CardDescription>
          To ensure platform safety, we require identity verification for all users offering services.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Verification helps build trust with your clients and improves your visibility on the platform.
          The verification process is simple and secure.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={onStartVerification} className="w-full">
          Start Verification Process
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerificationStartPrompt;
