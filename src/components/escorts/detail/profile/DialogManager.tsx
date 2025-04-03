
import { useState } from "react";
import { Escort } from "@/data/escortData";
import { BookingForm, BookingFormData } from "../booking";
import MessageForm from "../MessageForm";
import { ShareProfileModal } from "../share";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface DialogManagerProps {
  escort: Escort;
  onBookNow: () => void;
  bookingOpen: boolean;
  messageOpen: boolean;
  shareOpen: boolean;
  onBookingClose: () => void;
  onMessageClose: () => void;
  onShareClose: () => void;
}

const DialogManager = ({ 
  escort, 
  onBookNow,
  bookingOpen,
  messageOpen,
  shareOpen,
  onBookingClose,
  onMessageClose,
  onShareClose
}: DialogManagerProps) => {
  const { toast } = useToast();

  const handleBookingSubmit = (data: BookingFormData) => {
    console.log("Booking data:", data);
    toast({
      title: "Booking Request Sent",
      description: `Your booking with ${escort.name} for ${format(data.date, "MMMM d, yyyy")} at ${data.time} has been sent.`,
    });
    onBookNow();
    onBookingClose();
  };

  const handleMessageSubmit = (message: string) => {
    console.log("Message sent:", message);
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${escort.name}.`,
    });
    onMessageClose();
  };

  return (
    <>
      <BookingForm
        escort={escort}
        isOpen={bookingOpen}
        onClose={onBookingClose}
        onSubmit={handleBookingSubmit}
      />

      <MessageForm
        escort={escort}
        isOpen={messageOpen}
        onClose={onMessageClose}
        onSubmit={handleMessageSubmit}
      />
      
      <ShareProfileModal
        escort={escort}
        isOpen={shareOpen}
        onClose={onShareClose}
      />
    </>
  );
};

export default DialogManager;
