
import React, { useState } from 'react';
import { Escort } from '@/types/escort';

interface BookingDialogProps {
  escort: Escort;
  onSubmit: (bookingDetails: any) => void;
}

const BookingDialog: React.FC<BookingDialogProps> = ({ escort, onSubmit }) => {
  const [bookingDetails, setBookingDetails] = useState({
    date: new Date(),
    time: '',
    duration: '1 hour',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(bookingDetails);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Book an appointment with {escort.name}</h2>
      <form onSubmit={handleSubmit}>
        {/* Add form fields here */}
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default BookingDialog;
