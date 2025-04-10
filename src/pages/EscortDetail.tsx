
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, Zap, MapPin, Calendar, Languages, Clock, Phone, Mail, Globe, Heart, MessageSquare, Share2 } from 'lucide-react';
import { useEscortContext } from '@/modules/escorts/providers/EscortProvider';
import { Escort } from '@/types/escort';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import ProfileGallery from '@/components/escorts/detail/ProfileGallery';
import ReviewsSection from '@/components/escorts/detail/ReviewsSection';
import { Separator } from '@/components/ui/separator';
import ServiceTypeBadgeLabel from '@/components/escorts/filters/ServiceTypeBadgeLabel';

const EscortDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEscortById, loadEscorts, state } = useEscortContext();
  const [isLoading, setIsLoading] = useState(true);
  const [escort, setEscort] = useState<Escort | null>(null);
  const [similarEscorts, setSimilarEscorts] = useState<Escort[]>([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    const fetchEscort = async () => {
      try {
        setIsLoading(true);
        
        // First check if we have the escort already loaded
        let escortData = getEscortById(id as string);
        
        if (!escortData) {
          // If not, load escorts data
          await loadEscorts(true);
          escortData = getEscortById(id as string);
        }
        
        if (escortData) {
          setEscort(escortData);
          
          // Find similar escorts (same location or similar services)
          const similar = state.escorts
            .filter(e => e.id !== id)
            .filter(e => 
              e.location === escortData?.location || 
              e.services?.some(s => escortData?.services?.includes(s))
            )
            .slice(0, 4);
            
          setSimilarEscorts(similar);
        } else {
          console.error("Escort not found");
        }
      } catch (error) {
        console.error("Error loading escort:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchEscort();
    }
  }, [id, getEscortById, loadEscorts, state.escorts]);
  
  const handleBack = () => {
    navigate(-1);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // Here we would update the backend
  };
  
  const handleShareClick = () => {
    // Implement share functionality
    navigator.clipboard.writeText(window.location.href);
    // Would normally show toast notification
    console.log("Profile link copied to clipboard");
  };
  
  const handleContactClick = () => {
    // Navigate to messaging or booking page
    console.log("Contact clicked");
  };
  
  const getServiceType = (): "in-person" | "virtual" | "both" | "" => {
    if (!escort) return "";
    
    const providesInPerson = escort.providesInPersonServices;
    const providesVirtual = escort.providesVirtualContent;
    
    if (providesInPerson && providesVirtual) return "both";
    if (providesInPerson) return "in-person";
    if (providesVirtual) return "virtual";
    return "";
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <Button variant="ghost" size="sm" onClick={handleBack} className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Skeleton className="h-[400px] w-full" />
            <div className="space-y-2 mt-4">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
          
          <div className="space-y-4">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[100px] w-full" />
            <Skeleton className="h-[100px] w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!escort) {
    return (
      <div className="container mx-auto p-4">
        <Button variant="ghost" size="sm" onClick={handleBack} className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-2">Escort Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The escort profile you are looking for does not exist or has been removed.
          </p>
          <Button onClick={() => navigate('/escorts')}>
            View All Escorts
          </Button>
        </div>
      </div>
    );
  }
  
  // Prepare gallery images
  const galleryImages = escort.gallery || escort.gallery_images || [];
  if (escort.profileImage && !galleryImages.includes(escort.profileImage)) {
    galleryImages.unshift(escort.profileImage);
  } else if (escort.imageUrl && !galleryImages.includes(escort.imageUrl)) {
    galleryImages.unshift(escort.imageUrl);
  }
  
  // Prepare reviews (mock data for now)
  const mockReviews = [
    {
      id: "1",
      userId: "user1",
      username: "John D.",
      rating: 5,
      content: "Amazing experience! Very professional and attractive. Highly recommended.",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      helpful: 3,
      userHasMarkedHelpful: true
    },
    {
      id: "2",
      userId: "user2",
      username: "Mike S.",
      rating: 4,
      content: "Great companion, very attentive and fun to be with. Will definitely book again.",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      helpful: 1,
      userHasMarkedHelpful: false
    }
  ];
  
  return (
    <div className="container mx-auto p-4">
      <Button variant="ghost" size="sm" onClick={handleBack} className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column - Profile info */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                {escort.name}, {escort.age}
                {escort.verified && (
                  <Badge className="ml-2 bg-green-500 text-white border-0">Verified</Badge>
                )}
              </h1>
              
              <div className="flex items-center mt-1 text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{escort.location}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={isFavorite ? "default" : "outline"}
                size="icon"
                onClick={handleFavoriteToggle}
                className="h-9 w-9"
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
              
              <Button variant="outline" size="icon" onClick={handleShareClick} className="h-9 w-9">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <ProfileGallery images={galleryImages} className="mt-4" />
          
          {/* Profile tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="rates">Rates</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-6 space-y-4">
              <div>
                <h2 className="font-semibold text-lg">About Me</h2>
                <p className="mt-2 text-muted-foreground">
                  {escort.description || escort.bio || "No description provided."}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h3 className="font-medium mb-2">Details</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Gender:</span>
                      <span>{escort.gender || "Not specified"}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Orientation:</span>
                      <span>{escort.orientation || escort.sexualOrientation || "Not specified"}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Ethnicity:</span>
                      <span>{escort.ethnicity || "Not specified"}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Hair Color:</span>
                      <span>{escort.hairColor || "Not specified"}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Eye Color:</span>
                      <span>{escort.eyeColor || "Not specified"}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Measurements</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Height:</span>
                      <span>{escort.height ? `${escort.height} cm` : "Not specified"}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Weight:</span>
                      <span>{escort.weight ? `${escort.weight} kg` : "Not specified"}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Measurements:</span>
                      <span>
                        {typeof escort.measurements === 'string' 
                          ? escort.measurements 
                          : escort.measurements 
                            ? `${escort.measurements.bust || '-'}-${escort.measurements.waist || '-'}-${escort.measurements.hips || '-'}`
                            : "Not specified"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {escort.languages && escort.languages.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {escort.languages.map((language, index) => (
                      <Badge key={index} variant="secondary">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="services" className="mt-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="font-semibold text-lg">Available Services</h2>
                {getServiceType() && (
                  <ServiceTypeBadgeLabel type={getServiceType()} />
                )}
              </div>
              
              {escort.services && escort.services.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {escort.services.map((service, index) => (
                    <div key={index} className="flex items-center p-3 border rounded-md">
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No specific services listed. Contact for more information.
                </p>
              )}
              
              {escort.tags && escort.tags.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {escort.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-4">
                <h3 className="font-medium mb-2">Availability</h3>
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    {escort.availability ? (
                      <>
                        <p className="font-medium">Available days:</p>
                        <p className="text-sm text-muted-foreground">
                          {escort.availability.days?.join(", ") || "Varies"}
                        </p>
                        {escort.availability.hours && (
                          <>
                            <p className="font-medium mt-2">Hours:</p>
                            <p className="text-sm text-muted-foreground">
                              {escort.availability.hours?.join(", ")}
                            </p>
                          </>
                        )}
                        {escort.availability.customNotes && (
                          <p className="text-sm italic mt-2">
                            {escort.availability.customNotes}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No specific availability provided. Please contact for scheduling.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="rates" className="mt-6">
              <h2 className="font-semibold text-lg mb-4">Rates</h2>
              
              {escort.rates ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(escort.rates).map(([key, rate]) => (
                      <div key={key} className="border rounded-md p-4">
                        <div className="flex justify-between items-center">
                          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="font-bold text-lg">${rate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-md mt-4">
                    <p className="text-sm text-muted-foreground">
                      Rates are for time and companionship only. Anything else that may occur is a matter of personal choice between consenting adults.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <span>Standard rate</span>
                    <span className="font-bold text-lg">${escort.price}/hr</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Contact for additional pricing options and special packages.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <ReviewsSection 
                escortId={escort.id}
                averageRating={escort.rating || 0}
                reviewCount={escort.reviews || escort.reviewCount || mockReviews.length}
                reviews={mockReviews}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right sidebar - Contact info and actions */}
        <div className="space-y-6">
          <div className="bg-background border rounded-lg p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Contact Information</h3>
              {escort.availableNow && (
                <Badge className="bg-blue-500 text-white border-0">Available Now</Badge>
              )}
            </div>
            
            <div className="space-y-3">
              {escort.contactInfo?.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{escort.contactInfo.phone}</span>
                </div>
              )}
              
              {escort.contactInfo?.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{escort.contactInfo.email}</span>
                </div>
              )}
              
              {escort.contactInfo?.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a href={escort.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {escort.contactInfo.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              
              {escort.lastActive && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    {escort.availableNow 
                      ? 'Online now' 
                      : `Active ${typeof escort.lastActive === 'string' 
                          ? escort.lastActive 
                          : new Date(escort.lastActive).toLocaleDateString()}`}
                  </span>
                </div>
              )}
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Button className="w-full" onClick={handleContactClick}>
                Book Now
              </Button>
              <Button variant="outline" className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </div>
          </div>
          
          {/* Similar escorts */}
          {similarEscorts.length > 0 && (
            <div className="bg-background border rounded-lg p-5">
              <h3 className="font-semibold mb-4">Similar Escorts</h3>
              
              <div className="space-y-3">
                {similarEscorts.map((similar) => (
                  <div 
                    key={similar.id} 
                    className="flex items-center gap-3 p-2 hover:bg-secondary rounded-md cursor-pointer"
                    onClick={() => navigate(`/escorts/${similar.id}`)}
                  >
                    <img 
                      src={similar.profileImage || similar.imageUrl} 
                      alt={similar.name} 
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium">{similar.name}</h4>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <span>{similar.age} years</span>
                        <span>•</span>
                        <span>{similar.location}</span>
                      </div>
                    </div>
                    {similar.featured && (
                      <div className="ml-auto">
                        <Zap className="h-4 w-4 text-yellow-500" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Report button */}
          <div className="text-center">
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
              <Flag className="h-3 w-3 mr-1" />
              Report this profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscortDetail;
