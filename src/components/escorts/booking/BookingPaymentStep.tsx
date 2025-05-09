
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, DollarSign, MapPin, User } from "lucide-react";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Escort } from "@/types/escort";
import { Booking } from "@/types/booking";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

interface BookingPaymentStepProps {
  escort: Escort;
  booking: Partial<Booking>;
  onBack: () => void;
  onComplete: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const BookingPaymentStep: React.FC<BookingPaymentStepProps> = ({
  escort,
  booking,
  onBack,
  onComplete,
  onCancel,
  isSubmitting = false
}) => {
  // Ensure height is properly handled as string
  const normalizedEscort = React.useMemo(() => {
    if (escort.height !== undefined && typeof escort.height !== 'string') {
      return {
        ...escort,
        height: String(escort.height)
      };
    }
    return escort;
  }, [escort]);

  // Calculate price based on duration
  const calculatePrice = (): number => {
    const rates = normalizedEscort.rates || {};
    const duration = booking.duration;
    
    if (!duration) return normalizedEscort.price || 0;

    // Convert string durations to numbers for comparison
    if (duration === "30") return rates.hourly ? rates.hourly / 2 : normalizedEscort.price / 2;
    if (duration === "60") return rates.hourly || normalizedEscort.price;
    if (duration === "90") return rates.hourly ? rates.hourly * 1.5 : normalizedEscort.price * 1.5;
    if (duration === "120") return rates.twoHours || (rates.hourly ? rates.hourly * 2 : normalizedEscort.price * 2);
    if (duration === "180") return rates.hourly ? rates.hourly * 3 : normalizedEscort.price * 3;
    if (duration === "240") return rates.hourly ? rates.hourly * 4 : normalizedEscort.price * 4;
    if (duration === "overnight") return rates.overnight || (rates.hourly ? rates.hourly * 8 : normalizedEscort.price * 8);
    
    return normalizedEscort.price;
  };

  const price = calculatePrice();

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Booking Summary</CardTitle>
          <CardDescription>Please review your booking details</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-14 w-14">
              <AvatarImage 
                src={normalizedEscort.profileImage || normalizedEscort.imageUrl || normalizedEscort.avatar || ""} 
                alt={normalizedEscort.name} 
              />
              <AvatarFallback>{normalizedEscort.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            
            <div>
              <h3 className="font-semibold">{normalizedEscort.name}</h3>
              <div className="text-sm text-muted-foreground">
                {normalizedEscort.location}
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>
                {booking.date instanceof Date ? 
                  format(booking.date, "PPP") : 
                  (booking.date ? format(new Date(booking.date), "PPP") : "Date not set")}
              </span>
            </div>

            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{booking.time || "Time not set"}</span>
            </div>

            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>
                {booking.duration === "overnight" ? 
                  "Overnight" : 
                  `${booking.duration} minutes`}
              </span>
            </div>

            {booking.location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{booking.location}</span>
              </div>
            )}
          </div>

          <Separator className="my-4" />

          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base Price:</span>
              <span>${price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service Fee:</span>
              <span>${(price * 0.05).toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>${(price * 1.05).toFixed(2)}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col space-y-4">
          <Alert>
            <AlertDescription>
              A 20% deposit of ${(price * 0.2).toFixed(2)} will be charged now to secure your booking.
              The remaining balance will be paid directly to the escort.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-2 gap-2 w-full">
            <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
              Back
            </Button>
            <Button onClick={onComplete} disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Pay Deposit"}
            </Button>
          </div>

          <div className="w-full text-center">
            <Badge variant="outline" className="rounded-md">
              <User className="h-3 w-3 mr-1" /> 
              Your identity is verified and secure
            </Badge>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookingPaymentStep;
