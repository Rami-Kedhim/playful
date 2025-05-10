
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Escort } from '@/types/Escort';
import { CheckCircle, MapPin, DollarSign } from 'lucide-react';

interface EscortProfileCardProps {
  escort: Escort;
}

const EscortProfileCard: React.FC<EscortProfileCardProps> = ({ escort }) => {
  // Safely check for availability status
  const isAvailableNow = escort.availableNow || escort.isAvailable || false;
  
  return (
    <Card className="overflow-hidden transition-transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={escort.imageUrl || escort.profileImage || (escort.images && escort.images[0]) || '/placeholder-profile.jpg'} 
          alt={escort.name} 
          className="w-full h-48 object-cover"
        />
        {escort.verified && (
          <Badge className="absolute top-2 right-2 bg-blue-600">
            <CheckCircle className="h-3 w-3 mr-1" /> Verified
          </Badge>
        )}
        {isAvailableNow && (
          <Badge className="absolute bottom-2 left-2 bg-green-600">
            Available Now
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold">{escort.name}</h3>
          <Badge variant="outline">{escort.gender}</Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          {escort.location || 'Unknown location'}
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <DollarSign className="h-4 w-4 mr-1" />
          {`$${escort.price || 'Contact for rates'}`}
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {escort.tags?.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Link to={`/escorts/${escort.id}`} className="w-full block">
          <Button variant="default" className="w-full">View Profile</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default EscortProfileCard;
