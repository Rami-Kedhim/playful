
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calendar, Heart, MessageSquare, Star, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useEscortDetail } from '@/hooks/useEscortDetail';
import EscortBio from '@/components/escorts/detail/tabs/EscortBio';
import EscortRates from '@/components/escorts/detail/tabs/EscortRates';
import EscortDetailSkeleton from '@/components/escorts/detail/EscortDetailSkeleton';
import EscortGallery from '@/components/escorts/detail/EscortGallery';
import EscortAvailability from '@/components/escorts/detail/tabs/EscortAvailability';
import EscortReviews from '@/components/escorts/detail/tabs/EscortReviews';

const EscortDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { 
    escort, 
    loading, 
    error, 
    isFavorite, 
    toggleFavorite, 
    handleBookingRequest,
    canBook
  } = useEscortDetail(id);
  
  if (error || (!loading && !escort)) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => window.history.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to escorts
          </Button>
          
          <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-2xl font-bold mb-2">Escort Not Found</h2>
            <p className="text-gray-500 mb-4">The escort you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/escorts" className="text-white">
                Browse Escorts
              </Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => window.history.back()} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to escorts
          </Button>
          <EscortDetailSkeleton />
        </div>
      </MainLayout>
    );
  }
  
  const handleBook = () => {
    toast({
      title: "Booking Request",
      description: `Your booking request for ${escort.name} has been submitted.`,
    });
  };
  
  const handleMessage = () => {
    toast({
      title: "Message Sent",
      description: `Your message to ${escort.name} has been sent.`,
    });
  };
  
  const isBookingAvailable = canBook && !escort.isAI;
  const isMessagingAvailable = true;
  
  const getVerificationBadge = () => {
    if (escort.verified) {
      return (
        <Badge className="bg-primary text-white">
          <Star className="h-3 w-3 fill-current mr-1" />
          Verified
        </Badge>
      );
    } else if (escort.isAI || escort.profileType === "ai") {
      return <Badge variant="secondary">AI Model</Badge>;
    } else {
      return <Badge variant="outline">Provisional</Badge>;
    }
  };
  
  // Format measurements for display
  const getFormattedPhysique = () => {
    if (escort.measurements) {
      return `${escort.measurements.bust}-${escort.measurements.waist}-${escort.measurements.hips}`;
    }
    return "Not specified";
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => window.history.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to escorts
        </Button>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/5 space-y-6">
            <EscortGallery 
              images={escort.gallery || [escort.imageUrl]} 
              name={escort.name} 
            />
            
            {escort.videos && escort.videos.length > 0 && (
              <Button variant="outline" className="w-full" asChild>
                <Link to={`/escorts/${id}/videos`}>
                  <Video className="h-4 w-4 mr-2" />
                  View Videos ({escort.videos.length})
                </Link>
              </Button>
            )}
            
            {escort.providesVirtualContent && (
              <Button variant="outline" className="w-full" asChild>
                <Link to={`/escorts/${id}/content`}>
                  <Video className="h-4 w-4 mr-2" />
                  View Virtual Content
                </Link>
              </Button>
            )}
          </div>
          
          <div className="md:w-3/5">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold">{escort.name}</h1>
                  {getVerificationBadge()}
                </div>
                <Button 
                  size="icon" 
                  variant={isFavorite ? "default" : "outline"} 
                  onClick={toggleFavorite}
                  className="h-8 w-8"
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                  <span className="sr-only">Favorite</span>
                </Button>
              </div>
              
              <div className="flex items-center text-muted-foreground mb-3">
                <span>{escort.age} years • {escort.location}</span>
                
                {escort.rating > 0 && (
                  <div className="ml-auto flex items-center">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                    <span>{escort.rating.toFixed(1)}</span>
                    {escort.reviews > 0 && (
                      <span className="text-xs ml-1">({escort.reviews} reviews)</span>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {isBookingAvailable && (
                <Button onClick={handleBook}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Now
                </Button>
              )}
              
              {isMessagingAvailable && (
                <Button 
                  variant={isBookingAvailable ? "outline" : "default"} 
                  onClick={handleMessage}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
              )}
            </div>
            
            <Tabs defaultValue="about" className="mt-6">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="rates">Rates</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about">
                <EscortBio 
                  name={escort.name}
                  age={escort.age}
                  location={escort.location}
                  bio={escort.bio}
                  gender={escort.gender}
                  orientation={escort.sexualOrientation}
                  languages={escort.languages}
                  ethnicity={escort.ethnicity}
                  height={String(escort.height || "Not specified")}
                  weight={String(escort.weight || "Not specified")}
                  physique={getFormattedPhysique()}
                  tags={escort.tags}
                />
              </TabsContent>
              
              <TabsContent value="rates">
                <EscortRates escort={escort} />
              </TabsContent>
              
              <TabsContent value="services">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">My Services</h3>
                  
                  {escort.services && escort.services.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {escort.services.map((service, index) => (
                        <div key={index} className="flex items-center p-3 rounded-lg border">
                          <span className="text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No services specified.</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews">
                <EscortReviews escort={escort} />
              </TabsContent>
              
              <TabsContent value="availability">
                <EscortAvailability escort={escort} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EscortDetail;
