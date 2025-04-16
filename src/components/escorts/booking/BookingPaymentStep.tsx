
import React from 'react';
import { Escort, Booking } from '@/types/escort';

interface BookingPaymentStepProps {
  escort: Escort;
  booking: Partial<Booking>;
  onBack: () => void;
  onComplete: () => void;
  isSubmitting: boolean;
}

const BookingPaymentStep: React.FC<BookingPaymentStepProps> = ({
  escort,
  booking,
  onBack,
  onComplete,
  isSubmitting
}) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Complete Payment</h2>
      <div className="mb-4">
        <p className="font-medium">Amount: ${booking.price}</p>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          className="border border-gray-300 px-4 py-2 rounded"
          onClick={onBack}
          disabled={isSubmitting}
        >
          Back
        </button>
        <button
          className="bg-primary text-white px-4 py-2 rounded flex items-center"
          onClick={onComplete}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>Processing...</>
          ) : (
            <>Complete Booking</>
          )}
        </button>
      </div>
    </div>
  );
};

export default BookingPaymentStep;
