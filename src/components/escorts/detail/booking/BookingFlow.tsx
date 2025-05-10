import React, { useState } from 'react';
import { convertEscortType, ensureEscortTypeCompatibility } from '@/utils/typeConverters';
import BookingCalendar from './BookingCalendar';
import BookingTimeSlots from './BookingTimeSlots';
import BookingDuration from './BookingDuration';
import BookingContactInfo from './BookingContactInfo';
import BookingMessage from './BookingMessage';
import BookingConfirmation from './BookingConfirmation';
import { BookingFormData } from './types';
import { Escort } from '@/types/Escort';

interface BookingFlowProps {
  escort: Escort;
  onComplete: (data: BookingFormData) => void;
  onCancel: () => void;
}

const BookingFlow: React.FC<BookingFlowProps> = ({ 
  escort, 
  onComplete, 
  onCancel 
}) => {
  // Convert escort type to ensure compatibility
  const compatibleEscort = ensureEscortTypeCompatibility(escort);
  
  const [formData, setFormData] = useState<BookingFormData>({
    date: null,
    time: '',
    duration: '60',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prevData => ({
      ...prevData,
      date: date
    }));
  };

  const handleSubmit = () => {
    onComplete(formData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <BookingCalendar
            form={{
              control: {
                register: () => ({}),
                setValue: (name: string, value: any) => {
                  setFormData(prevData => ({ ...prevData, [name]: value }));
                },
                getValues: () => formData,
              },
              watch: () => formData.date,
              formState: { errors: {} },
            }}
          />
        );
      case 2:
        return (
          <BookingTimeSlots
            form={{
              control: {
                register: () => ({}),
                setValue: (name: string, value: any) => {
                  setFormData(prevData => ({ ...prevData, [name]: value }));
                },
                getValues: () => formData,
              },
              watch: () => formData.time,
              formState: { errors: {} },
            }}
          />
        );
      case 3:
        return (
          <BookingDuration
            form={{
              control: {
                register: () => ({}),
                setValue: (name: string, value: any) => {
                  setFormData(prevData => ({ ...prevData, [name]: value }));
                },
                getValues: () => formData,
              },
              watch: () => formData.duration,
              formState: { errors: {} },
            }}
          />
        );
      case 4:
        return (
          <BookingContactInfo
            form={{
              control: {
                register: () => ({}),
                setValue: (name: string, value: any) => {
                  setFormData(prevData => ({ ...prevData, [name]: value }));
                },
                getValues: () => formData,
              },
              watch: (name: string) => formData[name],
              formState: { errors: {} },
            }}
          />
        );
      case 5:
        return (
          <BookingMessage
            form={{
              control: {
                register: () => ({}),
                setValue: (name: string, value: any) => {
                  setFormData(prevData => ({ ...prevData, [name]: value }));
                },
                getValues: () => formData,
              },
              watch: () => formData.message,
              formState: { errors: {} },
            }}
          />
        );
      case 6:
        return (
          <BookingConfirmation
            formData={formData}
            escort={compatibleEscort}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {renderStep()}
      <div className="flex justify-between">
        {step > 1 && (
          <button onClick={prevStep} className="px-4 py-2 bg-gray-200 text-gray-700 rounded">
            Previous
          </button>
        )}
        {step < 6 ? (
          <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded">
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded">
            Confirm Booking
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingFlow;
