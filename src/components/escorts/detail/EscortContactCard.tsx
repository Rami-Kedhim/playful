
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, MessageSquare, Heart } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Escort } from '@/types/Escort'; // Fixed casing to match the most commonly used import
import { formatCurrency } from '@/lib/utils';
import { useFavorites } from '@/contexts/FavoritesContext';

interface EscortContactCardProps {
  escort: Escort;
  isFavorite: boolean;
  onBookingClick: () => void;
  onMessageClick: () => void;
}

const EscortContactCard: React.FC<EscortContactCardProps> = ({
  escort,
  isFavorite,
  onBookingClick,
  onMessageClick
}) => {
  const { addFavorite, removeFavorite } = useFavorites();
  
  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(escort.id);
    } else {
      addFavorite(escort);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Contact {escort.name}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {escort.price && (
            <div className="bg-muted/50 p-3 rounded-md">
              <p className="text-sm font-medium">Starting Price</p>
              <p className="text-2xl font-bold">
                {formatCurrency(escort.price)}/hr
              </p>
            </div>
          )}
          
          {escort.availability && (
            <div>
              <p className="text-sm font-medium mb-1">Availability</p>
              <div className="text-sm text-muted-foreground">
                Available by appointment
              </div>
            </div>
          )}
          
          {escort.responseRate && (
            <div>
              <p className="text-sm font-medium mb-1">Response Rate</p>
              <div className="text-sm">
                Responds to {escort.responseRate}% of messages
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-3">
        <Button onClick={onBookingClick} className="w-full gap-2">
          <Calendar className="h-4 w-4" />
          Book Now
        </Button>
        
        <Button variant="outline" onClick={onMessageClick} className="w-full gap-2">
          <MessageSquare className="h-4 w-4" />
          Send Message
        </Button>
        
        <Button 
          variant="ghost" 
          onClick={handleFavoriteClick} 
          className={`w-full gap-2 ${isFavorite ? 'text-red-500' : ''}`}
        >
          <Heart className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} />
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EscortContactCard;
