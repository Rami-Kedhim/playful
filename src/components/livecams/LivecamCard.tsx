
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LivecamModel } from "@/types/livecams";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { CircleUser, Users, Video } from "lucide-react";

interface LivecamCardProps {
  model: LivecamModel;
}

const LivecamCard: React.FC<LivecamCardProps> = ({ model }) => {
  const [imgError, setImgError] = useState(false);
  
  // Create a unique and stable fallback image for each model
  const uniqueSeed = `${model.id || model.username}-${Date.now().toString().substring(8, 13)}`;
  const fallbackImage = `https://picsum.photos/seed/${uniqueSeed}/500/500`;

  // Debug logging for image URLs
  console.log(`Rendering card for ${model.username}:`, { 
    original: model.thumbnailUrl || model.imageUrl,
    fallback: fallbackImage,
    hasError: imgError
  });
  
  return (
    <Link to={`/livecams/${model.username}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
        <div className="relative">
          <AspectRatio ratio={16/9}>
            <img 
              src={imgError ? fallbackImage : (model.thumbnailUrl || model.imageUrl)} 
              alt={model.displayName} 
              className="object-cover w-full h-full"
              onError={() => {
                console.log(`Image error for ${model.username}, using fallback`);
                setImgError(true);
              }}
              loading="lazy"
            />
          </AspectRatio>
          
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {model.isLive && (
              <Badge className="bg-red-500 text-white">
                <Video size={12} className="mr-1" />
                Live
              </Badge>
            )}
            {model.country && (
              <Badge variant="outline" className="bg-background/60 backdrop-blur-sm">
                {model.country}
              </Badge>
            )}
          </div>
          
          {model.viewerCount !== undefined && model.viewerCount > 0 && (
            <div className="absolute bottom-2 right-2">
              <Badge variant="secondary" className="bg-background/60 backdrop-blur-sm">
                <Users size={12} className="mr-1" />
                {model.viewerCount.toLocaleString()} viewers
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-3">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-base">{model.displayName}</h3>
            {model.age && <span className="text-sm text-gray-400">{model.age}</span>}
          </div>
          
          <div className="flex items-center text-sm text-gray-400 mt-1">
            <CircleUser size={14} className="mr-1" />
            <span>{model.username}</span>
          </div>
          
          {model.categories && model.categories.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {model.categories.map((category, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default LivecamCard;
