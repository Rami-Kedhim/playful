
import React, { useState } from 'react';
import { useAuth } from '@/hooks/auth';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSearchParams, useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { toast } from 'sonner';

const Auth = () => {
  const { login, register, isLoading, error } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(
    searchParams.get('tab') || 'login'
  );
  const [email, setEmail] = useState('');

  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await login(email, password);
      
      if (result.success) {
        const redirectTo = searchParams.get('from') || '/';
        toast.success('Logged in successfully');
        navigate(redirectTo);
      }
      
      return result;
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const handleRegister = async (email: string, password: string, username: string) => {
    try {
      const result = await register(email, password, username);
      
      if (result.success) {
        toast.success('Registration successful! Welcome aboard.');
        navigate('/');
      }
      
      return result;
    } catch (err) {
      console.error('Registration error:', err);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <Card className="border shadow-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome</CardTitle>
            <CardDescription className="text-center">
              {activeTab === 'login' ? 'Sign in to your account' : 'Create a new account'}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <LoginForm 
                  onSubmit={handleLogin} 
                  email={email}
                  setEmail={setEmail}
                  isLoading={isLoading} 
                />
              </TabsContent>
              
              <TabsContent value="register">
                <RegisterForm 
                  onSubmit={handleRegister} 
                  email={email}
                  setEmail={setEmail}
                  isLoading={isLoading} 
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
