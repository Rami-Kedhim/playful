
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedEscorts from '@/components/escorts/FeaturedEscorts';
import CtaSection from '@/components/home/CtaSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEscorts } from '@/hooks/useEscorts';
import { AppPaths } from '@/routes/routeConfig';
import { ArrowRight, Shield, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const { featuredEscorts, loading } = useEscorts();
  const [searchLocation, setSearchLocation] = useState('');
  const navigate = useNavigate();
  
  const handleSearchSubmit = () => {
    // Navigate to escorts page with location if set
    if (searchLocation) {
      navigate(`${AppPaths.ESCORTS}?location=${encodeURIComponent(searchLocation)}`);
    } else {
      navigate(AppPaths.ESCORTS);
    }
  };

  return (
    <Layout 
      showBreadcrumbs={false} 
      title="Premium Escort Services" 
      description="Find verified escorts & companions in your area"
      fullWidth
    >
      {/* Hero Section */}
      <HeroSection searchLocation={searchLocation} setSearchLocation={setSearchLocation} />
      
      {/* Featured Escorts Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Featured Escorts</h2>
              <p className="text-muted-foreground">Discover our top-rated escorts and companions</p>
            </div>
            <Button onClick={() => navigate(AppPaths.ESCORTS)} variant="outline">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <FeaturedEscorts 
            escorts={featuredEscorts || []} 
            loading={loading} 
            limit={8}
          />
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Premium Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore a wide range of high-quality services designed to provide the ultimate companionship experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 rounded-full bg-primary/10 mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>In-Person Companions</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Meet with verified companions for dinners, events, or private encounters.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 rounded-full bg-primary/10 mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Virtual Experiences</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Connect with escorts online for intimate virtual interactions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 rounded-full bg-primary/10 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Safe & Discreet</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  All encounters are arranged with complete privacy and safety in mind.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">How It Works</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Finding your perfect companion is easy, secure, and discrete with our simple process.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                <span className="text-primary font-bold text-xl">1</span>
              </div>
              <h3 className="font-bold text-xl">Search</h3>
              <p className="text-muted-foreground">
                Browse profiles based on your preferences and location.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                <span className="text-primary font-bold text-xl">2</span>
              </div>
              <h3 className="font-bold text-xl">Connect</h3>
              <p className="text-muted-foreground">
                Message your selected escort and arrange your meeting details.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
                <span className="text-primary font-bold text-xl">3</span>
              </div>
              <h3 className="font-bold text-xl">Meet</h3>
              <p className="text-muted-foreground">
                Enjoy your time with a professional, verified companion.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <CtaSection />
    </Layout>
  );
};

export default HomePage;
