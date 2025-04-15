
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import VerificationBadge from '@/components/verification/VerificationBadgeV2';

interface UserProfileCardProps {
  user: {
    username?: string;
    email?: string;
    profileImageUrl?: string;
    verificationLevel?: "none" | "basic" | "enhanced" | "premium";
  };
  className?: string;
}

const UserProfileCard = ({ user, className = '' }: UserProfileCardProps) => {
  const initials = user.username?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || '?';

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.profileImageUrl} alt={user.username || 'User avatar'} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{user.username || 'User'}</h3>
              <VerificationBadge level={user.verificationLevel || 'none'} size="sm" />
            </div>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
