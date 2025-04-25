import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import { FeaturedContent } from '@/components/home/FeaturedContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MessageSquare, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/auth';
import WelcomeAlert from '@/components/layout/WelcomeAlert';

// Mock data - in a real app this would come from an API
const mockFeaturedEscorts = [
  {
    id: '1',
    title: 'Sophie',
    image: 'https://picsum.photos/seed/escort1/300/400',
    type: 'escort',
    rating: 4.8,
    location: 'New York',
    username: 'sophie_nyc',
    featured: true
  },
  {
    id: '2',
    title: 'Jessica',
    image: 'https://picsum.photos/seed/escort2/300/400',
    type: 'escort',
    rating: 4.5,
    location: 'Los Angeles',
    username: 'jessica_la',
    featured: false
  },
  {
    id: '3',
    title: 'Emily',
    image: 'https://picsum.photos/seed/escort3/300/400',
    type: 'escort',
    rating: 4.9,
    location: 'Chicago',
    username: 'emily_chi',
    featured: true
  },
  {
    id: '4',
    title: 'Ashley',
    image: 'https://picsum.photos/seed/escort4/300/400',
    type: 'escort',
    rating: 4.7,
    location: 'Miami',
    username: 'ashley_mia',
    featured: false
  }
];

// Create livecam and creator mock data of the correct type
const mockFeaturedLivecams = mockFeaturedEscorts.map((item) => ({
  ...item,
  type: 'livecam'
}));

const mockFeaturedCreators = mockFeaturedEscorts.map((item) => ({
  ...item,
  type: 'creator'
}));

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchLocation, setSearchLocation] = useState('');

  return (
    <Layout>
      {isAuthenticated && user && (
        <div className="container py-4">
          <WelcomeAlert username={user.name || user.email?.split('@')[0] || 'User'} />
        </div>
      )}
      
      <HeroSection 
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
      />
      
      <section className="py-12 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>10k+ Active Users</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Join our growing community of verified users
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <span>5k+ Daily Messages</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with others through our secure messaging
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>100% Verified</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All profiles are verified for your safety
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <FeaturedContent
        title="Featured Escorts"
        items={mockFeaturedEscorts}
        type="escort"
        viewAllLink="/escorts"
      />
      
      <FeaturedContent
        title="Live Now"
        items={mockFeaturedLivecams}
        type="livecam"
        viewAllLink="/livecams"
      />
      
      <FeaturedContent
        title="Top Creators"
        items={mockFeaturedCreators}
        type="creator"
        viewAllLink="/creators"
      />
    </Layout>
  );
};

export default Home;
