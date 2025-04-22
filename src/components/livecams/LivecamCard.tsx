import React from "react";
import { LivecamModel } from "@/types/livecams";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Eye, Users, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface LivecamCardProps {
  model: LivecamModel;
}

export const SimpleLivecamCard = ({ model }: { model: LivecamModel }) => {
  return (
    <Card className="overflow-hidden group">
      <div className="aspect-video relative">
        <img
          src={model.thumbnailUrl}
          alt={model.displayName || model.name || model.username}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {model.isLive && (
          <Badge className="absolute top-2 left-2 bg-red-500 border-none">
            Live
          </Badge>
        )}
        {model.categories && model.categories.length > 0 && (
          <Badge className="absolute top-2 right-2" variant="outline">
            {model.categories[0]}
          </Badge>
        )}
      </div>
      <CardContent className="p-3">
        <div className="font-medium truncate">
          {model.displayName || model.name || model.username}
        </div>
        <div className="flex items-center justify-between mt-1 text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Eye className="h-3.5 w-3.5" />
            <span>{model.viewerCount}</span>
          </div>
          
          <Link
            to={`/livecams/${model.id}`}
            className="text-primary hover:underline text-xs font-medium"
          >
            View Profile
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export const LivecamCard = ({ model }: { model: LivecamModel }) => {
  // Create a proper Livecam object that fully implements the interface
  const livecamData = {
    id: model.id,
    username: model.username,
    name: model.name || model.displayName || model.username,
    thumbnailUrl: model.thumbnailUrl,
    imageUrl: model.imageUrl,
    isLive: model.isLive,
    isStreaming: model.isStreaming,
    viewerCount: model.viewerCount,
    region: model.region || '',
    language: model.language || '',
    tags: model.tags || [],
    category: model.category || '',
    rating: model.rating || 0,
    price: model.price || 0
  };

  return (
    <Card className="overflow-hidden group">
      <div className="aspect-video relative">
        <img
          src={livecamData.thumbnailUrl}
          alt={livecamData.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {livecamData.isLive && (
          <Badge className="absolute top-2 left-2 bg-red-500 border-none">
            Live
          </Badge>
        )}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <Badge variant="outline" className="bg-black/60 backdrop-blur-sm">
            <Eye className="mr-1 h-3 w-3" />
            {livecamData.viewerCount}
          </Badge>
        </div>
      </div>

      <CardContent className="p-3">
        <Link to={`/livecams/${livecamData.id}`}>
          <h3 className="font-medium hover:text-primary transition-colors truncate">
            {livecamData.name}
          </h3>
        </Link>
        <div className="mt-2 flex flex-wrap gap-1 text-xs">
          {livecamData.region && (
            <div className="flex items-center text-muted-foreground mr-2">
              <MapPin className="mr-1 h-3 w-3" />
              <span>{livecamData.region}</span>
            </div>
          )}

          {livecamData.category && (
            <div className="flex items-center text-muted-foreground">
              <Tag className="mr-1 h-3 w-3" />
              <span>{livecamData.category}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-3 pt-0 flex justify-between">
        <Button asChild size="sm" variant="ghost" className="text-xs">
          <Link to={`/livecams/${livecamData.id}`}>View Profile</Link>
        </Button>
        <Button size="icon" variant="outline" className="h-8 w-8">
          <Heart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
