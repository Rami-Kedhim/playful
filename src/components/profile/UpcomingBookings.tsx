
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { formatDate } from "@/utils/formatters";
import { Booking } from "@/components/escorts/booking/types";

interface UpcomingBookingsProps {
  bookings: Booking[];
  isLoading?: boolean;
  onViewBooking?: (booking: Booking) => void;
}

const UpcomingBookings: React.FC<UpcomingBookingsProps> = ({
  bookings = [],
  isLoading = false,
  onViewBooking
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2].map(i => (
              <div key={i} className="p-4 border rounded-md animate-pulse">
                <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/4"></div>
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
          <p className="text-muted-foreground text-sm">You have no upcoming bookings.</p>
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
        <div className="space-y-3">
          {bookings.map(booking => (
            <div 
              key={booking.id} 
              className="p-4 border rounded-md hover:bg-accent/5 transition-colors cursor-pointer"
              onClick={() => onViewBooking && onViewBooking(booking)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{booking.escortName || "Unnamed Escort"}</h3>
                  <div className="flex items-center mt-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(booking.date, { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                    <Clock className="h-3 w-3 ml-3 mr-1" />
                    {booking.time}, {booking.duration}
                  </div>
                </div>
                <Badge variant={getStatusVariant(booking.status)}>
                  {booking.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'success';
    case 'pending':
      return 'outline';
    case 'rejected':
    case 'cancelled':
      return 'destructive';
    default:
      return 'secondary';
  }
};

export default UpcomingBookings;
