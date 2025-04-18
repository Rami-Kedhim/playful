
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';
import { AuthResult, LoginCredentials, RegisterCredentials } from '@/types/user';
import { useAuth } from '@/hooks/useAuth';

interface SignInFormProps {
  onLogin: (email: string, password: string) => Promise<AuthResult>;
}

const SignInForm: React.FC<SignInFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await onLogin(email, password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form content */}
    </form>
  );
};

interface SignUpFormProps {
  onRegister: (email: string, password: string, name?: string) => Promise<AuthResult>;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await onRegister(email, password, name);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form content */}
    </form>
  );
};

export default function Auth() {
  const { login, register } = useAuth();
  
  // Type conversion functions for auth result compatibility
  const handleLogin = async (email: string, password: string): Promise<AuthResult> => {
    const result = await login(email, password);
    return {
      success: result.success,
      message: result.error || '',
      user: result.user ? {
        id: result.user.id,
        username: result.user.username || '',
        email: result.user.email,
        role: result.user.role || 'user',
        createdAt: result.user.created_at || new Date().toISOString(),
      } : undefined,
      token: ''
    };
  };
  
  const handleRegister = async (email: string, password: string, name?: string): Promise<AuthResult> => {
    const result = await register(email, password, name);
    return {
      success: result.success,
      message: result.error || '',
      user: result.user ? {
        id: result.user.id,
        username: result.user.username || '',
        email: result.user.email,
        role: result.user.role || 'user',
        createdAt: result.user.created_at || new Date().toISOString(),
      } : undefined,
      token: ''
    };
  };

  return (
    <div className="container relative flex flex-col items-center justify-center min-h-screen md:grid lg:max-w-none lg:px-0">
      <Card className="w-full max-w-md mx-auto">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <SignInForm onLogin={handleLogin} />
            </CardContent>
          </TabsContent>
          <TabsContent value="register">
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>Enter your details to create a new account</CardDescription>
            </CardHeader>
            <CardContent>
              <SignUpForm onRegister={handleRegister} />
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
