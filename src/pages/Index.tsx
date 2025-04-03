
import { Link } from "react-router-dom";
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import EscortCard from "@/components/cards/EscortCard";
import CreatorCard from "@/components/cards/CreatorCard";
import { 
  Search, 
  MapPin, 
  Sparkles, 
  Video, 
  Wallet, 
  Shield, 
  Calendar, 
  MessageCircle, 
  Users, 
  Globe,
  ArrowRight, 
  Check,
  Zap
} from "lucide-react";

// Mock data
const featuredEscorts = [
  {
    id: "1",
    name: "Sophie",
    location: "New York",
    age: 24,
    rating: 4.9,
    reviews: 56,
    tags: ["GFE", "Massage", "Travel"],
    imageUrl: "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    price: 200,
    verified: true
  },
  {
    id: "2",
    name: "Isabella",
    location: "Miami",
    age: 26,
    rating: 4.7,
    reviews: 42,
    tags: ["Dinner Date", "Overnight", "Party"],
    imageUrl: "https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    price: 250,
    verified: true
  },
  {
    id: "3",
    name: "Mia",
    location: "Los Angeles",
    age: 23,
    rating: 4.8,
    reviews: 39,
    tags: ["Massage", "Party", "Travel"],
    imageUrl: "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    price: 180,
    verified: false
  },
  {
    id: "4",
    name: "Victoria",
    location: "Las Vegas",
    age: 25,
    rating: 4.9,
    reviews: 64,
    tags: ["GFE", "Dinner Date", "Fetish"],
    imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    price: 300,
    verified: true
  }
];

const featuredCreators = [
  {
    id: "1",
    name: "Crystal",
    username: "crystal_dreams",
    imageUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    isLive: true,
    isPremium: true,
    subscriberCount: 12500,
    contentCount: {
      photos: 287,
      videos: 42
    },
    price: 9.99,
    isAI: false
  },
  {
    id: "2",
    name: "Luna",
    username: "luna_fantasy",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    isLive: false,
    isPremium: true,
    subscriberCount: 8700,
    contentCount: {
      photos: 195,
      videos: 28
    },
    price: 12.99,
    isAI: true
  },
  {
    id: "3",
    name: "Emma",
    username: "emma_love",
    imageUrl: "https://images.unsplash.com/photo-1543207564-6b738b2a79d0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    isLive: false,
    isPremium: true,
    subscriberCount: 5200,
    contentCount: {
      photos: 124,
      videos: 18
    },
    price: 7.99,
    isAI: false
  },
  {
    id: "4",
    name: "Jade",
    username: "jade_official",
    imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    isLive: true,
    isPremium: true,
    subscriberCount: 19800,
    contentCount: {
      photos: 342,
      videos: 56
    },
    price: 14.99,
    isAI: false
  }
];

const Index = () => {
  const [searchLocation, setSearchLocation] = useState("");

  return (
    <AppLayout>
      {/* Hero section with improved gradient and positioning */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499689496495-5bdf4421b725?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-15"></div>
        
        <div className="container mx-auto px-4 relative z-20 mt-10">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 py-1 px-3 border-primary/50 text-primary animate-pulse">
              <Zap size={14} className="mr-1" /> Web3 Powered Adult Platform
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-glow">
              <span className="bg-gradient-to-r from-primary via-lucoin to-accent bg-clip-text text-transparent">
                Secure. Verified. Private.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              UberEscorts connects verified escorts, content creators and clients through our secure blockchain platform, with advanced verification, privacy protection, and Lucoin integration.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 mb-12">
              <Button asChild size="lg" className="group">
                <Link to="/escorts">
                  Explore Escorts
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/auth">Join Now</Link>
              </Button>
            </div>
            
            <Card className="p-4 max-w-2xl mx-auto bg-card/50 backdrop-blur-md border-white/10">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-grow">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      type="text"
                      placeholder="Enter your location"
                      className="pl-10 bg-background/50"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                    />
                  </div>
                  <Button className="gap-2 bg-primary hover:bg-primary/90">
                    <Search size={18} />
                    Find Nearby
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-center items-center gap-6 mt-10 text-sm text-gray-400">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1 text-primary" />
                <span>100% Verified</span>
              </div>
              <div className="flex items-center">
                <Wallet className="h-4 w-4 mr-1 text-lucoin" />
                <span>Lucoin Powered</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-accent" />
                <span>10K+ Users</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Core platform features section with icons */}
      <section className="py-16 container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">PLATFORM FEATURES</Badge>
          <h2 className="text-3xl font-bold mb-6">Complete Web3 Adult Ecosystem</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            UberEscorts combines verified profiles, secure payments, content creation, and real-time features in one seamless platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 glass-card flex flex-col items-center text-center h-full">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <MapPin className="text-primary" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Verified Escorts</h3>
            <p className="text-gray-400">
              Every escort is verified with our advanced KYC system ensuring authenticity and safety.
            </p>
          </Card>
          
          <Card className="p-6 glass-card flex flex-col items-center text-center h-full">
            <div className="h-12 w-12 rounded-full bg-lucoin/20 flex items-center justify-center mb-4">
              <Sparkles className="text-lucoin" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Content Creators</h3>
            <p className="text-gray-400">
              Subscribe to premium content from your favorite creators with exclusive photos and videos.
            </p>
          </Card>
          
          <Card className="p-6 glass-card flex flex-col items-center text-center h-full">
            <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
              <Video className="text-accent" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Live Streaming</h3>
            <p className="text-gray-400">
              Experience interactive live streams with real-time tipping and private shows.
            </p>
          </Card>
          
          <Card className="p-6 glass-card flex flex-col items-center text-center h-full">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Wallet className="text-primary" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Lucoin Payments</h3>
            <p className="text-gray-400">
              Our secure blockchain token for anonymous, fast, and frictionless transactions.
            </p>
          </Card>
        </div>
      </section>
      
      {/* How it works section */}
      <section className="py-16 bg-gradient-to-b from-background to-background/80">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">HOW IT WORKS</Badge>
            <h2 className="text-3xl font-bold mb-6">Simple, Secure, Sophisticated</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with an intuitive user experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Verify</h3>
              <p className="text-gray-400">Complete our secure verification process to prove your identity and unlock all features.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-lucoin/20 flex items-center justify-center mb-6">
                <Wallet className="h-8 w-8 text-lucoin" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Connect</h3>
              <p className="text-gray-400">Browse profiles, message verified escorts, subscribe to creators, and join live streams.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6">
                <Calendar className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Experience</h3>
              <p className="text-gray-400">Book appointments, share secure routes, and enjoy premium content with complete privacy.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured content section with tabs */}
      <section className="py-16 container mx-auto px-4">
        <Tabs defaultValue="escorts" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div>
              <Badge variant="outline" className="mb-2">FEATURED PROFILES</Badge>
              <h2 className="text-3xl font-bold">Discover Top Talent</h2>
            </div>
            <TabsList className="bg-background/50 backdrop-blur-sm">
              <TabsTrigger value="escorts">Escorts</TabsTrigger>
              <TabsTrigger value="creators">Creators</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="escorts" className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredEscorts.map(escort => (
                <EscortCard key={escort.id} {...escort} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button asChild>
                <Link to="/escorts">View All Escorts</Link>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="creators">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCreators.map(creator => (
                <CreatorCard key={creator.id} {...creator} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button asChild>
                <Link to="/creators">View All Creators</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>
      
      {/* Lucoin section with improved visuals */}
      <section className="py-16 container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary/10 via-lucoin/5 to-lucoin/10 rounded-xl p-8 border border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <Badge variant="lucoin" className="mb-4">CRYPTOCURRENCY</Badge>
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-lucoin bg-clip-text text-transparent">
                  Lucoin: Web3 Adult Payments
                </span>
              </h2>
              <p className="text-gray-300 mb-8">
                Our Fantom-based token enables secure, anonymous transactions across the platform with zero friction. Use Lucoin for all interactions, subscriptions, and exclusive content.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-lucoin mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Anonymous Transactions</h4>
                    <p className="text-sm text-gray-400">Complete privacy for all your financial interactions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-lucoin mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Instant Payments</h4>
                    <p className="text-sm text-gray-400">No delays, no payment processing</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-lucoin mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Lower Fees</h4>
                    <p className="text-sm text-gray-400">Save money with our blockchain technology</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button>Get Free Tokens</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-48 h-48 rounded-full bg-lucoin/20 flex items-center justify-center relative animate-float">
                <div className="w-36 h-36 rounded-full bg-lucoin/30 absolute animate-pulse-slow" />
                <div className="text-4xl font-bold text-white">LC</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Metaverse teaser with improved visuals */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">COMING SOON</Badge>
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Enter the Adult Metaverse
            </span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Experience the future of adult entertainment in our immersive 3D virtual world. 
            Connect with escorts and creators in breathtaking environments with lifelike avatars.
          </p>
        </div>
        
        <div className="relative h-[400px] rounded-xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"></div>
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
              <Globe className="h-5 w-5" />
              Join the Waitlist
            </Button>
          </div>
        </div>
      </section>
      
      {/* Trust and verification section */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">TRUST & SAFETY</Badge>
          <h2 className="text-3xl font-bold mb-4">Verified. Protected. Private.</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            At UberEscorts, we prioritize security and privacy at every layer of our platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 glass-card">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Shield className="text-primary" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Verified Users Only</h3>
            <p className="text-gray-400">
              Every escort and client undergoes our comprehensive verification process before accessing sensitive features.
            </p>
          </Card>
          
          <Card className="p-6 glass-card">
            <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
              <MapPin className="text-accent" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Route Sharing</h3>
            <p className="text-gray-400">
              End-to-end encrypted GPS tracking and route sharing ensures maximum safety during appointments.
            </p>
          </Card>
          
          <Card className="p-6 glass-card">
            <div className="h-12 w-12 rounded-full bg-lucoin/20 flex items-center justify-center mb-4">
              <MessageCircle className="text-lucoin" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Encrypted Messaging</h3>
            <p className="text-gray-400">
              All communications are fully encrypted and protected, with automatic message deletion options.
            </p>
          </Card>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-20 container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-lucoin/20 rounded-xl p-10 border border-white/5 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience UberEscorts?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of escorts, clients, and content creators on the most secure and sophisticated adult platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/auth">Create Account</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/escorts">Browse Escorts</Link>
            </Button>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Index;
