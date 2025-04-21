
import { useState, useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import FeaturedContentSection from "@/components/home/FeaturedContentSection";
import UBXSection from "@/components/home/UBXSection";
import TrustSection from "@/components/home/TrustSection";
import CtaSection from "@/components/home/CtaSection";
import WelcomeAlert from "@/components/layout/WelcomeAlert";
import { useAuth } from "@/hooks/auth/useAuth";
import { toast } from "@/hooks/use-toast";

import { mockCreators, mockLivecams } from "@/data/mockData";
import { AppRoutes } from "@/utils/navigation";

const featuredEscorts = mockLivecams;
const featuredCreators = mockCreators;

const Index = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    toast({
      title: "Welcome to UberEscorts",
      description: "Discover verified escorts and creators with UBX tokens for secure transactions.",
      variant: "success",
    });
  }, []);

  return (
    <>
      {isAuthenticated && user && (
        <div className="container mx-auto px-4 pt-6">
          <WelcomeAlert username={user.username || "User"} />
        </div>
      )}

      <HeroSection searchLocation={searchLocation} setSearchLocation={setSearchLocation} />

      <FeaturesSection />

      <HowItWorksSection />

      <div className="container mx-auto px-4 py-8 space-y-10">
        <FeaturedContentSection
          title="Featured Escorts"
          profiles={featuredEscorts}
          viewMoreLink={AppRoutes.ESCORTS}
        />

        <FeaturedContentSection
          title="Featured Creators"
          profiles={featuredCreators}
          viewMoreLink={AppRoutes.CREATORS}
        />
      </div>

      <UBXSection />

      <TrustSection />

      <CtaSection />
    </>
  );
};

export default Index;
