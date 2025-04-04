
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Loader2, User, Edit, LogOut, Shield, CreditCard, Bell } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Profile = () => {
  const { user, logout, updateUserProfile, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("account");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user && !isLoading) {
      navigate("/auth", { state: { from: { pathname: "/profile" } } });
    }
  }, [user, isLoading, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleUpdateProfile = async () => {
    await updateUserProfile({
      username: formData.username,
    });
    setIsEditing(false);
  };
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  if (isLoading) {
    return (
      <AppLayout>
        <div className="container mx-auto py-16 px-4 flex justify-center items-center">
          <Loader2 className="h-12 w-12 animate-spin" />
        </div>
      </AppLayout>
    );
  }
  
  if (!user) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <AppLayout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
            <div className="w-full md:w-1/3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={user.profileImageUrl} />
                      <AvatarFallback className="text-2xl">
                        {user.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold">{user.username}</h2>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <div className="mt-4 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        disabled={isEditing}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Lucoin Balance</span>
                      <span className="font-semibold text-lucoin">{user.lucoinsBalance} LC</span>
                    </div>
                    <Button className="w-full" size="sm">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Add Lucoins
                    </Button>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <nav className="space-y-1">
                    <Button 
                      variant={activeTab === "account" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("account")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Account
                    </Button>
                    <Button 
                      variant={activeTab === "security" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("security")}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Security
                    </Button>
                    <Button 
                      variant={activeTab === "notifications" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("notifications")}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button>
                  </nav>
                </CardContent>
              </Card>
            </div>
            
            <div className="w-full md:w-2/3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>
                
                <TabsContent value="account">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>
                        View and update your personal information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {error && (
                        <Alert variant="destructive" className="mb-4">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}
                      
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            disabled={!isEditing || isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={true} // Can't change email without verification
                          />
                          <p className="text-xs text-muted-foreground">
                            Email address cannot be changed without verification
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Account Type</Label>
                          <div className="p-2 bg-muted rounded-md">
                            <div className="flex justify-between items-center">
                              <span className="capitalize">{user.role}</span>
                              {user.role === "user" && (
                                <Button variant="link" size="sm" className="h-auto p-0">
                                  Become a Creator
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Verification Status</Label>
                          <div className="p-2 bg-muted rounded-md">
                            <div className="flex justify-between items-center">
                              <span>{user.isVerified ? "Verified" : "Not Verified"}</span>
                              {!user.isVerified && (
                                <Button variant="link" size="sm" className="h-auto p-0">
                                  Verify Now
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    {isEditing && (
                      <CardFooter className="flex justify-between">
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setIsEditing(false);
                            setFormData({
                              username: user.username,
                              email: user.email,
                            });
                          }}
                          disabled={isLoading}
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleUpdateProfile}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                </TabsContent>
                
                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>
                        Manage your password and security preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Password</h3>
                          <Button variant="outline">Change Password</Button>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Add an extra layer of security to your account
                          </p>
                          <Button>Enable 2FA</Button>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="font-medium mb-2">Login Sessions</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Manage your active sessions and sign out from other devices
                          </p>
                          <Button variant="outline">Manage Sessions</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="notifications">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>
                        Manage how and when you receive notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Coming soon - notification settings will be available in a future update.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
