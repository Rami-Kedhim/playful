import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { useAuth } from '@/hooks/auth';
import { toast } from 'sonner';
import { AuthResult } from '@/types/authTypes';

const Auth = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, register } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  if (isAuthenticated) {
    navigate('/');
    return null;
  }
  
  const handleLoginSuccess = (result: AuthResult) => {
    if (result.success) {
      toast.success('Login successful!');
      navigate('/');
    } else if (result.error) {
      toast.error('Login failed', {
        description: result.error
      });
    }
  };
  
  const handleRegisterSuccess = (result: AuthResult) => {
    if (result.success) {
      toast.success('Registration successful!');
      setActiveTab('login');
    } else if (result.error) {
      toast.error('Registration failed', {
        description: result.error
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-6">
              <LoginForm 
                onSubmit={login} 
                onSuccess={handleLoginSuccess} 
              />
            </TabsContent>
            <TabsContent value="register" className="mt-6">
              <RegisterForm 
                onSubmit={register}
                onSuccess={handleRegisterSuccess} 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
