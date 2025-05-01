
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const SuccessCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="text-center">
        <CheckCircle className="mx-auto h-10 w-10 text-primary mb-2" />
        <CardTitle>Verification Submitted</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="mb-4">
          Your verification documents have been submitted successfully. Our team will review your submission and update your verification status.
        </p>
        <p className="text-sm text-muted-foreground">
          The verification process typically takes 1-2 business days. You will receive a notification once the review is complete.
        </p>
      </CardContent>
    </Card>
  );
};

export default SuccessCard;
