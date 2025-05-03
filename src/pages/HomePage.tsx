
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UnifiedLayout } from '@/layouts';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import HomeHeader from '@/components/home/HomeHeader';
import ActionGrid from '@/components/home/ActionGrid';
import BoostLiveMonitor from '@/components/home/BoostLiveMonitor';
import HeroSection from '@/components/home/HeroSection';
import { AppPaths } from '@/routes/routeConfig';
import FeaturesSection from '@/components/home/FeaturesSection';
import TrustSection from '@/components/home/TrustSection';
import MetaverseSection from '@/components/home/MetaverseSection';
import CtaSection from '@/components/home/CtaSection';

const HomePage = () => {
  console.log('Rendering HomePage'); // Debug log
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = React.useState('');
  
  // Use React.useCallback for event handlers
  const handleExploreEscorts = React.useCallback(() => {
    navigate(AppPaths.ESCORTS);
  }, [navigate]);
  
  const handleExploreAI = React.useCallback(() => {
    navigate(AppPaths.AI_COMPANION);
  }, [navigate]);
  
  const handleExploreBrainHub = React.useCallback(() => {
    navigate(AppPaths.BRAIN_HUB);
  }, [navigate]);
  
  // Mock stats for BoostLiveMonitor
  const boostStats = {
    activeBoosts: 124,
    topBoostScore: 98,
    averageVisibility: 76,
    peakHours: ['20:00-22:00'],
    recentChanges: [2, -1, 3, 1, -2, 4, 2]
  };

  return (
    <UnifiedLayout hideNavbar fullWidth>
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
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* Trust Section */}
        <TrustSection />
      </div>
      
      {/* Metaverse Section */}
      <MetaverseSection />
      
      {/* CTA Section */}
      <CtaSection />
      
      {/* Call to Action */}
      <div className="container mx-auto px-4 mt-12 mb-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to explore?</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={handleExploreEscorts}>
            Find Escorts <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={handleExploreAI}>
            AI Companions <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={handleExploreBrainHub}>
            Brain Hub <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default HomePage;
