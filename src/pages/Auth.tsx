
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/auth/useAuthContext';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  // Get the tab from the URL query parameter or default to 'signin'
  const searchParams = new URLSearchParams(location.search);
  const defaultTab = searchParams.get('tab') || 'signin';
  
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  
  // Redirect authenticated users to home
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  
  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/auth?tab=${value}`, { replace: true });
  };
  
  // Handle successful authentication
  const handleAuthSuccess = () => {
    navigate('/', { replace: true });
  };
  
  return (
    <div className="container mx-auto max-w-lg py-12">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="signin">
          <SignInForm onSuccess={handleAuthSuccess} />
        </TabsContent>
        
        <TabsContent value="signup">
          <SignUpForm onSuccess={handleAuthSuccess} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
