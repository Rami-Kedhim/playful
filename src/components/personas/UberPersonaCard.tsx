
import React from 'react';
import { UberPersona } from "@/types/uberPersona";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star, CheckCircle, Video, Image, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface UberPersonaCardProps {
  persona: UberPersona;
}

const UberPersonaCard: React.FC<UberPersonaCardProps> = ({ persona }) => {
  const { roleFlags, capabilities } = persona;
  
  const getRoleBadge = () => {
    if (roleFlags.isAI) return <Badge className="bg-purple-500">AI</Badge>;
    if (roleFlags.isEscort) return <Badge className="bg-blue-500">Escort</Badge>;
    if (roleFlags.isCreator) return <Badge className="bg-pink-500">Creator</Badge>;
    if (roleFlags.isLivecam) return <Badge className="bg-red-500">Live</Badge>;
    return null;
  };
  
  const getCapabilityIcons = () => {
    return (
      <div className="flex space-x-1">
        {capabilities.hasPhotos && <Image className="h-4 w-4" />}
        {capabilities.hasVideos && <Video className="h-4 w-4" />}
        {capabilities.hasBooking && <Calendar className="h-4 w-4" />}
      </div>
    );
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[3/4]">
        <img
          src={persona.avatarUrl || "https://via.placeholder.com/300x400"}
          alt={persona.displayName}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <h3 className="text-lg font-bold text-white">{persona.displayName}</h3>
              {persona.age > 0 && (
                <span className="text-sm text-gray-200">{persona.age}</span>
              )}
            </div>
            {roleFlags.isVerified && (
              <CheckCircle className="h-5 w-5 text-blue-400" />
            )}
          </div>
          <div className="flex items-center gap-1 text-gray-200">
            <MapPin className="h-3 w-3" />
            <span className="text-xs">{persona.location}</span>
          </div>
        </div>
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {getRoleBadge()}
          {persona.monetization.boostingActive && (
            <Badge className="bg-amber-500">Boosted</Badge>
          )}
        </div>
      </div>

      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm">4.8 (32)</span>
          </div>
          {getCapabilityIcons()}
        </div>

        <div className="mt-2 line-clamp-2 text-xs text-gray-500">
          {persona.bio}
        </div>
      </CardContent>

      <CardFooter className="border-t p-3">
        <Link to={`/persona/${persona.username}`} className="w-full">
          <Button variant="default" className="w-full">
            View Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default UberPersonaCard;
