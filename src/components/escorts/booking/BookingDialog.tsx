
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Escort } from '@/types/Escort';
import BookingForm from './BookingForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { BookingFormValues } from './types';

interface BookingDialogProps {
  escort: Escort;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (bookingDetails: BookingFormValues) => Promise<void>;
}

const BookingDialog: React.FC<BookingDialogProps> = ({ 
  escort, 
  isOpen, 
  onClose,
  onSubmit
}) => {
  const [bookingType, setBookingType] = useState<'in-person' | 'virtual'>('in-person');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const providesInPersonServices = escort.providesInPersonServices !== false;
  const providesVirtualContent = escort.providesVirtualContent !== false;

  const handleTabChange = (value: string) => {
    if (value === 'in-person' || value === 'virtual') {
      setBookingType(value);
    }
  };

  const handleSubmit = async (formData: BookingFormValues) => {
    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default submission handler
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        toast({
          title: 'Booking request sent',
          description: `Your booking request with ${escort.name} has been sent. They will contact you soon.`,
        });
      }
      
      onClose();
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: 'Booking failed',
        description: 'There was an error sending your booking request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book with {escort.name}</DialogTitle>
          <DialogDescription>
            Fill out the form below to request a booking
          </DialogDescription>
        </DialogHeader>

        <Tabs value={bookingType} onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger 
              value="in-person" 
              disabled={!providesInPersonServices}
            >
              In-Person
            </TabsTrigger>
            <TabsTrigger 
              value="virtual" 
              disabled={!providesVirtualContent}
            >
              Virtual
            </TabsTrigger>
          </TabsList>

          <TabsContent value="in-person">
            <BookingForm
              escort={escort}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              bookingType="in-person"
            />
          </TabsContent>
          
          <TabsContent value="virtual">
            <BookingForm
              escort={escort}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              bookingType="virtual"
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
