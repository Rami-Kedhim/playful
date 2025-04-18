import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatters';
import { Booking } from '@/types/escort';
import { Loader2, CheckCircle } from 'lucide-react';

interface BookingPaymentStepProps {
  booking: Partial<Booking>;
  isProcessing: boolean;
  isComplete: boolean;
  onProceed: () => void;
  estimatedTotal: number;
}

const BookingPaymentStep: React.FC<BookingPaymentStepProps> = ({
  booking,
  isProcessing,
  isComplete,
  onProceed,
  estimatedTotal
}) => {
  const baseRate = booking.price || 0;

  const calculateBreakdown = () => {
    // Calculate duration in hours if available
    const durationHours = booking.duration || 1;
    
    // Use service type if available for display
    const serviceType = booking.service || booking.serviceType || 'Standard';
    
    return (
      <div className="space-y-2 mt-4">
        <div className="flex justify-between">
          <span>Base rate ({serviceType})</span>
          <span>{formatCurrency(baseRate)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Estimated duration ({durationHours} hrs)</span>
          <span>{formatCurrency(baseRate * durationHours)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Taxes</span>
          <span>{formatCurrency(estimatedTotal * 0.05)}</span>
        </div>
        
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatCurrency(estimatedTotal)}</span>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
        
        {isComplete ? (
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-gray-500">Payment Complete!</p>
          </div>
        ) : (
          <>
            <p className="text-gray-500">
              Confirm your payment details below.
            </p>
            
            {calculateBreakdown()}
            
            <div className="mt-6">
              <Button 
                disabled={isProcessing}
                onClick={onProceed}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  "Confirm and Pay"
                )}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingPaymentStep;
