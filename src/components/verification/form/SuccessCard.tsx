
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const SuccessCard: React.FC = () => {
  return (
    <Card className="text-center">
      <CardHeader>
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="mt-2 text-2xl font-semibold">Verification Submitted</h2>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Your verification documents have been submitted successfully and will be reviewed by our team.
          This process typically takes 1-3 business days.
        </p>
        <div className="mt-6 p-4 bg-muted/50 rounded-md">
          <h3 className="font-medium mb-2">What happens next?</h3>
          <ol className="text-left text-sm text-muted-foreground space-y-2">
            <li className="flex items-start">
              <span className="font-medium mr-2">1.</span>
              <span>Our team will review your submitted documents</span>
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">2.</span>
              <span>You'll receive a notification once the review is complete</span>
            </li>
            <li className="flex items-start">
              <span className="font-medium mr-2">3.</span>
              <span>If approved, your profile will display a verification badge</span>
            </li>
          </ol>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center space-x-4">
        <Link to="/verification/status">
          <Button variant="outline">Check Status</Button>
        </Link>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SuccessCard;
