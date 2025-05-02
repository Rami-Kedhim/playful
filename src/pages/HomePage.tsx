
import React from 'react';
import { useState } from 'react';
import HeroSection from '@/components/home/HeroSection';
import ActionGrid from '@/components/home/ActionGrid';
import FeaturedContentSection from '@/components/home/FeaturedContentSection';
import MetaverseSection from '@/components/home/MetaverseSection';
import TrustSection from '@/components/home/TrustSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CtaSection from '@/components/home/CtaSection';
import { featuredEscorts, featuredCreators } from '@/data/mockData';

const HomePage: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState('');

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection 
        searchLocation={searchLocation} 
        setSearchLocation={setSearchLocation}
      />
      
      <div className="container mx-auto px-4 py-8">
        <ActionGrid />
        
        <div className="space-y-12">
          <FeaturedContentSection
            title="Featured Escorts"
            profiles={featuredEscorts}
            viewMoreLink="/escorts"
          />
          
          <FeaturedContentSection
            title="Featured AI Companions"
            profiles={featuredCreators.map(p => ({ ...p, isPremium: true }))}
            viewMoreLink="/ai-companions"
          />
          
          <FeaturedContentSection
            title="Popular Creators"
            profiles={featuredCreators.slice(0, 3)}
            viewMoreLink="/creators"
          />
        </div>
        
        <FeaturesSection />
        <CtaSection />
        <TrustSection />
      </div>
    </div>
  );
};

export default HomePage;
