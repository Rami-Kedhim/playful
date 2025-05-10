import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import BookingForm, { BookingFormValues } from './BookingForm';
import { Escort } from '@/types/Escort';

interface BookingDialogProps {
  escort: Escort;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookingSubmit: (data: BookingFormValues) => void;
}

const BookingDialog: React.FC<BookingDialogProps> = ({
  escort,
  open,
  onOpenChange,
  onBookingSubmit
}) => {
  const [bookingType, setBookingType] = useState<'in-person' | 'virtual'>('in-person');
  
  // Check what booking types this escort offers
  const providesInPerson = escort.providesInPersonServices !== false;
  const providesVirtual = escort.providesVirtualContent === true;

  const handleBookingSubmit = (formData: BookingFormValues) => {
    // Include booking type in the submission
    const fullData = { 
      ...formData,
      bookingType 
    };
    
    onBookingSubmit(fullData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Book {escort.name}</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {/* Only show tabs if both types are available */}
          {providesInPerson && providesVirtual ? (
            <Tabs 
              defaultValue="in-person" 
              className="w-full"
              onValueChange={(v) => setBookingType(v as 'in-person' | 'virtual')}
            >
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="in-person">In-Person</TabsTrigger>
                <TabsTrigger value="virtual">Virtual</TabsTrigger>
              </TabsList>
              
              <TabsContent value="in-person">
                <BookingForm 
                  escort={escort} 
                  onSubmit={handleBookingSubmit} 
                />
              </TabsContent>
              
              <TabsContent value="virtual">
                <BookingForm 
                  escort={escort} 
                  onSubmit={handleBookingSubmit} 
                />
              </TabsContent>
            </Tabs>
          ) : (
            // Otherwise just show the form for the available type
            <BookingForm 
              escort={escort} 
              onSubmit={handleBookingSubmit} 
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
