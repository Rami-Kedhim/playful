
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/types/user';
import { Calendar, MessageSquare, Settings, User, MapPin, CheckCircle } from 'lucide-react';

interface ProfileHeaderProps {
  profile: UserProfile;
  onEditClick?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, onEditClick }) => {
  const getInitials = (name?: string): string => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-6">
      <Avatar className="w-24 h-24 border-4 border-background">
        <AvatarImage 
          src={profile.avatar_url || profile.avatarUrl || "/placeholder-user.jpg"} 
          alt={profile.name || "User"} 
          className="object-cover"
        />
        <AvatarFallback>{getInitials(profile.name || profile.displayName)}</AvatarFallback>
      </Avatar>

      <div className="space-y-2 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold">{profile.name || profile.displayName}</h1>
          {(profile.verified || profile.is_verified) && (
            <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{profile.user_id}</span>
          </div>
          {profile.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{profile.location}</span>
            </div>
          )}
        </div>

        <div className="pt-2 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Calendar className="h-4 w-4" />
            <span>Schedule</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>Message</span>
          </Button>
          {onEditClick && (
            <Button variant="outline" size="sm" className="gap-1" onClick={onEditClick}>
              <Settings className="h-4 w-4" />
              <span>Edit Profile</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
