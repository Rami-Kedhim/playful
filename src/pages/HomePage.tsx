
import React from 'react';
import { useAuth } from '@/hooks/auth/useAuthContext';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Heart, MessageSquare, Calendar, Gift, Shield, Clock } from 'lucide-react';

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto p-4 md:p-6">
        {/* Hero Section */}
        <section className="py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="mb-2 px-3 py-1 text-sm font-medium">
                Welcome to UberEscorts
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Find Your Perfect Match
              </h1>
              <p className="text-lg text-muted-foreground">
                Connect with verified companions for in-person meetings or virtual experiences in our secure and private platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {!isAuthenticated ? (
                  <>
                    <Button size="lg" onClick={() => navigate('/auth')} className="px-8">
                      Get Started
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => navigate('/auth?tab=register')}>
                      Sign Up
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="lg" onClick={() => navigate('/escorts')} className="px-8">
                      Browse Escorts
                    </Button>
                    <Button size="lg" variant="outline" onClick={() => navigate('/profile')}>
                      View Profile
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1523371054106-bbf50d92cf58?q=80&w=1000&auto=format&fit=crop"
                alt="UberEscorts Experience"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Premium Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience our premium platform with unique features designed for your comfort and security.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border shadow-md">
              <CardHeader className="pb-2">
                <Search className="h-6 w-6 text-primary mb-2" />
                <CardTitle>Smart Matching</CardTitle>
                <CardDescription>Find escorts that match your preferences and requirements.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our advanced filtering system helps you find exactly what you're looking for.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border shadow-md">
              <CardHeader className="pb-2">
                <Shield className="h-6 w-6 text-primary mb-2" />
                <CardTitle>Verified Profiles</CardTitle>
                <CardDescription>All escorts are verified for your safety and peace of mind.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We ensure every escort on our platform passes our thorough verification process.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border shadow-md">
              <CardHeader className="pb-2">
                <MessageSquare className="h-6 w-6 text-primary mb-2" />
                <CardTitle>Secure Messaging</CardTitle>
                <CardDescription>Private and encrypted communication channels.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Chat securely with escorts before booking to ensure a perfect match.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 bg-muted/30 rounded-lg p-8 my-12">
          <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Search</h3>
              <p className="text-sm text-muted-foreground">Browse through our verified escorts and find your perfect match</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Connect</h3>
              <p className="text-sm text-muted-foreground">Message escorts directly to discuss your preferences and requirements</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Book</h3>
              <p className="text-sm text-muted-foreground">Schedule in-person meetings or virtual experiences at your convenience</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Enjoy</h3>
              <p className="text-sm text-muted-foreground">Experience premium services with peace of mind and complete satisfaction</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!isAuthenticated && (
          <section className="bg-primary text-primary-foreground rounded-lg p-8 my-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
                <p>Join thousands of satisfied users on our platform today.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="secondary" onClick={() => navigate('/auth')}>
                  Login
                </Button>
                <Button variant="secondary" onClick={() => navigate('/auth?tab=register')}>
                  Sign Up
                </Button>
              </div>
            </div>
          </section>
        )}
        
        {/* User Profile Section (if authenticated) */}
        {isAuthenticated && user && (
          <section className="py-6 my-6">
            <Card className="border shadow-md">
              <CardHeader>
                <CardTitle>Welcome Back, {user.username || user.email.split('@')[0]}</CardTitle>
                <CardDescription>Your personal UberEscorts dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="flex items-center justify-start gap-2" onClick={() => navigate('/favorites')}>
                    <Heart className="h-4 w-4" />
                    <span>My Favorites</span>
                  </Button>
                  <Button variant="outline" className="flex items-center justify-start gap-2" onClick={() => navigate('/messages')}>
                    <MessageSquare className="h-4 w-4" />
                    <span>Messages</span>
                  </Button>
                  <Button variant="outline" className="flex items-center justify-start gap-2" onClick={() => navigate('/bookings')}>
                    <Clock className="h-4 w-4" />
                    <span>My Bookings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </main>
      
      <footer className="bg-background border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} UberEscorts. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
