
import React from 'react';
import { User } from '@/types/user';
import { UserProfile } from '@/types/auth';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CheckCircle, MapPin, User as UserIcon, Mail } from 'lucide-react';

interface ProfileHeaderProps {
  user: User;
  profile: UserProfile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, profile }) => {
  const initials = user.name
    ? user.name
        .split(' ')
        .map(n => n[0])
        .join('')
    : user.email?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
      <Avatar className="h-24 w-24">
        <AvatarImage src={profile.avatarUrl || profile.avatar_url || ''} alt={user.name || 'User'} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <h1 className="text-2xl font-bold">{user.name || 'Unnamed User'}</h1>
          
          {(user.isVerified || profile.verified || profile.is_verified) && (
            <div className="inline-flex items-center text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span className="text-sm">Verified</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mt-2 text-muted-foreground">
          {profile.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{profile.location}</span>
            </div>
          )}
          
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-1" />
            <span>{user.email}</span>
          </div>
          
          <div className="flex items-center">
            <UserIcon className="h-4 w-4 mr-1" />
            <span>{user.roles?.[0] || user.role || 'User'}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-muted-foreground">{profile.bio || 'No bio available'}</p>
        </div>
      </div>
      
      <div className="shrink-0">
        <Button variant="outline">Edit Profile</Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
