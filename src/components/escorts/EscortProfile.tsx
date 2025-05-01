
import React from 'react';
import { Star, CheckCircle, MapPin, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface EscortProfileProps {
  id: string;
  name: string;
  age: number;
  location: string;
  bio?: string;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  services?: string[];
  imageUrl?: string;
  gallery?: string[];
  price?: number;
  currency?: string;
  isVerified?: boolean;
  isAvailableNow?: boolean;
  responseTime?: string;
  onContactClick?: () => void;
  onBookingClick?: () => void;
}

/**
 * EscortProfile component for detailed view of an escort
 * Connected to Hermes for visibility tracking
 */
const EscortProfile: React.FC<EscortProfileProps> = ({
  id,
  name,
  age,
  location,
  bio,
  rating = 0,
  reviewCount = 0,
  tags = [],
  services = [],
  imageUrl,
  gallery = [],
  price = 0,
  currency = '$',
  isVerified = false,
  isAvailableNow = false,
  responseTime = 'Unknown',
  onContactClick,
  onBookingClick
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      <div className="md:flex">
        <div className="md:w-1/3">
          {/* Main profile image */}
          <div className="relative aspect-[3/4]">
            <img
              src={imageUrl || 'https://via.placeholder.com/400x600'}
              alt={name}
              className="w-full h-full object-cover"
            />
            
            {isVerified && (
              <Badge className="absolute top-4 right-4 bg-green-500 border-0">
                <CheckCircle className="mr-1 h-3 w-3" /> Verified
              </Badge>
            )}
            
            {isAvailableNow && (
              <Badge className="absolute top-14 right-4 bg-blue-500 border-0">
                Available Now
              </Badge>
            )}
          </div>
          
          {/* Gallery preview */}
          {gallery.length > 0 && (
            <div className="grid grid-cols-3 gap-1 p-2">
              {gallery.slice(0, 3).map((img, idx) => (
                <div key={idx} className="aspect-square">
                  <img 
                    src={img} 
                    alt={`${name} gallery ${idx+1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}
              {gallery.length > 3 && (
                <div className="col-span-3 text-center text-sm text-blue-500 py-1">
                  +{gallery.length - 3} more photos
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="md:w-2/3 p-6">
          {/* Header info */}
          <div className="mb-4">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold">{name}, {age}</h1>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
                <span className="text-gray-500 text-sm ml-1">({reviewCount})</span>
              </div>
            </div>
            
            <div className="flex items-center mt-1 text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{location}</span>
            </div>
          </div>
          
          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <Badge key={idx} variant="outline">{tag}</Badge>
            ))}
          </div>
          
          {/* Bio */}
          {bio && (
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">About Me</h2>
              <p className="text-gray-600 dark:text-gray-300">{bio}</p>
            </div>
          )}
          
          {/* Services */}
          {services.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Services</h2>
              <div className="grid grid-cols-2 gap-2">
                {services.map((service, idx) => (
                  <div key={idx} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Status info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 flex items-center">
                <Clock className="w-5 h-5 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Response Time</p>
                  <p className="font-medium">{responseTime}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex items-center">
                <DollarSign className="w-5 h-5 text-green-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Starting Price</p>
                  <p className="font-medium">{currency}{price}/hr</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-4">
            <Button 
              onClick={onContactClick} 
              className="flex-1"
              variant="default"
            >
              Contact Now
            </Button>
            
            <Button
              onClick={onBookingClick}
              className="flex-1"
              variant="outline"
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscortProfile;
