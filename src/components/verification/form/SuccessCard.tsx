
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuccessCard = () => {
  const navigate = useNavigate();

  return (
    <Card className="text-center">
      <CardHeader>
        <div className="mx-auto bg-green-100 dark:bg-green-900/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-2">
          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-500" />
        </div>
        <CardTitle className="text-xl">Verification Submitted Successfully</CardTitle>
        <CardDescription>
          Your verification documents have been submitted and are now being reviewed
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-6">
        <div className="bg-muted/50 rounded-md p-4 my-4 text-sm">
          <h4 className="font-medium mb-2">What happens next?</h4>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Our team will review your documents (usually within 24-48 hours)</li>
            <li>You'll receive a notification when your verification status is updated</li>
            <li>Once approved, your profile will receive a verified badge</li>
          </ol>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={() => navigate('/verification', { state: { tab: 'status' } })}
        >
          View Verification Status
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SuccessCard;
