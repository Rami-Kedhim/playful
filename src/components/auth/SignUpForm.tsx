
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { AuthResult } from '@/types/user';

export interface SignUpFormProps {
  onRegister: (email: string, password: string, name?: string) => Promise<AuthResult>;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await onRegister(email, password, name);
      
      if (!result.success && result.message) {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-800 p-3 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="yourname@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Creating account...' : 'Create account'}
      </Button>
      
      <p className="text-center text-sm text-muted-foreground mt-4">
        By creating an account, you agree to our{' '}
        <a href="/terms" className="text-primary hover:underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
};

export default SignUpForm;
