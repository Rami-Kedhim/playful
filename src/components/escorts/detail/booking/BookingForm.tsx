
import React, { useState } from "react";
import { Escort } from "@/data/escortData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { bookingFormSchema, BookingFormData, BookingFormValues } from "./types";
import { BookingCalendar } from "./";
import { BookingTimeSlots } from "./";
import { BookingDuration } from "./";
import { BookingContactInfo } from "./";
import { BookingMessage } from "./";
import BookingConfirmation from "./BookingConfirmation";

interface BookingFormProps {
  escort: Escort;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BookingFormData) => void;
}

const BookingForm = ({ escort, isOpen, onClose, onSubmit }: BookingFormProps) => {
  const [step, setStep] = useState<'form' | 'review'>('form');
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const handleSubmit = (data: BookingFormValues) => {
    onSubmit(data as BookingFormData);
    form.reset();
    setStep('form');
    onClose();
  };

  const handleReview = () => {
    const result = form.trigger();
    if (result) {
      setStep('review');
    }
  };

  const handleBack = () => {
    setStep('form');
  };

  const handleClose = () => {
    setStep('form');
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book Appointment with {escort.name}</DialogTitle>
          <DialogDescription>
            {step === 'form' 
              ? 'Fill out the form below to request an appointment.'
              : 'Review your booking details before submitting.'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {step === 'form' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BookingCalendar form={form} />
                
                <div className="flex flex-col space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
                  <BookingTimeSlots form={form} />
                  <BookingDuration form={form} />
                </div>
                
                <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <BookingContactInfo form={form} />
                </div>
                
                <BookingMessage form={form} />
              </div>
            ) : (
              <BookingConfirmation 
                data={form.getValues()} 
                escort={escort} 
              />
            )}
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              {step === 'review' && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleBack}
                  className="flex-1 sm:flex-none"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Form
                </Button>
              )}
              
              {step === 'form' ? (
                <Button 
                  type="button" 
                  onClick={handleReview}
                  className="w-full"
                >
                  Review Booking
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="flex-1 sm:flex-none"
                >
                  Confirm Booking
                  <Check className="ml-2 h-4 w-4" />
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
