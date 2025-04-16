
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';
import { EnhancedButton } from '@/components/ui/enhanced-button';
import { EnhancedCard, EnhancedCardHeader, EnhancedCardContent, EnhancedCardFooter } from '@/components/ui/enhanced-card';
import { User, Wallet, MessageSquare, Bookmark, Search } from 'lucide-react';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
        <p className="text-xl text-gray-600 mb-6">
          Connect, discover, and experience the best services in town
        </p>
        
        {!isAuthenticated && (
          <Link to="/auth">
            <EnhancedButton size="lg" className="font-semibold">
              Sign In
            </EnhancedButton>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HomeCard 
          icon={<User className="mr-2 h-5 w-5" />}
          title="Profile"
          description="Manage your personal profile"
          buttonText="Go to Profile"
          route="/profile"
        />

        <HomeCard 
          icon={<Wallet className="mr-2 h-5 w-5" />}
          title="Wallet"
          description="Manage your credits and transactions"
          buttonText="Go to Wallet"
          route="/wallet"
        />

        <HomeCard 
          icon={<MessageSquare className="mr-2 h-5 w-5" />}
          title="Messages"
          description="Connect with others"
          buttonText="Go to Messages"
          route="/messages"
        />

        <HomeCard 
          icon={<Bookmark className="mr-2 h-5 w-5" />}
          title="Favorites"
          description="Your saved profiles"
          buttonText="View Favorites"
          route="/favorites"
        />

        <HomeCard 
          icon={<Search className="mr-2 h-5 w-5" />}
          title="Explore"
          description="Discover profiles and content"
          buttonText="Start Exploring"
          route="/search"
        />
      </div>
    </div>
  );
};

const HomeCard = ({ icon, title, description, buttonText, route }) => {
  return (
    <EnhancedCard variant="hover" className="flex flex-col">
      <EnhancedCardHeader>
        <div className="flex items-center">
          {icon}
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      </EnhancedCardHeader>
      <EnhancedCardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{description}</p>
      </EnhancedCardContent>
      <EnhancedCardFooter>
        <Link to={route} className="w-full">
          <EnhancedButton variant="outline" className="w-full">
            {buttonText}
          </EnhancedButton>
        </Link>
      </EnhancedCardFooter>
    </EnhancedCard>
  );
};

export default HomePage;
