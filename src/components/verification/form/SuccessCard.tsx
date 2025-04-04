
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const SuccessCard = () => {
  const navigate = useNavigate();

  return (
    <Card className="border-green-200">
      <CardHeader className="bg-green-50 dark:bg-green-900/20 border-b border-green-200">
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-6 w-6 text-green-500" />
          <CardTitle className="text-green-700 dark:text-green-300">Verification Submitted</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="flex flex-col items-center text-center space-y-2 py-4">
          <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-xl font-medium">Documents Received</h3>
          <p className="text-muted-foreground max-w-md">
            Your verification documents have been submitted successfully. Our team will review them within 24-48 hours.
          </p>
        </div>

        <div className="bg-muted p-4 rounded-md flex items-start space-x-3">
          <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <h4 className="font-medium">What happens next?</h4>
            <p className="text-sm text-muted-foreground">
              You will receive a notification once your documents have been reviewed. 
              You can check the status of your verification at any time in your profile settings.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3 sm:justify-end border-t pt-4">
        <Button variant="outline" onClick={() => navigate('/profile')}>
          Go to Profile
        </Button>
        <Button onClick={() => navigate('/')}>
          Return to Home
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SuccessCard;
