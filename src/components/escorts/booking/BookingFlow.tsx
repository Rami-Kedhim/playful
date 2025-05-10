
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { bookingService } from '@/services/bookingService';
import { Booking } from '@/types/booking';
import { toast } from '@/components/ui/use-toast';
import BookingDialog from './BookingDialog'; 
import BookingConfirmation from './BookingConfirmation';
import BookingPaymentStep from './BookingPaymentStep';
import { BookingFormValues } from './types';
import { convertEscortType, ensureCompatibleAvailabilityDays } from '@/utils/typeConverters';
import type { Escort } from '@/types/Escort';

interface BookingFlowProps {
  escort: any; // Use any to avoid type compatibility issues
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

  // Process escort data to ensure compatibility
  const processedEscort = React.useMemo(() => {
    const convertedEscort = convertEscortType(escort);
    
    // Additional processing to ensure compatibility with the specific EscortAvailability type
    if (convertedEscort && convertedEscort.availability && 
        typeof convertedEscort.availability === 'object' && 
        !Array.isArray(convertedEscort.availability)) {
      const availObj = convertedEscort.availability as any;
      if (availObj.days) {
        availObj.days = ensureCompatibleAvailabilityDays(availObj.days);
      }
    }
    
    return convertedEscort as Escort; // Cast to Escort type expected by components
  }, [escort]);

  const handleDetailsSubmit = async (bookingDetails: BookingFormValues) => {
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
      escortId: processedEscort.id,
      clientId: user.id,
      ...bookingDetails,
    });

    setCurrentStep('payment');
  };

  const handlePaymentComplete = async () => {
    if (!booking || !user) return;

    setIsSubmitting(true);

    try {
      // Ensure the duration is a string to match the updated Booking type
      const bookingData = {
        ...booking,
        id: `booking-${Date.now().toString().substring(8, 13)}-${Math.random().toString(36).substring(2, 7)}`,
        createdAt: new Date(),
        status: BookingStatus.PENDING,
        totalPrice: booking.price || 0,
        duration: booking.duration?.toString() || ''
      } as Booking;

      const result = await bookingService.createBooking(bookingData);

      if (!result) {
        throw new Error('Failed to create booking');
      }

      setBookingId(result.id || null);
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
            escort={processedEscort}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleDetailsSubmit}
          />
        );

      case 'payment':
        return (
          <BookingPaymentStep
            escort={processedEscort}
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
            escort={processedEscort}
            status={realTimeStatus || BookingStatus.PENDING}
            onClose={onClose}
          />
        );

      default:
        return null;
    }
  };

  return renderStep();
};

export default BookingFlow;
