
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth/useAuth";
import { useNotifications } from "@/contexts/NotificationsContext";
import UserProfileSummary from "@/components/profile/UserProfileSummary";
import { Wallet, User, Settings, Shield, Bell, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import UBXWallet from "@/components/wallet/UBXWallet";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const { showSuccess, showError, showInfo, showWarning } = useNotifications();
  const navigate = useNavigate();
  
  if (!isAuthenticated || !user) {
    return (
      <AppLayout>
        <div className="container px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          <p>Please sign in to view your profile.</p>
          <Button className="mt-4" onClick={() => navigate("/auth")}>Sign In</Button>
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

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  return (
    <AppLayout>
      <div className="container px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <Button onClick={handleEditProfile} variant="outline" className="mt-2 md:mt-0">
            <Settings className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar */}
          <div className="space-y-6">
            <UserProfileSummary />
            
            <UBXWallet 
              showRefresh={true}
              showHistory={true}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/wallet')}>
                  <Wallet className="mr-2 h-4 w-4" />
                  Manage Wallet
                </Button>
                
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/favorites')}>
                  <User className="mr-2 h-4 w-4" />
                  My Favorites
                </Button>
                
                <Button variant="outline" className="w-full justify-start" onClick={handleTestNotifications}>
                  <Bell className="mr-2 h-4 w-4" />
                  Test Notifications
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content area */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="account">
              <TabsList className="w-full grid grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="account">
                  <User className="mr-2 h-4 w-4" />
                  Account
                </TabsTrigger>
                <TabsTrigger value="wallet">
                  <Wallet className="mr-2 h-4 w-4" />
                  Wallet
                </TabsTrigger>
                <TabsTrigger value="bookings">
                  <Calendar className="mr-2 h-4 w-4" />
                  Bookings
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
                    <CardDescription>Your personal account details and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Username</h3>
                        <p className="text-base">{user.username || "Not set"}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                        <p className="text-base">{user.email}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Account Status</h3>
                        <div className="flex items-center">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Active
                          </Badge>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Member Since</h3>
                        <p className="text-base">
                          {user.created_at ? new Date(user.created_at).toLocaleDateString() : "Unknown"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="text-sm font-medium mb-2">Account Roles</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.role ? (
                          <Badge variant="secondary">{user.role}</Badge>
                        ) : (
                          <Badge variant="outline">User</Badge>
                        )}
                        
                        {user.isCreator && (
                          <Badge variant="secondary">Creator</Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="wallet" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Wallet Details</CardTitle>
                    <CardDescription>Manage your funds and transaction history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Current Balance</h3>
                        <div className="text-2xl font-bold">{user.lucoinsBalance || 0} LC</div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-4">
                        <Button onClick={() => navigate('/wallet')}>
                          View Full Wallet
                        </Button>
                        
                        <Button variant="outline">
                          Purchase Credits
                        </Button>
                      </div>

                      <div className="pt-4 border-t">
                        <h3 className="text-sm font-medium mb-2">Recent Transactions</h3>
                        <p className="text-muted-foreground text-sm">
                          View your transaction history in the wallet section.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="bookings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Bookings</CardTitle>
                    <CardDescription>View and manage your upcoming appointments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-md border p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">No Upcoming Bookings</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              You don't have any bookings scheduled at the moment.
                            </p>
                          </div>
                          <Clock className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full" onClick={() => navigate('/escorts')}>
                        Browse Profiles
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your security and privacy preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Password Management</h3>
                      <p className="text-sm text-muted-foreground">
                        Regularly update your password to maintain account security.
                      </p>
                      <Button variant="outline">Change Password</Button>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="text-sm font-medium mb-2">Account Protection</h3>
                      <p className="text-sm text-muted-foreground">
                        Additional security measures are available in the security section.
                      </p>
                    </div>
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
