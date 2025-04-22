
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/auth';
import { toast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface ResetPasswordFormProps {
  onSuccess?: () => void;
  resetToken?: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSuccess, resetToken }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const auth = useAuth();

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    try {
      // Assume sendPasswordResetEmail returns void, so handle success by assumption
      await auth.sendPasswordResetEmail(email);
      
      setSuccess(true);
      toast({
        title: "Password reset email sent",
        description: "Check your inbox for the reset link.",
      });
      if (onSuccess) onSuccess();

    } catch (error: any) {
      console.error("Password reset error:", error);
      toast({
        title: "Error",
        description: error?.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Alert className="mb-4">
        <AlertCircle className="h-4 w-4 mr-2" />
        <AlertDescription>
          Password reset link has been sent to your email.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleResetRequest} className="space-y-4">
      <div>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
          disabled={isLoading}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Sending..." : "Reset Password"}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
