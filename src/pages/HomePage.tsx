
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import { FeaturedContent } from '@/components/home/FeaturedContent';
import NeuralHealthSummary from '@/components/neural/NeuralHealthSummary';

const mockEscorts = [
  {
    id: "escort-1",
    title: "Sophia",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    type: "escort",
    rating: 4.9,
    price: "$300/hr",
    location: "New York, NY",
    featured: true
  },
  {
    id: "escort-2",
    title: "Jessica",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    type: "escort",
    rating: 4.7,
    price: "$250/hr",
    location: "Los Angeles, CA"
  },
  {
    id: "escort-3",
    title: "Emma",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    type: "escort",
    rating: 4.8,
    price: "$280/hr",
    location: "Miami, FL",
    featured: true
  },
  {
    id: "escort-4",
    title: "Isabella",
    image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHBvcnRyYWl0fGVufDB8fDB8fHww",
    type: "escort",
    rating: 4.6,
    price: "$220/hr",
    location: "Chicago, IL"
  }
];

const HomePage: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState("");
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 space-y-12">
        <HeroSection 
          searchLocation={searchLocation}
          setSearchLocation={setSearchLocation}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FeaturedContent 
              title="Popular Escorts"
              items={mockEscorts}
              type="escort"
              viewAllLink="/escorts"
            />
          </div>
          <div>
            <NeuralHealthSummary />
          </div>
        </div>
        
        <FeaturesSection />
      </div>
    </MainLayout>
  );
};

export default HomePage;
