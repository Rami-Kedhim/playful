
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
            <Button size="lg" className="font-semibold">
              Sign In
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Profile
            </CardTitle>
            <CardDescription>Manage your personal profile</CardDescription>
          </CardHeader>
          <CardContent>
            <p>View and edit your profile information, update your preferences, and manage your account settings.</p>
          </CardContent>
          <CardFooter>
            <Link to="/profile" className="w-full">
              <Button variant="outline" className="w-full">Go to Profile</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wallet className="mr-2 h-5 w-5" />
              Wallet
            </CardTitle>
            <CardDescription>Manage your credits and transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <p>View your wallet balance, purchase credits, and see your transaction history.</p>
          </CardContent>
          <CardFooter>
            <Link to="/wallet" className="w-full">
              <Button variant="outline" className="w-full">Go to Wallet</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Messages
            </CardTitle>
            <CardDescription>Connect with others</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Check your messages, start new conversations, and stay connected.</p>
          </CardContent>
          <CardFooter>
            <Link to="/messages" className="w-full">
              <Button variant="outline" className="w-full">Go to Messages</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bookmark className="mr-2 h-5 w-5" />
              Favorites
            </CardTitle>
            <CardDescription>Your saved profiles</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Access your favorite profiles and content quickly and easily.</p>
          </CardContent>
          <CardFooter>
            <Link to="/favorites" className="w-full">
              <Button variant="outline" className="w-full">View Favorites</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Explore
            </CardTitle>
            <CardDescription>Discover profiles and content</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Search for profiles, browse categories, and discover new content.</p>
          </CardContent>
          <CardFooter>
            <Link to="/search" className="w-full">
              <Button variant="outline" className="w-full">Start Exploring</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
