
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface SuccessCardProps {
  onComplete?: () => void;
}

const SuccessCard: React.FC<SuccessCardProps> = ({ onComplete }) => {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <CardTitle>Verification Submitted Successfully</CardTitle>
        <CardDescription>
          Your verification documents have been submitted and will be reviewed shortly
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="space-y-2">
          <p className="text-muted-foreground">
            We'll notify you once your verification status is updated. The verification process typically takes 1-3 business days.
          </p>
          
          <div className="p-4 bg-muted rounded-md mt-4">
            <h4 className="font-medium mb-2">What's Next?</h4>
            <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
              <li>Your documents will be reviewed by our team</li>
              <li>You may be contacted for additional information if needed</li>
              <li>You'll receive a notification when your verification is complete</li>
            </ul>
          </div>
        </div>
        
        {onComplete && (
          <Button onClick={onComplete} className="w-full">
            Done
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SuccessCard;
