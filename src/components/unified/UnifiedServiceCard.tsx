import React from "react";
import { Escort } from "@/types/escort";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Video, Image, Clock, CheckCircle, Calendar, Globe } from "lucide-react";
import { formatCurrency } from "@/utils/boost";
import { EliminixProfileIndicator } from "@/components/eliminix";
import { mapEscortToUberPersona } from "@/utils/profileMapping";

interface ServiceIcons {
  escort: React.ReactNode;
  content: React.ReactNode;
  livecam: React.ReactNode;
}

interface UnifiedServiceCardProps {
  provider: Escort;
  showDetails?: boolean;
  className?: string;
  showEliminixIndicator?: boolean;
}

const UnifiedServiceCard: React.FC<UnifiedServiceCardProps> = ({
  provider,
  showDetails = true,
  className = "",
  showEliminixIndicator = true
}) => {
  const serviceIcons: ServiceIcons = {
    escort: <CheckCircle className="h-4 w-4 text-primary" />,
    content: <Image className="h-4 w-4 text-primary" />,
    livecam: <Video className="h-4 w-4 text-primary" />
  };

  const providesInPerson = provider.providesInPersonServices !== false;
  const providesContent = provider.providesVirtualContent !== false;
  const providesLivecam = provider.contentStats?.live || false;

  const personaProfile = mapEscortToUberPersona(provider);

  return (
    <Card className={`overflow-hidden transition-shadow hover:shadow-lg ${className}`}>
      <div className="relative">
        <Link to={`/escorts/${provider.id}`}>
          <img
            src={provider.imageUrl}
            alt={provider.name}
            className="h-64 w-full object-cover object-center"
            loading="lazy"
          />
        </Link>
        
        {showEliminixIndicator && (
          <EliminixProfileIndicator 
            profile={personaProfile}
            position="top-right"
            size="sm"
          />
        )}
        
        <div className="absolute top-2 left-2 flex gap-1">
          {provider.verified && (
            <Badge variant="secondary" className="bg-primary/70 backdrop-blur-sm">
              <CheckCircle className="mr-1 h-3 w-3" /> Verified
            </Badge>
          )}
          
          {provider.availableNow && (
            <Badge variant="secondary" className="bg-green-600/70 backdrop-blur-sm">
              <Clock className="mr-1 h-3 w-3" /> Available Now
            </Badge>
          )}
        </div>

        <div className="absolute bottom-2 right-2">
          <Badge variant="secondary" className="bg-black/50 backdrop-blur-sm text-white">
            {formatCurrency(provider.price)}
          </Badge>
        </div>

        <div className="absolute top-2 right-2">
          <div className="flex gap-1 bg-black/50 backdrop-blur-sm rounded-md p-1">
            {providesInPerson && (
              <span title="In-person services available">
                {serviceIcons.escort}
              </span>
            )}
            
            {providesContent && (
              <span title="Content creator">
                {serviceIcons.content}
              </span>
            )}
            
            {providesLivecam && (
              <span title="Live cam available">
                {serviceIcons.livecam}
              </span>
            )}
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/escorts/${provider.id}`} className="hover:underline">
            <h3 className="font-medium text-lg">{provider.name}</h3>
          </Link>
          
          <div className="flex items-center text-sm">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span>{provider.rating}</span>
            <span className="text-muted-foreground ml-1">
              ({provider.reviews})
            </span>
          </div>
        </div>

        <div className="flex items-center text-sm mb-1">
          <Globe className="h-3.5 w-3.5 text-muted-foreground mr-1.5" />
          <span className="text-muted-foreground">
            {provider.location}
          </span>
        </div>

        <div className="flex flex-wrap gap-1 my-2">
          {provider.tags.slice(0, 3).map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="bg-secondary text-xs font-normal"
            >
              {tag}
            </Badge>
          ))}
          {provider.tags.length > 3 && (
            <Badge 
              variant="outline" 
              className="bg-secondary text-xs font-normal"
            >
              +{provider.tags.length - 3}
            </Badge>
          )}
        </div>

        {showDetails && (
          <>
            <div className="text-sm mt-2">
              {provider.services.slice(0, 2).join(" • ")}
              {provider.services.length > 2 && " • ..."}
            </div>
            
            {providesContent && provider.subscriptionPrice && (
              <div className="mt-2 text-sm font-medium">
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  Content: {formatCurrency(provider.subscriptionPrice)}/mo
                </Badge>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UnifiedServiceCard;
