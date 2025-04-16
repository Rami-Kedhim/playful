
import React from 'react';
import { Escort } from '@/types/escort';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface BookingConfirmationProps {
  escort: Escort;
  status: string;
  onClose: () => void;
  bookingDetails?: any;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ 
  escort, 
  status, 
  onClose,
  bookingDetails
}) => {
  const getStatusIcon = () => {
    switch(status) {
      case 'confirmed':
        return <CheckCircle className="h-12 w-12 text-green-500 mb-2" />;
      case 'pending':
        return <Clock className="h-12 w-12 text-amber-500 mb-2" />;
      case 'rejected':
        return <AlertCircle className="h-12 w-12 text-red-500 mb-2" />;
      default:
        return <Clock className="h-12 w-12 text-blue-500 mb-2" />;
    }
  };
  
  const getStatusMessage = () => {
    switch(status) {
      case 'confirmed':
        return `Your booking with ${escort.name} has been confirmed.`;
      case 'pending':
        return `Your booking request with ${escort.name} has been submitted and is pending approval.`;
      case 'rejected':
        return `Your booking request with ${escort.name} has been declined.`;
      default:
        return `Your booking with ${escort.name} is ${status}.`;
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md mx-auto text-center">
      {getStatusIcon()}
      
      <h2 className="text-xl font-semibold mb-2">Booking {status}</h2>
      
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        {getStatusMessage()}
      </p>
      
      {bookingDetails && (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4 text-left">
          <h3 className="font-medium mb-2">Booking Details</h3>
          <p><span className="font-medium">Date:</span> {bookingDetails.date instanceof Date ? 
            bookingDetails.date.toLocaleDateString() : bookingDetails.date}</p>
          <p><span className="font-medium">Time:</span> {bookingDetails.time}</p>
          <p><span className="font-medium">Duration:</span> {bookingDetails.duration}</p>
          {bookingDetails.location && (
            <p><span className="font-medium">Location:</span> {bookingDetails.location}</p>
          )}
        </div>
      )}
      
      {status === 'confirmed' && (
        <div className="flex flex-col space-y-2 mb-4">
          <Button variant="outline">
            Add to Calendar
          </Button>
          <Button variant="outline">
            Message {escort.name}
          </Button>
        </div>
      )}
      
      {status === 'pending' && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          You will receive a notification when {escort.name} responds to your request.
        </p>
      )}
      
      <Button 
        className="w-full"
        onClick={onClose}
      >
        Close
      </Button>
    </div>
  );
};

export default BookingConfirmation;
