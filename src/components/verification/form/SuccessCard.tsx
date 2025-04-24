
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const SuccessCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-center">
          <CheckCircle className="h-12 w-12 text-primary mb-4" />
          <h2 className="text-2xl font-semibold">Verification Submitted</h2>
        </div>
      </CardHeader>
      <CardContent className="text-center text-muted-foreground">
        <p>Your verification documents have been submitted successfully. We will review them and get back to you soon.</p>
      </CardContent>
    </Card>
  );
};

export default SuccessCard;
