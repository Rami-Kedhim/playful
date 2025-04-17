
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Escort, Booking } from '@/types/escort';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow, isAfter } from 'date-fns';
import { Check, Clock, CreditCard } from 'lucide-react';

export interface BookingPaymentStepProps {
  escort: Escort;
  booking: Partial<Booking>;
  onBack: () => void;
  onComplete: () => Promise<void>;
  isSubmitting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const BookingPaymentStep: React.FC<BookingPaymentStepProps> = ({
  escort,
  booking,
  onBack,
  onComplete,
  isSubmitting,
  onConfirm,
  onCancel
}) => {
  // Calculate time until booking
  const getTimeUntil = () => {
    if (!booking.startTime) return '';
    
    const startTime = typeof booking.startTime === 'string' 
      ? new Date(booking.startTime) 
      : booking.startTime;
      
    return formatDistanceToNow(startTime, { addSuffix: true });
  };

  // Check if booking is in the future
  const isUpcoming = () => {
    if (!booking.startTime) return false;
    
    const startTime = typeof booking.startTime === 'string'
      ? new Date(booking.startTime)
      : booking.startTime;
      
    return isAfter(startTime, new Date());
  };

  // Format date string
  const formatDate = (date: string | Date | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="mb-4 text-center">
          <h2 className="text-xl font-semibold">Booking Summary</h2>
          <p className="text-muted-foreground">Review your booking details and complete payment</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-medium">Escort</span>
            <span className="font-medium">{escort.name}</span>
          </div>
          
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-muted-foreground">Date & Time</span>
            <span>{formatDate(booking.startTime)}</span>
          </div>
          
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-muted-foreground">Duration</span>
            <span>{booking.duration}</span>
          </div>
          
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-muted-foreground">Service Type</span>
            <span className="capitalize">{booking.serviceType}</span>
          </div>
          
          {isUpcoming() && (
            <div className="flex items-center gap-2 justify-center bg-muted/50 p-2 rounded-md">
              <Clock size={16} />
              <span className="text-sm">Upcoming {getTimeUntil()}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-medium">Total Price</span>
            <span className="text-lg font-bold">${booking.price}</span>
          </div>
          
          <div className="border rounded-md p-4 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard size={20} />
              <span className="font-medium">Payment Method</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span>Credit Card</span>
              <Badge variant="outline">
                <Check size={12} className="mr-1" /> Verified
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Your payment information is securely processed. No charges will be applied until the escort accepts your booking request.
            </p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
          Back
        </Button>
        <Button 
          onClick={onConfirm || onComplete} 
          disabled={isSubmitting}
          className="bg-primary text-white"
        >
          {isSubmitting ? 'Processing...' : 'Complete Booking'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingPaymentStep;
