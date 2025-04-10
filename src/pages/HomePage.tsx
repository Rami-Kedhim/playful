
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Shield, Star, Users, Verified, MessageSquare, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/auth/useAuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const HomePage = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Featured escorts for demonstration
  const featuredEscorts = [
    {
      id: "escort-1",
      name: "Sophia",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=500",
      location: "New York",
      verificationLevel: "premium",
      rating: 4.9,
      price: 250,
      tags: ["GFE", "Dinner Date", "Travel"]
    },
    {
      id: "escort-2",
      name: "Isabella",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=500",
      location: "Los Angeles",
      verificationLevel: "enhanced",
      rating: 4.8,
      price: 300,
      tags: ["Massage", "Overnight", "Couples"]
    },
    {
      id: "escort-3",
      name: "Emma",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=500",
      location: "Miami",
      verificationLevel: "basic",
      rating: 4.7,
      price: 200,
      tags: ["Role Play", "Dinner Date", "GFE"]
    },
  ];

  // Show welcome message
  useEffect(() => {
    toast({
      title: "Welcome to UberEscorts",
      description: "Find verified companions and create meaningful connections.",
      variant: "default",
    });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/escorts?location=${encodeURIComponent(searchLocation)}`);
  };

  return (
    <AppLayout>
      <Helmet>
        <title>UberEscorts | Premium Verified Escort Platform</title>
        <meta name="description" content="UberEscorts - The premier platform for verified escorts with secure payments and user verification." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background/80 to-background py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <Badge variant="outline" className="mb-4">
              <Shield className="h-3.5 w-3.5 mr-1.5" />
              100% Verified Companions
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                Find Your Perfect Match
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              UberEscorts provides a secure platform with verified companions, ensuring authenticity and safety for all users.
            </p>

            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <div className="relative flex-grow">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Where are you looking?"
                  className="pl-10 h-12"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              <Button size="lg" type="submit">
                Find Escorts <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Escorts */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Escorts</h2>
            <Button variant="outline" onClick={() => navigate("/escorts")}>
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEscorts.map((escort) => (
              <Card key={escort.id} className="overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img 
                    src={escort.image} 
                    alt={escort.name} 
                    className="object-cover h-full w-full transition-transform hover:scale-105"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className={`
                      ${escort.verificationLevel === 'premium' ? 'bg-primary' : 
                        escort.verificationLevel === 'enhanced' ? 'bg-blue-500' : 
                        'bg-green-500'}
                    `}>
                      <Verified className="h-3 w-3 mr-1" />
                      {escort.verificationLevel.charAt(0).toUpperCase() + escort.verificationLevel.slice(1)}
                    </Badge>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-medium">{escort.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-sm">{escort.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    {escort.location}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {escort.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-primary font-medium mt-1">
                    ${escort.price}/hour
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex gap-2">
                  <Button 
                    className="flex-1" 
                    size="sm" 
                    onClick={() => navigate(`/escorts/${escort.id}`)}
                  >
                    View Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center"
                    onClick={() => isAuthenticated ? navigate(`/messages?escort=${escort.id}`) : navigate('/auth')}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">How UberEscorts Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Create an Account</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sign up for a free account to browse profiles, save favorites, and connect with verified escorts.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate('/auth')}>
                  Get Started
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Complete our verification process to ensure safety and trust on both sides.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => isAuthenticated ? navigate('/profile') : navigate('/auth')}>
                  Get Verified
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Message, book appointments, and enjoy secure interactions with your preferred companions.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => navigate('/escorts')}>
                  Browse Escorts
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Match?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of verified users who have found their perfect companions on UberEscorts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/auth')}
            >
              Sign Up Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-white hover:bg-white/10"
              onClick={() => navigate('/escorts')}
            >
              Browse Escorts
            </Button>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <Badge variant="outline" className="mb-4">Trust & Safety</Badge>
            <h2 className="text-3xl font-bold mb-4">Your Safety is Our Priority</h2>
            <p className="text-muted-foreground">
              UberEscorts implements multiple layers of verification and security measures to ensure a safe experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "ID Verification",
                description: "All escorts verify their identity before joining our platform"
              },
              {
                title: "Secure Messaging",
                description: "End-to-end encrypted communications for your privacy"
              },
              {
                title: "Secure Payments",
                description: "Protected payment processing with multiple options"
              },
              {
                title: "24/7 Support",
                description: "Our team is always available to help with any issues"
              }
            ].map((item, idx) => (
              <Card key={idx} className="text-center">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default HomePage;
