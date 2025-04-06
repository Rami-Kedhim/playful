import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Edit, Check, User, Mail, Lock, ImagePlus } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { useTheme } from 'next-themes'
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { VerificationContainer } from '@/components/verification';

const profileFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  bio: z.string().max(160, {
    message: "Bio must be less than 160 characters."
  }).optional(),
  avatar_url: z.string().url({
    message: "Please enter a valid URL."
  }).optional(),
})

const ProfilePage: React.FC = () => {
  const { user, logout, updateUserProfile, updatePassword, error, clearError, profile, refreshProfile } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPasswordEditMode, setIsPasswordEditMode] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { theme, setTheme } = useTheme();
  const { preferences, updatePreferences } = useUserPreferences();
  const [isVerificationVisible, setIsVerificationVisible] = useState(false);

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: profile?.username || "",
      email: user?.email || "",
      bio: profile?.bio || "",
      avatar_url: profile?.avatar_url || ""
    },
    mode: "onChange"
  })

  useEffect(() => {
    if (profile) {
      form.reset({
        username: profile.username || "",
        email: user?.email || "",
        bio: profile.bio || "",
        avatar_url: profile.avatar_url || ""
      });
      setAvatarUrl(profile.avatar_url || user?.profileImageUrl || null);
    }
  }, [profile, user, form]);

  useEffect(() => {
    setIsDarkTheme(theme === 'dark');
  }, [theme]);

  useEffect(() => {
    if (user?.profileImageUrl) {
      setAvatarUrl(user.profileImageUrl);
    }
  }, [user?.profileImageUrl]);

  const handleThemeToggle = (value: boolean) => {
    const newTheme = value ? 'dark' : 'light';
    setTheme(newTheme);
    setIsDarkTheme(value);
    updatePreferences({ theme: newTheme });
  };

  const handleSaveProfile = async (data: any) => {
    try {
      // Change avatar_url to profileImageUrl
      await updateUserProfile({
        ...data,
        profileImageUrl: data.avatar_url // Map the avatar_url to profileImageUrl
      });
      setIsEditMode(false);
      toast({
        title: "Profile updated successfully!",
        description: "Your profile has been updated.",
      })
      refreshProfile();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message || "Failed to update profile. Please try again.",
      })
    }
  };

  const handlePasswordUpdate = async () => {
    setLoading(true);
    try {
      await updatePassword(oldPassword, newPassword);
      toast({
        title: "Password updated successfully!",
        description: "Your password has been changed.",
      })
      setIsPasswordEditMode(false);
      setOldPassword('');
      setNewPassword('');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message || "Failed to update password. Please try again.",
      })
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      // useRouter().push('/login');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message || "Logout failed. Please try again.",
      })
    }
  };

  if (!user || !profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Loading Profile...</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-6 w-64" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Profile Settings</h2>
        <Button variant="destructive" onClick={handleLogout}>Logout</Button>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center"><User className="mr-2 h-4 w-4" /> Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={user.username || "Profile"} />
              ) : (
                <AvatarFallback>{user.username ? user.username[0].toUpperCase() : 'U'}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{user.username}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <Separator />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSaveProfile)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input disabled={!isEditMode} placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled={!isEditMode} placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself."
                        className="resize-none"
                        disabled={!isEditMode}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="avatar_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar URL</FormLabel>
                    <FormControl>
                      <Input disabled={!isEditMode} placeholder="Enter avatar URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                {isEditMode ? (
                  <div className="flex space-x-2">
                    <Button variant="ghost" type="button" onClick={() => setIsEditMode(false)}>Cancel</Button>
                    <Button type="submit">
                      <Check className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" onClick={() => setIsEditMode(true)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center"><Lock className="mr-2 h-4 w-4" /> Password</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="oldPassword">Old Password</Label>
            <Input
              type="password"
              id="oldPassword"
              value={oldPassword}
              disabled={!isPasswordEditMode}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              type="password"
              id="newPassword"
              value={newPassword}
              disabled={!isPasswordEditMode}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            {isPasswordEditMode ? (
              <div className="flex space-x-2">
                <Button variant="ghost" type="button" onClick={() => setIsPasswordEditMode(false)}>Cancel</Button>
                <Button onClick={handlePasswordUpdate} disabled={loading}>
                  {loading ? (
                    <>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Update Password
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => setIsPasswordEditMode(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Password
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center"><ImagePlus className="mr-2 h-4 w-4" /> Appearance</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="theme">Dark Mode</Label>
            <Switch
              id="theme"
              checked={isDarkTheme}
              onCheckedChange={(checked) => handleThemeToggle(checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center"><Check className="mr-2 h-4 w-4" /> Verification</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between">
            <Button onClick={() => setIsVerificationVisible(!isVerificationVisible)}>
              {isVerificationVisible ? "Hide Verification" : "Show Verification"}
            </Button>
          </div>
          {isVerificationVisible && (
            <VerificationContainer />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
