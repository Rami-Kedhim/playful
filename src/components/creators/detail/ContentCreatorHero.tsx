
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "lucide-react";

interface ContentCreatorHeroProps {
  creator: {
    id: string;
    name: string;
    username: string;
    imageUrl: string;
    isLive: boolean;
    isAI: boolean;
    bio?: string;
  };
  isFavorited: boolean;
  onToggleFavorite: () => void;
}

const ContentCreatorHero = ({ 
  creator, 
  isFavorited, 
  onToggleFavorite 
}: ContentCreatorHeroProps) => {
  return (
    <div className="relative w-full">
      {/* Cover Image / Banner */}
      <div className="relative w-full h-48 md:h-64 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-lg overflow-hidden mb-16">
        <div className="absolute -bottom-12 left-6 flex items-end">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src={creator.imageUrl} alt={creator.name} />
            <AvatarFallback>{creator.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-4 mb-2">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">{creator.name}</h1>
              {creator.isLive && (
                <Badge className="ml-2 bg-red-500 animate-pulse">LIVE</Badge>
              )}
              {creator.isAI && (
                <Badge className="ml-2 bg-blue-500">AI</Badge>
              )}
              <Badge className="ml-2 bg-purple-600">Virtual Creator</Badge>
            </div>
            <p className="text-white/90">@{creator.username}</p>
          </div>
        </div>
        <Button
          className={`absolute top-4 right-4 ${isFavorited ? "bg-red-500 hover:bg-red-600" : ""}`}
          size="sm"
          onClick={onToggleFavorite}
        >
          <Heart className="mr-1" size={16} fill={isFavorited ? "white" : "none"} />
          {isFavorited ? "Favorited" : "Add to Favorites"}
        </Button>
      </div>
    </div>
  );
};

export default ContentCreatorHero;
