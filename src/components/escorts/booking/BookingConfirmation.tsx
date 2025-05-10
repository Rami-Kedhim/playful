
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Escort } from '@/types/Escort';
import { BookingFormData } from './types';
import { formatDate } from '@/lib/utils';

export interface BookingConfirmationProps {
  escort: Escort;
  formData?: BookingFormData;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  escort,
  formData,
  onConfirm,
  onCancel,
  isLoading = false
}) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Booking Confirmation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">Escort</h3>
            <p>{escort.name}</p>
          </div>
          
          {formData?.date && (
            <div>
              <h3 className="font-medium">Date</h3>
              <p>{formatDate(formData.date)}</p>
            </div>
          )}
          
          {formData?.time && (
            <div>
              <h3 className="font-medium">Time</h3>
              <p>{formData.time}</p>
            </div>
          )}
          
          {formData?.duration && (
            <div>
              <h3 className="font-medium">Duration</h3>
              <p>{formData.duration}</p>
            </div>
          )}
          
          {formData?.name && (
            <div>
              <h3 className="font-medium">Your Name</h3>
              <p>{formData.name}</p>
            </div>
          )}
          
          {formData?.email && (
            <div>
              <h3 className="font-medium">Email</h3>
              <p>{formData.email}</p>
            </div>
          )}
          
          {formData?.message && (
            <div>
              <h3 className="font-medium">Message</h3>
              <p className="text-sm">{formData.message}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onCancel}>
            Back
          </Button>
          <Button onClick={onConfirm} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Confirm Booking'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookingConfirmation;
