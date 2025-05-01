
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MessageSquare, Wallet, User, Shield } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { useHermesFlow } from '@/hooks/useHermesFlow';
import { RecommendedActions } from '@/components/hermes/RecommendedActions';

const HomePage = () => {
  const navigate = useNavigate();
  const { trackEvent } = useHermesFlow();
  
  const handleNavigation = (path: string, label: string) => {
    trackEvent('homepage_navigation', { destination: path, label });
    navigate(path);
  };

  return (
    <MainLayout 
      title="Welcome to UberEscorts"
      description="The premier platform for escorts and clients"
      hideNavbar={false}
    >
      <div className="space-y-8">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 md:p-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Companion</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Browse through our selection of high-quality escorts, creators, and AI companions.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" onClick={() => handleNavigation('/escorts', 'Browse Escorts')}>
              Browse Escorts
            </Button>
            <Button size="lg" variant="outline" onClick={() => handleNavigation('/search', 'Search')}>
              Advanced Search
            </Button>
          </div>
        </section>

        {/* Quick access cards */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="cursor-pointer hover:bg-accent/10 transition-colors" onClick={() => handleNavigation('/search', 'Search')}>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Search className="h-10 w-10 text-primary mb-2" />
                <span className="font-medium">Search</span>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:bg-accent/10 transition-colors" onClick={() => handleNavigation('/messages', 'Messages')}>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <MessageSquare className="h-10 w-10 text-primary mb-2" />
                <span className="font-medium">Messages</span>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:bg-accent/10 transition-colors" onClick={() => handleNavigation('/wallet', 'Wallet')}>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Wallet className="h-10 w-10 text-primary mb-2" />
                <span className="font-medium">Wallet</span>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:bg-accent/10 transition-colors" onClick={() => handleNavigation('/profile', 'Profile')}>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <User className="h-10 w-10 text-primary mb-2" />
                <span className="font-medium">Profile</span>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Features and Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <section className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">Platform Features</h2>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-2 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  Safety First
                </h3>
                <p className="text-muted-foreground">
                  Our verification process ensures all users are real and trustworthy. 
                  Your safety and privacy are our top priorities.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-2">AI Companions</h3>
                <p className="text-muted-foreground mb-4">
                  Explore our selection of AI-powered companions for conversation and entertainment.
                </p>
                <Button variant="outline" onClick={() => handleNavigation('/ai-companions', 'AI Companions')}>
                  Explore AI Companions
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-2">Metaverse Experience</h3>
                <p className="text-muted-foreground mb-4">
                  Enter our immersive virtual environment and connect with companions in a whole new way.
                </p>
                <Button variant="outline" onClick={() => handleNavigation('/metaverse', 'Metaverse')}>
                  Enter Metaverse
                </Button>
              </CardContent>
            </Card>
          </section>
          
          <aside>
            {/* Personalized recommendations based on Hermes flow analytics */}
            <RecommendedActions className="sticky top-6" />
            
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-2">Get Noticed with PulseBoost</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Increase your profile visibility and engagement with our powerful boost system.
                </p>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => handleNavigation('/pulse-boost', 'Pulse Boost')}
                >
                  Boost Your Profile
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
