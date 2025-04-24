
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const SuccessCard = () => {
  return (
    <Card>
      <CardContent className="pt-6 text-center space-y-4">
        <CheckCircle className="mx-auto h-12 w-12 text-primary" />
        <h3 className="text-lg font-semibold">Verification Submitted</h3>
        <p className="text-muted-foreground">
          Your verification documents have been submitted successfully. We'll review them and get back to you soon.
        </p>
      </CardContent>
    </Card>
  );
};

export default SuccessCard;
