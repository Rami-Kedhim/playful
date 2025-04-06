
import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface WelcomeAlertProps {
  username: string;
}

const WelcomeAlert: React.FC<WelcomeAlertProps> = ({ username }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Check if this is the first visit
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('welcomeAlertShown');
    if (!hasSeenWelcome) {
      setIsVisible(true);
    }
  }, []);
  
  const handleDismiss = () => {
    localStorage.setItem('welcomeAlertShown', 'true');
    setIsVisible(false);
  };
  
  if (!isVisible) return null;
  
  return (
    <Alert className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Welcome to UberEscorts, {username}!</AlertTitle>
      <AlertDescription className="flex justify-between items-center">
        <span>Complete your profile to get the most out of our platform.</span>
        <Button variant="outline" size="sm" onClick={handleDismiss}>
          Dismiss
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default WelcomeAlert;
