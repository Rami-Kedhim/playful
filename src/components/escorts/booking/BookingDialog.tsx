import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Escort } from '@/types/escort';
import { cn } from '@/lib/utils';
import { BookingFormData } from './types';

interface BookingDialogProps {
  escort: Escort;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BookingFormData) => void;
}

const BookingDialog: React.FC<BookingDialogProps> = ({ 
  escort, 
  isOpen, 
  onClose 
}) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>('');
  const [duration, setDuration] = useState<string>('1 hour');
  
  // Define service type availability with safe defaults
  const hasInPersonServices = escort.providesInPersonServices ?? true;
  const hasVirtualServices = escort.providesVirtualContent ?? false;
  
  // Default availability options based on escort type
  const getServiceOptions = () => {
    // Safely access these properties with fallbacks
    if (hasInPersonServices && hasVirtualServices) {
      return ['In-person', 'Virtual'];
    } else if (hasInPersonServices) {
      return ['In-person'];
    } else if (hasVirtualServices) {
      return ['Virtual'];
    }
    
    // Default fallback
    return ['In-person'];
  };
  
  const [serviceType, setServiceType] = useState(getServiceOptions()[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;
    
    const bookingData: BookingFormData = {
      date,
      time,
      duration,
      name,
      email,
      phone,
      message
    };
    
    onSubmit(bookingData);
  };
  
  const timeOptions = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM',
    '9:00 PM', '10:00 PM', '11:00 PM'
  ];
  
  const durationOptions = [
    '1 hour', '2 hours', '3 hours', 'Overnight'
  ];
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book an Appointment with {escort.name}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label className="font-medium">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Select a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="font-medium">Time</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !time && "text-muted-foreground"
                      )}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {time ? time : <span>Select time</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <div className="p-2 grid grid-cols-3 gap-2 max-h-[300px] overflow-auto">
                      {timeOptions.map((timeOption) => (
                        <Button
                          key={timeOption}
                          variant="outline"
                          className={cn(time === timeOption && "bg-primary text-primary-foreground")}
                          onClick={() => {
                            setTime(timeOption);
                            document.body.click(); // Close popover
                          }}
                        >
                          {timeOption}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid gap-2">
                <label className="font-medium">Duration</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {duration}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <div className="p-2 grid gap-2">
                      {durationOptions.map((durationOption) => (
                        <Button
                          key={durationOption}
                          variant="ghost"
                          className={cn(duration === durationOption && "bg-primary text-primary-foreground")}
                          onClick={() => {
                            setDuration(durationOption);
                            document.body.click(); // Close popover
                          }}
                        >
                          {durationOption}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            {getServiceOptions().length > 1 && (
              <div className="grid gap-2">
                <label className="font-medium">Service Type</label>
                <div className="flex gap-2">
                  {getServiceOptions().map((option) => (
                    <Button
                      key={option}
                      type="button"
                      variant={serviceType === option ? "default" : "outline"}
                      onClick={() => setServiceType(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="grid gap-2">
              <label className="font-medium">Your Name</label>
              <Input 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <label className="font-medium">Email</label>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <label className="font-medium">Phone Number</label>
              <Input 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <label className="font-medium">Message (Optional)</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Any special requests or notes?"
                rows={3}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Continue
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
