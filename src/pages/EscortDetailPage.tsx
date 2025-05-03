
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  MapPin, 
  MessageCircle, 
  Star, 
  Heart, 
  Share2, 
  Clock, 
  CheckCircle, 
  BarChart, 
  User
} from 'lucide-react';
import { Escort } from '@/types/Escort';
import { hermesOrusOxum } from '@/core/HermesOrusOxum';

const EscortDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [escort, setEscort] = useState<Escort | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Mock fetch escort data
    const fetchEscort = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Record that the profile was viewed in analytics
        if (id) {
          hermesOrusOxum.recordProfileView(id);
        }
        
        // Mock data
        const mockEscort: Escort = {
          id: id || '1',
          name: 'Sophia',
          age: 28,
          gender: 'female',
          location: 'Los Angeles, CA',
          bio: 'Hi there! I'm Sophia, a friendly and sophisticated companion. I love deep conversations, fine dining, and creating memorable experiences. I have a background in art history and enjoy visiting museums and galleries. Looking forward to meeting you!',
          services: ['Dinner Dates', 'Travel Companion', 'Cultural Events'],
          languages: ['English', 'Spanish', 'French'],
          height: 175,
          weight: 58,
          hairColor: 'Blonde',
          eyeColor: 'Blue',
          rating: 4.9,
          reviewCount: 47,
          hourlyRate: 300,
          isVerified: true,
          availableNow: true,
          imageUrl: 'https://i.pravatar.cc/400?img=1',
          images: [
            'https://i.pravatar.cc/400?img=1',
            'https://i.pravatar.cc/400?img=2',
            'https://i.pravatar.cc/400?img=3',
            'https://i.pravatar.cc/400?img=4'
          ],
          tags: ['Elite', 'Luxury', 'Verified', 'Highly Rated'],
          responseRate: 98,
          lastActive: new Date(),
          education: 'Bachelor in Fine Arts',
          interests: ['Art', 'Travel', 'Culinary Experiences', 'Literature'],
          socialLinks: {
            instagram: 'sophia_elite',
            twitter: 'sophia_luxury'
          }
        };
        
        setEscort(mockEscort);
      } catch (error) {
        console.error('Error fetching escort:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEscort();
  }, [id]);

  if (loading) {
    return (
      <MainLayout title="Loading..." showBreadcrumbs>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }

  if (!escort) {
    return (
      <MainLayout title="Escort Not Found" showBreadcrumbs>
        <div className="flex flex-col justify-center items-center min-h-[60vh]">
          <h2 className="text-2xl font-bold mb-2">Profile Not Found</h2>
          <p className="text-muted-foreground">The escort profile you're looking for doesn't exist or has been removed.</p>
          <Button className="mt-4" asChild>
            <a href="/escorts">Browse Escorts</a>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      title={`${escort.name}, ${escort.age}`}
      description={`${escort.location} • ${escort.gender}`}
      showBreadcrumbs
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
        {/* Left Column - Images */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <img
                src={escort.imageUrl || escort.images?.[0]}
                alt={escort.name}
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>
            {escort.images?.slice(1, 4).map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  src={img}
                  alt={`${escort.name} ${idx + 2}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
                {idx === 2 && escort.images && escort.images.length > 4 && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg">
                    <span className="text-white text-xl font-semibold">+{escort.images.length - 4} more</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Tabs defaultValue="about">
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">About Me</h3>
                    <p className="text-muted-foreground">{escort.bio}</p>
                    
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 mt-6">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Height</h4>
                        <p>{escort.height} cm</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Weight</h4>
                        <p>{escort.weight} kg</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Hair Color</h4>
                        <p>{escort.hairColor}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Eye Color</h4>
                        <p>{escort.eyeColor}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Education</h4>
                        <p>{escort.education}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Languages</h4>
                        <div className="flex gap-2 flex-wrap">
                          {escort.languages?.map(lang => (
                            <Badge key={lang} variant="outline">{lang}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Interests</h4>
                      <div className="flex gap-2 flex-wrap">
                        {escort.interests?.map(interest => (
                          <Badge key={interest} variant="secondary">{interest}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="services" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">Services Offered</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {escort.services?.map((service, idx) => (
                        <div key={idx} className="flex items-center p-3 border rounded-lg">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold">Client Reviews</h3>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 mr-1" fill="currentColor" />
                        <span className="font-semibold">{escort.rating}</span>
                        <span className="text-muted-foreground ml-1">({escort.reviewCount} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                              <User className="h-4 w-4" />
                            </div>
                            <span className="font-medium">James R.</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                            <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                            <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                            <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                            <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Sophia is incredibly charming and intelligent. Our dinner date was perfect, with engaging conversation and a genuine connection. Highly recommended!
                        </p>
                        <div className="text-xs text-muted-foreground mt-2">3 weeks ago</div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                              <User className="h-4 w-4" />
                            </div>
                            <span className="font-medium">Michael T.</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                            <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                            <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                            <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                            <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          It was a pleasure to attend an art exhibition with Sophia. Her knowledge of art history made the experience much more enriching. She's classy, punctual and very attentive.
                        </p>
                        <div className="text-xs text-muted-foreground mt-2">1 month ago</div>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        View All Reviews
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="availability" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">Availability</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center text-green-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span className="font-medium">Available Now</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {escort.availableNow ? 'Ready to meet today' : 'Check availability for today'}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
                        <Calendar className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-center text-muted-foreground">
                          Detailed availability calendar will be visible after verification
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Right Column - Contact & Booking */}
        <div>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground">{escort.location}</span>
                </div>
                {escort.isVerified && (
                  <Badge className="bg-green-500 hover:bg-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              
              <div className="mb-6">
                <div className="text-2xl font-bold text-primary">${escort.hourlyRate}/hr</div>
                <div className="text-sm text-muted-foreground">Minimum booking: 2 hours</div>
              </div>
              
              <Button className="w-full mb-3">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Now
              </Button>
              
              <Button variant="outline" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Book Appointment
              </Button>
              
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between mb-4">
                  <div className="flex items-center">
                    <BarChart className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Response Rate</span>
                  </div>
                  <span className="font-medium">{escort.responseRate}%</span>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">Response Time</span>
                  </div>
                  <span className="font-medium">~1 hour</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsFavorite(!isFavorite)}
                className={isFavorite ? "text-red-500" : ""}
              >
                <Heart className={isFavorite ? "fill-current" : ""} />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 />
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Safety Tips</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Meet in public places for first encounters</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Use our secure messaging system</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Share your meeting details with a trusted friend</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Report suspicious behavior immediately</span>
                </li>
              </ul>
              <Button variant="link" className="p-0 h-auto mt-2 text-sm">
                Learn more about safety
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default EscortDetailPage;
