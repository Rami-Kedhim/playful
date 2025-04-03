
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lock, Play, Star, ArrowRight, Coins, VideoIcon, UserIcon } from "lucide-react";

interface ProfileProps {
  id: string;
  name: string;
  avatar: string;
  location: string;
  verified: boolean;
  featured?: boolean;
  rating?: number;
  isPremium?: boolean;
  serviceType: "in-person" | "virtual" | "both";
  isLive?: boolean;
}

interface FeaturedContentSectionProps {
  featuredEscorts: ProfileProps[];
  featuredCreators?: ProfileProps[];
}

const FeaturedContentSection = ({ featuredEscorts, featuredCreators = [] }: FeaturedContentSectionProps) => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter escorts based on active tab
  const filteredEscorts = activeTab === "all" 
    ? featuredEscorts 
    : activeTab === "in-person" 
      ? featuredEscorts.filter(e => e.serviceType === "in-person" || e.serviceType === "both")
      : featuredEscorts.filter(e => e.serviceType === "virtual" || e.serviceType === "both");

  return (
    <section className="py-20 container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div>
          <Badge variant="outline" className="mb-3">FEATURED ESCORTS</Badge>
          <h2 className="text-3xl font-bold mb-2">
            Discover Verified Professionals
          </h2>
          <p className="text-gray-400 max-w-xl">
            Browse our selection of top verified escorts offering in-person and virtual services.
          </p>
        </div>
        
        <Tabs 
          defaultValue="all" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mt-6 md:mt-0"
        >
          <TabsList className="bg-background/50 border border-white/10">
            <TabsTrigger value="all">All Escorts</TabsTrigger>
            <TabsTrigger value="in-person">In-Person</TabsTrigger>
            <TabsTrigger value="virtual">Virtual</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredEscorts.map((escort) => (
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
                  {escort.isLive && (
                    <Badge variant="outline" className="bg-red-500/20 border-red-500/50 flex items-center gap-1">
                      <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse mr-1"></span>
                      Live
                    </Badge>
                  )}
                </div>
                
                <div className="absolute bottom-3 right-3 flex gap-2">
                  {(escort.serviceType === "in-person" || escort.serviceType === "both") && (
                    <Badge variant="outline" className="bg-blue-500/20 border-blue-500/50 flex items-center gap-1">
                      <UserIcon className="h-3 w-3" />
                      In-Person
                    </Badge>
                  )}
                  
                  {(escort.serviceType === "virtual" || escort.serviceType === "both") && (
                    <Badge variant="outline" className="bg-purple-500/20 border-purple-500/50 flex items-center gap-1">
                      <VideoIcon className="h-3 w-3" />
                      Virtual
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
