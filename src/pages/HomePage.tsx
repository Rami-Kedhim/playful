
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Shield, ArrowRight, Star, Video, Gift, Heart } from "lucide-react";

// Demo profiles for the landing page
const demoEscorts = [
  {
    id: "escort-1",
    name: "Sophia",
    imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "New York, NY",
    verified: true,
    rating: 4.9,
    tags: ["VIP", "Travel", "Luxury"]
  },
  {
    id: "escort-2",
    name: "Isabella",
    imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Los Angeles, CA",
    verified: true,
    rating: 4.7,
    tags: ["GFE", "Dinner", "Events"]
  },
  {
    id: "escort-3",
    name: "Emma",
    imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Miami, FL",
    verified: true,
    rating: 4.8,
    tags: ["Elite", "Model", "VIP"]
  }
];

const demoCreators = [
  {
    id: "creator-1",
    name: "Victoria",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    subscribers: "125K",
    isPremium: true,
    tags: ["Exclusive", "Photos", "Videos"]
  },
  {
    id: "creator-2",
    name: "Natalie",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    subscribers: "89K",
    isPremium: true,
    tags: ["VIP", "Daily", "Intimate"]
  },
  {
    id: "creator-3",
    name: "Jasmine",
    imageUrl: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    subscribers: "210K",
    isPremium: true,
    tags: ["Premium", "Stories", "BTS"]
  }
];

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [searchLocation, setSearchLocation] = useState("");
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 space-y-6">
              <Badge variant="outline" className="mb-4 py-1.5">
                <Shield className="h-3.5 w-3.5 mr-1" />
                100% Verified Escorts & Clients
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                  The Web3 Platform
                </span>
                <br />
                for Secure Adult Connections
              </h1>
              
              <p className="text-xl text-gray-300 max-w-xl">
                UberEscorts unifies verification, secure payments, live content, and GPS safety in one powerful ecosystem.
              </p>
              
              <div className="relative mt-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Enter your location"
                      className="pl-10 h-12 bg-background/50 backdrop-blur-md border-white/10"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                    />
                  </div>
                  <Button size="lg" asChild>
                    <Link to="/escorts">
                      Browse Escorts <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-6 mt-8">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <span className="text-xs">{num}K+</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Join thousands of verified users on our platform
                  </p>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-4 -left-4 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="h-40 overflow-hidden rounded-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" 
                        alt="Escort" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="h-56 overflow-hidden rounded-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" 
                        alt="Escort" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="h-56 overflow-hidden rounded-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" 
                        alt="Escort" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="h-40 overflow-hidden rounded-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" 
                        alt="Escort" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-background/95">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">All Your Adult Needs in One Platform</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              UberEscorts combines the best features of escort directories, content creation platforms, and live streaming services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <Card className="border border-muted bg-muted/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Verified Profiles</h3>
                <p className="text-muted-foreground text-sm">
                  All escorts and clients go through our rigorous verification process for maximum safety.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 2 */}
            <Card className="border border-muted bg-muted/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Live Streaming</h3>
                <p className="text-muted-foreground text-sm">
                  Watch and interact with models in real-time through our high-quality streaming platform.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 3 */}
            <Card className="border border-muted bg-muted/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Gift className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Premium Content</h3>
                <p className="text-muted-foreground text-sm">
                  Subscribe to creators for exclusive photos, videos, and personalized experiences.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 4 */}
            <Card className="border border-muted bg-muted/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">AI Companions</h3>
                <p className="text-muted-foreground text-sm">
                  Experience the future with our AI-powered virtual companions for chat and intimacy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Featured Escorts Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Escorts</h2>
            <Button variant="outline" asChild>
              <Link to="/escorts">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoEscorts.map(escort => (
              <Link to={`/escorts/${escort.id}`} key={escort.id}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={escort.imageUrl} 
                      alt={escort.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                    {escort.verified && (
                      <Badge className="absolute top-3 left-3 bg-primary/70 text-primary-foreground">
                        <Shield className="h-3 w-3 mr-1" /> Verified
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-lg">{escort.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                        {escort.rating}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{escort.location}</p>
                    <div className="flex flex-wrap gap-1">
                      {escort.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Creators Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Premium Creators</h2>
            <Button variant="outline" asChild>
              <Link to="/creators">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoCreators.map(creator => (
              <Link to={`/creators/${creator.id}`} key={creator.id}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={creator.imageUrl} 
                      alt={creator.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                    {creator.isPremium && (
                      <Badge className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-amber-300 text-black border-0">
                        Premium
                      </Badge>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <div className="text-white text-sm">
                        <span className="font-medium">{creator.subscribers}</span> subscribers
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{creator.name}</h3>
                    <div className="flex flex-wrap gap-1">
                      {creator.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary/20 to-pink-500/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join UberEscorts?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Create your account today to browse profiles, connect with escorts, subscribe to creators, and watch live streams.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/register">Create Account</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/escorts">Browse Profiles</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
