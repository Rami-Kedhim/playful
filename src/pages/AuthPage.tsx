
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';
import { useNavigate } from 'react-router-dom';
import { UserRole, AuthResult } from '@/types/user';

const AuthPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // This would typically come from an auth service/context
  const handleSignIn = async (email: string, password: string): Promise<AuthResult> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'admin@example.com' && password === 'password') {
        const result: AuthResult = {
          success: true,
          user: {
            id: '123',
            email: email,
            name: 'Admin User',
            role: UserRole.ADMIN,
            isVerified: true,
            createdAt: new Date().toISOString()
          },
          token: 'fake-jwt-token'
        };
        
        // Save to localStorage or context
        localStorage.setItem('token', result.token || '');
        localStorage.setItem('user', JSON.stringify(result.user));
        
        // Redirect based on role
        navigate('/admin/dashboard');
        return result;
      }
      
      if (email === 'user@example.com' && password === 'password') {
        const result: AuthResult = {
          success: true,
          user: {
            id: '456',
            email: email,
            name: 'Regular User',
            role: UserRole.USER,
            isVerified: true,
            createdAt: new Date().toISOString()
          },
          token: 'fake-jwt-token'
        };
        
        localStorage.setItem('token', result.token || '');
        localStorage.setItem('user', JSON.stringify(result.user));
        
        navigate('/dashboard');
        return result;
      }
      
      setError('Invalid credentials');
      return { success: false, message: 'Invalid credentials' };
    } catch (err) {
      console.error('Sign in error:', err);
      setError('An error occurred during sign in');
      return { success: false, message: 'An error occurred during sign in' };
    }
  };
  
  const handleSignUp = async (email: string, password: string, name?: string): Promise<AuthResult> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const result: AuthResult = {
        success: true,
        user: {
          id: '789',
          email: email,
          name: name || 'New User',
          role: UserRole.USER,
          isVerified: false,
          createdAt: new Date().toISOString()
        },
        token: 'fake-jwt-token'
      };
      
      localStorage.setItem('token', result.token || '');
      localStorage.setItem('user', JSON.stringify(result.user));
      
      navigate('/dashboard');
      return result;
    } catch (err) {
      console.error('Sign up error:', err);
      setError('An error occurred during sign up');
      return { success: false, message: 'An error occurred during sign up' };
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6">
        <Tabs defaultValue="signin">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin" className="mt-6">
            <SignInForm onSignIn={handleSignIn} />
          </TabsContent>
          
          <TabsContent value="signup" className="mt-6">
            <SignUpForm onSignUp={handleSignUp} />
          </TabsContent>
        </Tabs>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded text-center text-sm">
            {error}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AuthPage;
