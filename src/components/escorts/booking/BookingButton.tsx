
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
// Changed import to fixed casing for Escort type
import { Escort } from '@/types/Escort';
import { ServiceTypeFilter } from '../../filters/ServiceTypeBadgeLabel';
import BookingDialog from '../../detail/booking/BookingDialog';

interface BookingButtonProps {
  escort: Escort & { providesVirtualContent?: boolean; providesInPersonServices?: boolean };
  availability?: any;
  size?: 'sm' | 'lg' | 'default';
  variant?: 'default' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

const BookingButton: React.FC<BookingButtonProps> = ({
  escort,
  availability,
  size = 'default',
  variant = 'default',
  fullWidth = false
}) => {
  const [showBookingDialog, setShowBookingDialog] = useState(false);

  const getServiceType = (): ServiceTypeFilter => {
    if (escort.providesInPersonServices && escort.providesVirtualContent) {
      return "both";
    } else if (escort.providesInPersonServices) {
      return "in-person";
    } else if (escort.providesVirtualContent) {
      return "virtual";
    }
    return "in-person";
  };

  const serviceType = getServiceType();

  const handleBookNow = () => {
    setShowBookingDialog(true);
  };

  return (
    <>
      <Button
        size={size}
        variant={variant}
        onClick={handleBookNow}
        className={fullWidth ? 'w-full' : ''}
      >
        <Calendar className="mr-2 h-4 w-4" />
        Book Now
      </Button>

      <BookingDialog
        escort={escort}
        isOpen={showBookingDialog}
        onClose={() => setShowBookingDialog(false)}
        onSubmit={async () => {}} // Provide a no-op submit since it is required
      />
    </>
  );
};

export default BookingButton;
