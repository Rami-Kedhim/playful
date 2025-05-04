
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Star, 
  MapPin, 
  MessageSquare, 
  Heart,
  Clock,
  CheckCircle,
  Shield
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Escort } from '@/types/Escort';

interface EscortDetailViewProps {
  escort: Escort;
  onContactClick?: () => void;
  onBookingClick?: () => void;
  onFavoriteClick?: () => void;
  isFavorite?: boolean;
}

const EscortDetailView: React.FC<EscortDetailViewProps> = ({ 
  escort,
  onContactClick,
  onBookingClick,
  onFavoriteClick,
  isFavorite = false
}) => {
  const { 
    name, 
    age, 
    location, 
    gender, 
    rating, 
    reviewCount, 
    price, 
    tags, 
    imageUrl,
    isVerified,
    availableNow,
    responseRate
  } = escort;

  // Mock data for services and availability
  const services = [
    'Dinner Date', 
    'Travel Companion', 
    'Cultural Events', 
    'Business Functions',
    'Private Parties'
  ];
  
  const availability = [
    { day: 'Monday', times: ['Evening'] },
    { day: 'Tuesday', times: ['Afternoon', 'Evening'] },
    { day: 'Wednesday', times: ['Morning', 'Afternoon', 'Evening'] },
    { day: 'Thursday', times: ['Afternoon', 'Evening'] },
    { day: 'Friday', times: ['Evening'] },
    { day: 'Saturday', times: ['All Day'] },
    { day: 'Sunday', times: ['All Day'] },
  ];
  
  // Mock description
  const description = `
    I'm ${name}, a ${age}-year-old ${gender === 'female' ? 'woman' : 'man'} based in ${location}. 
    I offer sophisticated companionship for various social occasions, from business events to cultural outings.
    With my excellent conversational skills and adaptable personality, I ensure a memorable and enjoyable 
    experience for my clients. I am well-traveled, educated, and passionate about creating genuine connections.
  `;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left column - Image gallery */}
      <div className="md:col-span-1">
        <div className="relative rounded-lg overflow-hidden mb-4">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-auto object-cover aspect-[3/4]" 
          />
          {isVerified && (
            <Badge className="absolute top-2 left-2 bg-primary text-white flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Verified
            </Badge>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          {/* Placeholder for additional images */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-square bg-muted rounded-md"></div>
          ))}
        </div>
      </div>
      
      {/* Middle column - Primary info */}
      <div className="md:col-span-2">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
            <div className="flex items-center text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{location}</span>
              <span className="mx-2">•</span>
              <span>{age} years</span>
            </div>
          </div>
          <Button 
            variant={isFavorite ? "secondary" : "outline"}
            size="icon"
            onClick={onFavoriteClick}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3">
                <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
                  <Star className="h-4 w-4 fill-amber-500" />
                  <span className="font-medium">{rating}</span>
                </div>
                <p className="text-xs text-muted-foreground">{reviewCount} reviews</p>
              </div>
              
              <div className="p-3">
                <div className="font-medium mb-1">${price}/hr</div>
                <p className="text-xs text-muted-foreground">Starting rate</p>
              </div>
              
              <div className="p-3">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span className="font-medium">{responseRate}%</span>
                </div>
                <p className="text-xs text-muted-foreground">Response rate</p>
              </div>
              
              <div className="p-3">
                <div className="font-medium text-green-500 mb-1">
                  {availableNow ? 'Available Now' : 'Not Available'}
                </div>
                <p className="text-xs text-muted-foreground">Status</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex gap-4 mb-8">
          <Button className="flex-1" onClick={onBookingClick}>
            <Calendar className="mr-2 h-4 w-4" />
            Book Now
          </Button>
          <Button variant="outline" className="flex-1" onClick={onContactClick}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact
          </Button>
        </div>
        
        <Tabs defaultValue="about">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about">
            <h3 className="text-lg font-medium mb-3">About {name}</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">{description}</p>
            
            {isVerified && (
              <div className="flex items-center p-3 rounded-lg bg-primary/5 border border-primary/20 mb-4">
                <Shield className="h-5 w-5 text-primary mr-3" />
                <div>
                  <h4 className="font-medium">Verified Profile</h4>
                  <p className="text-sm text-muted-foreground">
                    This escort's identity has been verified by our team.
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="services">
            <h3 className="text-lg font-medium mb-3">Services Offered</h3>
            <ul className="grid grid-cols-2 gap-2">
              {services.map((service) => (
                <li key={service} className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  {service}
                </li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="availability">
            <h3 className="text-lg font-medium mb-3">Weekly Availability</h3>
            <div className="space-y-2">
              {availability.map(({ day, times }) => (
                <div key={day} className="flex justify-between p-2 border-b">
                  <span className="font-medium">{day}</span>
                  <span>{times.join(', ')}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <h3 className="text-lg font-medium mb-3">Client Reviews</h3>
            <div className="text-center py-8">
              <p className="text-muted-foreground">Client reviews will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EscortDetailView;
