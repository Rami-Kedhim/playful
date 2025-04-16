
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Escort, Booking } from '@/types/escort';
import { format, addHours } from 'date-fns';

interface BookingDialogProps {
  escort: Escort;
  onSubmit: (bookingDetails: Partial<Booking>) => Promise<void>;
  onCancel: () => void;
}

const BookingDialog: React.FC<BookingDialogProps> = ({ escort, onSubmit, onCancel }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('1');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !startTime) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create booking datetime strings
      const startDateTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        parseInt(startTime.split(':')[0]),
        parseInt(startTime.split(':')[1])
      );
      
      const endDateTime = addHours(startDateTime, parseInt(duration));
      
      await onSubmit({
        startTime: startDateTime,
        endTime: endDateTime,
        notes,
        price: (escort.price || 100) * parseInt(duration),
        serviceType: 'in-person',
      });
    } catch (error) {
      console.error('Booking submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book Time with {escort.name}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="date">Select Date</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              disabled={(date) => date < new Date()}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="time">Start Time</Label>
              <Input
                id="time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label>Duration</Label>
              <RadioGroup value={duration} onValueChange={setDuration} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="1h" />
                  <Label htmlFor="1h">1h</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="2h" />
                  <Label htmlFor="2h">2h</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="3h" />
                  <Label htmlFor="3h">3h</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Special Requests (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any special requests or notes?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!selectedDate || !startTime || isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Continue"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
