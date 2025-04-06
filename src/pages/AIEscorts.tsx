
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, Search, MapPin, Star, Heart, MessageCircle, Gift } from "lucide-react";
import useAIProfileStore from "@/store/aiProfileStore";
import AIModelBoost from "@/components/ai/AIModelBoost";
import { AIProfile } from "@/types/ai-profile";

const AIEscorts = () => {
  const { profiles, featuredProfiles, initialize, loading } = useAIProfileStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState<AIProfile[]>([]);
  const [sortBy, setSortBy] = useState("popularity");
  const navigate = useNavigate();
  
  useEffect(() => {
    initialize();
  }, [initialize]);
  
  useEffect(() => {
    if (profiles.length > 0) {
      let filtered = [...profiles];
      
      // Apply search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(
          profile => 
            profile.name.toLowerCase().includes(term) || 
            profile.location.toLowerCase().includes(term) ||
            profile.interests.some(interest => interest.toLowerCase().includes(term))
        );
      }
      
      // Apply sorting
      switch (sortBy) {
        case "popularity":
          filtered.sort((a, b) => (b.boost_status?.boost_level || 0) - (a.boost_status?.boost_level || 0));
          break;
        case "newest":
          filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          break;
        case "alphabetical":
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }
      
      setFilteredProfiles(filtered);
    }
  }, [profiles, searchTerm, sortBy]);
  
  const handleSelectProfile = (profile: AIProfile) => {
    navigate(`/ai-escorts/${profile.id}`);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI Escorts</h1>
      
      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-grow relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search by name, location, or interests..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="w-full md:w-48">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="alphabetical">A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-12">Loading AI escorts...</div>
      ) : (
        <>
          {/* Featured escorts */}
          {featuredProfiles.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Zap className="mr-2 h-5 w-5 text-yellow-500" />
                Featured Models
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredProfiles.map(profile => (
                  <FeaturedModelCard
                    key={profile.id}
                    profile={profile}
                    onClick={() => handleSelectProfile(profile)}
                  />
                ))}
              </div>
            </section>
          )}
          
          {/* All escorts */}
          <section>
            <h2 className="text-2xl font-bold mb-6">
              All Models ({filteredProfiles.length})
            </h2>
            
            {filteredProfiles.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No models matching your search criteria
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProfiles.map(profile => (
                  <ModelCard 
                    key={profile.id} 
                    profile={profile}
                    onClick={() => handleSelectProfile(profile)}
                  />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

interface ModelCardProps {
  profile: AIProfile;
  onClick: () => void;
}

const ModelCard = ({ profile, onClick }: ModelCardProps) => {
  return (
    <Card className="overflow-hidden cursor-pointer transition-all hover:shadow-md hover:-translate-y-1" onClick={onClick}>
      <div className="aspect-[3/4] relative">
        <img 
          src={profile.avatar_url} 
          alt={profile.name}
          className="w-full h-full object-cover"
        />
        
        {profile.availability_status === 'online' && (
          <Badge className="absolute top-2 right-2 bg-green-500">
            Online
          </Badge>
        )}
        
        {profile.boost_status?.is_boosted && (
          <div className="absolute top-2 left-2">
            <Badge variant="default" className="bg-yellow-500 flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Boosted
            </Badge>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
          <h3 className="font-bold text-lg">{profile.name}</h3>
          <div className="flex items-center text-sm">
            <MapPin className="h-3 w-3 mr-1" />
            {profile.location}
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm">{profile.age} years</div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span>4.8</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {profile.interests.slice(0, 3).map((interest, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {interest}
            </Badge>
          ))}
          {profile.interests.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{profile.interests.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={(e) => {
              e.stopPropagation();
              // Would handle favorite in a real app
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={(e) => {
                e.stopPropagation();
                // Would handle chat in a real app
              }}
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={(e) => {
                e.stopPropagation();
                // Would handle gift in a real app
              }}
            >
              <Gift className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FeaturedModelCard = ({ profile, onClick }: ModelCardProps) => {
  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-all" onClick={onClick}>
      <div className="p-4 relative">
        <div className="absolute top-6 right-6 z-10">
          <Badge className="bg-gradient-to-r from-pink-500 to-purple-500">
            Featured
          </Badge>
        </div>
        
        <div className="rounded-lg overflow-hidden aspect-square relative mb-4">
          <img 
            src={profile.avatar_url} 
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="text-center mb-4">
          <h3 className="font-bold text-xl">{profile.name}</h3>
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" />
            {profile.location}
          </div>
        </div>
        
        <div className="flex justify-center gap-2 mb-4">
          <Button 
            variant="default" 
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat Now
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-1"
            onClick={(e) => {
              e.stopPropagation();
              // Would handle favorite in a real app
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AIEscorts;
