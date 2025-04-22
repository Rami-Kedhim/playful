
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/auth/useAuthContext';

interface ResetPasswordFormProps {
  token?: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const auth = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (token) {
        // If we have a token, we're resetting the password
        await auth.resetPassword(token, password);
      } else {
        // If no token, we're requesting a reset email
        await auth.requestPasswordReset(email, window.location.origin);
      }
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  if (success) {
    return (
      <div className="text-center">
        <h3 className="text-lg font-medium">Request Sent</h3>
        <p className="mt-2 text-muted-foreground">
          {token ? 'Your password has been reset successfully.' : 'Check your email for a reset link.'}
        </p>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 text-sm border rounded bg-red-50 border-red-200 text-red-600">
          {error}
        </div>
      )}
      
      {!token ? (
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      )}
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Processing...' : token ? 'Reset Password' : 'Send Reset Email'}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
