
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Escort, Booking } from '@/types/escort';
import { Loader2, ArrowLeft, CreditCard, Wallet } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';

interface BookingPaymentStepProps {
  escort: Escort;
  booking: Partial<Booking>;
  onBack: () => void;
  onComplete: () => void;
  isSubmitting?: boolean;
}

const BookingPaymentStep: React.FC<BookingPaymentStepProps> = ({
  escort,
  booking,
  onBack,
  onComplete,
  isSubmitting = false
}) => {
  const [paymentMethod, setPaymentMethod] = useState('credits');
  
  const formatDateTime = (dateTime?: Date) => {
    if (!dateTime) return 'N/A';
    return format(dateTime, 'MMM d, yyyy h:mm a');
  };
  
  const calculateDuration = () => {
    if (!booking.startTime || !booking.endTime) return 'N/A';
    
    const start = booking.startTime;
    const end = booking.endTime;
    const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    
    return `${durationHours} ${durationHours === 1 ? 'hour' : 'hours'}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review & Payment</CardTitle>
        <CardDescription>
          Review your booking details and confirm payment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Booking Summary</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground">Escort:</div>
            <div className="font-medium">{escort.name}</div>
            
            <div className="text-muted-foreground">Date:</div>
            <div className="font-medium">
              {booking.startTime ? format(booking.startTime, 'MMM d, yyyy') : 'N/A'}
            </div>
            
            <div className="text-muted-foreground">Time:</div>
            <div className="font-medium">
              {booking.startTime ? format(booking.startTime, 'h:mm a') : 'N/A'} - 
              {booking.endTime ? format(booking.endTime, 'h:mm a') : 'N/A'}
            </div>
            
            <div className="text-muted-foreground">Duration:</div>
            <div className="font-medium">{calculateDuration()}</div>
            
            {booking.serviceType && (
              <>
                <div className="text-muted-foreground">Service Type:</div>
                <div className="font-medium">{booking.serviceType}</div>
              </>
            )}
            
            {booking.notes && (
              <>
                <div className="text-muted-foreground">Special Requests:</div>
                <div className="font-medium">{booking.notes}</div>
              </>
            )}
          </div>
        </div>
        
        <div className="border-t border-b py-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Amount</span>
            <span className="text-xl font-bold">${booking.price || booking.totalPrice}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Payment Method</h3>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2 border rounded-md p-3">
              <RadioGroupItem value="credits" id="credits" />
              <Label htmlFor="credits" className="flex items-center cursor-pointer">
                <Wallet className="h-4 w-4 mr-2" />
                <div>
                  <div>Account Credits</div>
                  <div className="text-xs text-muted-foreground">Pay using your account balance</div>
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 border rounded-md p-3">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center cursor-pointer">
                <CreditCard className="h-4 w-4 mr-2" />
                <div>
                  <div>Credit Card</div>
                  <div className="text-xs text-muted-foreground">Pay securely with your card</div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex gap-3">
        <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button 
          className="flex-1"
          onClick={onComplete}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            'Confirm & Pay'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingPaymentStep;
