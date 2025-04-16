
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Escort, Booking } from '@/types/escort';
import { format } from 'date-fns';

export interface BookingDialogProps {
  escort: Escort;
  onSubmit: (bookingDetails: Partial<Booking>) => Promise<void>;
  onCancel: () => void;
}

const BookingDialog: React.FC<BookingDialogProps> = ({ escort, onSubmit, onCancel }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState<string>('');
  const [duration, setDuration] = useState<string>('1');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 10; hour <= 22; hour++) {
      slots.push(`${hour}:00`);
      if (hour < 22) slots.push(`${hour}:30`);
    }
    return slots;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !timeSlot || !duration) return;

    setIsSubmitting(true);
    
    // Calculate start and end times
    const [hours, minutes] = timeSlot.split(':').map(Number);
    const startTime = new Date(date);
    startTime.setHours(hours, minutes, 0, 0);
    
    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + parseInt(duration));
    
    const bookingDetails: Partial<Booking> = {
      escort_id: escort.id,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      price: (escort.rates?.hourly || 0) * parseInt(duration),
      notes,
      status: 'pending',
    };
    
    try {
      await onSubmit(bookingDetails);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-dialog">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date">Select Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date < new Date()}
              className="border rounded-md p-2"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="timeSlot">Select Time</Label>
              <Select value={timeSlot} onValueChange={setTimeSlot}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {generateTimeSlots().map((slot) => (
                    <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="2">2 hours</SelectItem>
                  <SelectItem value="3">3 hours</SelectItem>
                  <SelectItem value="4">4 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {date && timeSlot && duration && (
              <div className="p-3 border rounded-md mt-2 bg-secondary/20">
                <p className="text-sm">
                  <span className="font-medium">Date:</span> {format(date, 'PPP')}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Time:</span> {timeSlot}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Duration:</span> {duration} hour(s)
                </p>
                {escort.rates?.hourly && (
                  <p className="text-sm font-medium mt-1">
                    Total: ${parseInt(duration) * escort.rates.hourly}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div>
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="notes">Special Requests or Notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any specific requirements or information you'd like to share"
            className="resize-none h-20"
          />
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            className="w-full sm:w-auto"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="w-full sm:w-auto"
            disabled={!date || !timeSlot || !duration || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Book Appointment'}
          </Button>
        </DialogFooter>
      </form>
    </div>
  );
};

export default BookingDialog;
