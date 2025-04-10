
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, User, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import UpcomingBookings from './UpcomingBookings';

// Mock data for upcoming bookings
const mockBookings = [
  {
    id: "booking123",
    escortId: "escort1",
    escortName: "Sophia Rose",
    location: "Downtown",
    date: "2025-04-15",
    time: "7:00 PM",
    duration: "2hours",
    status: "confirmed",
    price: 300
  },
  {
    id: "booking456",
    escortId: "escort2",
    escortName: "Emma Black",
    location: "Westside",
    date: "2025-04-20",
    time: "8:00 PM",
    duration: "3hours",
    status: "pending",
    price: 450
  }
] as const;

const ProfileManager: React.FC = () => {
  const { user, profile, updateUserProfile, isLoading, userRoles, refreshProfile } = useAuth();
  
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('edit');
  
  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setAvatarUrl(user.profileImageUrl || '');
    }
    
    if (profile) {
      setFullName(profile.full_name || '');
      setBio(profile.bio || '');
      if (profile.avatar_url) setAvatarUrl(profile.avatar_url);
    }
  }, [user, profile]);
  
  const handleSaveProfile = async () => {
    setIsSaving(true);
    
    try {
      const success = await updateUserProfile({
        username,
        profileImageUrl: avatarUrl
      });
      
      if (!success) {
        throw new Error("Failed to update profile");
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .update({
          username,
          full_name: fullName,
          bio,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id || '');
      
      if (error) throw error;
      
      await refreshProfile();
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    toast({
      title: "Booking Cancelled",
      description: `Booking ${bookingId.substring(0, 8)} has been cancelled`,
    });
    // In a real app, you would call an API to cancel the booking
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="text-center p-8">
        <p>You must be logged in to view and edit your profile.</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="edit">Edit Profile</TabsTrigger>
          <TabsTrigger value="view">View Profile</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>
                Update your profile information and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback>{username?.substring(0, 2).toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <Label htmlFor="avatarUrl">Profile Image URL</Label>
                  <Input
                    id="avatarUrl"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  value={user.email}
                  disabled 
                  readOnly
                />
                <p className="text-sm text-muted-foreground">
                  Your email address cannot be changed
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your username"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself"
                  className="w-full h-24 px-3 py-2 border rounded-md"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Role</Label>
                <div className="flex items-center space-x-2 px-3 py-2 border rounded-md bg-muted">
                  <Shield className="h-4 w-4" />
                  <span>{userRoles.join(', ')}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Roles are managed by administrators
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSaveProfile} 
                disabled={isSaving}
                className="ml-auto"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : 'Save Changes'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="view">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Your public profile information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4 mb-6">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback>{username?.substring(0, 2).toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-2xl font-bold">{username}</h2>
                  {fullName && <p className="text-muted-foreground">{fullName}</p>}
                </div>
              </div>
              
              {bio && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Bio</h3>
                  <p>{bio}</p>
                </div>
              )}
              
              <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-semibold mb-2">Account Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member Since</span>
                    <span>{new Date(user.created_at || '').toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Role</span>
                    <span>{userRoles.join(', ')}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bookings">
          <UpcomingBookings 
            bookings={mockBookings as any} 
            onCancelBooking={handleCancelBooking} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileManager;
