
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import AuthForm from "@/components/auth/AuthForm";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { toast } from 'sonner';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { login, register, isAuthenticated } = useAuth();
  
  // If already authenticated, redirect to home
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
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
  
  const handleRegister = async (email: string, password: string, username: string) => {
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
      // We'll implement this later with Supabase
      toast.info("Password reset", {
        description: `If an account exists for ${email}, we'll send reset instructions.`
      });
    } catch (error) {
      toast.error("Password reset failed");
    } finally {
      setIsLoading(false);
    }
  };
  
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
