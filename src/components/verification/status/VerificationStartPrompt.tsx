
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, ArrowRight } from 'lucide-react';

interface VerificationStartPromptProps {
  onStartVerification?: () => void;
}

const VerificationStartPrompt = ({ onStartVerification }: VerificationStartPromptProps) => {
  return (
    <Card className="border-2 border-dashed">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <div className="rounded-full p-3 bg-primary/10">
            <Shield className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-center">Not Yet Verified</CardTitle>
        <CardDescription className="text-center">
          Complete identity verification to unlock all platform features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mb-6">
          <li className="flex items-start">
            <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary"></div>
            <span className="text-sm">Get a verified badge on your profile</span>
          </li>
          <li className="flex items-start">
            <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary"></div>
            <span className="text-sm">Receive priority in search results</span>
          </li>
          <li className="flex items-start">
            <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary"></div>
            <span className="text-sm">Build trust with potential clients</span>
          </li>
          <li className="flex items-start">
            <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary"></div>
            <span className="text-sm">Access premium features and tools</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onStartVerification}>
          Start Verification
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerificationStartPrompt;
