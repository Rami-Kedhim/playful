
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { DatePicker } from '@/components/ui/date-picker';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Escort, Booking } from '@/types/escort';

interface BookingDialogProps {
  escort: Escort;
  open: boolean;
  onClose: () => void;
  onBook: (booking: Partial<Booking>) => void;
}

const BookingDialog: React.FC<BookingDialogProps> = ({ escort, open, onClose, onBook }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState(1);
  const [service, setService] = useState('');
  
  // Calculate end time based on start time and duration
  const getEndTime = (): Date | null => {
    if (!date || !startTime) return null;
    
    const [hours, minutes] = startTime.split(':').map(Number);
    const start = new Date(date);
    start.setHours(hours, minutes);
    
    const end = new Date(start);
    end.setHours(end.getHours() + duration);
    
    return end;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !startTime || !service) return;
    
    const startDate = new Date(date);
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    startDate.setHours(startHours, startMinutes);
    
    const endDate = getEndTime();
    if (!endDate) return;
    
    const booking: Partial<Booking> = {
      escortId: escort.id,
      date: format(date, 'yyyy-MM-dd'),
      startTime: format(startDate, 'yyyy-MM-dd HH:mm'),
      endTime: format(endDate, 'yyyy-MM-dd HH:mm'),
      duration,
      service,
      serviceType: service,
      price: (escort.rates?.hourly || 0) * duration
    };
    
    onBook(booking);
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Session with {escort.name}</DialogTitle>
          <DialogDescription>
            Fill in the details below to request a booking with {escort.name}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(date) => date < new Date()}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Start Time</Label>
            <Input
              id="time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (hours)</Label>
            <select 
              id="duration" 
              value={duration} 
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full border border-input bg-background px-3 py-2 rounded-md"
              required
            >
              <option value={1}>1 hour</option>
              <option value={2}>2 hours</option>
              <option value={3}>3 hours</option>
              <option value={4}>4 hours</option>
              <option value={8}>8 hours (overnight)</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="service">Service Type</Label>
            <select 
              id="service" 
              value={service} 
              onChange={(e) => setService(e.target.value)}
              className="w-full border border-input bg-background px-3 py-2 rounded-md"
              required
            >
              <option value="">Select a service</option>
              {escort.services?.map((service) => (
                <option key={service} value={service}>
                  {service.charAt(0).toUpperCase() + service.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <Label>Total Price</Label>
            <div className="text-xl font-bold">
              ${(escort.rates?.hourly || 0) * duration}
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Request Booking</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
