
import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UnifiedLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Sparkles } from 'lucide-react';
import HomeHeader from '@/components/home/HomeHeader';
import ActionGrid from '@/components/home/ActionGrid';
import BoostLiveMonitor from '@/components/home/BoostLiveMonitor';
import HeroSection from '@/components/home/HeroSection';
import LucieHermesIntegration from '@/components/home/LucieHermesIntegration';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('');
  
  // Use useCallback for event handlers to prevent recreation on each render
  const handleExploreEscorts = useCallback(() => {
    navigate('/escorts');
  }, [navigate]);
  
  const handleExploreAI = useCallback(() => {
    navigate('/ai-companions');
  }, [navigate]);
  
  const handleExploreBrainHub = useCallback(() => {
    navigate('/brain-hub');
  }, [navigate]);
  
  const handleExploreMetaverse = useCallback(() => {
    navigate('/metaverse');
  }, [navigate]);

  // Handle Lucie being triggered
  const handleLucieTriggered = useCallback((reason: string) => {
    console.log('Lucie was triggered because:', reason);
    // Any additional logic for Lucie triggering
  }, []);

  // Mock stats for BoostLiveMonitor
  const boostStats = {
    activeBoosts: 124,
    topBoostScore: 98,
    averageVisibility: 76,
    peakHours: ['20:00-22:00'],
    recentChanges: [2, -1, 3, 1, -2, 4, 2]
  };

  return (
    <UnifiedLayout hideNavbar fullWidth className="px-0">
      {/* Hero Section with HomeHeader */}
      <HomeHeader onExploreClick={handleExploreEscorts} />
      
      {/* Main Hero Section */}
      <HeroSection 
        searchLocation={searchLocation} 
        setSearchLocation={setSearchLocation} 
      />

      <div className="container mx-auto px-4 py-12">
        {/* Action Grid */}
        <ActionGrid />
        
        {/* Boost Live Monitor */}
        <div className="mt-12">
          <BoostLiveMonitor stats={boostStats} isLoading={false} />
        </div>
        
        {/* Neural System Section */}
        <section className="py-16">
          <div className="text-center">
            <div className="inline-block mb-4">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto">
                <Brain className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">UberCore Neural System</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Our platform is powered by the advanced UberCore neural system, providing intelligent matching, personalized experiences, and robust security.
            </p>
            <Button asChild variant="outline">
              <Link to="/brain-hub">
                <Brain className="mr-2 h-4 w-4" />
                Explore Brain Hub
              </Link>
            </Button>
          </div>
        </section>
      </div>
      
      {/* Lucie Integration */}
      <LucieHermesIntegration 
        forceVisible={false}
        onLucieTriggered={handleLucieTriggered}
      />
    </UnifiedLayout>
  );
};

export default HomePage;
