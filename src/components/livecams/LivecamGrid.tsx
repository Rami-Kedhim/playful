import React from "react";
import { LivecamModel } from "@/types/livecams";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, MapPin, Flag, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LivecamGridProps {
  models: LivecamModel[];
  className?: string;
}

const LivecamGridCard = ({ model }: { model: LivecamModel }) => {
  return (
    <Card className="overflow-hidden group">
      <div className="aspect-video relative">
        <img
          src={model.thumbnailUrl}
          alt={model.displayName || model.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {model.isLive && (
          <Badge className="absolute top-2 left-2 bg-red-500 border-none">
            Live
          </Badge>
        )}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <Badge variant="outline" className="bg-black/60 backdrop-blur-sm">
            <Eye className="mr-1 h-3 w-3" />
            {model.viewerCount}
          </Badge>
        </div>
      </div>

      <CardContent className="p-3">
        <Link to={`/livecams/${model.id}`}>
          <h3 className="font-medium hover:text-primary transition-colors truncate">
            {model.displayName || model.name}
          </h3>
        </Link>
        <div className="mt-2 flex flex-wrap gap-1 text-xs">
          {model.country && (
            <div className="flex items-center text-muted-foreground mr-2">
              <MapPin className="mr-1 h-3 w-3" />
              <span>{model.country}</span>
            </div>
          )}

          {model.category && (
            <div className="flex items-center text-muted-foreground">
              <Tag className="mr-1 h-3 w-3" />
              <span>{model.category}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-3 pt-0 flex justify-between">
        <Button asChild size="sm" variant="ghost" className="text-xs">
          <Link to={`/livecams/${model.id}`}>View Profile</Link>
        </Button>
        <Button size="icon" variant="outline" className="h-8 w-8">
          <Heart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const LivecamGrid: React.FC<LivecamGridProps> = ({ models, className }) => {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", className)}>
      {models.map((model) => (
        <LivecamGridCard key={model.id} model={model} />
      ))}
    </div>
  );
};

export default LivecamGrid;
