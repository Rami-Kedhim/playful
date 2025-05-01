
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CtaSection from '@/components/home/CtaSection';
import { featuredService } from '@/core/services/featuredService';
import FeaturedPersonas from '@/components/home/FeaturedPersonas';
import { Container } from '@/components/ui/container';
import { ScrollRevealGroup } from '@/components/ui/scroll-reveal-group';
import { UberPersona } from '@/types/uberPersona';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('');
  const [personas, setPersonas] = useState<UberPersona[]>([]);

  useEffect(() => {
    const loadFeaturedPersonas = async () => {
      try {
        const featuredPersonas = await featuredService.loadFeaturedPersonas();
        setPersonas(featuredPersonas);
      } catch (error) {
        console.error('Error loading featured personas:', error);
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
        containerClassName="space-y-24 pb-24"
      >
        {/* Features */}
        <FeaturesSection />
        
        {/* Featured Personas Section */}
        <Container>
          <FeaturedPersonas personas={personas} />
        </Container>
        
        {/* Call to Action */}
        <CtaSection />
      </ScrollRevealGroup>
    </div>
  );
};

export default HomePage;
