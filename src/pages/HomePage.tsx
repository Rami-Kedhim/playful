
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import FeaturedContent from '@/components/home/FeaturedContent';
import NeuralHealthSummary from '@/components/neural/NeuralHealthSummary';

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 space-y-12">
        <HeroSection />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FeaturedContent />
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
