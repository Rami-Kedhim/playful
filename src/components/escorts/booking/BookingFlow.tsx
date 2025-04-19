
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { bookingService } from '@/services/bookingService';
import { Escort, Booking } from '@/types/escort';
import { EnhancedCard, EnhancedCardHeader, EnhancedCardContent, EnhancedCardFooter } from '@/components/ui/enhanced-card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { toast } from '@/components/ui/use-toast';
import BookingDialog from '../detail/booking/BookingDialog';
import BookingConfirmation from './BookingConfirmation';
import BookingPaymentStep from './BookingPaymentStep';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BookingFlowProps {
  escort: Escort;
  isOpen: boolean;
  onClose: () => void;
}

type BookingStep = 'select' | 'details' | 'payment' | 'confirmation';

const BookingStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  REJECTED: 'rejected',
  DECLINED: 'rejected',
};

const BookingFlow: React.FC<BookingFlowProps> = ({ escort, isOpen, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<BookingStep>('select');
  const [booking, setBooking] = useState<Partial<Booking> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [realTimeStatus, setRealTimeStatus] = useState<string | null>(null);

  useEffect(() => {
    let subscription: any;

    if (bookingId) {
      subscription = bookingService.subscribeToBookingUpdates(
        bookingId,
        (updatedBooking) => {
          setRealTimeStatus(updatedBooking.status);

          if (updatedBooking.status === BookingStatus.CONFIRMED) {
            toast({
              title: 'Booking Confirmed!',
              description: 'Your booking has been confirmed.',
              variant: 'success',
            });
          } else if (updatedBooking.status === BookingStatus.REJECTED) {
            toast({
              title: 'Booking Rejected',
              description: updatedBooking.notes || 'Your booking request was rejected.',
              variant: 'destructive',
            });
          }
        }
      );
    }

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [bookingId]);

  const handleDetailsSubmit = async (bookingDetails: any) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to book an appointment',
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }

    setBooking({
      escortId: escort.id,
      clientId: user.id,
      ...bookingDetails,
    });

    setCurrentStep('payment');
  };

  const handlePaymentComplete = async () => {
    if (!booking || !user) return;

    setIsSubmitting(true);

    try {
      // Create booking with the right types
      const bookingData = {
        ...booking,
        id: `booking-${Date.now().toString().substring(8, 13)}-${Math.random().toString(36).substring(2, 7)}`,
        createdAt: new Date(),
        status: BookingStatus.PENDING,
        totalPrice: booking.price || 0
      } as unknown as Booking;

      const result = await bookingService.createBooking(bookingData);

      if (!result.success) {
        throw new Error(result.error);
      }

      setBookingId(result.booking?.id || null);
      toast({
        title: 'Booking Requested',
        description: 'Your booking request has been sent!',
      });

      setCurrentStep('confirmation');
    } catch (error: any) {
      toast({
        title: 'Booking Failed',
        description: error.message || 'Failed to create booking',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'select':
        return (
          <BookingDialog
            escort={escort}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleDetailsSubmit}
          />
        );

      case 'payment':
        return (
          <BookingPaymentStep
            escort={escort}
            booking={booking as Partial<Booking>}
            onBack={() => setCurrentStep('select')}
            onComplete={handlePaymentComplete}
            isSubmitting={isSubmitting}
            onConfirm={handlePaymentComplete}
            onCancel={() => setCurrentStep('select')}
          />
        );

      case 'confirmation':
        return (
          <BookingConfirmation
            escort={escort}
            status={realTimeStatus || BookingStatus.PENDING}
            onClose={onClose}
          />
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setCurrentStep('select');
        setBooking(null);
        setBookingId(null);
        setRealTimeStatus(null);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return renderStep();
};

export default BookingFlow;
