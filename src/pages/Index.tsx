import { useState, useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import FeaturedContentSection from "@/components/home/FeaturedContentSection";
import UBXSection from "@/components/home/UBXSection";
import TrustSection from "@/components/home/TrustSection";
import CtaSection from "@/components/home/CtaSection";
import LucieAssistant from "@/components/home/LucieAssistant";
import MetaverseSection from "@/components/home/MetaverseSection";
import WelcomeAlert from "@/components/layout/WelcomeAlert";
import { useAuth } from "@/hooks/auth/useAuth";
import { toast } from "@/hooks/use-toast";
import { featuredEscorts, featuredCreators } from "@/data/mockData";

const Index = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchLocation, setSearchLocation] = useState("");
  
  // Show a welcome toast when the component mounts
  useEffect(() => {
    toast({
      title: "Welcome to Oxum",
      description: "Find your perfect match today!",
      variant: "success",
    });
  }, []);
  
  return (
    <>
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
      <FeaturesSection />
      <HowItWorksSection />
      
      {/* Featured Content Sections */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        <FeaturedContentSection 
          title="Featured Escorts" 
          profiles={featuredEscorts} 
          viewMoreLink="/escorts" 
        />
        
        <FeaturedContentSection 
          title="Featured Creators" 
          profiles={featuredCreators} 
          viewMoreLink="/creators" 
        />
      </div>
      
      <UBXSection />
      <MetaverseSection />
      <TrustSection />
      <CtaSection />
      <LucieAssistant />
    </>
  );
};

export default Index;
