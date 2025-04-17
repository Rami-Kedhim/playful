
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuccessCard: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="text-center">
      <CardHeader>
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold mt-4">Verification Submitted!</h2>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Your verification request has been successfully submitted and is now being processed.
          You'll be notified once our team has reviewed your documents, which typically takes 24-48 hours.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={() => navigate('/dashboard')}>
          Return to Dashboard
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SuccessCard;
