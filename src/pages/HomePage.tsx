
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import FeaturedContentSection from "@/components/home/FeaturedContentSection";
import LucoinSection from "@/components/home/LucoinSection";
import TrustSection from "@/components/home/TrustSection";
import CtaSection from "@/components/home/CtaSection";
import LucieAssistant from "@/components/home/LucieAssistant";
import MetaverseSection from "@/components/home/MetaverseSection";
import WelcomeAlert from "@/components/layout/WelcomeAlert";
import { useAuth } from "@/hooks/auth/useAuthContext";
import { Helmet } from "react-helmet-async";

// Sample data for featured profiles
const featuredEscorts = [
  {
    id: "escort-1",
    name: "Sophia",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "New York, NY",
    verified: true,
    featured: true,
    rating: 4.9,
    serviceType: "both" as const,
    isLive: false
  },
  {
    id: "escort-2",
    name: "Isabella",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Los Angeles, CA",
    verified: true,
    rating: 4.7,
    serviceType: "in-person" as const,
    isLive: false
  },
  {
    id: "escort-3",
    name: "Emma",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Chicago, IL",
    verified: true,
    rating: 4.8,
    serviceType: "virtual" as const,
    isLive: true
  },
  {
    id: "escort-4",
    name: "Olivia",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Miami, FL",
    verified: true,
    featured: true,
    rating: 4.9,
    serviceType: "both" as const,
    isLive: false
  }
];

// Sample data for featured creators
const featuredCreators = [
  {
    id: "creator-1",
    name: "Victoria",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Las Vegas, NV",
    verified: true,
    isPremium: true,
    rating: 4.9,
    serviceType: "virtual" as const,
    isLive: true
  },
  {
    id: "creator-2",
    name: "Natalie",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Atlanta, GA",
    verified: true,
    rating: 4.7,
    serviceType: "virtual" as const,
    isLive: false
  },
  {
    id: "creator-3",
    name: "Jasmine",
    avatar: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Seattle, WA",
    verified: true,
    isPremium: true,
    rating: 4.8,
    serviceType: "virtual" as const,
    isLive: true
  },
  {
    id: "creator-4",
    name: "Madison",
    avatar: "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Denver, CO",
    verified: true,
    rating: 4.6,
    serviceType: "virtual" as const,
    isLive: false
  }
];

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchLocation, setSearchLocation] = useState("");
  
  // Extract username from user metadata if available
  const username = user?.username || user?.email?.split('@')[0] || 'User';
  
  return (
    <>
      <Helmet>
        <title>UberEscorts - Premium Web3 Adult Platform</title>
        <meta name="description" content="UberEscorts - The ultimate Web3 adult platform with verified escorts, content creators, secure payments, and metaverse integration." />
      </Helmet>
      
      {isAuthenticated && user && (
        <div className="container mx-auto px-4 pt-6">
          <WelcomeAlert username={username} />
        </div>
      )}
      
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
    </>
  );
};

export default HomePage;
