
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { useNavigate } from 'react-router-dom';
import BookingDialog from './BookingDialog';
import { Escort } from '@/types/escort';

interface BookingButtonProps {
  escort: Escort;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

const BookingButton: React.FC<BookingButtonProps> = ({
  escort,
  variant = 'default',
  size = 'default',
  className
}) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleBookingClick = () => {
    if (!isAuthenticated) {
      navigate('/auth', { state: { from: `/escorts/${escort.id}`, action: 'booking' } });
      return;
    }
    
    setIsDialogOpen(true);
  };
  
  const handleBookingSuccess = () => {
    // Additional actions after successful booking can be added here
    console.log('Booking successful');
  };
  
  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={handleBookingClick}
      >
        <CalendarDays className="mr-2 h-4 w-4" />
        Book Now
      </Button>
      
      <BookingDialog
        escort={escort}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onBookNow={handleBookingSuccess}
      />
    </>
  );
};

export default BookingButton;
