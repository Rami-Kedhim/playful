
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Star, 
  Share2, 
  Heart, 
  MessageCircle, 
  Calendar, 
  Phone, 
  CheckCircle,
  Clock,
  MonitorSmartphone,
  Users,
  Globe
} from 'lucide-react';

// This is a placeholder, you should replace this with actual data fetching
const getEscortById = (id: string) => {
  // Simulate fetching an escort by ID from an API
  return {
    id,
    name: "Sophia Rose",
    age: 28,
    location: "London, UK",
    rating: 4.8,
    reviews: 24,
    tags: ["GFE", "Massage", "Roleplay"],
    imageUrl: "https://via.placeholder.com/800x600",
    images: [
      "https://via.placeholder.com/800x600?text=Image+1",
      "https://via.placeholder.com/800x600?text=Image+2",
      "https://via.placeholder.com/800x600?text=Image+3",
      "https://via.placeholder.com/800x600?text=Image+4",
    ],
    price: 250,
    verified: true,
    gender: "female",
    sexualOrientation: "bisexual",
    availableNow: true,
    lastActive: new Date(),
    responseRate: 95,
    bio: "Hey there! I'm Sophia, a passionate and adventurous companion who loves to create unforgettable experiences. I'm well-educated with a background in psychology, which helps me connect deeply with people. I enjoy intellectual conversations just as much as playful moments. When I'm not meeting new people, I love practicing yoga, reading classic literature, and exploring new cuisines. I'm a great listener and love to hear your stories and fantasies. Looking forward to creating something special together!",
    height: "5'7\" (170 cm)",
    weight: "125 lbs (57 kg)",
    measurements: "34C-24-36",
    hairColor: "Blonde",
    eyeColor: "Blue",
    ethnicity: "Caucasian",
    languages: ["English", "French", "Spanish"],
    services: ["GFE", "Massage", "Roleplay", "Dinner Dates", "Travel Companion"],
    rates: {
      hourly: 250,
      twoHours: 450,
      dinner: 600,
      overnight: 1500,
      weekend: 3000
    },
    availability: {
      monday: "10AM - 10PM",
      tuesday: "12PM - 8PM",
      wednesday: "10AM - 10PM",
      thursday: "10AM - 10PM",
      friday: "12PM - Late",
      saturday: "12PM - Late",
      sunday: "By appointment"
    },
    providesInPersonServices: true,
    providesVirtualContent: true
  };
};

const EscortDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const escort = getEscortById(id || "");
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  if (!escort) {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Escort not found</h2>
            <p className="mt-2 text-gray-600">The escort you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  return (
    <>
      <Helmet>
        <title>{`${escort.name}, ${escort.age} | Escort Profile`}</title>
        <meta name="description" content={`View ${escort.name}'s profile and services. Available for booking in ${escort.location}.`} />
      </Helmet>
      
      <MainLayout>
        <div className="container mx-auto py-6 px-4">
          {/* Profile header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Main image */}
            <div className="lg:col-span-2">
              <div className="rounded-xl overflow-hidden relative aspect-[3/2]">
                <img 
                  src={escort.images[activeImageIndex]} 
                  alt={escort.name} 
                  className="object-cover w-full h-full"
                />
                {escort.verified && (
                  <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-2 mt-2">
                {escort.images.map((img, index) => (
                  <div 
                    key={index} 
                    className={`aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${activeImageIndex === index ? 'border-primary' : 'border-transparent'}`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img 
                      src={img} 
                      alt={`${escort.name} ${index + 1}`} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Profile info */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold">{escort.name}</h1>
                    <div className="text-lg text-muted-foreground flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {escort.location}
                    </div>
                  </div>
                  {escort.providesInPersonServices && escort.providesVirtualContent ? (
                    <Badge className="bg-blue-500 text-white">
                      <Globe className="h-4 w-4 mr-1" />
                      Both Services
                    </Badge>
                  ) : escort.providesInPersonServices ? (
                    <Badge className="bg-indigo-500 text-white">
                      <Users className="h-4 w-4 mr-1" />
                      In-Person
                    </Badge>
                  ) : (
                    <Badge className="bg-purple-500 text-white">
                      <MonitorSmartphone className="h-4 w-4 mr-1" />
                      Virtual
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="font-medium">{escort.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground ml-1">({escort.reviews} reviews)</span>
                </div>
                
                <div className="flex gap-2 mt-4">
                  {escort.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
              
              {/* Quick stats */}
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Age</p>
                      <p className="font-medium">{escort.age}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Gender</p>
                      <p className="font-medium capitalize">{escort.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Height</p>
                      <p className="font-medium">{escort.height}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Body</p>
                      <p className="font-medium">{escort.measurements}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Languages</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {escort.languages.map((lang, i) => (
                        <Badge key={i} variant="outline" className="font-normal">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Starting price</p>
                    <p className="text-xl font-bold text-primary">${escort.price}/hr</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Button className="w-full" size="lg">
                  <Phone className="h-4 w-4 mr-2" />
                  View Contact
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="secondary">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book
                  </Button>
                  <Button variant="secondary">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    onClick={toggleFavorite}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    {isFavorite ? 'Saved' : 'Save'}
                  </Button>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
              
              {/* Last active */}
              {escort.lastActive && (
                <div className="text-sm text-muted-foreground flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {escort.availableNow 
                    ? 'Online now'
                    : `Last active ${new Date(escort.lastActive).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
                  }
                </div>
              )}
            </div>
          </div>
          
          {/* Tabs */}
          <Tabs defaultValue="about" className="mt-8">
            <TabsList className="mb-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="rates">Rates</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            {/* About Tab */}
            <TabsContent value="about" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">About Me</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{escort.bio}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">Personal Details</h4>
                      <div className="grid grid-cols-2 gap-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Age</p>
                          <p>{escort.age}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Height</p>
                          <p>{escort.height}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Weight</p>
                          <p>{escort.weight}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Measurements</p>
                          <p>{escort.measurements}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Hair Color</p>
                          <p>{escort.hairColor}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Eye Color</p>
                          <p>{escort.eyeColor}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Ethnicity</p>
                          <p>{escort.ethnicity}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Gender</p>
                          <p className="capitalize">{escort.gender}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold">Languages</h4>
                      <div className="flex flex-wrap gap-2">
                        {escort.languages.map((lang, i) => (
                          <Badge key={i} variant="secondary">{lang}</Badge>
                        ))}
                      </div>
                      
                      <h4 className="text-lg font-semibold mt-6">Location</h4>
                      <p>{escort.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Services Tab */}
            <TabsContent value="services" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">My Services</h3>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {escort.services.map((service, i) => (
                      <Badge key={i} variant="secondary" className="text-base py-2 px-4">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Rates Tab */}
            <TabsContent value="rates" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">My Rates</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span>1 Hour</span>
                      <span className="font-bold">${escort.rates.hourly}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span>2 Hours</span>
                      <span className="font-bold">${escort.rates.twoHours}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span>Dinner Date</span>
                      <span className="font-bold">${escort.rates.dinner}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span>Overnight</span>
                      <span className="font-bold">${escort.rates.overnight}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Weekend</span>
                      <span className="font-bold">${escort.rates.weekend}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Availability Tab */}
            <TabsContent value="availability" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">My Availability</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="font-medium">Monday</span>
                      <span>{escort.availability.monday}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="font-medium">Tuesday</span>
                      <span>{escort.availability.tuesday}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="font-medium">Wednesday</span>
                      <span>{escort.availability.wednesday}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="font-medium">Thursday</span>
                      <span>{escort.availability.thursday}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="font-medium">Friday</span>
                      <span>{escort.availability.friday}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="font-medium">Saturday</span>
                      <span>{escort.availability.saturday}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Sunday</span>
                      <span>{escort.availability.sunday}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Reviews</h3>
                    <Button>Write a Review</Button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Sample reviews */}
                    <div className="pb-6 border-b">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            JD
                          </div>
                          <span className="ml-2 font-medium">John D.</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <Star className="h-4 w-4 text-yellow-400" />
                          <Star className="h-4 w-4 text-yellow-400" />
                          <Star className="h-4 w-4 text-yellow-400" />
                          <Star className="h-4 w-4 text-yellow-400" />
                        </div>
                      </div>
                      <p className="text-muted-foreground">
                        Sophia was amazing! Very attentive, great conversation, and truly made me feel special.
                        Will definitely book again next time I'm in town.
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">2 weeks ago</p>
                    </div>
                    
                    <div className="pb-6 border-b">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            RM
                          </div>
                          <span className="ml-2 font-medium">Robert M.</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <Star className="h-4 w-4 text-yellow-400" />
                          <Star className="h-4 w-4 text-yellow-400" />
                          <Star className="h-4 w-4 text-yellow-400" />
                          <Star className="h-4 w-4 text-gray-300" />
                        </div>
                      </div>
                      <p className="text-muted-foreground">
                        Had a great dinner date with Sophia. She's intelligent and a fantastic listener.
                        Looking forward to our next meeting.
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">1 month ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </MainLayout>
    </>
  );
};

export default EscortDetail;
