
// Update imports and fix comparison operators
import React, { useMemo } from 'react';
import { formatDate, formatCurrency } from '@/utils/formatters';
import { Escort } from '@/types/escort';
import { Booking } from '@/types/booking';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface BookingPaymentStepProps {
  escort: Escort;
  booking: Partial<Booking>;
  onBack: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  onComplete: () => void;
  isSubmitting?: boolean;
}

const BookingPaymentStep: React.FC<BookingPaymentStepProps> = ({
  escort,
  booking,
  onBack,
  onConfirm,
  onCancel,
  isSubmitting = false
}) => {
  // Calculate price based on duration (using string comparison for duration)
  const calculatePrice = () => {
    if (!booking.duration) return 0;
    
    // Convert duration string to a number for price calculations
    let price = 0;
    const hourlyRate = escort.rates?.hourly || escort.price || 0;
    
    if (booking.duration === "1 hour") {
      price = hourlyRate;
    } else if (booking.duration === "2 hours") {
      price = escort.rates?.twoHours || hourlyRate * 2;
    } else if (booking.duration === "3 hours") {
      price = hourlyRate * 3;
    } else if (booking.duration === "overnight") {
      price = escort.rates?.overnight || hourlyRate * 8;
    }
    
    return price;
  };

  // Normalize height if it's a number
  const normalizedEscort = useMemo(() => {
    if (escort.height !== undefined && typeof escort.height !== 'string') {
      return {
        ...escort,
        height: String(escort.height)
      };
    }
    return escort;
  }, [escort]);

  const price = calculatePrice();
  
  return (
    <div className="p-4 bg-background rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
      
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mr-4">
          {normalizedEscort.imageUrl || normalizedEscort.profileImage ? (
            <img
              src={normalizedEscort.imageUrl || normalizedEscort.profileImage}
              alt={normalizedEscort.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-primary/20 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">
                {normalizedEscort.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div>
          <h3 className="font-medium">{normalizedEscort.name}</h3>
          <p className="text-sm text-muted-foreground">{normalizedEscort.location}</p>
        </div>
      </div>
      
      <div className="space-y-3 border-t border-b py-3 my-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Date:</span>
          <span>{booking.date ? formatDate(booking.date.toString()) : 'Not specified'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Time:</span>
          <span>{booking.time || 'Not specified'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Duration:</span>
          <span>{booking.duration || 'Not specified'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Service:</span>
          <span>{booking.service || 'Standard'}</span>
        </div>
      </div>
      
      <div className="flex justify-between font-semibold text-lg mb-6">
        <span>Total:</span>
        <span>{formatCurrency(price)}</span>
      </div>
      
      <div className="flex flex-col gap-2">
        <Button 
          onClick={onConfirm}
          className="w-full"
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
        <Button 
          onClick={onBack}
          variant="outline"
          className="w-full"
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button 
          onClick={onCancel}
          variant="ghost"
          className="w-full"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default BookingPaymentStep;
