
import React from 'react';
import { Escort, Booking } from '@/types/escort';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { Loader2, CreditCard, Wallet } from 'lucide-react';

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
  const [paymentMethod, setPaymentMethod] = React.useState<string>('credit_card');
  
  const calculateTotal = () => {
    const basePrice = booking.price || 0;
    const serviceFee = Math.round(basePrice * 0.05); // 5% service fee
    return basePrice + serviceFee;
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, 'PPP');
  };
  
  const formatTime = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, 'p');
  };
  
  const getDuration = () => {
    if (!booking.start_time || !booking.end_time) return '';
    const startDate = new Date(booking.start_time);
    const endDate = new Date(booking.end_time);
    const hours = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60));
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  };

  return (
    <div className="space-y-6">
      <CardHeader className="p-0">
        <CardTitle>Complete Payment</CardTitle>
        <CardDescription>
          Please review and complete your booking with {escort.name}.
        </CardDescription>
      </CardHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span>{formatDate(booking.start_time)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time:</span>
              <span>{formatTime(booking.start_time)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration:</span>
              <span>{getDuration()}</span>
            </div>
            <div className="border-t my-2"></div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base Price:</span>
              <span>${booking.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service Fee:</span>
              <span>${Math.round((booking.price || 0) * 0.05)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total:</span>
              <span>${calculateTotal()}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup 
              value={paymentMethod} 
              onValueChange={setPaymentMethod}
            >
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="credit_card" id="credit_card" />
                <Label htmlFor="credit_card" className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Credit Card
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="wallet" id="wallet" />
                <Label htmlFor="wallet" className="flex items-center">
                  <Wallet className="mr-2 h-4 w-4" />
                  UBX Wallet
                </Label>
              </div>
            </RadioGroup>
            
            {paymentMethod === 'credit_card' && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="•••• •••• •••• ••••" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="•••" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <CardFooter className="p-0 flex flex-col sm:flex-row gap-2 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          className="w-full sm:w-auto"
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button 
          type="button" 
          onClick={onComplete}
          className="w-full sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay ${calculateTotal() > 0 ? `$${calculateTotal()}` : ''}`
          )}
        </Button>
      </CardFooter>
    </div>
  );
};

export default BookingPaymentStep;
