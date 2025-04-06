
import React, { useState } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { isVerifiedEscort } from '@/utils/authStateUtils';

const ProfilePage = () => {
  const { user, profile, userRoles, updateUserProfile, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    username: user?.username || '',
    avatar_url: profile?.avatar_url || '',
    bio: profile?.bio || '',
    location: profile?.location || ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await updateUserProfile(formData);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const isEscortAccount = isVerifiedEscort(userRoles, profile);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Your personal details</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback>
                    {user?.username?.substring(0, 2).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h3 className="font-medium text-lg">{user?.username || 'Username not set'}</h3>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                
                <div className="mt-4 w-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Account Type</span>
                    <span className="text-sm font-medium">
                      {isEscortAccount ? 'Escort' : 'Client'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Verified</span>
                    <span className={`text-sm font-medium ${profile?.is_verified ? 'text-green-500' : 'text-yellow-500'}`}>
                      {profile?.is_verified ? 'Yes' : 'No'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">LuCoins</span>
                    <span className="text-sm font-medium">
                      {profile?.lucoin_balance || 0}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your profile information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                      id="username" 
                      name="username" 
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="avatar_url">Profile Image URL</Label>
                    <Input 
                      id="avatar_url" 
                      name="avatar_url" 
                      value={formData.avatar_url}
                      onChange={handleChange}
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      name="bio" 
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      name="location" 
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, Country"
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
