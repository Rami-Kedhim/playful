
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import { useState } from 'react';
import ActionGrid from '@/components/home/ActionGrid';
import FeaturedContentSection from '@/components/home/FeaturedContentSection';
import MetaverseSection from '@/components/home/MetaverseSection';

const profilesData = [
  {
    id: '1',
    name: 'Sophia',
    imageUrl: 'https://source.unsplash.com/random/300x300/?portrait,woman,1',
    location: 'New York',
    rating: 4.8,
    isPremium: true,
    price: 150,
  },
  {
    id: '2',
    name: 'Emma',
    imageUrl: 'https://source.unsplash.com/random/300x300/?portrait,woman,2',
    location: 'Los Angeles',
    rating: 4.6,
    isPremium: false,
    price: 120,
  },
  {
    id: '3',
    name: 'Michael',
    imageUrl: 'https://source.unsplash.com/random/300x300/?portrait,man,1',
    location: 'Miami',
    rating: 4.9,
    isPremium: true,
    price: 180,
  },
  {
    id: '4',
    name: 'David',
    imageUrl: 'https://source.unsplash.com/random/300x300/?portrait,man,2',
    location: 'Chicago',
    rating: 4.7,
    isPremium: false,
    price: 140,
  },
];

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
            profiles={profilesData}
            viewMoreLink="/escorts"
          />
          
          <FeaturedContentSection
            title="Featured AI Companions"
            profiles={profilesData.map(p => ({ ...p, isPremium: true }))}
            viewMoreLink="/ai-companions"
          />
          
          <FeaturedContentSection
            title="Popular Creators"
            profiles={profilesData.slice(0, 3)}
            viewMoreLink="/creators"
          />
        </div>
      </div>
      
      <MetaverseSection />
    </div>
  );
};

export default HomePage;
