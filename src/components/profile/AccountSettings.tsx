
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Check, AlertCircle } from "lucide-react";

// Define the password change result type
interface PasswordChangeResult {
  success: boolean;
  error?: string;
}

const AccountSettings = () => {
  // State for form values
  const [email, setEmail] = useState('user@example.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // State for notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordChangeResult, setPasswordChangeResult] = useState<PasswordChangeResult | null>(null);
  const [emailChangeResult, setEmailChangeResult] = useState<boolean>(false);
  const [notificationSaveResult, setNotificationSaveResult] = useState<boolean>(false);
  
  // Handle password change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validation
    if (newPassword !== confirmPassword) {
      setPasswordChangeResult({
        success: false,
        error: "Passwords don't match"
      });
      setIsSubmitting(false);
      return;
    }
    
    if (newPassword.length < 8) {
      setPasswordChangeResult({
        success: false,
        error: "Password must be at least 8 characters"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, always succeed
    setPasswordChangeResult({
      success: true
    });
    
    // Reset form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsSubmitting(false);
  };
  
  // Handle email change
  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, always succeed
    setEmailChangeResult(true as unknown as boolean);
    
    setIsSubmitting(false);
    
    // Reset result after 3 seconds
    setTimeout(() => setEmailChangeResult(false), 3000);
  };
  
  // Handle notification settings
  const handleNotificationSave = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, always succeed
    setNotificationSaveResult(true);
    
    setIsSubmitting(false);
    
    // Reset result after 3 seconds
    setTimeout(() => setNotificationSaveResult(false), 3000);
  };
  
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Update your email address and basic account information.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                />
              </div>
              
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Email'}
              </Button>
              
              {emailChangeResult && emailChangeResult.success && (
                <Alert className="mt-4 bg-green-50 text-green-700 border-green-200">
                  <Check className="h-4 w-4" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>Email address has been updated.</AlertDescription>
                </Alert>
              )}
              
              {emailChangeResult && !emailChangeResult.success && (
                <Alert className="mt-4 bg-red-50 text-red-700 border-red-200" variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Failed</AlertTitle>
                  <AlertDescription>{emailChangeResult.error}</AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Change your password and manage security preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input 
                  id="currentPassword" 
                  type="password" 
                  value={currentPassword} 
                  onChange={(e) => setCurrentPassword(e.target.value)} 
                  required
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input 
                  id="newPassword" 
                  type="password" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required
                />
              </div>
              
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update Password'}
              </Button>
              
              {passwordChangeResult && passwordChangeResult.success && (
                <Alert className="mt-4 bg-green-50 text-green-700 border-green-200">
                  <Check className="h-4 w-4" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>Password has been updated successfully.</AlertDescription>
                </Alert>
              )}
              
              {passwordChangeResult && !passwordChangeResult.success && (
                <Alert className="mt-4 bg-red-50 text-red-700 border-red-200" variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Failed</AlertTitle>
                  <AlertDescription>{passwordChangeResult.error}</AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Configure how and when you want to be notified.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications" className="font-medium">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch 
                id="emailNotifications" 
                checked={emailNotifications} 
                onCheckedChange={setEmailNotifications} 
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="pushNotifications" className="font-medium">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
              </div>
              <Switch 
                id="pushNotifications" 
                checked={pushNotifications} 
                onCheckedChange={setPushNotifications} 
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketingEmails" className="font-medium">Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">Receive promotional emails and offers</p>
              </div>
              <Switch 
                id="marketingEmails" 
                checked={marketingEmails} 
                onCheckedChange={setMarketingEmails} 
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleNotificationSave} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Preferences'}
            </Button>
            
            {notificationSaveResult && (
              <Alert className="ml-4 bg-green-50 text-green-700 border-green-200">
                <Check className="h-4 w-4" />
                <AlertDescription>Preferences saved</AlertDescription>
              </Alert>
            )}
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AccountSettings;
