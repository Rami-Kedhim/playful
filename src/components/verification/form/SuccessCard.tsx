
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const SuccessCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
          Verification Submitted
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Your verification documents have been submitted successfully. Our team will review your submission and update your status shortly.
        </p>
        <p className="text-muted-foreground">
          You can check the status of your verification request in your profile dashboard.
        </p>
        <div className="flex justify-between">
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
