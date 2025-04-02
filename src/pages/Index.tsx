
import { Link } from "react-router-dom";
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EscortCard from "@/components/cards/EscortCard";
import CreatorCard from "@/components/cards/CreatorCard";
import { Search, MapPin, Sparkles, Video, Gift, Wallet } from "lucide-react";

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
      {/* Hero section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499689496495-5bdf4421b725?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
        
        <div className="container mx-auto px-4 py-24 relative z-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-glow">
              <span className="bg-gradient-to-r from-primary via-lucoin to-accent bg-clip-text text-transparent">
                Next-Gen Web3 Adult Platform
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Escorts, Content Creators, Livecams and more - all in one place.
              <br />Powered by Lucoin on Fantom Network.
            </p>
            
            <Card className="p-4 max-w-2xl mx-auto bg-card/50 backdrop-blur-md border-white/10">
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
            </Card>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 glass-card flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <MapPin className="text-primary" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Escort Directory</h3>
            <p className="text-gray-400">
              Find verified escorts in your city, check their services and book appointments.
            </p>
          </Card>
          
          <Card className="p-6 glass-card flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-lucoin/20 flex items-center justify-center mb-4">
              <Sparkles className="text-lucoin" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Content Creators</h3>
            <p className="text-gray-400">
              Subscribe to your favorite creators for exclusive photos and videos.
            </p>
          </Card>
          
          <Card className="p-6 glass-card flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
              <Video className="text-accent" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Live Cams</h3>
            <p className="text-gray-400">
              Watch live streams and interact with performers in real-time.
            </p>
          </Card>
          
          <Card className="p-6 glass-card flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Wallet className="text-primary" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Lucoin Payments</h3>
            <p className="text-gray-400">
              Our platform token for secure, anonymous transactions.
            </p>
          </Card>
        </div>
      </section>
      
      {/* Featured content section */}
      <section className="py-12 container mx-auto px-4">
        <Tabs defaultValue="escorts" className="w-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Profiles</h2>
            <TabsList>
              <TabsTrigger value="escorts">Escorts</TabsTrigger>
              <TabsTrigger value="creators">Creators</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="escorts">
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
      
      {/* Lucoin section */}
      <section className="py-16 container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary/10 to-lucoin/10 rounded-xl p-8 border border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-lucoin bg-clip-text text-transparent">
                  Lucoin: The Future of Adult Payments
                </span>
              </h2>
              <p className="text-gray-300 mb-6">
                Our Fantom-based token enables secure, anonymous transactions across the platform.
                Pay for services, subscribe to creators, and participate in the ecosystem.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button>Get Free Tokens</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-48 h-48 rounded-full bg-lucoin/20 flex items-center justify-center relative animate-float">
                <div className="w-36 h-36 rounded-full bg-lucoin/30 absolute" />
                <div className="text-4xl font-bold text-white">LC</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Metaverse teaser */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Enter the Adult Metaverse
            </span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Coming soon: a 3D virtual world where you can interact with escorts and creators in an immersive environment.
          </p>
        </div>
        
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
              <Sparkles size={18} />
              Coming Soon
            </Button>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Index;
