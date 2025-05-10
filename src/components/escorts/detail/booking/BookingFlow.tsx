
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { BookingFormValues } from '../../booking/types';
import { Escort } from '@/types/Escort';
import BookingConfirmation from './BookingConfirmation';

interface BookingFlowProps {
  escort: Escort;
}

const BookingFlow: React.FC<BookingFlowProps> = ({ escort }) => {
  const [step, setStep] = useState<'details' | 'confirmation'>('details');
  const [formData, setFormData] = useState<BookingFormValues>({
    date: undefined,
    time: '',
    duration: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const { register, handleSubmit, formState } = useForm<BookingFormValues>();
  
  const onSubmit: SubmitHandler<BookingFormValues> = (data) => {
    setFormData(data);
    setStep('confirmation');
  };
  
  const handleBack = () => {
    setStep('details');
  };

  if (step === 'confirmation') {
    return (
      <BookingConfirmation 
        escort={escort} 
        formData={formData}
        onClose={handleBack}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <div className="border rounded-md p-2">
          <Calendar
            mode="single"
            selected={formData.date}
            onSelect={(date) => setFormData({...formData, date: date || undefined})}
            className="rounded-md border"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="time">Time</Label>
        <Input
          id="time"
          type="time"
          {...register('time')}
          defaultValue={formData.time}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="duration">Duration</Label>
        <select
          id="duration"
          {...register('duration')}
          defaultValue={formData.duration}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select duration</option>
          <option value="1 hour">1 hour</option>
          <option value="2 hours">2 hours</option>
          <option value="4 hours">4 hours</option>
          <option value="Overnight">Overnight</option>
        </select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="name">Your Name</Label>
        <Input
          id="name"
          type="text"
          {...register('name')}
          defaultValue={formData.name}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          defaultValue={formData.email}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          {...register('phone')}
          defaultValue={formData.phone}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea
          id="message"
          {...register('message')}
          defaultValue={formData.message || ''}
        />
      </div>
      
      <div className="pt-4">
        <Button type="submit" className="w-full">
          Continue to Review
        </Button>
      </div>
    </form>
  );
};

export default BookingFlow;
