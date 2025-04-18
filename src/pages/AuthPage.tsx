
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { AuthResult } from '@/types/user';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';

// Define the props interfaces for the form components
interface SignInFormProps {
  onLogin: (email: string, password: string) => Promise<AuthResult>;
}

interface SignUpFormProps {
  onRegister: (email: string, password: string, name?: string) => Promise<AuthResult>;
}

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('login');
  const { login, register } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = async (email: string, password: string) => {
    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    }
    
    return result;
  };
  
  const handleRegister = async (email: string, password: string, name?: string) => {
    const result = await register(email, password, name);
    
    if (result.success) {
      navigate('/onboarding');
    }
    
    return result;
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <SignInForm onLogin={handleLogin} />
            </TabsContent>
            
            <TabsContent value="register">
              <SignUpForm onRegister={handleRegister} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
