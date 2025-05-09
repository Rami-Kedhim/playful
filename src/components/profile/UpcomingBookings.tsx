
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/formatters';

interface Booking {
  id: string;
  escortId: string;
  escortName?: string;
  date: Date | string;
  time: string;
  status: string;
  location?: string;
}

interface UpcomingBookingsProps {
  bookings: Booking[];
  isLoading?: boolean;
}

const UpcomingBookings: React.FC<UpcomingBookingsProps> = ({ bookings, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between border-b pb-2">
                <div className="w-full animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!bookings || bookings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-6">
            You have no upcoming appointments
          </p>
        </CardContent>
      </Card>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <Badge variant="success">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map(booking => (
            <div key={booking.id} className="flex flex-col space-y-2 pb-4 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{booking.escortName || 'Unnamed Escort'}</h4>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(booking.date, { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })} at {booking.time}
                  </p>
                </div>
                {getStatusBadge(booking.status)}
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">View Details</Button>
                <Button variant="ghost" size="sm">Reschedule</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingBookings;
