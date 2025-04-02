
import React from "react";
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

import { bookingFormSchema, BookingFormData, BookingFormValues } from "./types";
import { BookingCalendar } from "./";
import { BookingTimeSlots } from "./";
import { BookingDuration } from "./";
import { BookingContactInfo } from "./";
import { BookingMessage } from "./";

interface BookingFormProps {
  escort: Escort;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BookingFormData) => void;
}

const BookingForm = ({ escort, isOpen, onClose, onSubmit }: BookingFormProps) => {
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
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book Appointment with {escort.name}</DialogTitle>
          <DialogDescription>
            Fill out the form below to request an appointment.
            All bookings require confirmation.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
            
            <DialogFooter>
              <Button type="submit" className="w-full">
                Request Booking
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
