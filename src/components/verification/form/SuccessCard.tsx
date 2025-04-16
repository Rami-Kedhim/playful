
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const SuccessCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="text-green-500 h-5 w-5" />
          Verification Submitted
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Your verification request has been submitted successfully. Our team will review your documents and update your verification status soon.
        </p>
        <div className="mt-4 p-4 border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-900 rounded-md">
          <h4 className="font-medium">What happens next?</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-2">
            <li>Your documents are being securely stored and encrypted</li>
            <li>Our verification team will review your submission within 24-48 hours</li>
            <li>You'll receive a notification once your verification is complete</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessCard;
