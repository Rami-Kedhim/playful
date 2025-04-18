
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/auth/useAuth';
import { useToast } from '@/components/ui/use-toast';

interface ResetPasswordFormProps {
  onComplete?: () => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onComplete }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { toast } = useToast();
  const auth = useAuth();
  
  // Update to check if resetPassword exists in the auth object
  const resetPasswordFn = auth.resetPassword || auth.sendPasswordResetEmail;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Check if the function exists and call it appropriately
      if (resetPasswordFn) {
        // Some auth providers need a token and email, others just email
        // Pass empty string as token when only email is provided
        if (resetPasswordFn === auth.resetPassword) {
          await resetPasswordFn("", email, ""); // Added an empty string as the third argument
        } else if (auth.sendPasswordResetEmail) {
          // For providers that expect just an email
          await auth.sendPasswordResetEmail(email);
        } else {
          // Fallback to using resetPassword with both parameters
          await auth.resetPassword("", email, "");
        }
        
        setIsSent(true);
        toast({
          title: "Reset link sent",
          description: "Check your email for password reset instructions",
        });
        
        if (onComplete) {
          onComplete();
        }
      } else {
        throw new Error("Reset password function not available");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reset email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSent) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            We've sent you a password reset link. Please check your inbox.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            If you don't see the email, check your spam folder. The link will expire after 24 hours.
          </p>
          <Button 
            variant="outline" 
            className="mt-4 w-full"
            onClick={() => setIsSent(false)}
          >
            Send another link
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>
          Enter your email address and we'll send you a link to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send reset link"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;
