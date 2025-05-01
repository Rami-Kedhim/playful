
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface SuccessCardProps {
  onClose?: () => void;
}

const SuccessCard: React.FC<SuccessCardProps> = ({ onClose }) => {
  const navigate = useNavigate();
  
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/');
    }
  };

  const handleViewStatus = () => {
    navigate('/verification?tab=status');
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <CardTitle className="text-xl">Verification Submitted Successfully</CardTitle>
        <CardDescription>
          Your verification documents have been received and are being processed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We will review your documents within 24-48 hours. You will be notified via email 
            once the verification process is complete.
          </p>

          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium">What happens next?</p>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li>Our team will review your submitted documents</li>
              <li>You'll receive a notification when the verification is complete</li>
              <li>Once verified, you'll gain access to all platform features</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button variant="outline" onClick={handleClose} className="sm:flex-1">
              Close
            </Button>
            <Button onClick={handleViewStatus} className="sm:flex-1">
              View Verification Status
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessCard;
