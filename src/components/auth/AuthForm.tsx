import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SignInForm from './SignInForm';
import { LoginCredentials, AuthResult } from '@/types/user';

interface AuthFormProps {
  defaultTab?: 'login' | 'register';
  onSuccess?: () => void;
  redirectUrl?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  defaultTab = 'login',
  onSuccess,
  redirectUrl
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const auth = useAuth();

  const handleLogin = async (credentials: LoginCredentials) => {
    setError(null);
    setIsSubmitting(true);
    
    try {
      const result = await auth.login(credentials.email, credentials.password);
      
      if (result.success) {
        if (onSuccess) onSuccess();
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      } else {
        setError(result.error || 'Failed to sign in');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (email: string, password: string, username: string) => {
    setError(null);
    setIsSubmitting(true);
    
    try {
      const result = await auth.register(email, password);
      
      if (result.success) {
        setActiveTab('login');
        if (onSuccess) onSuccess();
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      } else {
        setError(result.error || 'Failed to register');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-4 space-y-4">
            <SignInForm
              onSubmit={handleLogin}
              loading={isSubmitting}
              error={error}
            />
          </TabsContent>
          
          <TabsContent value="register" className="mt-4 space-y-4">
            {/* Use RegisterForm or SignUpForm component according to your project */}
            {/* This is just a placeholder */}
            <div>Register form goes here</div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
