
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

// Define the allowed gender types explicitly
type Gender = "male" | "female" | "non-binary" | "transgender" | "other" | "prefer-not-to-say";

interface ProfileFormData {
  username: string;
  full_name: string;
  bio: string;
  gender: Gender; // Use the explicit Gender type here
  sexual_orientation: string;
  location: string;
  avatar_url: string;
}

const ProfileManagement = () => {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProfileFormData>();

  useEffect(() => {
    if (profile) {
      setValue("username", profile.username || "");
      setValue("full_name", profile.full_name || "");
      setValue("bio", profile.bio || "");
      
      // Ensure we're setting a valid gender value that matches our type
      if (profile.gender) {
        const validGender = ["male", "female", "non-binary", "transgender", "other", "prefer-not-to-say"].includes(profile.gender) 
          ? (profile.gender as Gender) 
          : "other";
        setValue("gender", validGender);
      }
      
      setValue("sexual_orientation", profile.sexual_orientation || "");
      setValue("location", profile.location || "");
      setAvatarPreview(profile.avatar_url || "");
    }
  }, [profile, setValue]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const uploadAvatar = async (): Promise<string | null> => {
    if (!avatarFile || !user) return null;
    
    const fileExt = avatarFile.name.split('.').pop();
    const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `avatars/${fileName}`;
    
    try {
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, avatarFile);
        
      if (uploadError) {
        throw uploadError;
      }
      
      const { data } = supabase.storage.from('profiles').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      return null;
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;
    setLoading(true);

    try {
      let avatarUrl = profile?.avatar_url || null;
      
      if (avatarFile) {
        const newAvatarUrl = await uploadAvatar();
        if (newAvatarUrl) {
          avatarUrl = newAvatarUrl;
        }
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          username: data.username,
          full_name: data.full_name,
          bio: data.bio,
          gender: data.gender,
          sexual_orientation: data.sexual_orientation,
          location: data.location,
          avatar_url: avatarUrl,
          updated_at: new Date()
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      await refreshProfile();
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-8">
          <p className="text-center">Please log in to manage your profile.</p>
          <div className="flex justify-center mt-4">
            <Button onClick={() => navigate("/auth")}>Go to Login</Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Profile Management</h1>
        
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="account">Account Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and how others see you on the platform
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="grid gap-6">
                  <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={avatarPreview} alt="Avatar" />
                      <AvatarFallback>{profile?.username?.[0] || user?.email?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <Label htmlFor="avatar" className="block mb-2">Profile Photo</Label>
                      <Input 
                        id="avatar" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleAvatarChange}
                        className="cursor-pointer"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Recommended: Square JPG or PNG, 1MB max
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        {...register("username", { required: "Username is required" })}
                      />
                      {errors.username && (
                        <p className="text-sm text-red-500">{errors.username.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        {...register("full_name")}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      {...register("bio")}
                      placeholder="Tell others about yourself..."
                    />
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select 
                        onValueChange={(value: Gender) => setValue("gender", value)}
                        defaultValue={profile?.gender || ""}
                      >
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="non-binary">Non-binary</SelectItem>
                          <SelectItem value="transgender">Transgender</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sexual_orientation">Sexual Orientation</Label>
                      <Select 
                        onValueChange={(value) => setValue("sexual_orientation", value)}
                        defaultValue={profile?.sexual_orientation || ""}
                      >
                        <SelectTrigger id="sexual_orientation">
                          <SelectValue placeholder="Select orientation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="straight">Straight</SelectItem>
                          <SelectItem value="gay">Gay</SelectItem>
                          <SelectItem value="lesbian">Lesbian</SelectItem>
                          <SelectItem value="bisexual">Bisexual</SelectItem>
                          <SelectItem value="pansexual">Pansexual</SelectItem>
                          <SelectItem value="asexual">Asexual</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      {...register("location")}
                      placeholder="City, Country"
                    />
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" type="button" onClick={() => navigate(-1)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Address</h3>
                      <p className="text-sm text-gray-400">{user?.email}</p>
                    </div>
                    <Button variant="outline" size="sm">Change Email</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Password</h3>
                      <p className="text-sm text-gray-400">Last changed: Never</p>
                    </div>
                    <Button variant="outline" size="sm">Change Password</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Lucoin Balance</h3>
                      <p className="text-sm text-gray-400">{profile?.lucoin_balance || 0} LC</p>
                    </div>
                    <Button variant="outline" size="sm">Add Lucoins</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default ProfileManagement;
