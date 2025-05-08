
import React from 'react';
import { Link } from 'react-router-dom';
import { Escort } from '@/types/escort';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Star } from 'lucide-react';

interface EscortCardProps {
  escort: Escort;
}

const EscortCard: React.FC<EscortCardProps> = ({ escort }) => {
  return (
    <Card className="overflow-hidden group">
      <Link to={`/escorts/${escort.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={escort.images?.[0] || '/placeholder-escort.jpg'}
            alt={escort.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {escort.featured && (
            <Badge className="absolute top-2 right-2 bg-gradient-to-r from-amber-400 to-orange-500">
              Featured
            </Badge>
          )}
        </div>
      </Link>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{escort.name}</h3>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin size={14} />
              <span>{escort.location}</span>
            </div>
          </div>
          
          <div className="text-amber-500 flex items-center gap-1">
            <Star size={16} className="fill-amber-500" />
            <span className="font-medium">{escort.rating}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-3 bg-muted/30 flex justify-between">
        <div>
          <span className="font-semibold">${escort.price}</span>
          <span className="text-sm text-muted-foreground"> / hour</span>
        </div>
        
        <button className="p-1 rounded-full hover:bg-background transition-colors">
          <Heart size={20} className="text-muted-foreground hover:text-rose-500 transition-colors" />
        </button>
      </CardFooter>
    </Card>
  );
};

export default EscortCard;
