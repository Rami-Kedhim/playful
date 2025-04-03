
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { 
  Settings, Lock, Bell, CreditCard, Image,
  DollarSign, FileImage, Users
} from "lucide-react";

interface CreatorSettingsProps {
  profile: any;
}

const CreatorSettings = ({ profile }: CreatorSettingsProps) => {
  const { updateProfile } = useProfile();
  const { refreshProfile } = useAuth();
  
  const [formData, setFormData] = useState({
    subscriptionPrice: profile?.subscription_price || 9.99,
    streamingEnabled: profile?.streaming_enabled || false,
    virtualRoomEnabled: profile?.virtual_room_access ? true : false,
    bio: profile?.bio || '',
    virtualServices: profile?.virtual_services || []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string) => (checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      const updates = {
        subscription_price: parseFloat(formData.subscriptionPrice.toString()),
        streaming_enabled: formData.streamingEnabled,
        virtual_room_access: formData.virtualRoomEnabled ? {} : null,
        bio: formData.bio,
        virtual_services: formData.virtualServices
      };
      
      await updateProfile(profile.id, updates);
      await refreshProfile();
      
      toast({
        title: "Settings updated",
        description: "Your creator profile settings have been updated successfully.",
        variant: "success",
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center">
        <Settings className="mr-2 h-5 w-5" />
        Creator Settings
      </h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Subscription Settings</CardTitle>
          <CardDescription>
            Configure your subscription options for your fans
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="subscriptionPrice">Subscription Price ($ per month)</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <Input
                id="subscriptionPrice"
                name="subscriptionPrice"
                type="number"
                min="0.99"
                step="0.01"
                value={formData.subscriptionPrice}
                onChange={handleInputChange}
                className="pl-7"
                placeholder="9.99"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Set the monthly price for access to your premium content.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Creator Profile</CardTitle>
          <CardDescription>
            Update your public profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="bio">Bio / Description</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Tell your fans about yourself and your content..."
              rows={4}
            />
            <p className="text-sm text-muted-foreground">
              This will be shown on your public profile. Keep it engaging and descriptive.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Content Features</CardTitle>
          <CardDescription>
            Enable or disable content features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Live Streaming</Label>
              <p className="text-sm text-muted-foreground">
                Allow fans to view your live streams
              </p>
            </div>
            <Switch 
              checked={formData.streamingEnabled}
              onCheckedChange={handleSwitchChange('streamingEnabled')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Virtual Room</Label>
              <p className="text-sm text-muted-foreground">
                Enable virtual room for interactive experiences
              </p>
            </div>
            <Switch 
              checked={formData.virtualRoomEnabled}
              onCheckedChange={handleSwitchChange('virtualRoomEnabled')}
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          className="min-w-32"
        >
          {isSubmitting ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
};

export default CreatorSettings;
