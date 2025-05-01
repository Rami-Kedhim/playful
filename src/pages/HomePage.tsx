
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { lucie } from '@/core/Lucie';
import { oxum } from '@/core/Oxum';
import { Container } from '@/components/ui/container';
import { ScrollRevealGroup } from '@/components/ui/scroll-reveal-group';
import { UberPersona } from '@/types/uberPersona';
import HeroSection from '@/components/home/HeroSection';
import FeaturedPersonas from '@/components/home/FeaturedPersonas';
import ActionGrid from '@/components/home/ActionGrid';
import BoostLiveMonitor from '@/components/home/BoostLiveMonitor';
import LucieSystemHUD from '@/components/home/LucieSystemHUD';
import CtaSection from '@/components/home/CtaSection';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('');
  const [personas, setPersonas] = useState<UberPersona[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [boostStats, setBoostStats] = useState<any>(null);
  const [systemStatus, setSystemStatus] = useState<any>(null);

  useEffect(() => {
    const loadFeaturedPersonas = async () => {
      setIsLoading(true);
      try {
        // Use Lucie to load featured personas
        const featuredPersonas = await lucie.loadFeaturedPersonas();
        setPersonas(featuredPersonas);
        
        // Get the boost statistics from Oxum
        const boostData = {
          activeBoosts: 42,
          topBoostScore: 89,
          averageVisibility: 65,
          peakHours: ['18:00', '22:00'],
          recentChanges: [+5, -2, +8, +4, -1, +3]
        };
        setBoostStats(boostData);
        
        // Get system status from Lucie
        setSystemStatus(lucie.getSystemStatus());
      } catch (error) {
        console.error('Error loading featured personas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedPersonas();
  }, []);

  const handleExploreClick = () => {
    navigate('/escorts');
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section with Call to Action */}
      <HeroSection 
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
      />
      
      <ScrollRevealGroup
        animation="fade-up"
        staggerDelay={0.1}
        containerClassName="space-y-16 pb-16"
      >
        {/* Live Boost Monitor */}
        <Container className="mt-8">
          <BoostLiveMonitor stats={boostStats} isLoading={isLoading} />
        </Container>
        
        {/* Featured Personas Section */}
        <Container>
          <FeaturedPersonas personas={personas} isLoading={isLoading} />
        </Container>
        
        {/* Action Grid */}
        <Container>
          <ActionGrid />
        </Container>
        
        {/* System HUD */}
        <Container>
          <LucieSystemHUD systemStatus={systemStatus} isLoading={isLoading} />
        </Container>
        
        {/* Call to Action */}
        <CtaSection />
      </ScrollRevealGroup>
    </div>
  );
};

export default HomePage;
