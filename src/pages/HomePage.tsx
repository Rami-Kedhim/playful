
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Shield, MapPin, Calendar, MessageSquare, Star, Sparkles } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="container mx-auto px-4 py-24 flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">Find Premium Companions</h1>
          <p className="text-xl md:text-2xl text-center max-w-3xl mb-12">
            Discover verified escorts, book appointments securely, and enjoy a premium experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100"
              onClick={() => navigate('/escorts')}
            >
              <MapPin className="mr-2 h-5 w-5" /> Find Escorts
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate('/register')}
            >
              Create Account
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Premium Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield className="h-12 w-12 text-purple-600" />}
              title="Verified Profiles"
              description="All profiles are thoroughly verified for your safety and peace of mind."
            />
            <FeatureCard 
              icon={<Calendar className="h-12 w-12 text-purple-600" />}
              title="Secure Booking"
              description="Book appointments securely with our encrypted booking system."
            />
            <FeatureCard 
              icon={<MessageSquare className="h-12 w-12 text-purple-600" />}
              title="Private Messaging"
              description="Communicate directly with escorts through our secure messaging platform."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StepCard 
              number={1}
              title="Create Account"
              description="Sign up and complete your profile verification."
            />
            <StepCard 
              number={2}
              title="Find Companions"
              description="Browse verified escorts in your area with our advanced search."
            />
            <StepCard 
              number={3}
              title="Book Appointment"
              description="Schedule a meeting with your chosen companion."
            />
            <StepCard 
              number={4}
              title="Enjoy Experience"
              description="Meet safely and enjoy your premium escort experience."
            />
          </div>
        </div>
      </section>

      {/* Featured Escorts Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Escorts</h2>
            <Button 
              variant="outline"
              onClick={() => navigate('/escorts')}
            >
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* This would be populated from API in the real app */}
            <FeaturedCard isLoading={true} />
            <FeaturedCard isLoading={true} />
            <FeaturedCard isLoading={true} />
            <FeaturedCard isLoading={true} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-10">
            Join our exclusive platform today and discover a world of premium companions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100"
              onClick={() => navigate('/register')}
            >
              Sign Up Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate('/escorts')}
            >
              Browse Escorts
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper Components
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const StepCard = ({ number, title, description }: { number: number, title: string, description: string }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeaturedCard = ({ isLoading = false }: { isLoading?: boolean }) => {
  if (isLoading) {
    return (
      <div className="rounded-lg overflow-hidden shadow-md bg-gray-100 animate-pulse">
        <div className="h-64 bg-gray-200"></div>
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="flex items-center">
            <div className="h-4 bg-gray-200 rounded w-1/4 mr-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <img 
        src="https://source.unsplash.com/random/300x400/?portrait" 
        alt="Escort" 
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Name</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
            <span className="text-sm">4.9</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm">Location</p>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-purple-600 font-medium">$200/hr</span>
          {Math.random() > 0.5 && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
              <Sparkles className="h-3 w-3 mr-1" /> Verified
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
