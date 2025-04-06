import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/auth/useAuth';
import { Camera, Globe, Phone, Mail, MapPin, Shield, Settings, UserCircle } from 'lucide-react';

// Create placeholder components for missing imports
const useUserPreferences = () => {
  return {
    theme: 'light',
    toggleTheme: () => {},
    language: 'en',
    setLanguage: () => {},
  };
};

const VerificationStatus = () => {
  return <div>Verification Status Component</div>;
};

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const { theme, toggleTheme, language, setLanguage } = useUserPreferences();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
  });
  
  useEffect(() => {
    if (!user && !id) {
      navigate('/login');
    }
  }, [user, id, navigate]);
  
  const handleProfileUpdate = async () => {
    if (!user) return;
    
    try {
      await updateUser({
        full_name: profileData.name,
        phone: profileData.phone,
        location: profileData.location,
        bio: profileData.bio,
        profileImageUrl: user.profileImageUrl, // Use profileImageUrl instead of avatar_url
      });
      
      setIsEditing(false);
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully updated."
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update Failed",
        description: "There was a problem updating your profile. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  if (!user) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="flex items-center justify-center py-10">
              <p>Loading...</p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user.profileImageUrl} />
                    <AvatarFallback>{user.full_name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  
                  <h2 className="text-xl font-semibold">{user.full_name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                  
                  <div className="mt-4 space-y-2 w-full">
                    <div className="flex items-center text-sm">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{user.email}</span>
                    </div>
                    {user.phone && (
                      <div className="flex items-center text-sm">
                        <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                    {user.location && (
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{user.location}</span>
                      </div>
                    )}
                  </div>
                  
                  <Button variant="secondary" className="mt-6 w-full">
                    <Camera className="mr-2 h-4 w-4" />
                    Change Photo
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Account Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Member Since</span>
                    <span>January 2023</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Account Type</span>
                    <span className="capitalize">{user.role || 'User'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <span className="text-green-500">Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Tabs defaultValue="profile">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="profile">
                  <UserCircle className="mr-2 h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="verification">
                  <Shield className="mr-2 h-4 w-4" />
                  Verification
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Profile information form would go here */}
                    <p className="mb-4">Basic profile information</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="verification">
                <Card>
                  <CardHeader>
                    <CardTitle>Identity Verification</CardTitle>
                    <CardDescription>
                      Verify your identity to unlock premium features
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <VerificationStatus />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Account settings form would go here */}
                    <p className="mb-4">Account preferences and settings</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
