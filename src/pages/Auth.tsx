
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { useNavigate } from 'react-router-dom';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';
import AppLayout from '@/components/layout/AppLayout';

const Auth = () => {
  const [activeTab, setActiveTab] = useState<string>('signin');
  const { signIn, signUp, error, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect to home
  if (isAuthenticated && user) {
    navigate('/');
    return null;
  }

  const handleSignIn = async (email: string, password: string) => {
    const result = await signIn(email, password);
    if (result.success) {
      navigate('/');
    }
  };

  const handleSignUp = async (email: string, password: string, username?: string) => {
    const result = await signUp(email, password, { username });
    if (result.success) {
      setActiveTab('signin');
    }
  };

  return (
    <AppLayout>
      <div className="container flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          <Card>
            <CardContent className="pt-6">
              <Tabs
                defaultValue="signin"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                  <SignInForm onSubmit={handleSignIn} />
                </TabsContent>
                <TabsContent value="signup">
                  <SignUpForm onSubmit={handleSignUp} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Auth;
