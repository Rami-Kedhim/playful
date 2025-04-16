import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ImageIcon, VideoIcon, Radio } from "lucide-react";

interface UnifiedServiceCardProps {
  service: any;
}

// Update the component to handle the "live" property safely
const UnifiedServiceCard = ({ service, ...props }) => {
  const renderMediaStats = () => {
    if (!service.mediaGallery) return null;
    
    // Handle the "live" property safely 
    const { totalMedia, photos, videos, live } = service.mediaGallery;
    
    return (
      <div className="flex space-x-2 text-xs text-muted-foreground">
        {photos && photos > 0 && (
          <span className="flex items-center">
            <ImageIcon className="w-3 h-3 mr-1" />
            {photos}
          </span>
        )}
        {videos && videos > 0 && (
          <span className="flex items-center">
            <VideoIcon className="w-3 h-3 mr-1" />
            {videos}
          </span>
        )}
        {live && live > 0 && (
          <span className="flex items-center">
            <Radio className="w-3 h-3 mr-1" />
            {live}
          </span>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={service.imageUrl} alt={service.name} />
            <AvatarFallback>{service.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">{service.name}</h2>
            <p className="text-sm text-muted-foreground">{service.description}</p>
            {renderMediaStats()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnifiedServiceCard;
