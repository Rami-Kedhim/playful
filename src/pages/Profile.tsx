import React from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { useNavigate } from 'react-router-dom';
import Avatar from '@/components/profile/Avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  CreditCard, 
  Settings, 
  LogOut 
} from 'lucide-react';

const Profile: React.FC = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    navigate('/auth');
    return null;
  }

  // Use user.name instead of full_name
  const displayName = user.name || user.email || 'User';
  
  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center space-y-4">
        <Avatar 
          src={user.avatar_url || undefined}
          alt={displayName}
          className="w-32 h-32"
        />
        <h1 className="text-2xl font-bold">{displayName}</h1>
        <div className="flex space-x-2">
          <Badge variant="outline" className="text-xs">Member</Badge>
          {user.role === 'admin' && <Badge className="text-xs">Admin</Badge>}
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleEditProfile}>
            Edit Profile
          </Button>
          <Button variant="outline" size="sm" onClick={handleSettings}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground w-24">Name:</span>
                <span>{displayName}</span>
              </div>
              
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground w-24">Email:</span>
                <span>{user.email}</span>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground w-24">Phone:</span>
                <span>{user.phone_number || 'Not provided'}</span>
              </div>
              
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground w-24">Location:</span>
                <span>{user.location || 'Not provided'}</span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground w-24">Joined:</span>
                <span>{user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Bio</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{user.bio || 'No bio provided yet.'}</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No recent activity to display.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Two-factor authentication</span>
                </div>
                <Badge variant="outline">Disabled</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Payment methods</span>
                </div>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
              
              <Separator />
              
              <div className="pt-2">
                <Button variant="destructive" size="sm">Reset Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
