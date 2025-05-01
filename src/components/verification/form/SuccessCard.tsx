
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const SuccessCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-center mb-2">
          <CheckCircle className="h-16 w-16 text-primary" />
        </div>
        <CardTitle className="text-center">Verification Submitted</CardTitle>
        <CardDescription className="text-center">
          Your verification documents have been submitted successfully.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground">
          Our team will review your documents and update your verification status.
          You can check the status of your verification in the Status tab.
        </p>
      </CardContent>
    </Card>
  );
};

export default SuccessCard;
