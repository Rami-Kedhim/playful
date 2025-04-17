
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Escort, Booking } from '@/types/escort';
import { formatDistanceStrict } from 'date-fns';
import { CircleDollarSign, Clock, MapPin } from 'lucide-react';

export interface BookingPaymentStepProps {
  escort: Escort;
  booking: Partial<Booking>;
  onBack: () => void;
  onComplete: () => Promise<void>;
  onConfirm?: () => void;
  onCancel?: () => void;
  isSubmitting: boolean;
}

const BookingPaymentStep: React.FC<BookingPaymentStepProps> = ({ 
  escort, 
  booking, 
  onBack, 
  onComplete, 
  onConfirm,
  onCancel,
  isSubmitting 
}) => {
  // Calculate duration if start and end times are available
  const calculateDuration = () => {
    if (!booking.startTime || !booking.endTime) return 'Not specified';
    
    const start = booking.startTime instanceof Date ? 
      booking.startTime : new Date(booking.startTime);
    const end = booking.endTime instanceof Date ? 
      booking.endTime : new Date(booking.endTime);
    
    return formatDistanceStrict(end, start);
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onComplete();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onBack();
    }
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Confirm & Payment</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <img 
            src={escort.imageUrl || escort.profileImage}
            alt={escort.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-medium">{escort.name}</h3>
            <p className="text-muted-foreground text-sm">{escort.location}</p>
          </div>
        </div>
        
        <div className="border-t border-b py-4 space-y-3">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Date & Time</span>
            </div>
            <span className="text-sm font-medium">
              {booking.date ? new Date(booking.date).toLocaleDateString() : 'Not specified'} {booking.time || ''}
            </span>
          </div>
          
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Duration</span>
            </div>
            <span className="text-sm font-medium">{calculateDuration()}</span>
          </div>
          
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Location</span>
            </div>
            <span className="text-sm font-medium">
              {booking.location || 'Not specified'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Total Price</span>
            </div>
            <span className="font-bold">${booking.price || escort.price}</span>
          </div>
        </div>
        
        <div className="rounded-lg bg-primary/10 p-4">
          <h4 className="font-medium mb-2">Payment Details</h4>
          <p className="text-sm text-muted-foreground">
            Payment will be processed securely through our platform.
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleCancel}>
          Back
        </Button>
        
        <Button onClick={handleConfirm} disabled={isSubmitting}>
          {isSubmitting ? 'Processing...' : 'Confirm & Pay'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingPaymentStep;
