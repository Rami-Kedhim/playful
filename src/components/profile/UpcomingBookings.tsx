
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  Check, 
  X, 
  Clock2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Booking, BookingStatus } from '@/types/booking';

interface UpcomingBookingsProps {
  bookings: Booking[];
  isLoading?: boolean;
  onCancelBooking?: (bookingId: string) => void;
  onAcceptBooking?: (bookingId: string) => void;
  onRejectBooking?: (bookingId: string) => void;
  type?: 'client' | 'escort';
}

const UpcomingBookings: React.FC<UpcomingBookingsProps> = ({
  bookings,
  isLoading = false,
  onCancelBooking,
  onAcceptBooking,
  onRejectBooking,
  type = 'client'
}) => {
  // Helper to format date and time
  const formatDateTime = (date: string | Date, time: string) => {
    const dateOnly = typeof date === 'string' ? parseISO(date) : date;
    return `${format(dateOnly, 'MMM d, yyyy')} at ${time}`;
  };
  
  // Get booking status badge
  const getStatusBadge = (status: BookingStatus) => {
    switch(status) {
      case BookingStatus.PENDING:
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case BookingStatus.CONFIRMED:
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Confirmed</Badge>;
      case BookingStatus.COMPLETED:
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Completed</Badge>;
      case BookingStatus.CANCELLED:
        return <Badge variant="outline" className="bg-gray-100 text-gray-500">Cancelled</Badge>;
      case BookingStatus.REJECTED:
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Sort bookings by date/time
  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = typeof a.date === 'string' ? new Date(a.date).getTime() : a.date.getTime();
    const dateB = typeof b.date === 'string' ? new Date(b.date).getTime() : b.date.getTime();
    return dateA - dateB;
  });
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="p-4 border rounded-lg animate-pulse">
                <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Format the date to get year, month and day
  const formatDateComponents = (date: string | Date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return {
      year: dateObj.getFullYear().toString(),
      month: (dateObj.getMonth() + 1).toString().padStart(2, '0'),
      day: dateObj.getDate().toString().padStart(2, '0')
    };
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedBookings.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>No upcoming bookings</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedBookings.map((booking) => {
              const dateTime = formatDateTime(booking.date, booking.time);
              
              return (
                <div key={booking.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{type === 'client' ? booking.escortName : 'Client'}</span>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{dateTime}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock2 className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{booking.duration} {parseInt(booking.duration) === 1 ? 'hour' : 'hours'}</span>
                    </div>
                    
                    {booking.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{booking.location}</span>
                      </div>
                    )}
                  </div>
                  
                  {booking.status === BookingStatus.PENDING && (
                    <div className="flex gap-2 justify-end">
                      {type === 'escort' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => onRejectBooking && onRejectBooking(booking.id)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => onAcceptBooking && onAcceptBooking(booking.id)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                        </>
                      )}
                      
                      {type === 'client' && (
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => onCancelBooking && onCancelBooking(booking.id)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      )}
                    </div>
                  )}
                  
                  {booking.status === BookingStatus.CONFIRMED && type === 'client' && (
                    <div className="flex gap-2 justify-end">
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => onCancelBooking && onCancelBooking(booking.id)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingBookings;
