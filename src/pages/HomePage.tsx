
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, MapPin, Star, Zap, Shield, Users, Clock, Sparkles } from 'lucide-react';
import HomeHeader from '@/components/home/HomeHeader';
import { FeaturedContent } from '@/components/home/FeaturedContent';
import Layout from '@/layouts/Layout';
import { AppPaths } from '@/routes/routeConfig';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('');
  const [activeCategory, setActiveCategory] = useState('escorts');

  const featuredEscorts = [
    {
      id: 'esc1',
      title: 'Sophia Lynn',
      image: 'https://placehold.co/300x450/210033/f5f5f5?text=Sophia',
      type: 'escort' as const,
      rating: 4.9,
      price: '$300/hr',
      location: 'Los Angeles, CA',
      featured: true
    },
    {
      id: 'esc2',
      title: 'Emma Watson',
      image: 'https://placehold.co/300x450/210033/f5f5f5?text=Emma',
      type: 'escort' as const,
      rating: 4.8,
      price: '$280/hr',
      location: 'New York, NY'
    },
    {
      id: 'esc3',
      title: 'Jessica Parker',
      image: 'https://placehold.co/300x450/210033/f5f5f5?text=Jessica',
      type: 'escort' as const,
      rating: 4.7,
      price: '$250/hr',
      location: 'Miami, FL'
    },
    {
      id: 'esc4',
      title: 'Olivia Marks',
      image: 'https://placehold.co/300x450/210033/f5f5f5?text=Olivia',
      type: 'escort' as const,
      rating: 4.8,
      price: '$300/hr',
      location: 'Chicago, IL'
    }
  ];

  const featuredCreators = [
    {
      id: 'cr1',
      title: 'Lexi Star',
      image: 'https://placehold.co/300x450/1A1F2C/f5f5f5?text=Lexi',
      type: 'creator' as const,
      rating: 4.9,
      price: '$9.99/mo',
      username: '@lexistar',
      avatar: 'https://placehold.co/80x80/1A1F2C/f5f5f5?text=L'
    },
    {
      id: 'cr2',
      title: 'Amber Rose',
      image: 'https://placehold.co/300x450/1A1F2C/f5f5f5?text=Amber',
      type: 'creator' as const,
      rating: 4.7,
      price: '$12.99/mo',
      username: '@amberrose',
      avatar: 'https://placehold.co/80x80/1A1F2C/f5f5f5?text=A'
    },
    {
      id: 'cr3',
      title: 'Mia Khalifa',
      image: 'https://placehold.co/300x450/1A1F2C/f5f5f5?text=Mia',
      type: 'creator' as const,
      rating: 5.0,
      price: '$15.99/mo',
      username: '@miakhalifa',
      avatar: 'https://placehold.co/80x80/1A1F2C/f5f5f5?text=M'
    },
    {
      id: 'cr4',
      title: 'Jasmine Wild',
      image: 'https://placehold.co/300x450/1A1F2C/f5f5f5?text=Jasmine',
      type: 'creator' as const,
      rating: 4.8,
      price: '$8.99/mo',
      username: '@jasminewild',
      avatar: 'https://placehold.co/80x80/1A1F2C/f5f5f5?text=J'
    }
  ];

  const livecamArtists = [
    {
      id: 'lc1',
      title: 'Nina Luxury',
      image: 'https://placehold.co/300x450/6E59A5/f5f5f5?text=Nina',
      type: 'livecam' as const,
      rating: 4.9,
      price: '$3.99/min',
      location: 'Live Now'
    },
    {
      id: 'lc2',
      title: 'Candy Sweet',
      image: 'https://placehold.co/300x450/6E59A5/f5f5f5?text=Candy',
      type: 'livecam' as const,
      rating: 4.7,
      price: '$2.99/min',
      location: 'Live Now'
    },
    {
      id: 'lc3',
      title: 'Kira Diamond',
      image: 'https://placehold.co/300x450/6E59A5/f5f5f5?text=Kira',
      type: 'livecam' as const,
      rating: 4.8,
      price: '$4.99/min',
      location: 'Coming at 8PM'
    },
    {
      id: 'lc4',
      title: 'Stella Nova',
      image: 'https://placehold.co/300x450/6E59A5/f5f5f5?text=Stella',
      type: 'livecam' as const,
      rating: 4.6,
      price: '$2.49/min',
      location: 'Live Now'
    }
  ];
  
  const handleExploreClick = () => {
    navigate('/escorts');
  };

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: 'Verified Profiles',
      description: 'Every profile undergoes our strict verification process to ensure authenticity and safety for all users.'
    },
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: 'Location-Based Search',
      description: 'Find escorts, creators, and performers near you with our advanced location-based search system.'
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'AI Matching',
      description: 'Our neural network matches you with perfect companions based on your preferences and past interactions.'
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: 'Boost System',
      description: 'Increase your visibility and get more bookings with our powerful boost system.'
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: 'Instant Booking',
      description: 'Book appointments instantly with real-time availability checking and confirmation.'
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: 'Premium Content',
      description: 'Access exclusive content from top creators and performers across the platform.'
    }
  ];

  const testimonials = [
    {
      name: 'James R.',
      role: 'Client',
      content: 'The verification process gave me peace of mind when booking. Had an amazing experience with Sarah, who was exactly as described in her profile.'
    },
    {
      name: 'Sophie M.',
      role: 'Escort',
      content: 'Since joining the platform, my bookings have increased by 200%. The boost system really works, and the clients are respectful and reliable.'
    },
    {
      name: 'Michael T.',
      role: 'Client',
      content: 'The search filters helped me find exactly what I was looking for. The booking process was seamless and secure.'
    }
  ];

  const faq = [
    { 
      question: 'How does verification work?',
      answer: 'Our verification process requires government ID, a selfie with ID, and a background check. This ensures all profiles are authentic and safe.'
    },
    { 
      question: 'How does the booking system work?',
      answer: 'You can book directly through profiles by selecting available time slots. Payment is secure and held in escrow until the appointment is confirmed.'
    },
    { 
      question: 'How do I boost my profile?',
      answer: 'You can purchase boost packages in your dashboard. Boosting increases your visibility in search results and the featured sections on the homepage.'
    },
    { 
      question: 'What payment methods are accepted?',
      answer: 'We accept credit cards, UBX tokens, and cryptocurrency for all payments and subscriptions on the platform.'
    }
  ];

  return (
    <Layout
      hideNavbar
    >
      {/* Hero Header */}
      <HomeHeader onExploreClick={handleExploreClick} />
      
      {/* Platform Categories Tabs */}
      <section className="py-16 bg-background">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Explore Our Universe</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover the perfect companion for any occasion, from in-person experiences to virtual connections and premium content.
            </p>
          </div>
          
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="grid grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="escorts">Escorts</TabsTrigger>
              <TabsTrigger value="creators">Creators</TabsTrigger>
              <TabsTrigger value="livecams">Livecams</TabsTrigger>
            </TabsList>
            
            <TabsContent value="escorts" className="mt-10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Top Escorts Near You</h3>
                <Button variant="outline" onClick={() => navigate(AppPaths.ESCORTS)}>
                  View All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredEscorts.map((escort) => (
                  <Card 
                    key={escort.id} 
                    className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
                    onClick={() => navigate(`/escorts/${escort.id}`)}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={escort.image}
                        alt={escort.title}
                        className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
                      />
                      {escort.featured && (
                        <Badge className="absolute top-2 right-2 bg-primary">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{escort.title}</h4>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-foreground">{escort.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{escort.location}</span>
                      </div>
                      <p className="font-medium">{escort.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="creators" className="mt-10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Trending Creators</h3>
                <Button variant="outline" onClick={() => navigate('/creators')}>
                  View All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredCreators.map((creator) => (
                  <Card 
                    key={creator.id} 
                    className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
                    onClick={() => navigate(`/creators/${creator.id}`)}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={creator.image}
                        alt={creator.title}
                        className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{creator.title}</h4>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-foreground">{creator.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <img 
                          src={creator.avatar} 
                          alt={creator.username}
                          className="w-5 h-5 rounded-full"
                        />
                        <span>{creator.username}</span>
                      </div>
                      <p className="font-medium">{creator.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="livecams" className="mt-10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Live Now</h3>
                <Button variant="outline" onClick={() => navigate('/livecams')}>
                  View All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {livecamArtists.map((artist) => (
                  <Card 
                    key={artist.id} 
                    className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
                    onClick={() => navigate(`/livecams/${artist.id}`)}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={artist.image}
                        alt={artist.title}
                        className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="bg-red-500 text-white">
                          Live
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{artist.title}</h4>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-foreground">{artist.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <span>{artist.location}</span>
                      </div>
                      <p className="font-medium">{artist.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Experience the most advanced and secure escort and companion platform with our cutting-edge features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-background p-6 rounded-lg shadow-sm flex flex-col items-center text-center"
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Boost System CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/20 via-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full" />
                <div className="relative z-10">
                  <Zap className="h-16 w-16 text-primary mb-6" />
                  <h2 className="text-4xl font-bold mb-4">Boost Your Visibility</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Stand out from the crowd with our powerful boost system. Get more visibility, more matches, and more bookings.
                  </p>
                  <Button size="lg" onClick={() => navigate('/pulse/boost')}>
                    <Zap className="mr-2 h-5 w-5" /> Get Boosted
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-background p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Boost Statistics</h3>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <span>Average profile views increase</span>
                    <Badge variant="outline" className="ml-2">+320%</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Average booking increase</span>
                    <Badge variant="outline" className="ml-2">+210%</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Search result position</span>
                    <Badge variant="outline" className="ml-2">Top 10</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Featured in recommended section</span>
                    <Badge variant="outline" className="ml-2">Yes</Badge>
                  </li>
                </ul>
                
                <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                  <h4 className="font-medium mb-2">Current Boost Analytics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Boosts</p>
                      <p className="text-2xl font-bold">324</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. Visibility</p>
                      <p className="text-2xl font-bold">+68%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Testimonials</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Hear from our satisfied users about their experiences on the platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-secondary/5">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="italic">&ldquo;{testimonial.content}&rdquo;</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Find answers to the most common questions about our platform.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y">
            {faq.map((item, index) => (
              <div key={index} className="py-6">
                <h3 className="text-xl font-semibold mb-2">{item.question}</h3>
                <p className="text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/20 to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of users already enjoying our platform. Sign up now for free and discover a world of possibilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/escorts')}>
              Browse Escorts
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/auth')}>
              Sign Up Free
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
