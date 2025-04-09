
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, ArrowRight, CheckCircle } from 'lucide-react';

interface VerificationStartPromptProps {
  onStartVerification?: () => void;
}

const VerificationStartPrompt = ({ onStartVerification }: VerificationStartPromptProps) => {
  return (
    <Card className="border-2 border-dashed">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <div className="rounded-full p-4 bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-center">Not Yet Verified</CardTitle>
        <CardDescription className="text-center">
          Complete identity verification to unlock all platform features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium">Get a verified badge</h4>
              <p className="text-sm text-muted-foreground">Build trust with a verified profile badge</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium">Priority in search results</h4>
              <p className="text-sm text-muted-foreground">Appear higher in search rankings</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium">Access premium features</h4>
              <p className="text-sm text-muted-foreground">Unlock exclusive tools and opportunities</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium">Increased client trust</h4>
              <p className="text-sm text-muted-foreground">Clients are more likely to choose verified profiles</p>
            </div>
          </div>
        </div>
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
