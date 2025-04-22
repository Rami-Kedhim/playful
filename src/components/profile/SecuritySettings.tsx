
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const SecuritySettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was a problem updating your password.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <form onSubmit={handlePasswordUpdate} className="space-y-4">
        <h3 className="text-lg font-medium">Change Password</h3>
        
        <div className="space-y-2">
          <Label htmlFor="current-password">Current Password</Label>
          <Input id="current-password" type="password" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <Input id="new-password" type="password" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <Input id="confirm-password" type="password" />
        </div>
        
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Password"}
        </Button>
      </form>
      
      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Enable 2FA</p>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>
          <Switch id="two-factor" />
        </div>
      </div>
      
      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-lg font-medium">Security Log</h3>
        <p className="text-sm text-muted-foreground">
          View a log of recent activity and security events on your account.
        </p>
        <Button variant="outline">View Security Log</Button>
      </div>
      
      <div className="space-y-4 pt-4 border-t">
        <h3 className="text-lg font-medium">Connected Devices</h3>
        <p className="text-sm text-muted-foreground">
          Manage devices that are currently signed in to your account.
        </p>
        <Button variant="outline">Manage Devices</Button>
      </div>
    </div>
  );
};

export default SecuritySettings;
