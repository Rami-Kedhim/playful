
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VerifiedMark } from "@/components/shared/VerifiedMark";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface UserProfileSummaryProps {
  user: any;
  profile: any;
  isLoading?: boolean;
}

const UserProfileSummary: React.FC<UserProfileSummaryProps> = ({ user, profile, isLoading }) => {
  const avatarUrl = profile?.avatar_url || user?.avatar_url || "";
  const name = profile?.name || user?.name || "User";
  const location = profile?.location || user?.location || "Unknown";
  const bio = profile?.bio || user?.bio || "No bio available";

  const getRoleBadgeVariant = (roles?: string[]) => {
    if (!roles || roles.length === 0) return 'outline';
    
    if (roles.includes('escort')) {
      return 'secondary';
    } else if (roles.includes('creator')) {
      return 'default'; // Changed from 'accent' to 'default' to match the allowed variants
    }
    return 'outline';
  };

  const getRoleLabel = (roles?: string[]) => {
    if (!roles || roles.length === 0) return 'User';
    
    if (roles.includes('escort')) {
      return 'Escort';
    } else if (roles.includes('creator')) {
      return 'Creator';
    }
    return 'User';
  };

  return (
    <div className="flex flex-col items-center text-center">
      {isLoading ? (
        <Skeleton className="h-24 w-24 rounded-full mb-4" />
      ) : (
        <Avatar className="h-24 w-24 relative">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          {user?.isVerified && (
            <VerifiedMark className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4" />
          )}
        </Avatar>
      )}
      
      {isLoading ? (
        <Skeleton className="h-6 w-32 mt-2" />
      ) : (
        <h2 className="text-2xl font-semibold mt-2">{name}</h2>
      )}
      
      {isLoading ? (
        <Skeleton className="h-4 w-24 mt-1" />
      ) : (
        <p className="text-gray-500 text-sm">{location}</p>
      )}
      
      {isLoading ? (
        <Skeleton className="h-7 w-40 mt-3" />
      ) : (
        <Badge variant={getRoleBadgeVariant(user?.roles)} className="mt-3">
          {getRoleLabel(user?.roles)}
        </Badge>
      )}
      
      {isLoading ? (
        <Skeleton className="h-4 w-48 mt-4" />
      ) : (
        <p className="text-gray-600 mt-4">{bio}</p>
      )}
    </div>
  );
};

export default UserProfileSummary;
