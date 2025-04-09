
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface SuccessCardProps {
  title?: string;
  description?: string;
  onDashboardClick?: () => void;
}

const SuccessCard = ({ 
  title = "Verification Submitted Successfully", 
  description = "Your identity verification documents have been submitted and will be reviewed within 24-48 hours. We will notify you once the review is complete.",
  onDashboardClick
}: SuccessCardProps) => {
  const navigate = useNavigate();
  
  const handleDashboardClick = () => {
    if (onDashboardClick) {
      onDashboardClick();
    } else {
      navigate('/dashboard');
    }
  };
  
  return (
    <Card className="border-green-100 bg-green-50/50">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center pb-2">
        <ul className="mb-4 space-y-2 text-sm">
          <li className="flex items-center justify-center">
            <div className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></div>
            <span>Your documents are being securely processed</span>
          </li>
          <li className="flex items-center justify-center">
            <div className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></div>
            <span>You will receive an email when verification is complete</span>
          </li>
          <li className="flex items-center justify-center">
            <div className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></div>
            <span>You can check verification status in your dashboard</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleDashboardClick}>
          Go to Dashboard
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SuccessCard;
