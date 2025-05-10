
import React, { useState } from 'react';
import { convertEscortType } from '@/utils/typeConverters';
import BookingDialog from './BookingDialog';
import { useToast } from '@/components/ui/use-toast';
import type { Escort } from '@/types/Escort';

interface BookingFlowProps {
  escort: any; // We'll convert this to proper Escort type internally
  initialStep?: string;
  onComplete?: () => void;
}

// This component serves as a wrapper around the booking process
// It handles converting the escort from any source to the proper type
const BookingFlow: React.FC<BookingFlowProps> = ({
  escort,
  initialStep = 'details',
  onComplete
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Convert the escort to ensure type compatibility
  const processedEscort = React.useMemo(() => {
    return convertEscortType(escort);
  }, [escort]);

  const handleBookingSubmit = async (bookingDetails: any) => {
    try {
      setIsSubmitting(true);
      // Simulated API call to submit booking
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Booking Request Sent",
        description: `Your booking request with ${processedEscort.name} has been sent.`
      });
      
      if (onComplete) {
        onComplete();
      }
      
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Booking submission error:", error);
      toast({
        title: "Booking failed",
        description: "There was an error sending your booking request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BookingDialog 
      escort={processedEscort as unknown as Escort} 
      isOpen={isDialogOpen} 
      onClose={() => setIsDialogOpen(false)}
    />
  );
};

export default BookingFlow;
