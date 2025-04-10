
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, MapPin, User, X } from 'lucide-react';

export interface Booking {
  id: string;
  escortId: string;
  escortName: string;
  location: string;
  date: string | Date;
  time: string;
  duration: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  price: number;
}

interface UpcomingBookingsProps {
  bookings: Booking[];
  onCancelBooking?: (bookingId: string) => void;
}

const UpcomingBookings: React.FC<UpcomingBookingsProps> = ({ 
  bookings,
  onCancelBooking 
}) => {
  const statusColors = {
    confirmed: "bg-green-500",
    pending: "bg-amber-500",
    cancelled: "bg-red-500"
  };
  
  const durationLabels: Record<string, string> = {
    "1hour": "1 Hour",
    "2hours": "2 Hours",
    "3hours": "3 Hours",
    "overnight": "Overnight (8 Hours)"
  };

  if (bookings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
          <CardDescription>You have no upcoming bookings</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8 text-muted-foreground">
          <div className="text-center">
            <CalendarDays className="mx-auto h-10 w-10 opacity-50 mb-2" />
            <p>No bookings scheduled</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Bookings</CardTitle>
        <CardDescription>Your scheduled appointments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {bookings.map((booking) => (
          <div 
            key={booking.id} 
            className="border rounded-lg p-4 flex flex-col md:flex-row justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{booking.escortName}</h3>
                <Badge 
                  variant="outline" 
                  className={`${statusColors[booking.status]} text-white border-none`}
                >
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  <span>
                    {typeof booking.date === 'string' 
                      ? booking.date 
                      : formatDate(booking.date)
                    }
                  </span>
                </div>
                
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{booking.time} ({durationLabels[booking.duration] || booking.duration})</span>
                </div>
                
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{booking.location}</span>
                </div>
                
                <div className="flex items-center text-muted-foreground">
                  <User className="h-4 w-4 mr-2" />
                  <span>Booking ID: {booking.id.substring(0, 8)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 self-end md:self-center">
              <span className="font-semibold">${booking.price}</span>
              {booking.status !== 'cancelled' && onCancelBooking && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                  onClick={() => onCancelBooking(booking.id)}
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UpcomingBookings;
