
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, MessageCircle, Heart, Share2, Calendar } from 'lucide-react';

// Mock data for a single escort
const mockEscort = {
  id: '1',
  name: 'Sophia',
  age: 28,
  gender: 'female',
  location: 'Los Angeles, CA',
  rating: 4.9,
  reviewCount: 47,
  price: 300,
  hourlyRate: 300,
  responseRate: 98,
  tags: ['Elite', 'Luxury', 'Verified'],
  services: ['Dinner Dates', 'Travel Companion', 'Cultural Events'],
  languages: ['English', 'Spanish', 'French'],
  height: '5\'7"',
  weight: '125 lbs',
  hairColor: 'Blonde',
  eyeColor: 'Blue',
  ethnicity: 'Caucasian',
  measurements: '36-24-36',
  isVerified: true,
  availableNow: true,
  featured: true,
  imageUrl: 'https://i.pravatar.cc/300?img=1',
  gallery: [
    'https://i.pravatar.cc/800?img=1',
    'https://i.pravatar.cc/800?img=5',
    'https://i.pravatar.cc/800?img=9',
    'https://i.pravatar.cc/800?img=20',
    'https://i.pravatar.cc/800?img=22',
  ],
  bio: "Hi there! I'm Sophia, a friendly and sophisticated companion. I love deep conversations, fine dining, and creating memorable experiences. I have a background in art history and enjoy visiting museums and galleries. Looking forward to meeting you!",
  description: "I provide an upscale companion experience tailored to your needs. Whether you're seeking stimulating conversation over dinner, a partner for a high-profile event, or just someone to explore the city with, I'm the perfect choice for discerning gentlemen who appreciate elegance and intelligence.",
  rates: {
    hourly: 300,
    twoHours: 550,
    dinner: 800,
    overnight: 1500,
  }
};

const EscortDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [escort, setEscort] = useState(mockEscort);
  const [activeTab, setActiveTab] = useState('about');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // In a real app, we would fetch the escort details using the ID
    console.log(`Fetching details for escort ID: ${id}`);
    // For now, we'll just use the mock data
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <MainLayout
      title={`${escort.name} | UberEscorts`}
      description={`View ${escort.name}'s profile, a ${escort.age}-year-old ${escort.gender} escort in ${escort.location}`}
      showBreadcrumbs
    >
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Image and Quick Info */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <div className="relative aspect-[3/4]">
                <img 
                  src={escort.imageUrl} 
                  alt={escort.name} 
                  className="w-full h-full object-cover"
                />
                {escort.availableNow && (
                  <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                    Available Now
                  </Badge>
                )}
                {escort.featured && (
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-300 text-black">
                    Featured
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="font-medium">{escort.rating}</span>
                    <span className="text-muted-foreground text-sm ml-1">({escort.reviewCount} reviews)</span>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mr-1">ID Verified</Badge>
                  </div>
                </div>
                
                <div className="flex justify-between mb-2">
                  <Button onClick={toggleFavorite} variant="outline" className="flex-1 mr-1">
                    <Heart className={`mr-2 h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    {isFavorite ? 'Favorited' : 'Favorite'}
                  </Button>
                  <Button variant="outline" className="flex-1 ml-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
                
                <Button className="w-full mt-2">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message
                </Button>
                
                <Button variant="secondary" className="w-full mt-2">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl font-bold">{escort.name}, {escort.age}</h1>
                    <p className="text-muted-foreground">{escort.location}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {escort.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">${escort.hourlyRate}</div>
                    <div className="text-sm text-muted-foreground">per hour</div>
                    <div className="text-sm text-green-500 mt-1">{escort.responseRate}% response rate</div>
                  </div>
                </div>
                
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-4">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="services">Services</TabsTrigger>
                    <TabsTrigger value="rates">Rates</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="about" className="mt-4">
                    <h3 className="font-semibold text-lg mb-2">About Me</h3>
                    <p className="mb-4">{escort.bio}</p>
                    <p>{escort.description}</p>
                    
                    <div className="grid grid-cols-2 gap-y-3 gap-x-6 mt-6">
                      <div className="text-muted-foreground">Height</div>
                      <div>{escort.height}</div>
                      
                      <div className="text-muted-foreground">Weight</div>
                      <div>{escort.weight}</div>
                      
                      <div className="text-muted-foreground">Hair Color</div>
                      <div>{escort.hairColor}</div>
                      
                      <div className="text-muted-foreground">Eye Color</div>
                      <div>{escort.eyeColor}</div>
                      
                      <div className="text-muted-foreground">Ethnicity</div>
                      <div>{escort.ethnicity}</div>
                      
                      <div className="text-muted-foreground">Measurements</div>
                      <div>{escort.measurements}</div>
                      
                      <div className="text-muted-foreground">Languages</div>
                      <div>{escort.languages.join(", ")}</div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="services" className="mt-4">
                    <h3 className="font-semibold text-lg mb-4">Services Offered</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {escort.services.map((service, index) => (
                        <li key={index} className="flex items-center">
                          <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="rates" className="mt-4">
                    <h3 className="font-semibold text-lg mb-4">Rates</h3>
                    <div className="grid grid-cols-2 gap-y-4">
                      <div className="text-muted-foreground">1 Hour</div>
                      <div className="font-medium">${escort.rates.hourly}</div>
                      
                      <div className="text-muted-foreground">2 Hours</div>
                      <div className="font-medium">${escort.rates.twoHours}</div>
                      
                      <div className="text-muted-foreground">Dinner Date</div>
                      <div className="font-medium">${escort.rates.dinner}</div>
                      
                      <div className="text-muted-foreground">Overnight</div>
                      <div className="font-medium">${escort.rates.overnight}</div>
                    </div>
                    <p className="mt-6 text-sm text-muted-foreground">
                      Please contact me directly for special requests or longer bookings.
                    </p>
                  </TabsContent>
                  
                  <TabsContent value="reviews" className="mt-4">
                    <h3 className="font-semibold text-lg mb-4">Client Reviews</h3>
                    <div className="flex items-center mb-6">
                      <div className="text-2xl font-bold mr-2">{escort.rating}</div>
                      <div className="flex items-center mr-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-5 w-5 ${star <= Math.round(escort.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-muted-foreground">({escort.reviewCount} reviews)</span>
                    </div>
                    
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <img src="https://i.pravatar.cc/100?img=60" alt="Client" />
                              </Avatar>
                              <span className="font-medium">John D.</span>
                            </div>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star}
                                  className={`h-4 w-4 ${star <= 5 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm">Sophia is incredible! She's intelligent, beautiful, and has amazing conversational skills. Our dinner date was perfect.</p>
                          <div className="text-xs text-muted-foreground mt-2">March 15, 2025</div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <img src="https://i.pravatar.cc/100?img=33" alt="Client" />
                              </Avatar>
                              <span className="font-medium">Robert M.</span>
                            </div>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star}
                                  className={`h-4 w-4 ${star <= 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm">Great companion for my business event. Very professional and charming.</p>
                          <div className="text-xs text-muted-foreground mt-2">February 28, 2025</div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Button variant="outline" className="mt-4 w-full">View All Reviews</Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {escort.gallery.map((image, index) => (
                  <div key={index} className="aspect-square overflow-hidden rounded-md">
                    <img 
                      src={image} 
                      alt={`${escort.name} gallery ${index + 1}`} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EscortDetailPage;
