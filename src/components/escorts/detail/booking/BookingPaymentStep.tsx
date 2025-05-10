
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Escort } from '@/types/escort';
import { Booking } from '@/types/booking';
import { Check, ArrowLeft, CreditCard } from 'lucide-react';
import { format } from 'date-fns';

interface BookingPaymentStepProps {
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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<string>('credit');
  
  const getDurationPrice = (durationStr: string | undefined): number => {
    if (!durationStr) return 0;
    
    const baseRate = escort.rates?.hourly || escort.price || 0;
    
    switch(durationStr) {
      case '30min':
        return baseRate / 2;
      case '1hr':
        return baseRate;
      case '2hrs':
        return escort.rates?.twoHours || baseRate * 2;
      case '3hrs':
        return baseRate * 3;
      default:
        return baseRate;
    }
  };
  
  const getFormattedDate = (date: Date | string | undefined) => {
    if (!date) return 'Not selected';
    return typeof date === 'string' ? date : format(date, 'EEEE, MMMM d, yyyy');
  };

  // Use escort.height directly if it exists, or try to get it from body.height
  const displayHeight = escort.height || (escort.body?.height ? `${escort.body.height}cm` : 'Not specified');

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Booking Payment</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Booking Details</h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div className="text-muted-foreground">Date:</div>
            <div>{getFormattedDate(booking.date)}</div>
            
            <div className="text-muted-foreground">Time:</div>
            <div>{booking.time || 'Not selected'}</div>
            
            <div className="text-muted-foreground">Duration:</div>
            <div>{booking.duration || '1 hour'}</div>
            
            <div className="text-muted-foreground">Price:</div>
            <div>${getDurationPrice(booking.duration?.toString())}</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Payment Method</h3>
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant={selectedPaymentMethod === 'credit' ? 'default' : 'outline'}
              className="justify-start"
              onClick={() => setSelectedPaymentMethod('credit')}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Credit / Debit Card
            </Button>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <Button onClick={onConfirm} disabled={isSubmitting}>
          {isSubmitting ? (
            <>Processing...</>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Confirm Booking
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingPaymentStep;
