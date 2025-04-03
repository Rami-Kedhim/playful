
import React, { useState } from "react";
import { LivecamModel } from "@/types/livecams";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { CircleUser, Heart, MessageSquare, Share2, Users } from "lucide-react";

interface LivecamMainContentProps {
  model: LivecamModel;
}

const LivecamMainContent: React.FC<LivecamMainContentProps> = ({ model }) => {
  const [imgError, setImgError] = useState(false);
  
  // Generate a unique fallback image for this specific model
  const uniqueSeed = `${model.id || model.username}-${Date.now().toString().substring(8, 13)}`;
  const fallbackImage = `https://picsum.photos/seed/${uniqueSeed}/800/450`;

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <AspectRatio ratio={16/9}>
          {model.isLive ? (
            <div className="w-full h-full bg-black flex items-center justify-center">
              {/* In a real implementation, this would be a video player */}
              <div className="text-center p-6">
                <h3 className="text-xl font-semibold mb-2">Live Stream</h3>
                <p className="text-gray-400">
                  The video player would appear here in the production version.
                </p>
              </div>
            </div>
          ) : (
            <img 
              src={imgError ? fallbackImage : model.imageUrl} 
              alt={model.displayName} 
              className="object-cover w-full h-full"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          )}
        </AspectRatio>
        
        {model.isLive && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-red-500 text-white">
              <Users size={14} className="mr-1" />
              {model.viewerCount ? model.viewerCount.toLocaleString() : "0"} watching
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold">{model.displayName}</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Heart size={18} />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 size={18} />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center mb-4">
          <CircleUser size={18} className="mr-2" />
          <span className="text-muted-foreground">@{model.username}</span>
          {model.age && (
            <Badge variant="outline" className="ml-2">
              {model.age}
            </Badge>
          )}
          {model.country && (
            <Badge variant="outline" className="ml-2">
              {model.country}
            </Badge>
          )}
        </div>
        
        {model.description && (
          <p className="text-muted-foreground mb-4">{model.description}</p>
        )}
        
        {model.categories && model.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {model.categories.map((category, index) => (
              <Badge key={index} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex gap-2 mt-6">
          <Button className="flex-1">
            <MessageSquare size={18} className="mr-2" />
            Start Chat
          </Button>
          {!model.isLive && (
            <Button variant="outline" className="flex-1">
              <Heart size={18} className="mr-2" />
              Follow
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LivecamMainContent;
