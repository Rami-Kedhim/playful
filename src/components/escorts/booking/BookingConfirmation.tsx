
import React from 'react';
import { Escort } from '@/types/escort';

interface BookingConfirmationProps {
  escort: Escort;
  status: string;
  onClose: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ escort, status, onClose }) => {
  return (
    <div className="p-4 text-center">
      <h2 className="text-lg font-semibold mb-2">Booking {status}</h2>
      <p className="mb-4">
        Your booking request with {escort.name} has been submitted and is {status}.
      </p>
      <button 
        className="bg-primary text-white px-4 py-2 rounded"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default BookingConfirmation;
