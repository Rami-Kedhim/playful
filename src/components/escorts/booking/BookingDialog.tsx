
import React, { useState } from 'react';
import { Escort } from '@/types/escort';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import BookingForm from './BookingForm';
import { BookingFormValues } from './types';

interface BookingDialogProps {
  escort: Escort;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (bookingData: BookingFormValues) => void;
}

const BookingDialog: React.FC<BookingDialogProps> = ({
  escort,
  isOpen,
  onClose,
  onSubmit
}) => {
  const [selectedType, setSelectedType] = useState<'in-person' | 'virtual' | null>(null);
  
  // Normalize the service availability properties
  const hasInPersonServices = escort.providesInPersonServices ?? false;
  const hasVirtualServices = escort.providesVirtualContent ?? false;
  
  const handleBookingSubmit = (formData: BookingFormValues) => {
    if (onSubmit) {
      onSubmit(formData);
    }
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book an appointment with {escort.name}</DialogTitle>
          <DialogDescription>
            Select your desired appointment type and fill in the details.
          </DialogDescription>
        </DialogHeader>
        
        {selectedType === null ? (
          <div className="space-y-4 py-4">
            <h3 className="text-sm font-medium">Select appointment type:</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className={`p-4 h-auto flex flex-col items-center justify-center ${!hasInPersonServices ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => hasInPersonServices && setSelectedType('in-person')}
                disabled={!hasInPersonServices}
              >
                <div className="font-semibold">In-Person</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {hasInPersonServices ? 'Available' : 'Not Available'}
                </div>
              </Button>
              <Button
                variant="outline"
                className={`p-4 h-auto flex flex-col items-center justify-center ${!hasVirtualServices ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => hasVirtualServices && setSelectedType('virtual')}
                disabled={!hasVirtualServices}
              >
                <div className="font-semibold">Virtual</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {hasVirtualServices ? 'Available' : 'Not Available'}
                </div>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <BookingForm 
              escort={escort} 
              bookingType={selectedType} 
              onSubmit={handleBookingSubmit}
            />
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setSelectedType(null)}>
                Back
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
