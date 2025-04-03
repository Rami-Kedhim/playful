
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import FeaturedContentSection from "@/components/home/FeaturedContentSection";
import LucoinSection from "@/components/home/LucoinSection";
import MetaverseSection from "@/components/home/MetaverseSection";
import TrustSection from "@/components/home/TrustSection";
import CtaSection from "@/components/home/CtaSection";
import LucieAssistant from "@/components/home/LucieAssistant";
import { featuredEscorts, featuredCreators } from "@/components/home/MockData";

const Index = () => {
  const [searchLocation, setSearchLocation] = useState("");

  return (
    <AppLayout>
      <HeroSection 
        searchLocation={searchLocation} 
        setSearchLocation={setSearchLocation} 
      />
      <FeaturesSection />
      <HowItWorksSection />
      <FeaturedContentSection 
        featuredEscorts={featuredEscorts} 
        featuredCreators={featuredCreators} 
      />
      <LucoinSection />
      <MetaverseSection />
      <TrustSection />
      <CtaSection />
      <LucieAssistant />
    </AppLayout>
  );
};

export default Index;
