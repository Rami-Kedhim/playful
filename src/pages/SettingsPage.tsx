
import React, { useState } from 'react';
import Layout from '@/layouts/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useTitle } from '@/hooks/useTitle';
import { toast } from 'sonner';

const SettingsPage = () => {
  useTitle("Settings | UberEscorts");
  
  const [tab, setTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  
  // Profile settings
  const [profileSettings, setProfileSettings] = useState({
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "This is my profile bio."
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    inAppNotifications: true,
    marketingEmails: false,
    newMessages: true,
    bookingUpdates: true,
    systemUpdates: true,
    promotionalOffers: false,
  });
  
  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showOnlineStatus: true,
    allowMessaging: "followers",
    allowTagging: true,
    twoFactorAuth: false,
    dataSharing: "minimal"
  });
  
  // Payment settings
  const [paymentSettings, setPaymentSettings] = useState({
    defaultCurrency: "USD",
    autoRecharge: false,
    receivePaymentNotifications: true,
    saveBillingInfo: true
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveSettings = async () => {
    setSaving(true);
    
    // Simulate API call to save settings
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Settings saved successfully!");
    setSaving(false);
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground mb-6">Manage your account preferences and settings</p>
        
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          {/* Settings Sidebar (Mobile Tabs) */}
          <div className="md:hidden">
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Settings Sidebar (Desktop) */}
          <div className="hidden md:block">
            <Card>
              <CardContent className="p-4 space-y-1">
                <Button 
                  variant={tab === "profile" ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setTab("profile")}
                >
                  Profile
                </Button>
                <Button 
                  variant={tab === "notifications" ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setTab("notifications")}
                >
                  Notifications
                </Button>
                <Button 
                  variant={tab === "privacy" ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setTab("privacy")}
                >
                  Privacy & Security
                </Button>
                <Button 
                  variant={tab === "payment" ? "default" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setTab("payment")}
                >
                  Payment
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Settings Content */}
          <div>
            {/* Profile Settings */}
            {tab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    Manage your personal information and profile details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name"
                        name="name"
                        value={profileSettings.name}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username"
                        name="username"
                        value={profileSettings.username}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={profileSettings.email}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone"
                        name="phone"
                        value={profileSettings.phone}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={profileSettings.bio}
                      onChange={handleProfileChange}
                      className="w-full min-h-[100px] p-2 border rounded-md"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveSettings} disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {/* Notification Settings */}
            {tab === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Configure how you receive notifications across different channels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Channels</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.emailNotifications} 
                        onCheckedChange={checked => 
                          setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Push Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.pushNotifications} 
                        onCheckedChange={checked => 
                          setNotificationSettings(prev => ({ ...prev, pushNotifications: checked }))
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">SMS Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive text messages for important updates</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.smsNotifications} 
                        onCheckedChange={checked => 
                          setNotificationSettings(prev => ({ ...prev, smsNotifications: checked }))
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">In-App Notifications</h4>
                        <p className="text-sm text-muted-foreground">Show notifications within the app</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.inAppNotifications} 
                        onCheckedChange={checked => 
                          setNotificationSettings(prev => ({ ...prev, inAppNotifications: checked }))
                        }
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Types</h3>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="new-messages" 
                        checked={notificationSettings.newMessages}
                        onCheckedChange={checked => 
                          setNotificationSettings(prev => ({ 
                            ...prev, 
                            newMessages: checked === true ? true : false 
                          }))
                        }
                      />
                      <Label htmlFor="new-messages">New messages</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="booking-updates" 
                        checked={notificationSettings.bookingUpdates}
                        onCheckedChange={checked => 
                          setNotificationSettings(prev => ({ 
                            ...prev, 
                            bookingUpdates: checked === true ? true : false 
                          }))
                        }
                      />
                      <Label htmlFor="booking-updates">Booking updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="system-updates" 
                        checked={notificationSettings.systemUpdates}
                        onCheckedChange={checked => 
                          setNotificationSettings(prev => ({ 
                            ...prev, 
                            systemUpdates: checked === true ? true : false 
                          }))
                        }
                      />
                      <Label htmlFor="system-updates">System updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="promotional-offers" 
                        checked={notificationSettings.promotionalOffers}
                        onCheckedChange={checked => 
                          setNotificationSettings(prev => ({ 
                            ...prev, 
                            promotionalOffers: checked === true ? true : false 
                          }))
                        }
                      />
                      <Label htmlFor="promotional-offers">Promotional offers</Label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveSettings} disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {/* Privacy Settings */}
            {tab === "privacy" && (
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                  <CardDescription>
                    Manage your privacy preferences and security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="profile-visibility">Profile Visibility</Label>
                      <Select 
                        value={privacySettings.profileVisibility}
                        onValueChange={value => 
                          setPrivacySettings(prev => ({ ...prev, profileVisibility: value }))
                        }
                      >
                        <SelectTrigger id="profile-visibility">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="followers">Followers Only</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Show Online Status</h4>
                        <p className="text-sm text-muted-foreground">Allow others to see when you're online</p>
                      </div>
                      <Switch 
                        checked={privacySettings.showOnlineStatus} 
                        onCheckedChange={checked => 
                          setPrivacySettings(prev => ({ ...prev, showOnlineStatus: checked }))
                        }
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="allow-messaging">Who Can Message You</Label>
                      <Select 
                        value={privacySettings.allowMessaging}
                        onValueChange={value => 
                          setPrivacySettings(prev => ({ ...prev, allowMessaging: value }))
                        }
                      >
                        <SelectTrigger id="allow-messaging">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="everyone">Everyone</SelectItem>
                          <SelectItem value="followers">Followers Only</SelectItem>
                          <SelectItem value="verified">Verified Users Only</SelectItem>
                          <SelectItem value="nobody">Nobody</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Security Settings</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch 
                        checked={privacySettings.twoFactorAuth} 
                        onCheckedChange={checked => 
                          setPrivacySettings(prev => ({ ...prev, twoFactorAuth: checked }))
                        }
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="data-sharing">Data Sharing</Label>
                      <Select 
                        value={privacySettings.dataSharing}
                        onValueChange={value => 
                          setPrivacySettings(prev => ({ ...prev, dataSharing: value }))
                        }
                      >
                        <SelectTrigger id="data-sharing">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">Full (Personalized Experience)</SelectItem>
                          <SelectItem value="partial">Partial (Limited Personalization)</SelectItem>
                          <SelectItem value="minimal">Minimal (Essential Only)</SelectItem>
                          <SelectItem value="none">None (Basic Experience)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button variant="destructive" className="mt-4">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveSettings} disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {/* Payment Settings */}
            {tab === "payment" && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Settings</CardTitle>
                  <CardDescription>
                    Manage your payment preferences and wallet settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="default-currency">Default Currency</Label>
                      <Select 
                        value={paymentSettings.defaultCurrency}
                        onValueChange={value => 
                          setPaymentSettings(prev => ({ ...prev, defaultCurrency: value }))
                        }
                      >
                        <SelectTrigger id="default-currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="GBP">GBP - British Pound</SelectItem>
                          <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                          <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                          <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Auto-Recharge Wallet</h4>
                        <p className="text-sm text-muted-foreground">Automatically add funds when balance is low</p>
                      </div>
                      <Switch 
                        checked={paymentSettings.autoRecharge} 
                        onCheckedChange={checked => 
                          setPaymentSettings(prev => ({ ...prev, autoRecharge: checked }))
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Payment Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive notifications about payments and transactions</p>
                      </div>
                      <Switch 
                        checked={paymentSettings.receivePaymentNotifications} 
                        onCheckedChange={checked => 
                          setPaymentSettings(prev => ({ ...prev, receivePaymentNotifications: checked }))
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Save Billing Information</h4>
                        <p className="text-sm text-muted-foreground">Securely save payment methods for future use</p>
                      </div>
                      <Switch 
                        checked={paymentSettings.saveBillingInfo} 
                        onCheckedChange={checked => 
                          setPaymentSettings(prev => ({ ...prev, saveBillingInfo: checked }))
                        }
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Methods</h3>
                    <p className="text-sm text-muted-foreground">Add and manage your payment methods</p>
                    
                    <div className="border rounded-md p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-muted h-10 w-16 rounded"></div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/25</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Add New Payment Method
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveSettings} disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
