
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EscortContainer from '@/components/escorts/EscortContainer';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Wallet, Shield, User, MessageCircle, Brain } from 'lucide-react';
import { Escort } from '@/types/Escort';

// Mock data for featured escorts
const featuredEscorts: Escort[] = [
  {
    id: '1',
    name: 'Sophia',
    age: 28,
    gender: 'female',
    location: 'Los Angeles, CA',
    rating: 4.9,
    reviewCount: 47,
    price: 300,
    tags: ['Elite', 'Luxury', 'Verified'],
    imageUrl: 'https://i.pravatar.cc/300?img=1',
    availableNow: true,
    isVerified: true,
    responseRate: 98
  },
  {
    id: '2',
    name: 'Isabella',
    age: 24,
    gender: 'female',
    location: 'New York, NY',
    rating: 4.8,
    reviewCount: 32,
    price: 250,
    tags: ['GFE', 'Party', 'Travel'],
    imageUrl: 'https://i.pravatar.cc/300?img=5',
    availableNow: false,
    isVerified: true,
    responseRate: 95
  },
  {
    id: '3',
    name: 'Emma',
    age: 26,
    gender: 'female',
    location: 'Miami, FL',
    rating: 4.7,
    reviewCount: 28,
    price: 280,
    tags: ['Luxury', 'Events', 'Travel'],
    imageUrl: 'https://i.pravatar.cc/300?img=9',
    availableNow: true,
    isVerified: true,
    responseRate: 90
  },
  {
    id: '4',
    name: 'James',
    age: 30,
    gender: 'male',
    location: 'Chicago, IL',
    rating: 4.8,
    reviewCount: 19,
    price: 320,
    tags: ['Athletic', 'Dinner', 'Events'],
    imageUrl: 'https://i.pravatar.cc/300?img=3',
    availableNow: false,
    isVerified: true,
    responseRate: 96
  }
];

// Mock services available on the platform
const services = [
  'Companion', 'Dinner Date', 'Travel Partner', 'Events', 
  'Cultural Activities', 'Education', 'Tourism', 'Networking'
];

const HomePage = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-primary/80 text-white py-24 px-6 rounded-lg mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Find Your Perfect Companion</h1>
          <p className="text-lg sm:text-xl mb-8 opacity-90">
            Connect with verified companions for events, dining, travel and more
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/escorts">
                <Search className="mr-2 h-5 w-5" /> Find Companions
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/20 hover:bg-white/30 border-white" asChild>
              <Link to="/safety">
                <Shield className="mr-2 h-5 w-5" /> Safety First
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-center mt-10 flex-wrap gap-3">
            <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
              100% Verified Profiles
            </Badge>
            <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
              Secure Payments
            </Badge>
            <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
              Privacy Protected
            </Badge>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5 text-primary" />
              Verified Profiles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Every companion on our platform is verified through our multi-step verification process,
              ensuring authenticity and safety.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Easy Booking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Schedule appointments with companions effortlessly. Our platform makes it simple 
              to find and book the perfect date.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wallet className="mr-2 h-5 w-5 text-primary" />
              Secure Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our UBX wallet system provides secure, anonymous transactions for all services
              with full protection for both parties.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Featured Escorts Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Companions</h2>
          <Button variant="outline" asChild>
            <Link to="/escorts">View All</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredEscorts.map((escort) => (
            <Link key={escort.id} to={`/escorts/${escort.id}`}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img 
                      src={escort.imageUrl || "https://via.placeholder.com/300x400"}
                      alt={escort.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  
                  {escort.isVerified && (
                    <Badge className="absolute top-2 right-2 bg-green-500 text-white border-0">
                      Verified
                    </Badge>
                  )}
                  
                  {escort.availableNow && (
                    <Badge className="absolute top-2 left-2 bg-blue-500 text-white border-0">
                      Available Now
                    </Badge>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <div className="text-white font-medium">
                      {escort.name}, {escort.age}
                    </div>
                    <div className="text-white/80 text-sm">
                      {escort.location}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <svg className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="font-medium">{escort.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({escort.reviewCount})</span>
                    </div>
                    <span className="font-bold text-green-600">${escort.price}/hr</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {escort.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Platform Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Why Choose UberEscorts</h2>
        
        <Tabs defaultValue="safety">
          <TabsList className="w-full grid grid-cols-4 mb-6">
            <TabsTrigger value="safety">Safety</TabsTrigger>
            <TabsTrigger value="quality">Quality</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="innovation">Innovation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="safety">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3 flex justify-center">
                    <Shield className="h-32 w-32 text-primary/20" />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-4">Your Safety Is Our Priority</h3>
                    <p className="text-muted-foreground mb-4">
                      Our comprehensive safety system includes profile verification, secure messaging,
                      location sharing, and emergency assistance. We work tirelessly to create a safe
                      environment for all users.
                    </p>
                    <Button variant="outline" asChild>
                      <Link to="/safety">Learn About Safety Features</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="quality">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3 flex justify-center">
                    <User className="h-32 w-32 text-primary/20" />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-4">Exceptional Companions</h3>
                    <p className="text-muted-foreground mb-4">
                      We pride ourselves on featuring only the most professional, reliable, and engaging
                      companions. Our rigorous screening process ensures quality experiences for all clients.
                    </p>
                    <Button variant="outline" asChild>
                      <Link to="/escorts">Meet Our Companions</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3 flex justify-center">
                    <svg className="h-32 w-32 text-primary/20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-4">Complete Privacy Protection</h3>
                    <p className="text-muted-foreground mb-4">
                      Your privacy is guaranteed with our advanced encryption, discrete billing,
                      and strict confidentiality policies. Your personal information and interactions
                      remain secure and private at all times.
                    </p>
                    <Button variant="outline" asChild>
                      <Link to="/privacy">Privacy Policy</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="innovation">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-1/3 flex justify-center">
                    <Brain className="h-32 w-32 text-primary/20" />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-4">Cutting-Edge Technology</h3>
                    <p className="text-muted-foreground mb-4">
                      Experience the future of companionship with our AI-driven matching, secure blockchain 
                      payments, and advanced neural systems that ensure optimal experiences tailored to your preferences.
                    </p>
                    <Button variant="outline" asChild>
                      <Link to="/ai-companion">Explore AI Companions</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Find Your Perfect Match?</h2>
          <p className="text-muted-foreground mb-6">
            Browse our selection of premium companions and discover meaningful connections today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/escorts">Browse Companions</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/auth/register">Register Now</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5 text-primary" />
              Become a Companion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Join our platform as a verified companion and connect with clients worldwide.
            </p>
            <Button variant="outline" size="sm">Learn More</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5 text-primary" />
              Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Our dedicated support team is available 24/7 to assist with any questions or concerns.
            </p>
            <Button variant="outline" size="sm">Contact Support</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-5 w-5 text-primary" />
              AI Companions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Discover our revolutionary AI companions for virtual connection and companionship.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/ai-companion">Explore AI</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              Safety Center
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Learn about our comprehensive safety features and tips for a secure experience.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/safety">Safety Center</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default HomePage;
