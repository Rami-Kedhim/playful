
// Fix import to unify to '@/types/Escort' and normalize height to string

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { Escort } from '@/types/Escort'; // unified import
import { ServiceTypeFilter } from '@/components/escorts/filters/ServiceTypeBadgeLabel';
import BookingDialog from '@/components/escorts/detail/booking/BookingDialog';

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

  // Normalize height to string to satisfy type
  const normalizedEscort = {
    ...escort,
    height: escort.height !== undefined && typeof escort.height !== 'string'
      ? String(escort.height)
      : escort.height,
  };

  const getServiceType = (): ServiceTypeFilter => {
    if (normalizedEscort.providesInPersonServices && normalizedEscort.providesVirtualContent) {
      return "both";
    } else if (normalizedEscort.providesInPersonServices) {
      return "in-person";
    } else if (normalizedEscort.providesVirtualContent) {
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
        escort={normalizedEscort}
        isOpen={showBookingDialog}
        onClose={() => setShowBookingDialog(false)}
        onSubmit={async () => {}} // Provide a no-op submit since it is required
      />
    </>
  );
};

export default BookingButton;

