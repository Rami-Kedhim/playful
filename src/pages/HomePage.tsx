import React, { useState } from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturedContentSection from '@/components/home/FeaturedContentSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TrustSection from '@/components/home/TrustSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import MetaverseSection from '@/components/home/MetaverseSection';
import LucoinSection from '@/components/home/LucoinSection';
import CtaSection from '@/components/home/CtaSection';
import WelcomeAlert from '@/components/layout/WelcomeAlert';
import { useAuth } from '@/hooks/auth/useAuth';

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchLocation, setSearchLocation] = useState('');
  
  return (
    <div className="min-h-screen">
      {/* Show welcome alert for authenticated users */}
      {isAuthenticated && user && (
        <div className="container mx-auto px-4 pt-6">
          <WelcomeAlert username={user.username || 'User'} />
        </div>
      )}
      
      {/* Hero section */}
      <HeroSection 
        searchLocation={searchLocation} 
        setSearchLocation={setSearchLocation} 
      />
      
      {/* Other sections */}
      <TrustSection />
      <FeaturedContentSection />
      <HowItWorksSection />
      <FeaturesSection />
      <MetaverseSection />
      <LucoinSection />
      <CtaSection />
    </div>
  );
};

export default HomePage;
