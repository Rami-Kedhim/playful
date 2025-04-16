
import React, { useState } from 'react';
import { Escort, Booking } from '@/types/escort';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Loader2, CreditCard, Wallet } from 'lucide-react';
import { ubxWalletService } from '@/services/ubx/UBXWalletService';
import { toast } from '@/hooks/use-toast';

interface BookingPaymentStepProps {
  escort: Escort;
  booking: Booking;
  onPaymentComplete: (paymentId: string) => void;
  onCancel: () => void;
}

const BookingPaymentStep: React.FC<BookingPaymentStepProps> = ({
  escort,
  booking,
  onPaymentComplete,
  onCancel
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'ubx' | 'card'>('ubx');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleProcessPayment = async () => {
    setIsProcessing(true);
    
    try {
      if (paymentMethod === 'ubx') {
        // Process UBX payment
        const transaction = await ubxWalletService.processTransaction(
          booking.client_id,
          booking.price,
          'booking',
          `Booking payment for ${escort.name}`,
          { bookingId: booking.id }
        );
        
        if (transaction) {
          onPaymentComplete(transaction.id);
          toast({
            title: "Payment successful",
            description: `Your booking with ${escort.name} has been paid for`,
          });
        } else {
          throw new Error('Payment failed');
        }
      } else {
        // Process card payment
        // This would integrate with a payment processor like Stripe
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating API call
        
        // Simulate successful payment
        onPaymentComplete('card_payment_' + Date.now());
        toast({
          title: "Payment successful",
          description: `Your booking with ${escort.name} has been paid for`,
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment</CardTitle>
        <CardDescription>Complete your booking with {escort.name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Booking Summary</h3>
          <div className="bg-muted p-3 rounded-md">
            <p><span className="font-medium">Date:</span> {new Date(booking.start_time).toLocaleDateString()}</p>
            <p><span className="font-medium">Time:</span> {new Date(booking.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p><span className="font-medium">Duration:</span> {
              Math.round((new Date(booking.end_time).getTime() - new Date(booking.start_time).getTime()) / (60 * 60 * 1000))
            } hours</p>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Total Amount</h3>
          <p className="text-2xl font-bold">${booking.price.toFixed(2)}</p>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Payment Method</h3>
          <RadioGroup 
            value={paymentMethod} 
            onValueChange={(value) => setPaymentMethod(value as 'ubx' | 'card')}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2 border rounded-md p-3">
              <RadioGroupItem value="ubx" id="ubx" />
              <Label htmlFor="ubx" className="flex items-center">
                <Wallet className="mr-2 h-4 w-4" />
                Pay with UBX
              </Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-md p-3">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                Credit/Debit Card
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel} disabled={isProcessing}>
          Cancel
        </Button>
        <Button onClick={handleProcessPayment} disabled={isProcessing}>
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>Pay Now</>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingPaymentStep;
