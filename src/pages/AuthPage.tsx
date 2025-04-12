
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import AuthForm from "@/components/auth/AuthForm";
import OnboardingFlow from "@/components/auth/OnboardingFlow";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { toast } from 'sonner';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { login, register, isAuthenticated, resetPassword, user } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // If already authenticated and profile complete, redirect to home
  useEffect(() => {
    if (isAuthenticated) {
      if (user?.user_metadata?.profileComplete) {
        navigate('/');
      } else {
        // If authenticated but profile not complete, show onboarding
        setShowOnboarding(true);
      }
    }
  }, [isAuthenticated, navigate, user]);
  
  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await login(email, password);
      if (!result.success) {
        toast.error("Login failed", {
          description: result.error || "Please check your credentials",
        });
      } else {
        toast.success("Login successful", {
          description: "Welcome back!"
        });
      }
    } catch (error: any) {
      toast.error("Login error", {
        description: error.message || "An unexpected error occurred"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegister = async (email: string, password: string, username: string, isAdult: boolean) => {
    if (!isAdult) {
      toast.error("Age verification required", {
        description: "You must be 21+ to register for this service"
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await register(email, password, username);
      if (!result.success) {
        toast.error("Registration failed", {
          description: result.error || "Please try again"
        });
      } else {
        toast.success("Registration successful", {
          description: "Your account has been created!"
        });
        // Onboarding will be shown automatically due to useEffect
      }
    } catch (error: any) {
      toast.error("Registration error", {
        description: error.message || "An unexpected error occurred"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleForgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      await resetPassword(email);
      toast.success("Password reset email sent", {
        description: `If an account exists for ${email}, we'll send reset instructions.`
      });
    } catch (error: any) {
      toast.error("Password reset failed", {
        description: error.message || "An unexpected error occurred"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnboardingComplete = () => {
    navigate('/');
  };
  
  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background/80 to-background p-4">
      <div className="w-full max-w-md">
        <AuthForm
          onLogin={handleLogin}
          onRegister={handleRegister}
          onForgotPassword={handleForgotPassword}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default AuthPage;
