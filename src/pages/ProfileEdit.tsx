import React, { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { useAuth } from "@/hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, ArrowLeft } from "lucide-react";
import { useProfileManagement } from "@/hooks/auth/useProfileManagement";
import { z } from "zod";
import { profileFormSchema } from "@/components/profile/ProfileFormSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import BioField from "@/components/profile/BioField";
import BasicInfoFields from "@/components/profile/BasicInfoFields";
import FormActions from "@/components/profile/FormActions";

const ProfileEdit = () => {
  const { user, profile, refreshProfile } = useAuth();
  const { updateProfile, isLoading } = useProfileManagement(user);
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("basic");
  
  // Initialize form with zod validation
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
      full_name: "",
      bio: "",
      avatar_url: "",
    },
  });
  
  useEffect(() => {
    if (user) {
      form.setValue("username", user.username || "");
    }
    
    if (profile) {
      form.setValue("full_name", profile.full_name || "");
      form.setValue("bio", profile.bio || "");
      form.setValue("avatar_url", profile.avatar_url || "");
    }
  }, [user, profile, form]);
  
  if (!user) {
    return (
      <AppLayout>
        <div className="container px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
          <p>Please sign in to edit your profile.</p>
          <Button className="mt-4" onClick={() => navigate("/auth")}>Sign In</Button>
        </div>
      </AppLayout>
    );
  }
  
  const handleSaveProfile = async (data: z.infer<typeof profileFormSchema>) => {
    try {
      const result = await updateProfile(data);
      
      if (result) {
        toast.success("Profile saved", {
          description: "Your profile has been updated successfully."
        });
        
        await refreshProfile();
        navigate("/profile");
      } else {
        toast.error("Error saving profile", {
          description: "An error occurred while saving your profile."
        });
      }
    } catch (error: any) {
      console.error("Error saving profile:", error);
      toast.error("Error saving profile", {
        description: error.message || "An error occurred while saving your profile."
      });
    }
  };
  
  return (
    <AppLayout>
      <div className="container px-4 py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-4"
            onClick={() => navigate('/profile')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Button>
          <h1 className="text-3xl font-bold">Edit Profile</h1>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
            </TabsList>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSaveProfile)}>
                <TabsContent value="basic">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                      <CardDescription>
                        Update your personal information and how others see you on the platform
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={form.watch("avatar_url")} />
                          <AvatarFallback>
                            {form.watch("username")?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="avatar_url"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Profile Image URL</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="https://example.com/avatar.jpg"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          value={user.email}
                          disabled 
                          readOnly
                        />
                        <p className="text-sm text-muted-foreground">
                          Your email address cannot be changed
                        </p>
                      </div>
                      
                      <BasicInfoFields />
                      <BioField />
                    </CardContent>
                    <FormActions loading={isLoading} />
                  </Card>
                </TabsContent>
                
                <TabsContent value="preferences">
                  <Card>
                    <CardHeader>
                      <CardTitle>Preferences</CardTitle>
                      <CardDescription>
                        Customize your experience and preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Preference settings will be available soon.
                      </p>
                    </CardContent>
                    <FormActions loading={isLoading} />
                  </Card>
                </TabsContent>
                
                <TabsContent value="privacy">
                  <Card>
                    <CardHeader>
                      <CardTitle>Privacy & Security</CardTitle>
                      <CardDescription>
                        Manage your account security and privacy settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Privacy and security settings will be available soon.
                      </p>
                    </CardContent>
                    <FormActions loading={isLoading} />
                  </Card>
                </TabsContent>
              </form>
            </Form>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfileEdit;
