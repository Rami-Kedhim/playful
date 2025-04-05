
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth/useAuth";
import { useNotifications } from "@/contexts/NotificationsContext";
import UserProfileSummary from "@/components/profile/UserProfileSummary";
import { Wallet, User, Settings, Shield, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const { showSuccess, showError, showInfo, showWarning } = useNotifications();
  
  if (!isAuthenticated || !user) {
    return (
      <AppLayout>
        <div className="container px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          <p>Please sign in to view your profile.</p>
          <Button className="mt-4">Sign In</Button>
        </div>
      </AppLayout>
    );
  }
  
  const handleTestNotifications = () => {
    showSuccess("Success Notification", "This is a success notification example.");
    setTimeout(() => showError("Error Notification", "This is an error notification example."), 1000);
    setTimeout(() => showInfo("Info Notification", "This is an info notification example."), 2000);
    setTimeout(() => showWarning("Warning Notification", "This is a warning notification example."), 3000);
  };

  return (
    <AppLayout>
      <div className="container px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <UserProfileSummary user={user} onEdit={() => {}} />
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Notification Demo</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={handleTestNotifications}>Test Notifications</Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="account">
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="account">
                  <User className="mr-2 h-4 w-4" />
                  Account
                </TabsTrigger>
                <TabsTrigger value="wallet">
                  <Wallet className="mr-2 h-4 w-4" />
                  Wallet
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Shield className="mr-2 h-4 w-4" />
                  Security
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="account" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Account Status: Active</p>
                    
                    <Button className="mt-4">Edit Profile</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="wallet" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Wallet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Current Balance: {user.lucoinsBalance || 0} LC</p>
                    <Button className="mt-4">Add Funds</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Configure your notification preferences.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Update your password and security settings.</p>
                    <Button className="mt-4">Change Password</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
