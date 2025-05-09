
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, DollarSign, MapPin } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import { formatDate } from '@/utils/formatters';
import { formatDateTime } from '@/utils/formatters';
import { Escort } from '@/types/escort';
import { Booking } from './types';

interface BookingPaymentStepProps {
  escort: Escort;
  booking: Partial<Booking>;
  onBack: () => void;
  onComplete: () => void;
  isSubmitting?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const BookingPaymentStep: React.FC<BookingPaymentStepProps> = ({
  escort,
  booking,
  onBack,
  onComplete,
  isSubmitting = false,
  onConfirm,
  onCancel,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  
  // Helper to calculate price based on duration
  const calculatePrice = (durationString: string | undefined): number => {
    if (!durationString) return 0;
    
    const price = escort.price || 0;
    
    // Convert both to strings to compare
    const duration = String(durationString);
    
    if (duration === "1_hour") {
      return price;
    } else if (duration === "2_hours") {
      return price * 1.8;
    } else if (duration === "3_hours") {
      return price * 2.5;
    } else if (duration === "overnight") {
      return price * 5;
    }
    
    return price;
  };
  
  const basePrice = calculatePrice(booking.duration);
  const serviceFee = basePrice * 0.1;
  const totalPrice = basePrice + serviceFee;
  
  // Normalize escort height if it's a number
  const normalizedEscort = {
    ...escort,
    height: escort.height !== undefined ? String(escort.height) : undefined
  };
  
  return (
    <div className="max-w-3xl mx-auto bg-background rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">Review & Payment</h2>
        <p className="text-muted-foreground">Complete your booking with {escort.name}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={escort.profileImage || escort.imageUrl || "/placeholder-avatar.jpg"} />
                  <AvatarFallback>{escort.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{escort.name}, {escort.age}</h3>
                  <div className="text-sm text-muted-foreground">{escort.location}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Date & Time</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.date && formatDate(new Date(booking.date))}
                    </p>
                    <p className="text-sm text-muted-foreground">{booking.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-sm text-muted-foreground">
                      {booking.duration === "1_hour" ? "1 Hour" : 
                       booking.duration === "2_hours" ? "2 Hours" :
                       booking.duration === "3_hours" ? "3 Hours" :
                       booking.duration === "overnight" ? "Overnight" : 
                       booking.duration}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{escort.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <DollarSign className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Rate</p>
                    <p className="text-sm text-muted-foreground">{formatCurrency(escort.price)}/hr</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="h-4 w-4 text-primary border-gray-300"
                  />
                  <label htmlFor="card">Credit/Debit Card</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    checked={paymentMethod === "paypal"}
                    onChange={() => setPaymentMethod("paypal")}
                    className="h-4 w-4 text-primary border-gray-300"
                  />
                  <label htmlFor="paypal">PayPal</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="crypto"
                    name="paymentMethod"
                    checked={paymentMethod === "crypto"}
                    onChange={() => setPaymentMethod("crypto")}
                    className="h-4 w-4 text-primary border-gray-300"
                  />
                  <label htmlFor="crypto">Cryptocurrency</label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Base Price</span>
                  <span>{formatCurrency(basePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>{formatCurrency(serviceFee)}</span>
                </div>
                <div className="border-t my-2"></div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button 
                onClick={onConfirm} 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Confirm & Pay"}
              </Button>
              <Button 
                variant="outline" 
                onClick={onCancel} 
                className="w-full"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingPaymentStep;
