import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, Clock, DollarSign, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Escort } from '@/types/escort';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import ServiceTypeBadgeLabel from '../../filters/ServiceTypeBadgeLabel';

export interface BookingDialogProps {
  escort: Escort;
  isOpen: boolean;
  onClose: () => void;
  onBookNow?: () => void;
  onSubmit?: (bookingDetails: any) => Promise<void>;
  onCancel?: () => void;
}

const BookingDialog = ({ escort, isOpen, onClose, onBookNow, onSubmit, onCancel }: BookingDialogProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [duration, setDuration] = useState<string>("1hour");
  const [message, setMessage] = useState<string>("");
  
  const getServiceType = () => {
    if (escort.providesInPersonServices && escort.providesVirtualContent) {
      return "both";
    } else if (escort.providesInPersonServices) {
      return "in-person";
    } else if (escort.providesVirtualContent) {
      return "virtual";
    }
    return "";
  };
  
  const serviceType = getServiceType();
  
  const availableTimeSlots = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"];
  
  const getPriceForDuration = (durationType: string): number => {
    const basePrice = escort.price || 0;
    
    switch (durationType) {
      case "1hour":
        return basePrice;
      case "2hours":
        return basePrice * 1.8; // Slight discount for 2 hours
      case "3hours":
        return basePrice * 2.5; // More discount for 3 hours
      case "overnight":
        return basePrice * 6; // Overnight rate
      default:
        return basePrice;
    }
  };
  
  const getDurationLabel = (durationType: string): string => {
    switch (durationType) {
      case "1hour": return "1 Hour";
      case "2hours": return "2 Hours";
      case "3hours": return "3 Hours";
      case "overnight": return "Overnight (8 Hours)";
      default: return "1 Hour";
    }
  };
  
  const handleSubmit = () => {
    if (!date || !timeSlot) {
      return;
    }
    
    // Call either onBookNow or onSubmit based on what was provided
    if (onBookNow) {
      onBookNow();
    } else if (onSubmit) {
      const bookingDetails = {
        date: date,
        startTime: timeSlot,
        endTime: calculateEndTime(timeSlot, duration),
        duration: getDurationInHours(duration),
        service: duration,
        price: getPriceForDuration(duration),
        notes: message,
      };
      
      onSubmit(bookingDetails);
    }
    
    onClose();
  };
  
  const calculateEndTime = (startTime: string, durationType: string): string => {
    // Simple calculation for demo purposes
    return startTime; // In a real app, calculate this properly
  };
  
  const getDurationInHours = (durationType: string): number => {
    switch (durationType) {
      case "1hour": return 1;
      case "2hours": return 2;
      case "3hours": return 3;
      case "overnight": return 8;
      default: return 1;
    }
  };
  
  const handleDialogClose = () => {
    setDate(undefined);
    setTimeSlot(null);
    setDuration("1hour");
    setMessage("");
    
    if (onCancel) {
      onCancel();
    }
    
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Book an Appointment
            {serviceType && <ServiceTypeBadgeLabel type={serviceType} />}
          </DialogTitle>
          <DialogDescription>
            Schedule time with {escort.name}. Please select your preferred date and time.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Select Date</h3>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="border rounded-md pointer-events-auto"
                disabled={(date) => {
                  return date < new Date();
                }}
              />
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Select Time</h3>
              {date ? (
                <div className="grid grid-cols-2 gap-2">
                  {availableTimeSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={timeSlot === slot ? "default" : "outline"}
                      onClick={() => setTimeSlot(slot)}
                      className="justify-start"
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      {slot}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-40 border rounded-md bg-muted/30">
                  <p className="text-sm text-muted-foreground">Please select a date first</p>
                </div>
              )}
              
              <h3 className="text-sm font-medium mb-2 mt-4">Duration</h3>
              <div className="grid grid-cols-2 gap-2">
                {["1hour", "2hours", "3hours", "overnight"].map((option) => (
                  <Button
                    key={option}
                    variant={duration === option ? "default" : "outline"}
                    onClick={() => setDuration(option)}
                    className="justify-start"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    {getDurationLabel(option)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-medium mb-2">Additional Requests</h3>
            <Textarea 
              placeholder="Any special requests or notes for your appointment..."
              className="resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-label="Additional requests"
            />
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <div className="font-medium">Booking Summary</div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {getDurationLabel(duration)}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm">
                {date && timeSlot && (
                  <div className="flex justify-between">
                    <div className="flex items-center text-muted-foreground">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Date & Time
                    </div>
                    <div>{format(date, "PP")} at {timeSlot}</div>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    Location
                  </div>
                  <div>{escort.location}</div>
                </div>
                
                {escort.price && (
                  <div className="flex justify-between font-medium">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Total Price
                    </div>
                    <div>${getPriceForDuration(duration)} LC</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <DialogFooter className="flex justify-end gap-2 mt-2">
          <Button variant="outline" onClick={handleDialogClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit}
            disabled={!date || !timeSlot}
          >
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
