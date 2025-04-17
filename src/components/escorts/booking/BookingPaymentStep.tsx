
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/hooks/auth/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { Escort, Booking } from '@/types/escort';

interface BookingPaymentStepProps {
  booking: Partial<Booking>;
  onConfirm: () => void;
  onCancel: () => void;
  escort?: Escort;
  onComplete?: () => Promise<void>;
  isSubmitting?: boolean;
  onBack?: () => void;
}

const BookingPaymentStep: React.FC<BookingPaymentStepProps> = ({ 
  booking, 
  onConfirm, 
  onCancel,
  escort,
  onComplete,
  isSubmitting,
  onBack
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="p-4">
        <p>Please log in to confirm your booking.</p>
        <Button onClick={() => navigate('/auth')}>Log In</Button>
      </div>
    );
  }

  const calculateDuration = () => {
    if (!booking.startTime || !booking.endTime) return 0;
    
    // Handle both string and Date types
    const startTime = booking.startTime instanceof Date 
      ? booking.startTime.getTime() 
      : new Date(booking.startTime).getTime();
    
    const endTime = booking.endTime instanceof Date 
      ? booking.endTime.getTime() 
      : new Date(booking.endTime).getTime();
    
    return (endTime - startTime) / (1000 * 60 * 60); // Convert to hours
  };

  const duration = calculateDuration();

  const handleConfirm = () => {
    // When using the legacy onConfirm prop
    if (onConfirm) {
      onConfirm();
    } 
    // When using the newer onComplete prop
    else if (onComplete) {
      onComplete();
    }
  };

  const handleCancel = () => {
    // When using the legacy onCancel prop
    if (onCancel) {
      onCancel();
    }
    // When using the newer onBack prop
    else if (onBack) {
      onBack();
    }
  };

  // When formatting dates
  const formatDateDisplay = (dateValue: string | Date) => {
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
    return date.toLocaleString();
  };

  // Update service-related properties
  const serviceInfo = booking.serviceType ? 
    <div className="flex items-center gap-2">
      <span>Service Type:</span>
      <Badge>{booking.serviceType}</Badge>
    </div> : null;

  // Update price reference
  const priceDisplay = booking.price !== undefined && (
    <div className="text-xl font-semibold">
      ${booking.price}
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Confirm Your Booking</CardTitle>
        <CardDescription>Review details and confirm your booking.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-2">
          <span>Escort:</span>
          <span>{booking.escortName}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Date:</span>
          <span>{booking.startTime ? formatDateDisplay(booking.startTime) : 'Not specified'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Duration:</span>
          <span>{duration} hours</span>
        </div>
        {serviceInfo}
        {priceDisplay}
      </CardContent>
      <div className="flex justify-between p-4">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} disabled={isSubmitting}>
          {isSubmitting ? 'Processing...' : 'Confirm Booking'}
        </Button>
      </div>
    </Card>
  );
};

export default BookingPaymentStep;
