import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Users, Zap, Shield, Star } from 'lucide-react';
import LinkButton from '@/components/ui/link-button';

interface UberPersona {
  id: string;
  displayName: string;
  imageUrl: string;
  online: boolean;
  availabilityText?: string;
  userType?: string;
  isVerified?: boolean;
}

const Featured = () => {
  const featuredPersonas: UberPersona[] = [
    {
      id: '1',
      displayName: 'Sophie',
      imageUrl: 'https://example.com/sophie.jpg',
      online: true,
      availabilityText: 'Available Now',
      userType: 'verified',
      isVerified: true
    },
    {
      id: '2',
      displayName: 'Jessica',
      imageUrl: 'https://example.com/jessica.jpg',
      online: false,
      availabilityText: 'Back in 2 hours',
      userType: 'premium',
      isVerified: true
    },
    {
      id: '3',
      displayName: 'Emma',
      imageUrl: 'https://example.com/emma.jpg',
      online: true,
      availabilityText: 'Available Now',
      userType: 'new',
      isVerified: false
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredPersonas.map((persona) => (
        <Card key={persona.id} className="overflow-hidden">
          <div className="h-48 bg-gray-200 relative">
            <div className="absolute top-2 right-2 flex gap-1">
              {persona.isVerified && (
                <Badge variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
              <Badge variant={persona.online ? "default" : "secondary"}>
                {persona.online ? 'Online' : 'Offline'}
              </Badge>
            </div>
          </div>
          <CardHeader className="p-4">
            <CardTitle className="text-lg">{persona.displayName}</CardTitle>
            <CardDescription>{persona.availabilityText}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-500" />
              <Star className="h-3 w-3 text-yellow-500" />
              <Star className="h-3 w-3 text-yellow-500" />
              <Star className="h-3 w-3 text-yellow-500" />
              <Star className="h-3 w-3 text-gray-300" />
              <span className="text-xs text-muted-foreground ml-1">(42)</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const Popular = () => {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">Top trending profiles this week...</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="flex items-center p-4 gap-4">
            <div className="h-12 w-12 rounded-full bg-gray-200"></div>
            <div className="flex-1">
              <h3 className="font-medium text-sm">Popular Profile {i}</h3>
              <p className="text-xs text-muted-foreground">1.{i}k viewers</p>
            </div>
            <Button size="sm" variant="ghost">View</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <MainLayout>
      <div className="container py-8">
        {/* Hero Section */}
        <section className="py-12 text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome to the Platform</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover, connect, and explore with thousands of users worldwide.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button size="lg">
              <Sparkles className="mr-2 h-4 w-4" />
              Explore
            </Button>
            <Button variant="outline" size="lg">
              <Users className="mr-2 h-4 w-4" />
              Meet People
            </Button>
          </div>
        </section>
        
        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">10k+</CardTitle>
              <CardDescription>Active Users</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">5k+</CardTitle>
              <CardDescription>Daily Messages</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">300+</CardTitle>
              <CardDescription>Live Streams</CardDescription>
            </CardHeader>
          </Card>
        </section>
        
        {/* Main Tabs */}
        <Tabs defaultValue="featured" className="py-8">
          <TabsList className="mb-6">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
          </TabsList>
          <TabsContent value="featured">
            <Featured />
          </TabsContent>
          <TabsContent value="popular">
            <Popular />
          </TabsContent>
        </Tabs>
        
        {/* Get Started */}
        <section className="py-12 text-center space-y-8">
          <div>
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="text-muted-foreground mt-2">Join our community today and start connecting.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <LinkButton to="/signup" variant="outline" size="lg" className="w-full sm:w-auto">
              Create an Account
            </LinkButton>
            <LinkButton to="/login" variant="default" size="lg" className="w-full sm:w-auto">
              Login
            </LinkButton>
          </div>
        </section>
        
        {/* Features */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" /> Advanced Matching
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Our AI-powered algorithm helps you find your perfect match based on your preferences and behavior.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5" /> Instant Messaging
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Connect with other users through our secure, feature-rich messaging platform.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" /> Verified Profiles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Our verification process ensures you're interacting with real people in a safe environment.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Home;
