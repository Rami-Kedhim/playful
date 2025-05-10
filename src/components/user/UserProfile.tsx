
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User } from '@/types/user';

interface UserProfileProps {
  user: User;
  showActions?: boolean;
  onEdit?: () => void;
  onContact?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  showActions = true,
  onEdit,
  onContact
}) => {
  const userBirthDate = user.birth_date ? new Date(user.birth_date) : null;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatar_url || user.avatarUrl} alt={user.name || user.username || "User"} />
          <AvatarFallback>
            {user.name ? user.name.charAt(0).toUpperCase() : 
             user.username ? user.username.charAt(0).toUpperCase() : "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle>{user.name || user.username || "User"}</CardTitle>
          {user.username && user.username !== user.name && (
            <CardDescription>@{user.username}</CardDescription>
          )}
          {user.location && (
            <CardDescription>{user.location}</CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          {user.email && (
            <div>
              <div className="font-medium">Email</div>
              <div>{user.email}</div>
            </div>
          )}
          {userBirthDate && (
            <div>
              <div className="font-medium">Birth Date</div>
              <div>{userBirthDate.toLocaleDateString()}</div>
            </div>
          )}
          {user.gender && (
            <div>
              <div className="font-medium">Gender</div>
              <div>{user.gender}</div>
            </div>
          )}
          {user.joined_date && (
            <div>
              <div className="font-medium">Joined</div>
              <div>{new Date(user.joined_date).toLocaleDateString()}</div>
            </div>
          )}
        </div>
        {user.bio && (
          <div>
            <div className="font-medium mb-1">Bio</div>
            <p className="text-sm text-muted-foreground">{user.bio}</p>
          </div>
        )}
      </CardContent>
      {showActions && (
        <CardFooter className="flex gap-2 justify-end">
          {onContact && (
            <Button variant="outline" onClick={onContact}>Contact</Button>
          )}
          {onEdit && (
            <Button onClick={onEdit}>Edit Profile</Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default UserProfile;
