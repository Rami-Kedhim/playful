
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock } from 'lucide-react';
import { Escort } from '@/types/escort';
import BookingDialog from '../../booking/BookingDialog';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import ServiceTypeBadgeLabel from '../../filters/ServiceTypeBadgeLabel';

interface BookingRequestCardProps {
  escort: Escort;
}

const BookingRequestCard: React.FC<BookingRequestCardProps> = ({ escort }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Format availability for display
  const formatAvailability = () => {
    if (!escort.availability) return "Contact for availability";
    
    const availabilityArray = Array.isArray(escort.availability) 
      ? escort.availability 
      : [escort.availability];
      
    return availabilityArray.join(", ");
  };
  
  // Determine service type
  const getServiceType = () => {
    if (escort.providesInPersonServices && escort.providesVirtualContent) {
      return "both";
    } else if (escort.providesInPersonServices) {
      return "in-person";
    } else if (escort.providesVirtualContent) {
      return "virtual";
    }
    return "";
  };
  
  const serviceType = getServiceType();
  
  const handleBookNowClick = () => {
    if (!isAuthenticated) {
      navigate('/auth', { state: { from: `/escorts/${escort.id}`, action: 'booking' } });
      return;
    }
    
    setIsDialogOpen(true);
  };

  const handleSubmit = async (bookingDetails: any) => {
    console.log("Booking details submitted:", bookingDetails);
    setIsDialogOpen(false);
  };
  
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Book an Appointment</CardTitle>
            {serviceType && <ServiceTypeBadgeLabel type={serviceType} />}
          </div>
          <CardDescription>Schedule time with {escort.name}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Availability</span>
            </div>
            <span className="text-sm">{formatAvailability()}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Response Time</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {escort.responseRate ? `${escort.responseRate}%` : "Within 1 hour"}
            </Badge>
          </div>
          
          {escort.price && (
            <div className="mt-4 pt-4 border-t flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Starting at</span>
              <div className="text-xl font-bold">${escort.price}/hr</div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleBookNowClick}>
            Book Now
          </Button>
        </CardFooter>
      </Card>
      
      <BookingDialog
        escort={escort}
        onSubmit={handleSubmit}
        onCancel={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default BookingRequestCard;
