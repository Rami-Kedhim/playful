
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sparkles, ArrowRight, Star, Heart, MapPin, TrendingUp, Users, Gem } from 'lucide-react';
import Layout from '@/layouts/Layout';
import LucieAssistant from '@/components/ai/LucieAssistant';
import BoostLiveMonitor from '@/components/home/BoostLiveMonitor';
import { FeaturedContent } from '@/components/home/FeaturedContent';
import CtaSection from '@/components/home/CtaSection';
import ContentCard from '@/components/home/ContentCard';
import ActionGrid from '@/components/home/ActionGrid';
import useUberCoreNeuralMonitor from '@/hooks/useUberCoreNeuralMonitor';

const SAMPLE_ESCORTS = [
  {
    id: '1',
    title: 'Sophia',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
    type: 'escort',
    rating: 4.9,
    price: '$300/hr',
    location: 'New York',
    featured: true,
    username: 'sophia_nyc'
  },
  {
    id: '2',
    title: 'Isabella',
    image: 'https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f',
    type: 'escort',
    rating: 4.8,
    price: '$250/hr',
    location: 'Miami',
    username: 'bella_miami'
  },
  {
    id: '3',
    title: 'Emma',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df',
    type: 'escort',
    rating: 4.7,
    price: '$280/hr',
    location: 'Los Angeles',
    username: 'emma_la'
  },
  {
    id: '4',
    title: 'Olivia',
    image: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43',
    type: 'escort',
    rating: 4.9,
    price: '$350/hr',
    location: 'Chicago',
    featured: true,
    username: 'olivia_chi'
  }
];

const SAMPLE_CREATORS = [
  {
    id: '1',
    title: 'Jessica',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    type: 'creator',
    rating: 4.8,
    price: '$15/mo',
    username: 'jessica_creates',
    avatar: 'https://i.pravatar.cc/150?img=28'
  },
  {
    id: '2',
    title: 'Ava',
    image: 'https://images.unsplash.com/photo-1536063211352-0b94219f6212',
    type: 'creator',
    rating: 4.9,
    price: '$20/mo',
    featured: true,
    username: 'ava_premium',
    avatar: 'https://i.pravatar.cc/150?img=29'
  },
  {
    id: '3',
    title: 'Mia',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
    type: 'creator',
    rating: 4.7,
    price: '$12/mo',
    username: 'mia_content',
    avatar: 'https://i.pravatar.cc/150?img=30'
  },
  {
    id: '4',
    title: 'Lily',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    type: 'creator',
    rating: 4.8,
    price: '$18/mo',
    username: 'lily_xoxo',
    avatar: 'https://i.pravatar.cc/150?img=31'
  }
];

const SAMPLE_LIVECAMS = [
  {
    id: '1',
    title: 'Chloe',
    image: 'https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f',
    type: 'livecam',
    rating: 4.9,
    price: '$5/min',
    username: 'chloe_live'
  },
  {
    id: '2',
    title: 'Luna',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
    type: 'livecam',
    rating: 4.8,
    price: '$4/min',
    username: 'luna_cam',
    featured: true
  },
  {
    id: '3',
    title: 'Zoe',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df',
    type: 'livecam',
    rating: 4.7,
    price: '$4.5/min',
    username: 'zoe_stream'
  },
  {
    id: '4',
    title: 'Victoria',
    image: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43',
    type: 'livecam',
    rating: 4.8,
    price: '$6/min',
    username: 'victoria_vip',
    featured: true
  }
];

const HomePage: React.FC = () => {
  const { startMonitoring, health, systemMetrics } = useUberCoreNeuralMonitor();
  const [isLucieVisible, setIsLucieVisible] = useState(false);
  
  // Simulate boost statistics
  const [boostStats, setBoostStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Start UberCore monitoring
    startMonitoring();
    
    // Simulate loading boost statistics
    setTimeout(() => {
      setBoostStats({
        activeBoosts: 124,
        topBoostScore: 98,
        averageVisibility: 72,
        peakHours: ["8:00 PM"],
        recentChanges: [5, -2, 7, 3, -1, 4, 6, 8]
      });
      setLoading(false);
    }, 1500);
    
    // Show Lucie after a delay
    setTimeout(() => {
      setIsLucieVisible(true);
    }, 3000);
  }, [startMonitoring]);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/30 to-background pt-16 pb-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 space-y-6">
              <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1">
                <Sparkles className="mr-1 h-3 w-3" />
                AI-Powered Platform
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Welcome to the <span className="text-primary">UberEscorts</span> Ecosystem
              </h1>
              
              <p className="text-lg text-muted-foreground md:text-xl max-w-lg">
                Discover premium escorts, content creators, and immersive experiences in our AI-driven platform.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Browse Escorts <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Explore Creators
                </Button>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Avatar key={i} className="border-2 border-background w-8 h-8">
                      <AvatarImage src={`https://i.pravatar.cc/48?img=${20 + i}`} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="text-muted-foreground">
                  Joined by <span className="font-bold text-foreground">10,000+</span> users
                </span>
              </div>
            </div>
            
            <div className="flex-1 relative">
              <div className="relative bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-lg p-1">
                <img
                  src="https://images.unsplash.com/photo-1551292831-023188e78222?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="UberEscorts Experience"
                  className="rounded-lg object-cover w-full aspect-[4/3]"
                />
                
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-medium">4.9</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-background rounded-lg shadow-lg p-4 flex items-center gap-3">
                <div className="bg-primary/20 rounded-full p-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">AI-Enhanced Experience</p>
                  <p className="text-xs text-muted-foreground">Powered by Lucie</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Quick Actions Grid */}
        <ActionGrid />
        
        {/* Boost Live Monitor */}
        <BoostLiveMonitor stats={boostStats} isLoading={loading} />
        
        {/* Featured Escorts */}
        <FeaturedContent
          title="Premium Escorts"
          items={SAMPLE_ESCORTS}
          type="escort"
          viewAllLink="/escorts"
        />
        
        {/* Featured Content Creators */}
        <FeaturedContent
          title="Top Content Creators"
          items={SAMPLE_CREATORS}
          type="creator"
          viewAllLink="/creators"
        />
        
        {/* Featured Live Cams */}
        <FeaturedContent
          title="Live Now"
          items={SAMPLE_LIVECAMS}
          type="livecam"
          viewAllLink="/livecams"
        />
        
        {/* Services Section */}
        <section className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Premium Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our exclusive range of services designed to provide exceptional experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-8 w-8 text-primary" />,
                title: "Verified Profiles",
                description: "All profiles are thoroughly verified to ensure authenticity and safety for our users"
              },
              {
                icon: <MapPin className="h-8 w-8 text-primary" />,
                title: "Global Network",
                description: "Access our exclusive network of escorts and creators from around the world"
              },
              {
                icon: <Gem className="h-8 w-8 text-primary" />,
                title: "Premium Experience",
                description: "Enjoy premium features and personalized recommendations from our AI system"
              }
            ].map((service, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* CTA Section */}
        <CtaSection />
      </div>
      
      {/* Lucie AI Assistant */}
      {isLucieVisible && (
        <LucieAssistant initialPrompt="Welcome to UberEscorts! I'm Lucie, your AI assistant. How can I enhance your experience today?" />
      )}
    </Layout>
  );
};

export default HomePage;
