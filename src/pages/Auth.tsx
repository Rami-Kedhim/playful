
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { useAuth } from '@/hooks/auth/useAuth';
import { AppRoutes } from '@/utils/navigation';
import { User, LoginCredentials, RegisterCredentials } from '@/types/user';

export interface AuthProps {
  initialTab?: 'signin' | 'signup';
  redirectTo?: string;
  showHeader?: boolean;
}

const Auth: React.FC<AuthProps> = ({
  initialTab = 'signin',
  redirectTo = AppRoutes.HOME,
  showHeader = true,
}) => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleLogin = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await login(credentials.email, credentials.password);
      
      if (!result.success) {
        setError(result.error || 'Failed to sign in');
        return;
      }
      
      // Redirect on successful login
      navigate(redirectTo);
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegister = async (credentials: RegisterCredentials) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await register(
        credentials.email,
        credentials.password,
        credentials.username
      );
      
      if (!result.success) {
        setError(result.error || 'Failed to create account');
        return;
      }
      
      // Simulate a user object creation
      const mockUser: User = {
        id: "user_" + Date.now().toString(),
        username: credentials.username,
        email: credentials.email,
        role: "user",
        name: credentials.username,
        isVerified: false,
        createdAt: new Date().toISOString()
      };
      
      // Redirect on successful registration
      navigate(redirectTo);
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      {showHeader && <AuthHeader />}
      
      <div className="w-full max-w-md space-y-6 bg-background rounded-lg p-6 shadow-lg border">
        <Tabs defaultValue={initialTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Create Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin" className="space-y-4 pt-4">
            <SignInForm 
              onSubmit={handleLogin}
              loading={loading}
              error={error}
            />
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-4 pt-4">
            <SignUpForm 
              onSubmit={handleRegister}
              loading={loading}
              error={error}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
