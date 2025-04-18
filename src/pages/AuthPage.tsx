import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuthContext';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';

const AuthPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'signin';
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, signIn, signUp } = useAuth();

  // Map auth functions to legacy names if needed
  const login = signIn;
  const register = signUp;
  
  // Redirect to home if already authenticated
  React.useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleTabChange = (value: string) => {
    navigate(`/auth?tab=${value}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  // Don't show auth forms if already authenticated and still on this page
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background/80 to-background p-4">
      <div className="w-full max-w-md">
        <Tabs defaultValue={tab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <SignInForm onLogin={login} />
          </TabsContent>
          <TabsContent value="signup">
            <SignUpForm onRegister={register} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;
