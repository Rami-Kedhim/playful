
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const NotificationSettings = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  const [emailSettings, setEmailSettings] = useState({
    messages: true,
    bookings: true,
    payments: true,
    system: true,
    marketing: false
  });
  
  const [pushSettings, setPushSettings] = useState({
    messages: true,
    bookings: true,
    payments: true,
    system: false,
    marketing: false
  });
  
  const [notificationDisplay, setNotificationDisplay] = useState('all');
  
  const handleEmailToggle = (key: keyof typeof emailSettings) => {
    setEmailSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handlePushToggle = (key: keyof typeof pushSettings) => {
    setPushSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated.",
    });
    
    setIsSaving(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Manage how you receive notifications and alerts.</CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="email">
          <TabsList className="mb-6">
            <TabsTrigger value="email">Email Notifications</TabsTrigger>
            <TabsTrigger value="push">Push Notifications</TabsTrigger>
            <TabsTrigger value="display">Display Settings</TabsTrigger>
          </TabsList>
          
          {/* Email Notification Settings */}
          <TabsContent value="email" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b">
                <Label htmlFor="email-messages">Message Notifications</Label>
                <Switch 
                  id="email-messages" 
                  checked={emailSettings.messages}
                  onCheckedChange={() => handleEmailToggle('messages')}
                />
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b">
                <div>
                  <Label htmlFor="email-bookings" className="block">Booking Notifications</Label>
                  <p className="text-sm text-muted-foreground">Updates about your bookings and appointments</p>
                </div>
                <Switch 
                  id="email-bookings" 
                  checked={emailSettings.bookings}
                  onCheckedChange={() => handleEmailToggle('bookings')}
                />
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b">
                <Label htmlFor="email-payments">Payment Notifications</Label>
                <Switch 
                  id="email-payments" 
                  checked={emailSettings.payments}
                  onCheckedChange={() => handleEmailToggle('payments')}
                />
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b">
                <Label htmlFor="email-system">System Updates</Label>
                <Switch 
                  id="email-system" 
                  checked={emailSettings.system}
                  onCheckedChange={() => handleEmailToggle('system')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-marketing" className="block">Marketing Communications</Label>
                  <p className="text-sm text-muted-foreground">Receive offers and updates about new features</p>
                </div>
                <Switch 
                  id="email-marketing" 
                  checked={emailSettings.marketing}
                  onCheckedChange={() => handleEmailToggle('marketing')}
                />
              </div>
            </div>
          </TabsContent>
          
          {/* Push Notification Settings */}
          <TabsContent value="push" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b">
                <Label htmlFor="push-messages">Message Alerts</Label>
                <Switch 
                  id="push-messages" 
                  checked={pushSettings.messages}
                  onCheckedChange={() => handlePushToggle('messages')}
                />
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b">
                <Label htmlFor="push-bookings">Booking Updates</Label>
                <Switch 
                  id="push-bookings" 
                  checked={pushSettings.bookings}
                  onCheckedChange={() => handlePushToggle('bookings')}
                />
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b">
                <Label htmlFor="push-payments">Payment Alerts</Label>
                <Switch 
                  id="push-payments" 
                  checked={pushSettings.payments}
                  onCheckedChange={() => handlePushToggle('payments')}
                />
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b">
                <Label htmlFor="push-system">System Alerts</Label>
                <Switch 
                  id="push-system" 
                  checked={pushSettings.system}
                  onCheckedChange={() => handlePushToggle('system')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="push-marketing">Promotional Alerts</Label>
                <Switch 
                  id="push-marketing" 
                  checked={pushSettings.marketing}
                  onCheckedChange={() => handlePushToggle('marketing')}
                />
              </div>
            </div>
          </TabsContent>
          
          {/* Display Settings */}
          <TabsContent value="display" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-3">Notification Display</h3>
                <RadioGroup 
                  value={notificationDisplay}
                  onValueChange={setNotificationDisplay}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">Show all notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="important" id="important" />
                    <Label htmlFor="important">Important notifications only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="none" />
                    <Label htmlFor="none">Only show when app is open</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="pt-2 border-t">
                <h3 className="text-sm font-medium mb-3">Quiet Hours</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quiet-start">Start Time</Label>
                    <Input
                      id="quiet-start"
                      type="time"
                      defaultValue="22:00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quiet-end">End Time</Label>
                    <Input
                      id="quiet-end"
                      type="time"
                      defaultValue="08:00"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  We won't send notifications during these hours unless they're urgent.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter>
        <Button onClick={handleSave} disabled={isSaving} className="w-full">
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Settings'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationSettings;

// Here is the Input component for completeness
import { Input } from '@/components/ui/input';
