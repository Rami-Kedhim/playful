
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Compass, MessageSquare, Wallet, User, Shield, Globe, Zap, Star, HeartPulse } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { useHermesFlow } from '@/hooks/useHermesFlow';
import { RecommendedActions } from '@/components/hermes/RecommendedActions';
import { ProfileVisibilityCard } from '@/components/hermes/ProfileVisibilityCard';
import { lucie } from '@/core/Lucie';
import { oxum } from '@/core/Oxum';
import { UberPersona } from '@/types/shared';

const HomePage = () => {
  const navigate = useNavigate();
  const { trackEvent, getJourneyInsights } = useHermesFlow();
  const [searchLocation, setSearchLocation] = useState('');
  const [featuredProfiles, setFeaturedProfiles] = useState<UberPersona[]>([]);
  const [systemStatus, setSystemStatus] = useState({ operational: true, latency: 120 });
  
  // Load featured profiles using Lucie
  React.useEffect(() => {
    const loadFeaturedProfiles = async () => {
      const profiles = await lucie.loadFeaturedPersonas();
      setFeaturedProfiles(profiles);
    };
    
    loadFeaturedProfiles();
  }, []);
  
  const handleNavigation = (path: string, label: string) => {
    trackEvent('homepage_navigation', { destination: path, label });
    navigate(path);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('search_initiated', { location: searchLocation });
    navigate('/search', { state: { location: searchLocation } });
  };

  return (
    <MainLayout 
      title="UberEscorts Ecosystem"
      description="Real • Virtual • Intelligent — Your Ultimate Connection"
      hideNavbar={false}
    >
      <div className="space-y-8">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-primary/20 via-primary/10 to-background rounded-lg p-8 md:p-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Ultimate Connection
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Browse through our selection of high-quality escorts, AI companions, and immersive metaverse experiences.
          </p>
          
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter location..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="bg-background/70 backdrop-blur"
              />
              <Button type="submit">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </form>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" onClick={() => handleNavigation('/escorts', 'Browse Escorts')}>
              Browse Escorts
            </Button>
            <Button size="lg" variant="outline" onClick={() => handleNavigation('/pulse-boost', 'Boost Visibility')}>
              <Zap className="mr-2 h-4 w-4" />
              Boost Visibility
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
            
            <Card className="cursor-pointer hover:bg-accent/10 transition-colors" onClick={() => handleNavigation('/metaverse', 'Metaverse')}>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Globe className="h-10 w-10 text-primary mb-2" />
                <span className="font-medium">Metaverse</span>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Featured profiles */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Featured Profiles</h2>
            <Button variant="ghost" onClick={() => handleNavigation('/escorts', 'View All')}>
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProfiles.map(profile => (
              <Card key={profile.id} className="overflow-hidden">
                <div className="aspect-[3/4] relative">
                  {profile.avatarUrl && (
                    <img 
                      src={profile.avatarUrl} 
                      alt={profile.name} 
                      className="object-cover w-full h-full"
                    />
                  )}
                  {profile.isVerified && (
                    <Badge className="absolute top-2 right-2 bg-primary">Verified</Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">{profile.displayName || profile.name}</h3>
                    {profile.isOnline && (
                      <span className="inline-flex h-2 w-2 bg-green-500 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{profile.location}</p>
                </CardContent>
                <CardFooter className="pt-0 pb-4 px-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleNavigation(`/persona/${profile.id}`, 'View Profile')}
                  >
                    View Profile
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Main features and recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <section className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">Platform Features</h2>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium">Safety First</h3>
                </div>
                <p className="text-muted-foreground">
                  Our verification process ensures all users are real and trustworthy. 
                  Your safety and privacy are our top priorities.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <HeartPulse className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium">AI Companions</h3>
                </div>
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
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium">Metaverse Experience</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Enter our immersive virtual environment and connect with companions in a whole new way.
                </p>
                <Button variant="outline" onClick={() => handleNavigation('/metaverse', 'Metaverse')}>
                  Enter Metaverse
                </Button>
              </CardContent>
            </Card>
            
            {/* Live Boost Monitor */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Live Boost Monitor
                </CardTitle>
                <CardDescription>
                  Real-time visibility boosting across the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Active boosts</span>
                    <span className="font-medium">{Math.floor(Math.random() * 100) + 50}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Top boost score</span>
                    <span className="font-medium">{Math.floor(Math.random() * 30) + 70}/100</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Peak hours</span>
                    <span className="font-medium">8PM - 11PM</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => handleNavigation('/pulse-boost', 'Boost Monitor')}
                >
                  View Detailed Stats
                </Button>
              </CardFooter>
            </Card>
          </section>
          
          <aside className="space-y-6">
            {/* Personalized recommendations based on Hermes flow analytics */}
            <RecommendedActions 
              className="sticky top-6" 
              onActionSelected={(action) => trackEvent('recommendation_clicked', { action })}
            />
            
            {/* Profile Visibility Card */}
            <ProfileVisibilityCard profileId="current-user" />
            
            {/* System Status */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <div 
                    className={`h-2 w-2 rounded-full ${systemStatus.operational ? 'bg-green-500' : 'bg-red-500'}`}
                  ></div>
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground pb-2">
                <div className="grid grid-cols-2 gap-1">
                  <span>Operational</span>
                  <span className="font-medium text-right">{systemStatus.operational ? 'Yes' : 'No'}</span>
                  <span>Latency</span>
                  <span className="font-medium text-right">{systemStatus.latency}ms</span>
                  <span>AI Models</span>
                  <span className="font-medium text-right">Active</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Journey Insights */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Your Journey Insights</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2 text-sm">
                  {getJourneyInsights().suggestions.map((suggestion, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <Star className="h-3 w-3 text-yellow-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{suggestion}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
