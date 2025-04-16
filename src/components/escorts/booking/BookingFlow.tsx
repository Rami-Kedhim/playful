import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { bookingService } from '@/services/bookingService';
import { Escort, Booking, BookingStatus } from '@/types/escort';
import { EnhancedCard, EnhancedCardHeader, EnhancedCardContent, EnhancedCardFooter } from '@/components/ui/enhanced-card';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { toast } from '@/components/ui/use-toast';
import BookingDialog from './BookingDialog';
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

const BookingFlow: React.FC<BookingFlowProps> = ({ escort, isOpen, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<BookingStep>('select');
  const [booking, setBooking] = useState<Partial<Booking> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [realTimeStatus, setRealTimeStatus] = useState<BookingStatus | null>(null);
  
  useEffect(() => {
    let subscription: any;
    
    if (bookingId) {
      subscription = bookingService.subscribeToBookingUpdates(
        bookingId,
        (updatedBooking) => {
          setRealTimeStatus(updatedBooking.status);
          
          if (updatedBooking.status === 'confirmed') {
            toast({
              title: 'Booking Confirmed!',
              description: 'Your booking has been confirmed.',
              variant: 'success',
            });
          } else if (updatedBooking.status === 'rejected') {
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
  
  const handleDetailsSubmit = async (bookingDetails: Partial<Booking>) => {
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
    if (!booking) return;
    
    setIsSubmitting(true);
    
    try {
      const result = await bookingService.createBooking({
        ...booking,
        id: `booking-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      } as Booking);
      
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
            onSubmit={handleDetailsSubmit}
            onCancel={onClose}
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
          />
        );
        
      case 'confirmation':
        return (
          <BookingConfirmation
            escort={escort}
            status={realTimeStatus || 'pending'}
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
