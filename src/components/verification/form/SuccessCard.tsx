
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const SuccessCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-green-600">Verification Submitted!</CardTitle>
        <CardDescription className="text-center">
          Your verification request has been submitted and is now pending review.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Shield className="h-16 w-16 text-green-500" />
      </CardContent>
      <CardFooter>
        <p className="text-center w-full text-gray-600">
          We'll review your documents within 24-48 hours. You'll be notified when your verification status changes.
        </p>
      </CardFooter>
    </Card>
  );
};

export default SuccessCard;
