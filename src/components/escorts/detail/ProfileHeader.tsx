
// Fix usage of `isFavorited` property existence in Escort interface

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { User, MapPin, Verified } from 'lucide-react';
import { Escort } from '@/types/escort';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface ProfileHeaderProps {
  escort: Escort;
  onFavoriteToggle?: () => void;
}

type VerificationLevelType = 'none' | 'basic' | 'enhanced' | 'premium';

const ProfileHeader = ({ escort, onFavoriteToggle }: ProfileHeaderProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const getVerificationBadge = () => {
    const level = (escort.verificationLevel || 'none') as VerificationLevelType;
    
    if (level === 'none') return null;
    
    return (
      <Badge variant="outline" className="flex items-center gap-1">
        <Verified className="h-3.5 w-3.5 text-primary" />
        <span className="capitalize">{level} Verified</span>
      </Badge>
    );
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <Avatar className="h-20 w-20 border-2 border-primary">
        <AvatarImage 
          src={escort.profileImage || escort.avatar || escort.avatar_url || ''} 
          alt={escort.name} 
          className="object-cover"
        />
        <AvatarFallback>{getInitials(escort.name)}</AvatarFallback>
      </Avatar>
      
      <div className="space-y-1 flex-1">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{escort.name}</h1>
          {onFavoriteToggle && (
            <button 
              onClick={onFavoriteToggle}
              className="text-muted-foreground hover:text-destructive transition-colors"
              aria-label={escort.isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill={escort.isFavorited ? "currentColor" : "none"}
                stroke="currentColor" 
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{escort.gender || "Not specified"}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{escort.location || "Remote"}</span>
          </div>
          {getVerificationBadge()}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
