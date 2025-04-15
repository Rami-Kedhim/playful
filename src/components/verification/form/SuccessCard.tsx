
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuccessCard = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-6 w-6 text-green-500" />
          <CardTitle>Verification Submitted Successfully</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Your verification request has been submitted and will be reviewed shortly. 
          We will notify you once the review is complete.
        </p>
        <div className="flex justify-center">
          <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessCard;
