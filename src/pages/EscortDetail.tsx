
import React from 'react';
import { useParams } from 'react-router-dom';
import { useEscortDetail } from '@/hooks/useEscortDetail';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Share2, Heart, MessageSquare, Calendar, MapPin, Star } from 'lucide-react';
import EscortGallery from '@/components/escorts/detail/EscortGallery';
import EscortBio from '@/components/escorts/detail/tabs/EscortBio';
import EscortRates from '@/components/escorts/detail/tabs/EscortRates';
import EscortServices from '@/components/escorts/detail/tabs/EscortServices';
import EscortDetailSkeleton from '@/components/escorts/detail/EscortDetailSkeleton';
import ProfileTypeBadge from '@/components/escorts/profile/ProfileTypeBadge';

const EscortDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    escort, 
    loading, 
    error, 
    isFavorite, 
    toggleFavorite,
    handleBookingRequest,
    canBook
  } = useEscortDetail(id);

  // Define additional variables that are needed
  const isBookingAvailable = canBook;
  const isMessagingAvailable = true;
  
  // Define handler functions
  const handleBook = () => {
    // Mock implementation for booking
    const now = new Date();
    const twoHoursLater = new Date(now.getTime() + (2 * 60 * 60 * 1000));
    handleBookingRequest(now, twoHoursLater, 'standard');
  };
  
  const handleMessage = () => {
    console.log('Message escort:', escort?.name);
    // Implementation would send a message to the escort
  };

  if (loading) {
    return <EscortDetailSkeleton />;
  }

  if (error || !escort) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Profile Not Found</h2>
        <p className="text-muted-foreground">
          Sorry, the escort profile you're looking for is not available.
        </p>
        <Button className="mt-4" href="/escorts">
          Browse Escorts
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2">
          {/* Header Section */}
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">{escort.name}, {escort.age}</h1>
                <div className="flex items-center mt-1 text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{escort.location}</span>
                  
                  <div className="mx-2">•</div>
                  
                  <Star className="h-4 w-4 mr-1 text-yellow-500" />
                  <span>{escort.rating} ({escort.reviews} reviews)</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
                
                <Button 
                  variant={isFavorite ? "default" : "outline"} 
                  size="sm"
                  onClick={toggleFavorite}
                >
                  <Heart className={`h-4 w-4 mr-1 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Saved' : 'Save'}
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
              <ProfileTypeBadge type={escort.profileType} />
              
              {escort.availableNow && (
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Available Now
                </span>
              )}
            </div>
          </div>
          
          {/* Gallery Section */}
          <EscortGallery gallery={escort.gallery} name={escort.name} />
          
          {/* Tabs Section */}
          <div className="mt-8">
            <Tabs defaultValue="about">
              <TabsList className="mb-6">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="rates">Rates</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about">
                <EscortBio escort={escort} />
              </TabsContent>
              
              <TabsContent value="rates">
                <EscortRates escort={escort} />
              </TabsContent>
              
              <TabsContent value="services">
                <EscortServices escort={escort} />
              </TabsContent>
              
              <TabsContent value="reviews">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Reviews coming soon.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Right Column */}
        <div>
          <div className="sticky top-24 space-y-6">
            <div className="border rounded-lg p-6 space-y-4">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary">${escort.price}</h3>
                <p className="text-sm text-muted-foreground">Starting price per hour</p>
              </div>
              
              <div className="space-y-2">
                <Button 
                  className="w-full" 
                  disabled={!isBookingAvailable}
                  onClick={handleBook}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Now
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  disabled={!isMessagingAvailable}
                  onClick={handleMessage}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
              
              <div className="text-center text-xs text-muted-foreground">
                <p>Last active: {new Date(escort.lastActive as string).toLocaleDateString()}</p>
                <p>Response rate: {escort.responseRate}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscortDetail;
