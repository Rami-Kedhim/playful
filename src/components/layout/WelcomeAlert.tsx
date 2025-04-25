
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface WelcomeAlertProps {
  username: string;
}

const WelcomeAlert: React.FC<WelcomeAlertProps> = ({ username }) => {
  return (
    <Alert className="mb-4">
      <AlertTitle>Welcome back, {username}!</AlertTitle>
      <AlertDescription>
        We're glad to see you again. Explore the latest updates and features.
      </AlertDescription>
    </Alert>
  );
};

export default WelcomeAlert;
