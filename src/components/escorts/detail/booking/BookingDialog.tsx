
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Escort } from '@/types/Escort';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, CreditCard, Users, MessageSquare } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
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
  onClose,
  onSubmit
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<BookingFormData>({
    date: new Date(),
    time: '',
    duration: '1hr',
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const handleChange = (field: keyof BookingFormData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', 
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
    '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',
  ];

  const durations = [
    { value: '30min', label: '30 Minutes' },
    { value: '1hr', label: '1 Hour' },
    { value: '2hrs', label: '2 Hours' },
    { value: '3hrs', label: '3 Hours' },
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Select Date</h3>
              <CalendarComponent
                mode="single"
                selected={formData.date}
                onSelect={(date) => handleChange('date', date)}
                className="rounded-md border"
                disabled={(date) => date < new Date()}
              />
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Select Time</h3>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={formData.time === time ? 'default' : 'outline'}
                    onClick={() => handleChange('time', time)}
                    className="text-sm"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Duration</h3>
              <div className="grid grid-cols-2 gap-2">
                {durations.map((duration) => (
                  <Button
                    key={duration.value}
                    variant={formData.duration === duration.value ? 'default' : 'outline'}
                    onClick={() => handleChange('duration', duration.value)}
                  >
                    {duration.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Your email"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Your phone number"
              />
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">Message (Optional)</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 h-32 resize-none"
                placeholder="Any special requests or information..."
              />
            </div>
            
            <div className="border rounded-md p-4 space-y-2">
              <h4 className="font-medium">Booking Summary</h4>
              <div className="grid grid-cols-2 text-sm gap-y-1">
                <div className="text-muted-foreground">Date:</div>
                <div>{formData.date.toDateString()}</div>
                <div className="text-muted-foreground">Time:</div>
                <div>{formData.time}</div>
                <div className="text-muted-foreground">Duration:</div>
                <div>{formData.duration}</div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book {escort.name}</DialogTitle>
        </DialogHeader>
        
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <Calendar className="h-4 w-4" />
            </div>
            <div className={`h-px w-4 ${step > 1 ? 'bg-primary' : 'bg-muted'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <Users className="h-4 w-4" />
            </div>
            <div className={`h-px w-4 ${step > 2 ? 'bg-primary' : 'bg-muted'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <MessageSquare className="h-4 w-4" />
            </div>
          </div>
        </div>

        {renderStep()}
        
        <div className="flex justify-between mt-4">
          <Button 
            variant="outline" 
            onClick={step === 1 ? onClose : handlePrev}
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>
          <Button onClick={handleNext}>
            {step < 3 ? 'Next' : 'Submit Booking'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
