
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const SuccessCard = () => {
  return (
    <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
      <CardHeader>
        <CardTitle className="flex items-center text-green-600 dark:text-green-400">
          <CheckCircle className="mr-2 h-5 w-5" />
          Verification Submitted Successfully
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Your identity verification documents have been submitted successfully. 
          Our team will review your submission and you will be notified once the process is complete.
          This typically takes 1-2 business days.
        </p>
      </CardContent>
    </Card>
  );
};

export default SuccessCard;
