
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { UserProfile } from '@/types/auth';
import { useAuth } from '@/hooks/auth/useAuthContext';

// Create a schema for the profile form
const profileSchema = z.object({
  username: z.string().min(3).max(50),
  full_name: z.string().min(3).max(100),
  bio: z.string().max(500).optional(),
  location: z.string().max(100).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileEditFormProps {
  profile?: UserProfile;
  onSuccess?: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ 
  profile,
  onSuccess 
}) => {
  const { user, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const displayName = user?.username || user?.name || user?.email?.split('@')[0] || '';

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: profile?.username || displayName,
      full_name: profile?.full_name || displayName,
      bio: profile?.bio || '',
      location: profile?.location || '',
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const success = await updateUserProfile(values);
      
      if (success) {
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated.",
        });
        
        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="username" className="text-sm font-medium">Username</label>
                  <input
                    id="username"
                    className="w-full px-3 py-2 border rounded-md"
                    {...form.register("username")}
                  />
                  {form.formState.errors.username && (
                    <p className="text-sm text-destructive">{form.formState.errors.username.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <label htmlFor="full_name" className="text-sm font-medium">Full Name</label>
                  <input
                    id="full_name"
                    className="w-full px-3 py-2 border rounded-md"
                    {...form.register("full_name")}
                  />
                  {form.formState.errors.full_name && (
                    <p className="text-sm text-destructive">{form.formState.errors.full_name.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <label htmlFor="location" className="text-sm font-medium">Location</label>
                  <input
                    id="location"
                    className="w-full px-3 py-2 border rounded-md"
                    {...form.register("location")}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="bio" className="text-sm font-medium">Bio</label>
                  <textarea
                    id="bio"
                    className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                    {...form.register("bio")}
                  />
                </div>
              </div>
            </div>
            
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileEditForm;
