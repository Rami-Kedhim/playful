
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface WelcomeAlertProps {
  username: string;
}

const WelcomeAlert = ({ username }: WelcomeAlertProps) => {
  const [showAlert, setShowAlert] = useState(true);
  
  if (!showAlert) return null;
  
  return (
    <Alert className="relative">
      <AlertTitle className="text-lg font-medium">Welcome back, {username}!</AlertTitle>
      <AlertDescription className="text-sm">
        We're glad to see you again. Check out the latest featured profiles and content.
      </AlertDescription>
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-2 right-2 h-6 w-6 rounded-full" 
        onClick={() => setShowAlert(false)}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
    </Alert>
  );
};

export default WelcomeAlert;
