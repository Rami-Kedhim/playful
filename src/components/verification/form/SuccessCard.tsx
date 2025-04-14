
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const SuccessCard = () => {
  return (
    <Card className="border-green-100 dark:border-green-900 shadow-md">
      <CardHeader className="bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-800">
        <CardTitle className="flex items-center text-xl text-green-700 dark:text-green-400">
          <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
          Verification Submitted Successfully
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <p className="text-muted-foreground">
          Your verification documents have been submitted successfully and are now being processed. Our team will review your submission and update your status shortly.
        </p>
        <p className="text-muted-foreground">
          You can check the status of your verification request in your profile dashboard.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mt-6">
          <Button variant="outline" asChild>
            <Link to="/verification/status">Check Status</Link>
          </Button>
          <Button asChild>
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessCard;
