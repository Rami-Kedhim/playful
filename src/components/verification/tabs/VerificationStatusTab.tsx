import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useVerificationStatus } from '../hooks/useVerificationStatus';
import VerificationStatusLoading from '../status/VerificationStatusLoading';
import VerificationProgress from '../VerificationProgress';
import { VerificationStatus } from '@/types/verification';

interface VerificationStatusTabProps {
  onStartVerification?: () => void;
}

const VerificationStatusTab = ({ onStartVerification }: VerificationStatusTabProps) => {
  const { loading, error, verificationRequest } = useVerificationStatus();

  if (loading) {
    return <VerificationStatusLoading />;
  }

  // If there's a verification request, show the progress
  if (verificationRequest) {
    return <VerificationProgress verificationRequest={verificationRequest} />;
  }

  // Otherwise show the "Get Started" card
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2 text-primary" />
          Get Verified
        </CardTitle>
        <CardDescription>
          Verifying your identity increases trust and unlocks premium features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
              Why verify your identity?
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Build trust with other users</li>
              <li>Access premium features and services</li>
              <li>Get priority in search results</li>
              <li>Higher response rates on messages and booking requests</li>
              <li>Potentially earn more through verified status</li>
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onStartVerification}>
          Start Verification
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerificationStatusTab;
