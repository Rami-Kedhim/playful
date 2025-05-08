import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { VerificationBadge } from '@/components/verification';
import { VerificationLevel } from '@/types/verification'; // Changed from VerificationLevels

const ProfilePage = () => {
  const { user } = useAuth();

  // Placeholder data - replace with actual data fetching
  const profileData = {
    name: user?.username || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    imageUrl: user?.avatarUrl || '/placeholder-avatar.jpg',
    bio: 'A short bio about the user.',
    location: 'New York, USA',
  };

  // Update relevant verificationLevel assignments to use VerificationLevel enum
  const verificationLevel = VerificationLevel.PREMIUM; // Use enum value instead of string

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">My Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profileData.imageUrl} alt={profileData.name} />
              <AvatarFallback>{profileData.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{profileData.name}</h2>
              <p className="text-muted-foreground">{profileData.email}</p>
              <VerificationBadge level={verificationLevel} />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Bio</h3>
            <p className="text-muted-foreground">{profileData.bio}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Location</h3>
            <p className="text-muted-foreground">{profileData.location}</p>
          </div>
          <div className="flex justify-end">
            <Button asChild>
              <Link to="/settings">Edit Profile</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
