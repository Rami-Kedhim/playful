
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Users, Calendar, MessageCircle, Shield } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/20 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to UberEscorts
            </h1>
            <p className="text-xl mb-8 text-muted-foreground">
              Browse our directory of verified escorts and content creators.
              Connect safely and securely with professionals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/escorts">Browse Escort Directory</Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link to="/auth">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Platform Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card">
              <CardContent className="pt-6">
                <div className="mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Escort Directory</h3>
                <p className="text-muted-foreground">
                  Browse our verified escort directory with detailed profiles.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Booking System</h3>
                <p className="text-muted-foreground">
                  Schedule appointments easily with our organizational calendar.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Messaging</h3>
                <p className="text-muted-foreground">
                  Private messaging system for secure communications.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Verification</h3>
                <p className="text-muted-foreground">
                  Trust our verification process for genuine profiles.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Legal Notice Section */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-3">Legal Notice</h3>
            <p className="text-muted-foreground mb-4">
              UberEscorts only provides a connection interface and does not facilitate or earn money from real-life encounters. 
              All services provided through our platform are for organizational purposes only.
            </p>
            <p className="text-sm text-muted-foreground">
              UberEscorts generates revenue exclusively through optional premium features such as profile boosting, 
              subscriptions for advanced features, and AI-assisted services.
            </p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="font-semibold">© 2025 UberEscorts. All rights reserved.</p>
            </div>
            <div className="flex gap-4">
              <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              <Link to="/help" className="text-primary hover:underline">Help Center</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
