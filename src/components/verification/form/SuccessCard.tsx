
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SuccessCardProps {
  title?: string;
  description?: string;
  redirectPath?: string;
  redirectText?: string;
  showStatus?: boolean;
}

const SuccessCard: React.FC<SuccessCardProps> = ({
  title = "Verification Submitted",
  description = "Your documents have been submitted successfully and will be reviewed within 24-48 hours. You'll receive a notification once the review is complete.",
  redirectPath = "/",
  redirectText = "Return to Dashboard",
  showStatus = true
}) => {
  return (
    <Card className="text-center">
      <CardHeader>
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      {showStatus && (
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-muted/30">
              <h3 className="text-sm font-medium mb-2">Verification Status</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm">Status:</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Pending Review
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm">Estimated completion:</span>
                <span className="text-sm font-medium">24-48 hours</span>
              </div>
            </div>
          </div>
        </CardContent>
      )}
      
      <CardFooter className="flex justify-center">
        <Button variant="outline" asChild>
          <Link to={redirectPath}>{redirectText}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SuccessCard;
