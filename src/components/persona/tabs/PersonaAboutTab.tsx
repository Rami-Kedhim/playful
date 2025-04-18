
import React from 'react';
import { UberPersona } from '@/types/UberPersona';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, MapPin, Globe, Languages, User, Star, Heart } from 'lucide-react';
import { VerificationBadge } from '@/components/verification/VerificationBadge';

interface PersonaAboutTabProps {
  persona: UberPersona;
}

export const PersonaAboutTab: React.FC<PersonaAboutTabProps> = ({ persona }) => {
  return (
    <div className="space-y-6">
      {/* Biography Section */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-2">Biography</h3>
          <p className="text-muted-foreground whitespace-pre-line">
            {persona.bio || persona.description || "No biography provided."}
          </p>
        </CardContent>
      </Card>

      {/* Details Section */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Details */}
            <div className="space-y-3">
              {persona.age && (
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Age: {persona.age}</span>
                </div>
              )}
              
              {persona.location && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{persona.location}</span>
                </div>
              )}
              
              {persona.ethnicity && (
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Ethnicity: {persona.ethnicity}</span>
                </div>
              )}
              
              {persona.language && persona.language.length > 0 && (
                <div className="flex items-center">
                  <Languages className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Languages: {persona.language.join(', ')}</span>
                </div>
              )}
            </div>
            
            {/* Additional Details */}
            <div className="space-y-3">
              {persona.isVerified && (
                <div className="flex items-center">
                  <VerificationBadge size="sm" />
                  <span className="text-sm ml-2">Verified Profile</span>
                </div>
              )}
              
              {persona.rating !== undefined && (
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-yellow-500" />
                  <span className="text-sm">Rating: {persona.rating.toFixed(1)}</span>
                </div>
              )}
              
              {persona.stats?.favoriteCount !== undefined && (
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-2 text-red-500" />
                  <span className="text-sm">Favorites: {persona.stats.favoriteCount}</span>
                </div>
              )}
              
              {persona.stats?.responseTime !== undefined && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Response time: {persona.stats.responseTime}m</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services Section - Only show for escorts or those with services */}
      {(persona.type === 'escort' || persona.roleFlags?.isEscort || persona.services) && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Services</h3>
            {persona.services && persona.services.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {persona.services.map((service, index) => (
                  <div key={index} className="bg-secondary/20 rounded-md p-3">
                    {service}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No services listed.</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Special Traits - Only for AI personas */}
      {(persona.type === 'ai' || persona.roleFlags?.isAI) && persona.traits && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4">AI Traits</h3>
            <div className="space-y-2">
              {Object.entries(persona.traits).map(([trait, value]) => (
                <div key={trait} className="flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm capitalize">{trait}</span>
                    <span className="text-sm">{value}/5</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${(value / 5) * 100}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Information */}
      {(persona.price !== undefined || (persona.monetization?.meetingPrice !== undefined)) && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Rates</h3>
            <div className="space-y-2">
              {persona.price !== undefined && (
                <div className="flex justify-between">
                  <span>Standard Rate</span>
                  <span className="font-semibold">${persona.price}/hr</span>
                </div>
              )}
              {persona.monetization?.meetingPrice !== undefined && (
                <div className="flex justify-between">
                  <span>Meeting Rate</span>
                  <span className="font-semibold">${persona.monetization.meetingPrice}/hr</span>
                </div>
              )}
              {persona.monetization?.subscriptionPrice !== undefined && (
                <div className="flex justify-between">
                  <span>Subscription</span>
                  <span className="font-semibold">${persona.monetization.subscriptionPrice}/mo</span>
                </div>
              )}
              <Separator className="my-2" />
              <p className="text-xs text-muted-foreground">
                Please note that rates may vary based on services requested. Contact for details.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
