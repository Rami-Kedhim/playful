
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, ArrowRight, Heart, Star, Shield, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/layouts/Layout';
import { AppPaths } from '@/routes/routeConfig';
import LucieHermesIntegration from '@/components/home/LucieHermesIntegration';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CtaSection from '@/components/home/CtaSection';

interface FeaturedItem {
  id: string;
  title: string;
  image: string;
  type: "escort" | "creator" | "livecam";
  rating: number;
  price: string;
  location: string;
  featured: boolean;
}

const HomePage = () => {
  const [searchLocation, setSearchLocation] = useState('');
  
  // Sample featured content
  const featuredItems: FeaturedItem[] = [
    {
      id: '1',
      title: 'Sophia',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500&auto=format&fit=crop',
      type: 'escort',
      rating: 4.9,
      price: '$200/hr',
      location: 'New York',
      featured: true
    },
    {
      id: '2',
      title: 'Emma',
      image: 'https://images.unsplash.com/photo-1535468850893-d6e543fbd7f5?q=80&w=500&auto=format&fit=crop',
      type: 'escort',
      rating: 4.8,
      price: '$180/hr',
      location: 'Los Angeles',
      featured: false
    },
    {
      id: '3',
      title: 'Olivia',
      image: 'https://images.unsplash.com/photo-1521341057461-6eb5f40b07ab?q=80&w=500&auto=format&fit=crop',
      type: 'creator',
      rating: 5.0,
      price: '$15/mo',
      location: 'Miami',
      featured: true
    },
    {
      id: '4',
      title: 'Ava',
      image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=500&auto=format&fit=crop',
      type: 'livecam',
      rating: 4.7,
      price: '$5/min',
      location: 'Chicago',
      featured: false
    }
  ];

  return (
    <Layout fullWidth hideHeader={false}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Perfect Match in Minutes
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Browse through thousands of verified escorts, companions, and AI personalities.
              Connect with exactly what you're looking for.
            </p>
            
            <div className="bg-card border shadow-sm rounded-lg p-4 flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="What are you looking for?"
                  className="pl-10 pr-4 py-6"
                />
              </div>
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Location"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10 pr-4 py-6"
                />
              </div>
              <Link to="/escorts">
                <Button size="lg" className="w-full md:w-auto py-6">
                  Search
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Profiles</h2>
            <Link to="/escorts" className="text-primary flex items-center">
              View all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-64">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                  {item.featured && (
                    <Badge className="absolute top-2 right-2 bg-primary">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="text-sm">{item.location}</span>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {item.type === 'escort' ? 'Escort' : 
                       item.type === 'creator' ? 'Creator' : 'LiveCam'}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span>{item.rating}</span>
                    </div>
                    <span className="font-medium">{item.price}</span>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Link to={`/escorts/${item.id}`} className="flex-1">
                      <Button variant="default" size="sm" className="w-full">
                        View Profile
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose UberEscorts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border p-6 rounded-lg text-center">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Safety First</h3>
              <p className="text-muted-foreground">
                All profiles are verified with our advanced security system.
                Enjoy peace of mind with our safety features.
              </p>
            </div>
            
            <div className="bg-card border p-6 rounded-lg text-center">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Brain className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Matching</h3>
              <p className="text-muted-foreground">
                Our Lucie AI system helps you find your perfect match based on
                your preferences and compatibility.
              </p>
            </div>
            
            <div className="bg-card border p-6 rounded-lg text-center">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Star className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Experience</h3>
              <p className="text-muted-foreground">
                High-quality service with verified reviews and ratings to
                ensure you get the best experience possible.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-primary">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Create Account</h3>
              <p className="text-muted-foreground">
                Sign up for free in minutes with basic information
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-primary">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Browse Profiles</h3>
              <p className="text-muted-foreground">
                Search for escorts based on your preferences
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-primary">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Connect</h3>
              <p className="text-muted-foreground">
                Message and arrange meetings securely
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-bold text-primary">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Enjoy</h3>
              <p className="text-muted-foreground">
                Meet in person or virtually and enjoy your time
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CtaSection />
      
      {/* Lucie AI Integration */}
      <LucieHermesIntegration forceVisible={false} />
    </Layout>
  );
};

export default HomePage;
