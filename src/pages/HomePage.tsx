
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FeaturedContent } from '@/components/home/FeaturedContent';
import Layout from '@/layouts/Layout';
import { ArrowRight, MapPin, Shield, Star, Users } from 'lucide-react';
import { AppPaths } from '@/routes/routeConfig';
import { useAuth } from '@/hooks/auth';

// Sample featured escorts for the homepage
const featuredEscorts = [
  {
    id: "e1",
    title: "Sofia",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=500&auto=format&fit=crop",
    type: "escort",
    rating: 4.9,
    price: "$200/hr",
    location: "New York",
    featured: true
  },
  {
    id: "e2",
    title: "Maria",
    image: "https://images.unsplash.com/photo-1484800089236-7ae8f5dffc8e?q=80&w=500&auto=format&fit=crop",
    type: "escort",
    rating: 4.8,
    price: "$180/hr",
    location: "Los Angeles",
    featured: true
  },
  {
    id: "e3",
    title: "Jasmine",
    image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=500&auto=format&fit=crop",
    type: "escort",
    rating: 4.7,
    price: "$220/hr",
    location: "Miami",
    featured: true
  },
  {
    id: "e4",
    title: "Amelia",
    image: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?q=80&w=500&auto=format&fit=crop",
    type: "escort",
    rating: 4.9,
    price: "$250/hr",
    location: "Chicago",
    featured: false
  }
];

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Layout fullWidth hideHeader>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/80 to-primary">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6">
            Find Your Perfect Companion
          </h1>
          <p className="text-xl text-white/90 text-center mb-8 max-w-2xl">
            UberEscorts brings you verified profiles and safe bookings for an unforgettable experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="px-8">
              <Link to={AppPaths.ESCORTS}>Browse Escorts</Link>
            </Button>
            {!isAuthenticated && (
              <Button asChild size="lg" variant="secondary" className="px-8">
                <Link to="/auth">Join Now</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose UberEscorts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-2 text-primary" />
              <CardTitle>Verified Profiles</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                All escort profiles undergo our strict verification process to ensure authenticity and safety.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <Users className="h-12 w-12 mx-auto mb-2 text-primary" />
              <CardTitle>Quality Companions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Our platform features high-quality companions for any occasion, from dinner dates to travel.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <Star className="h-12 w-12 mx-auto mb-2 text-primary" />
              <CardTitle>Trusted Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Real client reviews help you make informed decisions about which escort to choose.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Escorts */}
      <FeaturedContent
        title="Featured Escorts"
        items={featuredEscorts}
        type="escort"
        viewAllLink={AppPaths.ESCORTS}
      />

      {/* Popular Locations */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Popular Locations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {["New York", "Los Angeles", "Miami", "Las Vegas", "Chicago", "Dallas", "San Francisco", "Boston"].map(city => (
              <Link 
                key={city} 
                to={`${AppPaths.ESCORTS}?location=${encodeURIComponent(city)}`}
                className="group relative h-48 rounded-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="text-white text-center">
                    <MapPin className="h-6 w-6 mx-auto mb-2" />
                    <h3 className="text-xl font-bold">{city}</h3>
                    <p className="text-sm text-white/80">View Escorts</p>
                  </div>
                </div>
                <img 
                  src={`https://source.unsplash.com/500x300/?${city.toLowerCase()},city`} 
                  alt={`${city}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link to={AppPaths.ESCORTS}>
                View All Locations <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Date?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied clients who've found their ideal companions through UberEscorts.
        </p>
        <Button asChild size="lg" className="px-8">
          <Link to={isAuthenticated ? AppPaths.ESCORTS : "/auth"}>
            {isAuthenticated ? "Browse Escorts" : "Get Started"}
          </Link>
        </Button>
      </section>
    </Layout>
  );
};

export default HomePage;
