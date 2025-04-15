
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const SuccessCard: React.FC = () => {
  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <CheckCircle className="h-6 w-6 text-green-600" />
          <CardTitle className="text-green-800">Verification Submitted Successfully</CardTitle>
        </div>
        <CardDescription className="text-green-700">
          Your verification request has been submitted and will be reviewed shortly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-green-700">
            We will notify you once your verification is complete. This process typically takes 1-2 business days.
          </p>
          <div className="bg-white p-4 rounded-md border border-green-200">
            <h4 className="text-sm font-medium mb-2">What happens next?</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Our team will review your submitted documents
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                You'll receive a notification when verification is complete
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                Your profile will display a verified badge upon approval
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessCard;
