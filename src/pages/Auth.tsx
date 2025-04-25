
import React, { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/auth';

// Placeholder login/register forms
const LoginForm = () => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Login form will go here</p>
    </div>
  );
};

const RegisterForm = () => {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Register form will go here</p>
    </div>
  );
};

const Auth = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  // Get tab from query param or default to login
  const searchParams = new URLSearchParams(location.search);
  const defaultTab = searchParams.get('mode') === 'register' ? 'register' : 'login';
  
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome</CardTitle>
          <CardDescription>
            {activeTab === 'login' ? 'Sign in to your account' : 'Create a new account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
