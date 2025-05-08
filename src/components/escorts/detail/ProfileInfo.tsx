
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Calendar, Clock, Globe, Users } from 'lucide-react';
import type { Escort } from '@/types/Escort';

const ProfileInfo: React.FC<{ escort: Escort }> = ({ escort }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
      <Avatar className="h-24 w-24 md:h-32 md:w-32">
        <AvatarImage src={escort.avatarUrl || escort.profileImage} alt={escort.name} />
        <AvatarFallback>{escort.name?.charAt(0) || 'E'}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 space-y-4 text-center md:text-left">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{escort.name}</h1>
          <div className="text-muted-foreground flex flex-wrap items-center justify-center md:justify-start gap-3 mt-1">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{escort.location}</span>
            </div>
            
            {escort.age && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{escort.age} years</span>
              </div>
            )}
            
            {escort.lastActive && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Active {formatLastActive(escort.lastActive)}</span>
              </div>
            )}
            
            {Array.isArray(escort.languages) && escort.languages.length > 0 && (
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>{escort.languages.join(', ')}</span>
              </div>
            )}
            
            {escort.clientsServed && (
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{escort.clientsServed} clients</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {escort.isVerified && (
            <Badge variant="secondary">Verified</Badge>
          )}
          {escort.tags?.map(tag => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>
        
        <div className="flex items-center gap-1 justify-center md:justify-start">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <span className="font-bold">{escort.rating || 5.0}</span>
          <span className="text-muted-foreground">({escort.reviewCount || 0} reviews)</span>
        </div>
      </div>
    </div>
  );
};

function formatLastActive(lastActive: string | Date): string {
  const date = typeof lastActive === 'string' ? new Date(lastActive) : lastActive;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 60) {
    return diffMins <= 5 ? 'just now' : `${diffMins} mins ago`;
  }
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  }
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  }
  
  return date.toLocaleDateString();
}

export default ProfileInfo;
