import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/auth";
import { useAuthActions } from "@/hooks/auth/useAuthActions";

interface ProfileProps {
  profile: any;
}

const CreatorSettings = ({ profile }: ProfileProps) => {
  const { user } = useAuth();
  const { refreshProfile } = useAuthActions();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: profile?.full_name || "",
    bio: profile?.bio || "",
    subscriptionPrice: profile?.subscription_price || 0,
    enablePPV: profile?.ppv_enabled || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setProfileData(prev => ({ ...prev, enablePPV: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call update profile API here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Update profile
      await refreshProfile();
      
      toast({
        title: "Settings updated",
        description: "Your creator profile has been updated successfully",
        variant: "default",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Creator Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="monetization">Monetization</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  name="displayName"
                  value={profileData.displayName}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  rows={5}
                />
              </div>
              
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="monetization" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subscriptionPrice">Subscription Price (LC)</Label>
                <Input
                  id="subscriptionPrice"
                  name="subscriptionPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={profileData.subscriptionPrice}
                  onChange={handleChange}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="enablePPV"
                  checked={profileData.enablePPV}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="enablePPV">Enable Pay-Per-View Content</Label>
              </div>
              
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-4">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Privacy settings control who can see your content and how they can interact with it.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="privacy-followers" />
                  <Label htmlFor="privacy-followers">Only followers can see my content</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="privacy-comments" defaultChecked />
                  <Label htmlFor="privacy-comments">Allow comments on my content</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="privacy-dm" defaultChecked />
                  <Label htmlFor="privacy-dm">Allow direct messages</Label>
                </div>
              </div>
              
              <Button disabled={loading}>
                {loading ? "Saving..." : "Save Privacy Settings"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CreatorSettings;
