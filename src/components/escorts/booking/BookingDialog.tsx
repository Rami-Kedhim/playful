
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Escort } from '@/types/Escort';
import BookingForm, { BookingFormProps } from './BookingForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BookingDialogProps {
  escort: Escort;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: BookingFormProps['onSubmit'];
}

const BookingDialog: React.FC<BookingDialogProps> = ({
  escort,
  open,
  onOpenChange,
  onSubmit,
}) => {
  const [selectedBookingType, setSelectedBookingType] = React.useState<'in-person' | 'virtual'>('in-person');

  // Determine which booking types are available
  const hasInPersonServices = escort.providesInPersonServices !== false; // Default to true if undefined
  const hasVirtualServices = escort.providesVirtualContent === true;

  // Default to in-person if available, otherwise virtual
  React.useEffect(() => {
    if (!hasInPersonServices && hasVirtualServices) {
      setSelectedBookingType('virtual');
    } else {
      setSelectedBookingType('in-person');
    }
  }, [hasInPersonServices, hasVirtualServices]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book an appointment with {escort.name}</DialogTitle>
          <DialogDescription>
            Fill out the form below to request a booking
          </DialogDescription>
        </DialogHeader>

        {/* Booking type tabs if both types are available */}
        {hasInPersonServices && hasVirtualServices && (
          <Tabs 
            value={selectedBookingType} 
            onValueChange={(value) => setSelectedBookingType(value as 'in-person' | 'virtual')}
            className="mb-4"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="in-person">In Person</TabsTrigger>
              <TabsTrigger value="virtual">Virtual</TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        {/* Booking form with appropriate type */}
        <BookingForm 
          escort={escort} 
          onSubmit={onSubmit}
          bookingType={selectedBookingType}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
