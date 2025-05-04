
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UnifiedLayout } from '@/layouts';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Calendar as CalendarIcon,
  MapPin,
  Star,
  MessageSquare,
  Heart,
  Share2,
  Shield,
  Clock,
  Flag,
  CalendarRange,
  Languages,
  Calendar as CalendarDaysIcon,
  CheckCircle,
  X,
  ChevronRight,
  ChevronLeft,
  Info,
  AlertTriangle,
  Phone,
  DollarSign,
  Globe,
} from 'lucide-react';
import type { Escort } from '@/types/Escort';

const EscortDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [escort, setEscort] = useState<Escort | null>(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Simulate fetching data
  useEffect(() => {
    const fetchEscortData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data for the escort with the specified ID
        const mockEscort: Escort = {
          id: id || '1',
          name: 'Sofia Martinez',
          age: 28,
          gender: 'female',
          location: 'New York, Manhattan',
          rating: 4.9,
          reviewCount: 124,
          price: 250,
          tags: ['Luxury', 'Model', 'VIP', 'GFE', 'International', 'Events', 'Travel'],
          profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
          images: [
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
            'https://images.unsplash.com/photo-1555081890-e9b7fa3a2527',
            'https://images.unsplash.com/photo-1556347961-f9521a88cb8a',
            'https://images.unsplash.com/photo-1551292831-023188e78222'
          ],
          isVerified: true,
          availableNow: true,
          responseRate: 98,
          description: 'Sophisticated and educated companion for elite gentlemen. With my background in art history and international relations, I provide engaging conversation and genuine connection. Whether you\'re looking for a companion for a high-profile event, a cultural experience, or simply a memorable evening, I offer an authentic and unforgettable experience tailored to your preferences. Fluent in multiple languages and well-traveled, I adapt easily to any situation with grace and elegance.',
          services: ['Dinner Date', 'Weekend Getaway', 'Cultural Events', 'Business Functions', 'Private Parties', 'Travel Companion'],
          languages: ['English', 'Spanish', 'French', 'Italian']
        };
        
        setEscort(mockEscort);
      } catch (error) {
        console.error('Error fetching escort details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEscortData();
  }, [id]);
  
  if (loading) {
    return (
      <UnifiedLayout title="Loading..." showBreadcrumbs>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </UnifiedLayout>
    );
  }
  
  if (!escort) {
    return (
      <UnifiedLayout title="Escort Not Found" showBreadcrumbs>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Profile Not Found</h2>
          <p className="mb-6 text-muted-foreground">The escort profile you're looking for does not exist or has been removed.</p>
          <Button asChild>
            <Link to="/escorts">Browse Escorts</Link>
          </Button>
        </div>
      </UnifiedLayout>
    );
  }
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (escort.images?.length || 1));
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => {
      const imagesLength = escort.images?.length || 1;
      return (prev - 1 + imagesLength) % imagesLength;
    });
  };
  
  return (
    <UnifiedLayout 
      title={`${escort.name}, ${escort.age}`} 
      showBreadcrumbs
      containerClass="container mx-auto px-4 py-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Gallery */}
          <Card className="mb-6 overflow-hidden">
            <div className="relative">
              <img
                src={escort.images?.[currentImageIndex] || escort.profileImage || escort.imageUrl}
                alt={escort.name}
                className="w-full h-[500px] object-cover"
              />
              
              {escort.images && escort.images.length > 1 && (
                <>
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                    {escort.images.map((_, index) => (
                      <span 
                        key={index}
                        className={`h-1.5 rounded-full ${index === currentImageIndex ? 'w-4 bg-primary' : 'w-1.5 bg-background/80'}`}
                      ></span>
                    ))}
                  </div>
                </>
              )}
              
              <div className="absolute top-2 right-2 flex gap-2">
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className={cn(
                    "h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm",
                    isFavorite && "text-red-500"
                  )}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
                </Button>
                <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              
              {escort.availableNow && (
                <Badge className="absolute top-2 left-2 bg-green-600">
                  Available Now
                </Badge>
              )}
            </div>
            
            {escort.images && escort.images.length > 1 && (
              <div className="p-2 flex overflow-x-auto gap-2 hide-scrollbar">
                {escort.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${escort.name} ${index + 1}`}
                    className={`h-16 w-24 object-cover rounded cursor-pointer ${currentImageIndex === index ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </Card>
          
          {/* Tabs */}
          <Tabs defaultValue="about" className="mb-6">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="rates">Rates</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>About {escort.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {escort.description}
                  </p>
                  
                  <Separator className="my-4" />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" /> {escort.location}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Response Time</p>
                      <p className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" /> Under 1 hour
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Languages</p>
                      <p className="flex items-center">
                        <Languages className="h-4 w-4 mr-1" /> {escort.languages?.join(', ')}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Verification</p>
                      <p className="flex items-center">
                        <Shield className="h-4 w-4 mr-1 text-primary" /> {escort.isVerified ? 'Verified Profile' : 'Not Verified'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground mb-2">Specialties</p>
                    <div className="flex flex-wrap gap-2">
                      {escort.tags?.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="services" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Services Offered</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {escort.services?.map((service, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-primary mr-2" />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="flex items-start mb-2">
                      <Info className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                      <span>Services can be customized to meet your specific needs. Please discuss your preferences during booking.</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="rates" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Rates & Packages</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-lg">1 Hour</h3>
                        <span className="text-lg font-bold">${escort.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Standard meeting</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-lg">2 Hours</h3>
                        <span className="text-lg font-bold">${escort.price * 1.8}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Extended meeting</p>
                    </div>
                    
                    <div className="border rounded-lg p-4 border-primary">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <h3 className="font-medium text-lg">Dinner Date</h3>
                          <Badge className="ml-2">Popular</Badge>
                        </div>
                        <span className="text-lg font-bold">${escort.price * 3}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">4 hours including dinner and social time</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-lg">Overnight</h3>
                        <span className="text-lg font-bold">${escort.price * 5}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">10 hours (8PM to 6AM)</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-lg">Weekend Getaway</h3>
                        <span className="text-lg font-bold">Contact for rates</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Extended companionship for travel</p>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="flex items-start">
                      <AlertTriangle className="h-4 w-4 mr-2 mt-0.5" />
                      <span>Rates are for time and companionship only. All activities between adults are consensual.</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Client Reviews</CardTitle>
                  <CardDescription>
                    {escort.reviewCount} verified reviews with an average rating of {escort.rating} stars
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center mb-6">
                    <div className="text-5xl font-bold mr-4">{escort.rating}</div>
                    <div className="flex-grow">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-5 w-5 ${star <= Math.round(escort.rating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{escort.reviewCount} verified reviews</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Sample reviews */}
                    {[
                      {
                        name: 'John D.',
                        rating: 5,
                        date: '2 weeks ago',
                        comment: 'Sofia was an amazing companion for my business dinner. She is eloquent, charming, and made the evening truly memorable. Highly recommended!'
                      },
                      {
                        name: 'Michael B.',
                        rating: 5,
                        date: '1 month ago',
                        comment: 'Having Sofia accompany me to the charity gala was the highlight of my month. She is sophisticated, well-spoken, and an absolute delight to be around.'
                      },
                      {
                        name: 'Robert L.',
                        rating: 4,
                        date: '2 months ago',
                        comment: 'Great experience overall. Sofia is attentive, punctual, and a great conversationalist. Looking forward to our next meeting.'
                      }
                    ].map((review, index) => (
                      <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{review.name}</p>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          {/* Contact Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{escort.name}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" /> {escort.location}
                  </CardDescription>
                </div>
                {escort.isVerified && (
                  <Badge variant="secondary" className="flex items-center">
                    <Shield className="h-3 w-3 mr-1 text-primary" /> Verified
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm">Starting from</div>
                <div className="text-xl font-bold">${escort.price}/hr</div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <Button className="w-full" asChild>
                  <Link to={`/messages?user=${escort.id}`}>
                    <MessageSquare className="mr-2 h-4 w-4" /> Contact Now
                  </Link>
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="mr-2 h-4 w-4" /> Request Call
                </Button>
              </div>
              
              <div className="text-sm text-center text-muted-foreground">
                Usually responds within 1 hour
              </div>
            </CardContent>
          </Card>
          
          {/* Availability Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              
              {date && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Available Times for {format(date, 'MMM d, yyyy')}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'].map((time, index) => (
                      <Button key={index} variant="outline" className="text-sm">
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              <Separator />
              
              <div>
                <h4 className="font-medium text-sm mb-2">Preferred Meeting Times</h4>
                <div className="text-sm text-muted-foreground">
                  <p className="flex items-center mb-1">
                    <CalendarDaysIcon className="h-3 w-3 mr-2" /> 
                    <span className="font-medium mr-1">Weekdays:</span> 7PM - 1AM
                  </p>
                  <p className="flex items-center">
                    <CalendarDaysIcon className="h-3 w-3 mr-2" /> 
                    <span className="font-medium mr-1">Weekends:</span> 10AM - 2AM
                  </p>
                </div>
              </div>
              
              <Button className="w-full">
                <CalendarRange className="mr-2 h-4 w-4" /> Book Now
              </Button>
            </CardContent>
          </Card>
          
          {/* Payment Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Cash</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>UBX Tokens</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Bank Transfer</span>
                </div>
                <div className="flex items-center">
                  <X className="h-4 w-4 text-red-500 mr-2" />
                  <span>Credit Cards</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm font-medium">UBX Balance</span>
                </div>
                <div className="text-sm">1,250 UBX</div>
              </div>
              
              <Button variant="outline" className="w-full">
                <DollarSign className="mr-2 h-4 w-4" /> Add UBX Tokens
              </Button>
            </CardContent>
          </Card>
          
          {/* Safety Tips Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Shield className="h-4 w-4 mr-2 text-primary" /> Safety Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-start">
                <CheckCircle className="h-3 w-3 mr-2 mt-1 text-green-500" />
                Always meet in a public place first
              </p>
              <p className="flex items-start">
                <CheckCircle className="h-3 w-3 mr-2 mt-1 text-green-500" />
                Verify identity before private meetings
              </p>
              <p className="flex items-start">
                <CheckCircle className="h-3 w-3 mr-2 mt-1 text-green-500" />
                Use our safety route sharing feature
              </p>
              <p className="flex items-start">
                <CheckCircle className="h-3 w-3 mr-2 mt-1 text-green-500" />
                Trust your instincts at all times
              </p>
              
              <div className="mt-2">
                <Button variant="link" className="p-0 h-auto text-primary" asChild>
                  <Link to="/safety">
                    View all safety guidelines
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Report Button */}
          <Button variant="ghost" className="w-full text-muted-foreground" size="sm">
            <Flag className="h-4 w-4 mr-2" />
            Report Profile
          </Button>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default EscortDetailPage;
