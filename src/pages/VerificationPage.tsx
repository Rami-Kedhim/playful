
import React from 'react';
import VerificationContainer from '@/components/verification/VerificationContainer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/auth/useAuthContext';

const VerificationPage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            You must be logged in to access the verification page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <VerificationContainer />;
};

export default VerificationPage;
