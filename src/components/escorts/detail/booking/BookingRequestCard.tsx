
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock } from 'lucide-react';
import { Escort } from '@/types/escort';
import BookingDialog from './BookingDialog';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

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
  
  const handleBookNowClick = () => {
    if (!isAuthenticated) {
      navigate('/auth', { state: { from: `/escorts/${escort.id}`, action: 'booking' } });
      return;
    }
    
    setIsDialogOpen(true);
  };
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Book an Appointment</CardTitle>
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
              {escort.responseTime || "Within 1 hour"}
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
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onBookNow={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default BookingRequestCard;
