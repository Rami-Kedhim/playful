
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, format, setHours, setMinutes } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, Clock } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { OxumRuleInfo } from '@/components/oxum';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { Escort } from '@/types/escort';
import { bookingFormSchema, BookingFormValues } from './types';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface BookingFormProps {
  escort: Escort;
  onBookingComplete?: () => void;
}

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00',
];

const durationOptions = [
  { value: '1', label: '1 hour' },
  { value: '2', label: '2 hours' },
  { value: '3', label: '3 hours' },
  { value: '4', label: '4 hours' },
  { value: 'dinner', label: 'Dinner Date (4+ hours)' },
  { value: 'overnight', label: 'Overnight' },
];

const BookingForm: React.FC<BookingFormProps> = ({ escort, onBookingComplete }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      date: new Date(),
      time: '19:00',
      duration: '2',
      name: user?.user_metadata?.full_name || '',
      email: user?.email || '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: BookingFormValues) => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "Please log in to make a booking",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Calculate start and end times
      const [hours, minutes] = data.time.split(':').map(Number);
      const startTime = setMinutes(setHours(data.date, hours), minutes);
      
      let endTime = new Date(startTime);
      if (data.duration === 'overnight') {
        endTime = addDays(startTime, 1);
        endTime.setHours(12, 0, 0, 0); // Overnight ends at noon next day
      } else if (data.duration === 'dinner') {
        endTime.setTime(startTime.getTime() + 5 * 60 * 60 * 1000); // 5 hours
      } else {
        endTime.setTime(startTime.getTime() + parseInt(data.duration) * 60 * 60 * 1000);
      }
      
      let price = 0;
      if (escort.rates) {
        price = escort.rates[data.duration === 'dinner' ? 'dinner' : 
                            data.duration === 'overnight' ? 'overnight' : 'hourly'] || 
               (escort.rates.hourly * (data.duration === 'dinner' ? 5 : data.duration === 'overnight' ? 10 : parseInt(data.duration)));
      } else if (escort.price) {
        price = escort.price * (data.duration === 'dinner' ? 5 : data.duration === 'overnight' ? 10 : parseInt(data.duration));
      }
      
      // Create booking
      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          escort_id: escort.id,
          client_id: user.id,
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          service_type: data.duration === 'overnight' ? 'overnight' : 
                        data.duration === 'dinner' ? 'dinner_date' : 'standard',
          status: 'pending',
          price: price,
          booking_type: 'in_person',
          notes: data.message,
          special_requests: data.message,
        })
        .select()
        .single();
        
      if (bookingError) throw bookingError;
      
      // Create notification for the escort
      const { error: notifError } = await supabase
        .from('notifications')
        .insert({
          type: 'booking_request',
          title: 'New Booking Request',
          message: `New booking from ${data.name} on ${format(startTime, 'PPP')} at ${format(startTime, 'p')}`,
          receiver_id: escort.id, // Assuming escort.id maps to a user_id
          priority: 'high',
          action_text: 'View Booking',
          action_url: `/bookings/${bookingData.id}`,
        });
        
      if (notifError) console.error('Error creating notification:', notifError);
      
      toast({
        title: "Booking Requested",
        description: "Your booking request has been sent. You'll be notified once it's confirmed.",
      });
      
      if (onBookingComplete) {
        onBookingComplete();
      }
    } catch (error: any) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: error.message || "There was an error processing your booking request.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Book Appointment</CardTitle>
        <CardDescription>
          Request a booking with {escort.name}. Payment will be processed after confirmation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Date Selector */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date > addDays(new Date(), 30)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Time Selector */}
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            <div className="flex items-center gap-2">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{time}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Duration */}
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {durationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                          {option.value !== 'dinner' && option.value !== 'overnight' && (
                            <span className="text-muted-foreground ml-2">
                              (${escort.rates?.hourly ? escort.rates.hourly * parseInt(option.value) : escort.price ? escort.price * parseInt(option.value) : 'Custom rate'})
                            </span>
                          )}
                          {option.value === 'dinner' && (
                            <span className="text-muted-foreground ml-2">
                              (${escort.rates?.dinner || (escort.rates?.hourly ? escort.rates.hourly * 5 : escort.price ? escort.price * 5 : 'Custom rate')})
                            </span>
                          )}
                          {option.value === 'overnight' && (
                            <span className="text-muted-foreground ml-2">
                              (${escort.rates?.overnight || (escort.rates?.hourly ? escort.rates.hourly * 10 : escort.price ? escort.price * 10 : 'Custom rate')})
                            </span>
                          )}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the duration for your booking
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any special requests or information you'd like to share"
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Share any details that might be helpful for your appointment
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <OxumRuleInfo className="mt-6" />
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : "Request Booking"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col text-xs text-muted-foreground">
        <p>
          By requesting a booking, you agree to our terms of service and privacy policy.
        </p>
      </CardFooter>
    </Card>
  );
};

export default BookingForm;
