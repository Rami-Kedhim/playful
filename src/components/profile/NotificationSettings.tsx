
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Bell, Mail, MessageSquare, AlertTriangle, Heart, Check, Loader2 } from 'lucide-react';

const NotificationSettings = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSettings, setEmailSettings] = useState({
    messages: true,
    mentions: true,
    updates: true,
    marketing: false,
    security: true,
  });
  
  const [appSettings, setAppSettings] = useState({
    messages: true,
    mentions: true,
    likes: true,
    follows: true,
    updates: true,
    security: true,
  });
  
  const handleEmailChange = (setting: keyof typeof emailSettings) => {
    setEmailSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };
  
  const handleAppChange = (setting: keyof typeof appSettings) => {
    setAppSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };
  
  const handleSave = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated.",
    });
    
    setIsSubmitting(false);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Configure how and when you receive notifications.</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium flex items-center mb-4">
            <Mail className="h-5 w-5 mr-2" />
            Email Notifications
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-messages" className="font-medium">Messages</Label>
                <p className="text-sm text-muted-foreground">Receive email notifications for new messages</p>
              </div>
              <Switch 
                id="email-messages" 
                checked={emailSettings.messages} 
                onCheckedChange={() => handleEmailChange('messages')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-mentions" className="font-medium">Mentions</Label>
                <p className="text-sm text-muted-foreground">Receive email notifications when you're mentioned</p>
              </div>
              <Switch 
                id="email-mentions" 
                checked={emailSettings.mentions} 
                onCheckedChange={() => handleEmailChange('mentions')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-updates" className="font-medium">Updates</Label>
                <p className="text-sm text-muted-foreground">Receive email notifications for platform updates</p>
              </div>
              <Switch 
                id="email-updates" 
                checked={emailSettings.updates} 
                onCheckedChange={() => handleEmailChange('updates')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-marketing" className="font-medium">Marketing</Label>
                <p className="text-sm text-muted-foreground">Receive marketing emails and promotions</p>
              </div>
              <Switch 
                id="email-marketing" 
                checked={emailSettings.marketing} 
                onCheckedChange={() => handleEmailChange('marketing')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-security" className="font-medium">Security Alerts</Label>
                <p className="text-sm text-muted-foreground">Receive email notifications for security events</p>
              </div>
              <Switch 
                id="email-security" 
                checked={emailSettings.security} 
                onCheckedChange={() => handleEmailChange('security')}
              />
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div>
          <h3 className="text-lg font-medium flex items-center mb-4">
            <Bell className="h-5 w-5 mr-2" />
            App Notifications
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="app-messages" className="font-medium">Messages</Label>
                <p className="text-sm text-muted-foreground">Show notifications for new messages</p>
              </div>
              <Switch 
                id="app-messages" 
                checked={appSettings.messages} 
                onCheckedChange={() => handleAppChange('messages')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="app-mentions" className="font-medium">Mentions</Label>
                <p className="text-sm text-muted-foreground">Show notifications when you're mentioned</p>
              </div>
              <Switch 
                id="app-mentions" 
                checked={appSettings.mentions} 
                onCheckedChange={() => handleAppChange('mentions')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="app-likes" className="font-medium">Likes</Label>
                <p className="text-sm text-muted-foreground">Show notifications for likes on your content</p>
              </div>
              <Switch 
                id="app-likes" 
                checked={appSettings.likes} 
                onCheckedChange={() => handleAppChange('likes')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="app-follows" className="font-medium">Follows</Label>
                <p className="text-sm text-muted-foreground">Show notifications for new followers</p>
              </div>
              <Switch 
                id="app-follows" 
                checked={appSettings.follows} 
                onCheckedChange={() => handleAppChange('follows')}
              />
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button onClick={handleSave} disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Notification Settings'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationSettings;
