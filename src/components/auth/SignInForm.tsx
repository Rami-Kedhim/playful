
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { LoginCredentials } from '@/types/user';

export interface SignInFormProps {
  onSubmit?: (credentials: LoginCredentials) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

const SignInForm: React.FC<SignInFormProps> = ({ 
  onSubmit,
  loading = false,
  error = null
}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      await onSubmit({ email, password });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="bg-background"
        />
      </div>
      
      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          className="bg-background"
        />
        <div className="text-sm text-right">
          <Button variant="link" className="p-0 h-auto" type="button">
            Forgot password?
          </Button>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={loading}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
};

export default SignInForm;
