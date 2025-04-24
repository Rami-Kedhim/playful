
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import PasswordDialog from './settings/PasswordDialog';
import { useAuth } from '@/hooks/auth';
import { AuthUser } from '@/types/auth';

const accountFormSchema = z.object({
  email: z.string().email(),
  notifications: z.boolean(),
  marketingEmails: z.boolean(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

interface AccountSettingsFormProps {
  user: AuthUser;
}

const AccountSettingsForm = ({ user }: AccountSettingsFormProps) => {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updateProfile } = useAuth();
  
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      email: user?.email || '',
      notifications: user?.preferences?.notifications ?? true,
      marketingEmails: user?.preferences?.marketingEmails ?? false,
    },
  });

  const onSubmit = async (data: AccountFormValues) => {
    setIsLoading(true);
    try {
      // Update user profile with email and preferences
      const success = await updateProfile({
        email: data.email,
        preferences: {
          notifications: data.notifications,
          marketingEmails: data.marketingEmails,
        }
      });
      
      if (success) {
        toast.success('Account settings updated successfully');
      } else {
        toast.error('Failed to update account settings');
      }
    } catch (error) {
      console.error('Error updating account:', error);
      toast.error('There was a problem updating your account settings');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      
      <Separator />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  This is the email address associated with your account.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your password must be at least 8 characters long and contain a mix of letters, numbers, and special characters.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsPasswordDialogOpen(true)}
              >
                Change Password
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="notifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel>App Notifications</FormLabel>
                      <FormDescription>
                        Receive notifications about account activity
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="marketingEmails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel>Marketing Emails</FormLabel>
                      <FormDescription>
                        Receive emails about new features and promotions
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/30">
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
              <CardDescription className="text-red-600/80 dark:text-red-400/80">
                Irreversible actions for your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertDescription>
                  Once you delete your account, there is no going back. Please be certain.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button 
                type="button" 
                variant="destructive"
              >
                Delete Account
              </Button>
            </CardFooter>
          </Card>
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </Form>
      
      <PasswordDialog 
        open={isPasswordDialogOpen} 
        onOpenChange={setIsPasswordDialogOpen} 
      />
    </div>
  );
};

export default AccountSettingsForm;
