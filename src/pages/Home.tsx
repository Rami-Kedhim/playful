
import React from 'react';
import { Link } from 'react-router-dom';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { EnhancedCard, EnhancedCardHeader, EnhancedCardContent } from '@/components/ui/enhanced-card';
import { useResponsive } from '@/hooks/useMobileResponsive';
import { Users, Image, MessageCircle, BarChart3 } from 'lucide-react';
import { analyticsService } from '@/services/analyticsService';

const Home: React.FC = () => {
  const { isMobile, isTablet, deviceType } = useResponsive();
  
  // Track page view
  React.useEffect(() => {
    analyticsService.trackPageView();
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      {/* Hero Section */}
      <section className="pt-16 pb-24 px-4 md:px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Responsive Application Platform
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience our seamless platform across all your devices with advanced moderation and analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EnhancedButton size="lg" asChild>
              <Link to="/escorts">Browse Escorts</Link>
            </EnhancedButton>
            <EnhancedButton size="lg" variant="outline" asChild>
              <Link to="/auth">Sign Up Now</Link>
            </EnhancedButton>
          </div>
          
          <div className="mt-6 text-sm text-muted-foreground">
            Currently viewing on: <span className="font-medium">{deviceType}</span>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Platform Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Users className="h-10 w-10 text-primary" />}
              title="User Profiles"
              description="Browse and connect with verified user profiles across our platform."
            />
            <FeatureCard 
              icon={<Image className="h-10 w-10 text-primary" />}
              title="Content Gallery"
              description="Explore high-quality content from our top creators."
            />
            <FeatureCard 
              icon={<MessageCircle className="h-10 w-10 text-primary" />}
              title="Messaging"
              description="Communicate securely with other users in real-time."
            />
            <FeatureCard 
              icon={<BarChart3 className="h-10 w-10 text-primary" />}
              title="Analytics"
              description="Track engagement and performance with detailed analytics."
            />
          </div>
        </div>
      </section>
      
      {/* Content Moderation Section */}
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Content Moderation
              </h2>
              <p className="text-muted-foreground mb-6">
                Our platform uses advanced moderation tools to ensure all content meets our community guidelines. Report inappropriate content with our easy-to-use reporting system.
              </p>
              <Button variant="default" asChild>
                <Link to="/content-guidelines">Learn More</Link>
              </Button>
            </div>
            <div className="flex-1 bg-card rounded-lg p-8 shadow-lg border">
              <h3 className="text-xl font-semibold mb-4">Community Guidelines</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Respect all users and their content</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Report harmful or inappropriate content</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Help keep our community safe</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Analytics Preview Section */}
      <section className="py-16 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Analytics & Metrics
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Gain insights into user engagement and platform performance with our comprehensive analytics dashboard.
          </p>
          <Button asChild>
            <Link to="/analytics">View Analytics Dashboard</Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 md:px-6 bg-card border-t">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Your Platform Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => {
  return (
    <EnhancedCard variant="hover" className="h-full">
      <EnhancedCardHeader className="pb-2">
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </EnhancedCardHeader>
      <EnhancedCardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </EnhancedCardContent>
    </EnhancedCard>
  );
};

export default Home;
