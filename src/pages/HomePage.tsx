
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/auth/useAuth';
import { ArrowRight, MapPin, Film, Video, Gamepad2, Search } from 'lucide-react';

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero section */}
      <section className="mb-12 mt-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-lucoin bg-clip-text text-transparent">
            Welcome to UberEscorts
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Your premium platform for verified escorts, content creators, and immersive experiences
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {isAuthenticated ? (
              <>
                <Button size="lg" asChild>
                  <Link to="/search">
                    <Search className="mr-2 h-5 w-5" />
                    Explore Now
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/profile">
                    Your Profile
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/auth">Create Account</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* Services overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* In-person */}
          <Card className="overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-pink-900 to-pink-600 flex justify-center items-center">
              <MapPin className="h-16 w-16 text-white opacity-50" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">In-Person Escorts</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Connect with verified escorts for in-person experiences
              </p>
              <Button variant="default" className="w-full" asChild>
                <Link to="/escorts">Browse Escorts</Link>
              </Button>
            </CardContent>
          </Card>
          
          {/* Content creators */}
          <Card className="overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-purple-900 to-purple-600 flex justify-center items-center">
              <Film className="h-16 w-16 text-white opacity-50" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Content Creators</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Subscribe to exclusive content from premium creators
              </p>
              <Button variant="default" className="w-full" asChild>
                <Link to="/creators">Discover Creators</Link>
              </Button>
            </CardContent>
          </Card>
          
          {/* Live cams */}
          <Card className="overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-red-900 to-orange-600 flex justify-center items-center">
              <Video className="h-16 w-16 text-white opacity-50" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Live Cams</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Interactive live streams with your favorite performers
              </p>
              <Button variant="default" className="w-full" asChild>
                <Link to="/livecams">Watch Live</Link>
              </Button>
            </CardContent>
          </Card>
          
          {/* Metaverse */}
          <Card className="overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-blue-900 to-cyan-600 flex justify-center items-center">
              <Gamepad2 className="h-16 w-16 text-white opacity-50" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Metaverse</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Immersive virtual reality experiences and events
              </p>
              <Button variant="default" className="w-full" asChild>
                <Link to="/metaverse">Enter Metaverse</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Features or benefits section */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/20 inline-flex p-3 rounded-full mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Verified Profiles</h3>
              <p className="text-muted-foreground">
                All escorts and creators verify their identity for your safety and peace of mind
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/20 inline-flex p-3 rounded-full mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Secure Transactions</h3>
              <p className="text-muted-foreground">
                Encrypted payments and messaging for complete privacy and discretion
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/20 inline-flex p-3 rounded-full mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">HERMES-OXUM™</h3>
              <p className="text-muted-foreground">
                Cutting-edge AI optimization for the best possible user experience
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section>
        <Card className="border-primary">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to experience premium companionship?</h2>
            <p className="mb-6 text-muted-foreground">
              Join thousands of satisfied users on UberEscorts today
            </p>
            <Button size="lg" asChild>
              <Link to={isAuthenticated ? "/search" : "/auth"}>
                {isAuthenticated ? "Start Exploring" : "Create Your Account"}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

const Shield = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const Lock = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const Zap = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export default HomePage;
