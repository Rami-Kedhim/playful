
// Fix usage of booking.serviceType, safely fallback to string

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/utils/formatters';
import { Booking, Escort } from '@/types/escort';
import { Loader2, CheckCircle } from 'lucide-react';

interface BookingPaymentStepProps {
  booking: Partial<Booking>;
  isProcessing?: boolean;
  isComplete?: boolean;
  onProceed?: () => void;
  estimatedTotal?: number;
  escort: Escort;
  onBack: () => void;
  onComplete: () => Promise<void>;
  isSubmitting: boolean;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

const BookingPaymentStep: React.FC<BookingPaymentStepProps> = ({
  booking,
  isProcessing = false,
  isComplete = false,
  onProceed,
  estimatedTotal = 0,
  escort,
  onBack,
  onComplete,
  isSubmitting,
  onConfirm,
  onCancel
}) => {
  const baseRate = booking.price || escort.price || 0;
  const duration = booking.duration || 1;
  const total = estimatedTotal || baseRate * duration;

  const calculateBreakdown = () => {
    // Calculate duration in hours if available
    const durationHours = duration || 1;
    
    // Use service type if available for display, else fallback to 'Standard'
    const serviceType = (booking.serviceType as string) || 'Standard';
    
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
          <span>{formatCurrency(total * 0.05)}</span>
        </div>
        
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
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
            
            <div className="mt-6 flex gap-2">
              <Button 
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                disabled={isSubmitting}
                onClick={onConfirm}
                className="flex-1"
              >
                {isSubmitting ? (
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
