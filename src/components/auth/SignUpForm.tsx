
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { RegisterCredentials } from '@/types/user';

export interface SignUpFormProps {
  onSubmit?: (credentials: RegisterCredentials) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ 
  onSubmit,
  loading = false,
  error = null
}) => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [passwordsMatch, setPasswordsMatch] = React.useState(true);
  
  React.useEffect(() => {
    setPasswordsMatch(password === confirmPassword || confirmPassword === '');
  }, [password, confirmPassword]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    
    if (onSubmit) {
      await onSubmit({
        username,
        email,
        password,
        confirmPassword
      });
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
      
      <div>
        <Input
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          className="bg-background"
        />
      </div>
      
      <div>
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
      
      <div>
        <Input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          className="bg-background"
        />
      </div>
      
      <div>
        <Input
          type="password"
          placeholder="Confirm password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
          className={`bg-background ${!passwordsMatch ? 'border-red-500' : ''}`}
        />
        {!passwordsMatch && (
          <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="terms" 
          checked={acceptTerms}
          onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
          disabled={loading}
          required
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to the terms of service and privacy policy
        </label>
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={loading || !acceptTerms || !passwordsMatch}
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default SignUpForm;
