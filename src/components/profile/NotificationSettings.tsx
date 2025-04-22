
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const NotificationSettings = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Notification Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications" className="flex-1">Email Notifications</Label>
            <Switch id="email-notifications" />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="marketing-emails" className="flex-1">Marketing Emails</Label>
            <Switch id="marketing-emails" />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="message-notifications" className="flex-1">Message Notifications</Label>
            <Switch id="message-notifications" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="platform-updates" className="flex-1">Platform Updates</Label>
            <Switch id="platform-updates" defaultChecked />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Notification Frequency</h3>
        <p className="text-sm text-muted-foreground">
          Choose how often you would like to receive notifications.
        </p>
        
        <div className="flex items-center space-x-2">
          <div className="grid gap-2.5">
            <Label htmlFor="frequency-daily">
              <input
                type="radio"
                id="frequency-daily"
                name="frequency"
                className="mr-2"
              />
              Daily Digest
            </Label>
            <Label htmlFor="frequency-realtime">
              <input
                type="radio"
                id="frequency-realtime"
                name="frequency"
                className="mr-2"
                defaultChecked
              />
              Real Time
            </Label>
            <Label htmlFor="frequency-weekly">
              <input
                type="radio"
                id="frequency-weekly"
                name="frequency"
                className="mr-2"
              />
              Weekly Summary
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
