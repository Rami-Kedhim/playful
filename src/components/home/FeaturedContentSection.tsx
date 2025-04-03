
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lock, Play, Star, ArrowRight, Coins } from "lucide-react";

interface ProfileProps {
  id: string;
  name: string;
  avatar: string;
  location: string;
  verified: boolean;
  featured?: boolean;
  rating?: number;
  isPremium?: boolean;
}

interface FeaturedContentSectionProps {
  featuredEscorts: ProfileProps[];
  featuredCreators: ProfileProps[];
}

const FeaturedContentSection = ({ featuredEscorts, featuredCreators }: FeaturedContentSectionProps) => {
  const [activeTab, setActiveTab] = useState("escorts");

  return (
    <section className="py-20 container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div>
          <Badge variant="outline" className="mb-3">FEATURED PROFILES</Badge>
          <h2 className="text-3xl font-bold mb-2">
            Discover Verified Professionals
          </h2>
          <p className="text-gray-400 max-w-xl">
            Browse our selection of top verified escorts and content creators.
          </p>
        </div>
        
        <Tabs 
          defaultValue="escorts" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mt-6 md:mt-0"
        >
          <TabsList className="bg-background/50 border border-white/10">
            <TabsTrigger value="escorts">Escorts</TabsTrigger>
            <TabsTrigger value="creators">Content Creators</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div>
        <TabsContent value="escorts" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEscorts.map((escort) => (
              <Link to={`/escort/${escort.id}`} key={escort.id}>
                <div className="group glass-card rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={escort.avatar} 
                      alt={escort.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {escort.verified && (
                        <Badge variant="outline" className="bg-primary/20 border-primary/50 flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                      {escort.featured && (
                        <Badge variant="outline" className="bg-lucoin/20 border-lucoin/50 flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{escort.name}</h3>
                        <p className="text-gray-400 text-sm">{escort.location}</p>
                      </div>
                      {escort.rating && (
                        <div className="flex items-center bg-white/5 px-2 py-1 rounded">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" fill="currentColor" />
                          <span className="text-xs">{escort.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button asChild>
              <Link to="/escorts">
                View All Escorts <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="creators" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCreators.map((creator) => (
              <Link to={`/creator/${creator.id}`} key={creator.id}>
                <div className="group glass-card rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={creator.avatar} 
                      alt={creator.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {creator.verified && (
                        <Badge variant="outline" className="bg-primary/20 border-primary/50 flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                      {creator.isPremium && (
                        <Badge variant="outline" className="bg-lucoin/20 border-lucoin/50 flex items-center gap-1">
                          <Lock className="h-3 w-3" />
                          Premium
                        </Badge>
                      )}
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <Button size="sm" variant="secondary" className="gap-1">
                        <Coins className="h-3 w-3" />
                        Subscribe
                      </Button>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="h-16 w-16 rounded-full bg-accent/20 backdrop-blur-md flex items-center justify-center">
                        <Play className="h-8 w-8 text-white" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{creator.name}</h3>
                        <p className="text-gray-400 text-sm">{creator.location}</p>
                      </div>
                      {creator.rating && (
                        <div className="flex items-center bg-white/5 px-2 py-1 rounded">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" fill="currentColor" />
                          <span className="text-xs">{creator.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button asChild>
              <Link to="/creators">
                View All Creators <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TabsContent>
      </div>
    </section>
  );
};

// Adding the Shield icon that was missing
const Shield = ({ className }: { className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  );
};

export default FeaturedContentSection;
