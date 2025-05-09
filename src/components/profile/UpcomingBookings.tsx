
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Booking } from '@/types/booking';
import { formatDate } from '@/lib/utils';

interface UpcomingBookingsProps {
  bookings: Booking[];
  isLoading?: boolean; // Add the missing property
  title?: string;
  emptyMessage?: string;
  maxItems?: number;
}

const UpcomingBookings: React.FC<UpcomingBookingsProps> = ({
  bookings,
  isLoading = false,
  title = "Upcoming Bookings",
  emptyMessage = "No upcoming bookings",
  maxItems = 5
}) => {
  const displayBookings = bookings.slice(0, maxItems);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center p-4">
            <div className="animate-pulse">Loading bookings...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {displayBookings.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">{emptyMessage}</p>
        ) : (
          <div className="space-y-4">
            {displayBookings.map((booking) => (
              <div key={booking.id} className="flex justify-between items-center border-b pb-4">
                <div>
                  <p className="font-medium">{booking.escortName || 'Unnamed Escort'}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(booking.date, { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-xs">{booking.duration} hrs</p>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                  <p className="text-sm mt-1">${booking.price || booking.totalPrice || 0}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingBookings;
