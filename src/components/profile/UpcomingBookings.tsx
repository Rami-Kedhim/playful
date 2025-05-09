
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Booking } from '@/types/booking';
import { formatDate } from '@/lib/utils';
import { Calendar, Clock, MapPin, DollarSign } from 'lucide-react';

interface UpcomingBookingsProps {
  bookings: Booking[];
  loading?: boolean;
  onViewBooking?: (booking: Booking) => void;
  onCancelBooking?: (booking: Booking) => void;
}

const UpcomingBookings: React.FC<UpcomingBookingsProps> = ({
  bookings = [],
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-1"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">You have no upcoming bookings.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="border rounded-md p-4">
              <h3 className="font-medium">{booking.escortName}</h3>
              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> 
                  <span>{formatDate(booking.date, 'PPP')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" /> 
                  <span>{booking.time} ({booking.duration})</span>
                </div>
                {booking.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> 
                    <span>{booking.location}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingBookings;
