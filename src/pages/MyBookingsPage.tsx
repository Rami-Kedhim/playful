
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User,
  MessageSquare,
  X,
  CheckCheck,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { format, isPast } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Booking {
  id: string;
  escort_id: string;
  client_id: string;
  start_time: string;
  end_time: string;
  service_type: string;
  status: string;
  price: number;
  location: any;
  notes?: string;
  escort?: {
    name: string;
    imageUrl?: string;
    avatar_url?: string;
    profileImage?: string;
  };
  created_at: string;
}

const MyBookingsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            escort:escort_id (
              name,
              imageUrl,
              avatar_url,
              profileImage
            )
          `)
          .eq('client_id', user.id)
          .order('start_time', { ascending: false });

        if (error) throw error;
        setBookings(data || []);
      } catch (error: any) {
        console.error('Error fetching bookings:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your bookings. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, navigate]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-700 border-amber-500 hover:bg-amber-500/20">Pending</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500 hover:bg-green-500/20">Confirmed</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-700 border-blue-500 hover:bg-blue-500/20">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-500/10 text-red-700 border-red-500 hover:bg-red-500/20">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!user) return;

    setCancelling(bookingId);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({
          status: 'cancelled',
          cancelled_by: user.id,
          cancellation_reason: 'User cancelled the booking',
        })
        .eq('id', bookingId)
        .eq('client_id', user.id); // Ensure only the client can cancel their own bookings

      if (error) throw error;

      // Update local state
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' } 
          : booking
      ));

      toast({
        title: 'Booking cancelled',
        description: 'Your booking has been cancelled successfully.',
      });
    } catch (error: any) {
      console.error('Error cancelling booking:', error);
      toast({
        title: 'Error',
        description: 'Failed to cancel your booking. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setCancelling(null);
    }
  };

  const formatBookingInfo = (booking: Booking) => {
    const startTime = new Date(booking.start_time);
    const endTime = new Date(booking.end_time);
    const isPastBooking = isPast(endTime);

    return (
      <Card key={booking.id} className={`mb-4 ${isPastBooking ? 'opacity-75' : ''}`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage 
                  src={booking.escort?.imageUrl || booking.escort?.avatar_url || booking.escort?.profileImage} 
                  alt={booking.escort?.name || 'Escort'} 
                />
                <AvatarFallback>{booking.escort?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">{booking.escort?.name || 'Booking'}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {format(startTime, 'PPP')}
                </CardDescription>
              </div>
            </div>
            {getStatusBadge(booking.status)}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{format(startTime, 'p')} - {format(endTime, 'p')}</span>
              </div>
              <span className="font-medium">${booking.price}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{booking.location?.address || 'To be confirmed'}</span>
            </div>
            
            {booking.service_type && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Service: {booking.service_type.replace(/_/g, ' ')}</span>
              </div>
            )}
            
            {booking.notes && (
              <div className="mt-2 pt-2 border-t text-muted-foreground">
                <p className="text-xs italic">{booking.notes}</p>
              </div>
            )}
            
            <div className="pt-3 flex justify-between gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                disabled={booking.status !== 'confirmed' || isPastBooking}
                onClick={() => navigate(`/messages/${booking.escort_id}`)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
              
              {booking.status === 'pending' && !isPastBooking && (
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleCancelBooking(booking.id)}
                  disabled={cancelling === booking.id}
                >
                  {cancelling === booking.id ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <X className="h-4 w-4 mr-2" />
                  )}
                  Cancel
                </Button>
              )}
              
              {booking.status === 'confirmed' && !isPastBooking && (
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleCancelBooking(booking.id)}
                  disabled={cancelling === booking.id}
                >
                  {cancelling === booking.id ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <X className="h-4 w-4 mr-2" />
                  )}
                  Cancel
                </Button>
              )}
              
              {booking.status === 'completed' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => navigate(`/escorts/${booking.escort_id}/review`)}
                >
                  <CheckCheck className="h-4 w-4 mr-2" />
                  Leave Review
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const upcomingBookings = bookings.filter(booking => 
    !isPast(new Date(booking.end_time)) && booking.status !== 'cancelled'
  );
  
  const pastBookings = bookings.filter(booking => 
    isPast(new Date(booking.end_time)) || booking.status === 'cancelled'
  );

  if (!user) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-8">
          <p className="text-center">Please log in to view your bookings.</p>
          <div className="flex justify-center mt-4">
            <Button onClick={() => navigate("/auth")}>Go to Login</Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : bookings.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No bookings found</h3>
                <p className="text-muted-foreground mb-6">You haven't made any bookings yet.</p>
                <Button onClick={() => navigate('/escorts')}>Browse Escorts</Button>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-6">
                <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
                <TabsTrigger value="past">Past & Cancelled ({pastBookings.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                <div className="space-y-4">
                  {upcomingBookings.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">No upcoming bookings</p>
                      <Button onClick={() => navigate('/escorts')}>Browse Escorts</Button>
                    </div>
                  ) : (
                    upcomingBookings.map(formatBookingInfo)
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="past">
                <div className="space-y-4">
                  {pastBookings.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No past bookings</p>
                    </div>
                  ) : (
                    pastBookings.map(formatBookingInfo)
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default MyBookingsPage;
