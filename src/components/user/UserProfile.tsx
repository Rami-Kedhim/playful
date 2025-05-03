
import React from 'react';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Loader2, LogOut, User } from 'lucide-react';

interface UserProfileProps {
  hideSignOut?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ hideSignOut = false }) => {
  const { user, signOut, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-6">
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return null;
  }

  // Safely access username from either direct property or metadata
  const username = user.username || 
                  user.user_metadata?.username || 
                  user.email?.split('@')[0] || 
                  'User';
  const initials = username.slice(0, 2).toUpperCase();
  const avatarUrl = user.avatarUrl || user.avatar_url;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{username}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 opacity-70" />
          <span className="text-sm text-muted-foreground">Member since {new Date(user.created_at || '').toLocaleDateString()}</span>
        </div>
      </CardContent>
      
      {!hideSignOut && (
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default UserProfile;
