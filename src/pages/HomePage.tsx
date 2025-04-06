
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

// Sample data for featured escorts
const featuredEscorts = [
  {
    id: "1",
    name: "Sophia",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "New York",
    verified: true,
    rating: 4.9,
    serviceType: "both" as const,
    isLive: false,
    featured: true
  },
  {
    id: "2",
    name: "Emma",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Los Angeles",
    verified: true,
    rating: 4.8,
    serviceType: "in-person" as const,
    isLive: true
  },
  // Add more sample data as needed
];

// Sample data for featured creators
const featuredCreators = [
  {
    id: "3",
    name: "Olivia",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Miami",
    verified: true,
    rating: 4.7,
    serviceType: "virtual" as const,
    isLive: false
  },
  {
    id: "4",
    name: "Victoria",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Las Vegas",
    verified: true,
    rating: 4.9,
    serviceType: "virtual" as const,
    isLive: true,
    isPremium: true
  },
  // Add more sample data as needed
];

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
      <FeaturedContentSection 
        featuredEscorts={featuredEscorts}
        featuredCreators={featuredCreators}
      />
      <HowItWorksSection />
      <FeaturesSection />
      <MetaverseSection />
      <LucoinSection />
      <CtaSection />
    </div>
  );
};

export default HomePage;
