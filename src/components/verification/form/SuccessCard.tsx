
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleCheck } from 'lucide-react';

const SuccessCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg text-green-500">
          <CircleCheck className="h-5 w-5 mr-2" />
          Verification Submitted Successfully
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Your verification request has been submitted and will be reviewed by our team.
          This typically takes 24-48 hours.
        </p>
        
        <div className="bg-muted/30 p-4 rounded-md space-y-2">
          <h4 className="text-sm font-medium">What happens next?</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Our team will review your submitted documents</li>
            <li>• You'll receive a notification when the review is complete</li>
            <li>• You can check the status of your verification at any time</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessCard;
