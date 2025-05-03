
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Settings, CreditCard, Shield, Bell, BookOpen } from 'lucide-react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  
  // Mock user data - would come from authentication context in a full implementation
  const user = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=68',
    joinDate: 'January 2023'
  };

  return (
    <MainLayout
      title="My Profile"
      description="Manage your personal information"
      showBreadcrumbs
    >
      <div className="py-8 space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-2 border-primary">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.substring(0,2)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-2 text-center md:text-left">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground">Member since {user.joinDate}</p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline">Edit Profile</Button>
                <Button>Message Settings</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Personal</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden md:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden md:inline">Payment</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden md:inline">Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden md:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden md:inline">History</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and how information is displayed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded-md" 
                      defaultValue={user.name} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input 
                      type="email" 
                      className="w-full p-2 border rounded-md" 
                      defaultValue={user.email} 
                    />
                  </div>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security and verification</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Security settings content will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment options and UBX wallet</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Payment settings content will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Update your app settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Preferences content will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Control which notifications you receive</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Notification settings content will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Account History</CardTitle>
                <CardDescription>View your account activity and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Account history content will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
