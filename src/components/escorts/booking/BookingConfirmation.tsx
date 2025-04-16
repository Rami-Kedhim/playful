
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Escort, BookingStatus } from '@/types/escort';

interface BookingConfirmationProps {
  escort: Escort;
  status: BookingStatus;
  onClose?: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  escort,
  status,
  onClose
}) => {
  const renderStatusContent = () => {
    switch (status) {
      case 'pending':
        return (
          <>
            <div className="flex items-center gap-2 text-amber-500 mb-4">
              <Clock className="h-5 w-5" />
              <h3 className="font-medium text-lg">Request Pending</h3>
            </div>
            <p className="text-muted-foreground">
              Your booking request has been sent to {escort.name}. You'll receive a notification when they respond to your request.
            </p>
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 rounded-md">
              <h4 className="font-medium">What happens next?</h4>
              <ul className="mt-2 space-y-1 text-sm list-disc list-inside">
                <li>{escort.name} will review your booking request</li>
                <li>You'll receive a notification with their response</li>
                <li>If confirmed, you'll proceed to payment confirmation</li>
              </ul>
            </div>
          </>
        );
      
      case 'confirmed':
        return (
          <>
            <div className="flex items-center gap-2 text-green-500 mb-4">
              <CheckCircle className="h-5 w-5" />
              <h3 className="font-medium text-lg">Booking Confirmed!</h3>
            </div>
            <p className="text-muted-foreground">
              Great news! {escort.name} has confirmed your booking request. Your appointment is now confirmed.
            </p>
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-md">
              <h4 className="font-medium">What happens next?</h4>
              <ul className="mt-2 space-y-1 text-sm list-disc list-inside">
                <li>You can find the details in your bookings dashboard</li>
                <li>You'll receive a reminder before your appointment</li>
                <li>You can message {escort.name} for any questions</li>
              </ul>
            </div>
          </>
        );
        
      case 'rejected':
        return (
          <>
            <div className="flex items-center gap-2 text-red-500 mb-4">
              <AlertCircle className="h-5 w-5" />
              <h3 className="font-medium text-lg">Request Declined</h3>
            </div>
            <p className="text-muted-foreground">
              Unfortunately, {escort.name} was unable to accept your booking request at this time.
            </p>
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-md">
              <h4 className="font-medium">What you can do now:</h4>
              <ul className="mt-2 space-y-1 text-sm list-disc list-inside">
                <li>Try another date or time that might work better</li>
                <li>Message {escort.name} to discuss availability</li>
                <li>Browse other escorts that match your preferences</li>
              </ul>
            </div>
          </>
        );
        
      default:
        return (
          <p className="text-muted-foreground">
            There was an issue with your booking status. Please check your bookings dashboard for more information.
          </p>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Status</CardTitle>
      </CardHeader>
      <CardContent>
        {renderStatusContent()}
        
        <div className="mt-6">
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingConfirmation;
