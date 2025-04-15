
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

const SuccessCard: React.FC = () => {
  return (
    <Card className="w-full text-center">
      <CardHeader className="pb-2">
        <div className="flex justify-center mb-2">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
        </div>
        <CardTitle className="text-2xl">Verification Submitted</CardTitle>
        <CardDescription>Your verification documents have been received</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Thank you for submitting your verification documents. Our team will review them as soon as possible. This process typically takes 1-2 business days.
        </p>
        <div className="rounded-md p-3 bg-muted/50 text-sm">
          <p>You'll receive an email notification once your verification is approved.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessCard;
