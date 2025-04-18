
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Star, MapPin, Languages, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Escort } from '@/types/escort';
import ServiceTypeBadgeLabel, { ServiceTypeFilter } from './filters/ServiceTypeBadgeLabel';

interface EscortCardProps {
  escort: Escort;
  className?: string;
  featured?: boolean;
}

const EscortCard: React.FC<EscortCardProps> = ({ escort, className, featured }) => {
  const {
    id,
    name,
    age,
    location,
    rating = 0,
    reviews = 0,
    reviewCount = 0,
    tags = [],
    imageUrl,
    profileImage,
    price = 0,
    verified = false,
    gender,
    sexualOrientation,
    availableNow,
    lastActive,
    responseRate,
    providesInPersonServices,
    providesVirtualContent,
    languages = []
  } = escort;

  // Use reviewCount as a fallback if reviews is an array
  const reviewsCount = typeof reviews === 'number' ? reviews : (reviewCount || 0);
  // Use multiple fallbacks for image sources
  const displayImage = imageUrl || profileImage || escort.avatar || escort.profileImage || escort.avatarUrl || "https://via.placeholder.com/300x400";
  
  const formatLastActive = () => {
    if (!lastActive) return "";
    
    const date = typeof lastActive === 'string' ? new Date(lastActive) : lastActive;
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const getServiceType = (): ServiceTypeFilter => {
    const hasInPerson = providesInPersonServices || escort.serviceTypes?.includes('in-person') || false;
    const hasVirtual = providesVirtualContent || escort.serviceTypes?.includes('virtual') || false;
    
    if (hasInPerson && hasVirtual) {
      return "both";
    } else if (hasInPerson) {
      return "in-person";
    } else if (hasVirtual) {
      return "virtual";
    }
    return "";
  };

  const serviceType = getServiceType();

  const getGenderOrientationText = () => {
    if (!gender && !sexualOrientation) return "";
    
    let text = "";
    if (gender) text += gender.charAt(0).toUpperCase() + gender.slice(1);
    if (gender && sexualOrientation) text += " • ";
    if (sexualOrientation) text += sexualOrientation.charAt(0).toUpperCase() + sexualOrientation.slice(1);
    
    return text;
  };

  return (
    <Link to={`/escorts/${id}`}>
      <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className} ${featured ? 'border-primary' : ''}`}>
        <div className="relative">
          <div className="aspect-[3/4] overflow-hidden">
            <img 
              src={displayImage} 
              alt={name}
              className="object-cover w-full h-full"
            />
          </div>
          
          {verified && (
            <Badge className="absolute top-2 right-2 bg-green-500 text-white border-0">
              <CheckCircle className="h-3 w-3 mr-1" /> Verified
            </Badge>
          )}
          
          {availableNow && (
            <Badge className="absolute top-2 left-2 bg-blue-500 text-white border-0">
              Available Now
            </Badge>
          )}
          
          {featured && (
            <Badge className="absolute bottom-2 right-2 bg-primary text-white border-0">
              Featured
            </Badge>
          )}
          
          {serviceType && (
            <div className="absolute bottom-2 left-2">
              <ServiceTypeBadgeLabel type={serviceType} />
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
            <div className="text-white font-medium">
              {name}, {age}
            </div>
            <div className="text-white/80 text-sm flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{location}</span>
            </div>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="font-medium">{rating.toFixed(1)}</span>
              <span className="text-gray-500 text-sm ml-1">({reviewsCount})</span>
            </div>
            <span className="font-bold text-green-600">${price}/hr</span>
          </div>
          
          {getGenderOrientationText() && (
            <div className="text-sm text-gray-700 mb-2">
              {getGenderOrientationText()}
            </div>
          )}
          
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="mt-3 pt-2 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-2">
              {languages && languages.length > 0 && (
                <div className="text-gray-500 text-xs flex items-center">
                  <Languages className="h-3 w-3 mr-1" />
                  {languages.length === 1 ? languages[0] : `${languages[0]} +${languages.length - 1}`}
                </div>
              )}
              
              {lastActive && (
                <div className="text-gray-500 text-xs flex items-center justify-end">
                  <Clock className="h-3 w-3 mr-1" />
                  {availableNow 
                    ? 'Online now'
                    : `Active ${formatLastActive()}`
                  }
                </div>
              )}
            </div>
            
            {responseRate !== undefined && (
              <div className="text-gray-500 text-xs mt-1 flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Response rate: {responseRate}%</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EscortCard;
