
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import HermesSeoHome from '@/components/seo/HermesSeoHome';
import HermesSeoOnboarding from '@/components/seo/HermesSeoOnboarding';
import { useToast } from '@/components/ui/use-toast';

const HomePage = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const { toast } = useToast();
  
  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    toast({
      title: "Welcome to HERMES SEO!",
      description: "Your AI-powered SEO optimization suite is ready to use.",
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {showOnboarding && <HermesSeoOnboarding onComplete={handleOnboardingComplete} />}
      <HermesSeoHome />
    </div>
  );
};

export default HomePage;
