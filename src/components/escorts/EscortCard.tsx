
import React from 'react';
import { Escort } from '@/types/escort';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { VerificationBadge } from '@/components/verification/VerificationBadge';
import ServiceTypeBadge from './ServiceTypeBadge';

interface EscortCardProps {
  escort: Escort;
  onClick?: () => void;
  className?: string;
  featured?: boolean;
}

const EscortCard: React.FC<EscortCardProps> = ({ 
  escort, 
  onClick,
  className = '',
  featured = false
}) => {
  return (
    <Card 
      className={`overflow-hidden transition-all duration-200 hover:shadow-md ${
        featured ? 'border-primary/40' : ''
      } ${className}`}
      onClick={onClick}
    >
      <CardHeader className="p-0 relative">
        <div className="aspect-[3/4] overflow-hidden">
          <img 
            src={escort.profileImage || 'https://via.placeholder.com/300x400?text=No+Image'} 
            alt={escort.name}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
        
        {featured && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
            Featured
          </div>
        )}
        
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {escort.serviceType && (
            <ServiceTypeBadge serviceType={escort.serviceType} />
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-3">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg truncate">{escort.name}</h3>
          <VerificationBadge level={escort.isVerified ? 'verified' : 'basic'} size="sm" />
        </div>
        
        <div className="text-sm text-muted-foreground mt-1">
          {escort.age && <span>{escort.age} • </span>}
          {escort.location || 'Location N/A'}
        </div>
      </CardContent>
      
      <CardFooter className="p-3 pt-0 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-sm font-medium">
            {escort.price ? `$${escort.price}` : 'Price on request'}
          </div>
        </div>
        
        {escort.rating !== undefined && (
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-sm">{escort.rating.toFixed(1)}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default EscortCard;
