
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTitle } from '@/hooks/useTitle';
import { useAuth } from '@/hooks/auth/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AppLayout from '@/layouts/AppLayout';
import { Loader2, MapPin, Calendar, Star, Shield, MessageSquare, Heart, Share2, AlertCircle, BadgeCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import VerificationBadge from '@/components/verification/VerificationBadge';
import { VerificationLevels } from '@/utils/verification';
import { VerificationLevel } from '@/types/verification';
import ServiceTypeBadge from '@/components/escorts/filters/ServiceTypeBadge';

interface ProfileData {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  location: string;
  joinDate: Date;
  verificationLevel: VerificationLevel;
  services: string[];
  serviceTypes: string[];
  rating: number;
  reviewCount: number;
  languages: string[];
  gallery: string[];
  rates: {
    hourly?: number;
    halfHour?: number;
    overnight?: number;
    custom?: { label: string; price: number }[];
  };
  availability: {
    days: string[];
    hours: string;
  };
}

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('about');
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  
  const isOwnProfile = id === user?.id || id === 'me';
  
  useTitle(profile ? `${profile.displayName} | UberEscorts` : 'Profile | UberEscorts');
  
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock profile data
        const mockProfile: ProfileData = {
          id: id || 'profile-1',
          username: 'sophia_rivera',
          displayName: 'Sophia Rivera',
          avatar: `https://i.pravatar.cc/300?u=${id}`,
          bio: "Hello everyone! I'm Sophia, your next-door dream girl with a wild side. I love meeting new people and creating unforgettable experiences. When I'm not entertaining, you can find me practicing yoga or exploring local art galleries.",
          location: 'Los Angeles, CA',
          joinDate: new Date(2023, 2, 15),
          verificationLevel: 'premium',
          services: ['Massage', 'Companionship', 'Dinner Dates', 'Travel Companion'],
          serviceTypes: ['in-person', 'virtual'],
          rating: 4.9,
          reviewCount: 124,
          languages: ['English', 'Spanish'],
          gallery: Array(6).fill(null).map((_, i) => `https://picsum.photos/seed/${id || 'profile'}-${i}/500/300`),
          rates: {
            hourly: 300,
            halfHour: 200,
            overnight: 1500,
            custom: [
              { label: 'Weekend (3 hours)', price: 800 },
              { label: 'Full Day', price: 2000 }
            ]
          },
          availability: {
            days: ['Mon', 'Tue', 'Wed', 'Fri', 'Sat'],
            hours: '7:00 PM - 1:00 AM'
          }
        };
        
        setProfile(mockProfile);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          variant: 'destructive',
          title: 'Failed to load profile',
          description: 'An error occurred while loading the profile data.'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, [id, toast]);
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    
    toast({
      title: isFollowing ? 'Unfollowed' : 'Following',
      description: isFollowing ? 
        `You are no longer following ${profile?.displayName}` : 
        `You are now following ${profile?.displayName}`
    });
  };
  
  const handleMessage = () => {
    toast({
      title: 'Message Sent',
      description: `Your conversation with ${profile?.displayName} has been started.`
    });
  };
  
  const handleShare = () => {
    // Copy profile URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    
    toast({
      title: 'Link Copied',
      description: 'Profile link copied to clipboard'
    });
  };
  
  if (loading) {
    return (
      <AppLayout title="Profile">
        <div className="flex justify-center items-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }
  
  if (!profile) {
    return (
      <AppLayout title="Profile Not Found">
        <div className="container py-12 text-center">
          <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Profile Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The profile you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </AppLayout>
    );
  }
  
  return (
    <AppLayout title={profile.displayName}>
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback>{profile.displayName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <h1 className="text-2xl font-bold flex items-center gap-2">
                    {profile.displayName}
                    {profile.verificationLevel !== 'none' && <BadgeCheck className="h-5 w-5 text-blue-500" />}
                  </h1>
                  
                  <p className="text-muted-foreground mb-2">@{profile.username}</p>
                  
                  <div className="flex items-center gap-1 mb-4">
                    <VerificationBadge level={profile.verificationLevel} />
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span>{profile.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      ({profile.reviewCount} reviews)
                    </span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground text-sm mb-6">
                    <MapPin className="h-4 w-4 mr-1" />
                    {profile.location}
                  </div>
                  
                  <div className="flex gap-2 mb-4 w-full">
                    <Button 
                      className={`flex-1 ${isFollowing ? 'bg-primary/10 text-primary hover:bg-primary/20' : ''}`} 
                      variant={isFollowing ? 'outline' : 'default'}
                      onClick={handleFollow}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={handleMessage}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {profile.serviceTypes.map((type, index) => (
                      <ServiceTypeBadge key={index} service={type as any} />
                    ))}
                  </div>
                  
                  <div className="w-full">
                    <h3 className="text-sm font-medium mb-2 text-left">Languages</h3>
                    <div className="flex flex-wrap gap-1">
                      {profile.languages.map((language, index) => (
                        <Badge key={index} variant="outline">{language}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Profile Content */}
          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="rates">Rates</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">About Me</h2>
                    <p className="mb-6">{profile.bio}</p>
                    
                    <h3 className="text-lg font-medium mb-3">Services</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {profile.services.map((service, index) => (
                        <Badge key={index} variant="outline">{service}</Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      Member since {profile.joinDate.toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="gallery">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Gallery</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {profile.gallery.map((image, index) => (
                        <div key={index} className="aspect-video bg-muted rounded-md overflow-hidden">
                          <img 
                            src={image}
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="rates">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Rates</h2>
                    <div className="space-y-4">
                      {profile.rates.halfHour && (
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">30 Minutes</span>
                          <span>${profile.rates.halfHour}</span>
                        </div>
                      )}
                      
                      {profile.rates.hourly && (
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">1 Hour</span>
                          <span>${profile.rates.hourly}</span>
                        </div>
                      )}
                      
                      {profile.rates.overnight && (
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">Overnight</span>
                          <span>${profile.rates.overnight}</span>
                        </div>
                      )}
                      
                      {profile.rates.custom?.map((rate, index) => (
                        <div key={index} className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">{rate.label}</span>
                          <span>${rate.price}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 text-sm text-muted-foreground">
                      <p className="flex items-center">
                        <Shield className="h-4 w-4 mr-1" />
                        All rates are negotiable and may vary based on specific requirements
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="availability">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Availability</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Days Available</h3>
                        <div className="flex gap-2 flex-wrap">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                            <Badge 
                              key={day} 
                              variant={profile.availability.days.includes(day) ? 'default' : 'outline'}
                              className={!profile.availability.days.includes(day) ? 'opacity-50' : ''}
                            >
                              {day}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Hours</h3>
                        <p>{profile.availability.hours}</p>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <Button>
                          Book Appointment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Reviews</h2>
                      <Button>Write a Review</Button>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Mock reviews */}
                      {Array(3).fill(null).map((_, index) => (
                        <div key={index} className="border-b pb-4 mb-4">
                          <div className="flex items-center mb-2">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={`https://i.pravatar.cc/100?u=review-${index}`} />
                              <AvatarFallback>{['JD', 'MR', 'KT'][index].charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{['John D.', 'Maria R.', 'Kevin T.'][index]}</p>
                              <div className="flex items-center">
                                {Array(5).fill(null).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-3 w-3 ${i < [5, 4, 5][index] ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                                  />
                                ))}
                                <span className="ml-2 text-xs text-muted-foreground">
                                  {new Date(Date.now() - (index * 604800000)).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm">
                            {[
                              'Amazing experience! Sophia was very professional, punctual, and made our dinner date memorable. Highly recommended!',
                              'Great companion for the event. Well-spoken, elegant, and definitely turned heads. Will book again.',
                              'Excellent service and communication. Sophia went above and beyond to make the experience perfect.'
                            ][index]}
                          </p>
                        </div>
                      ))}
                      
                      <Button variant="outline" className="w-full">Load More Reviews</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
