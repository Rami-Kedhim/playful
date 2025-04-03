
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/hooks/useAuth";
import AppLayout from "@/components/layout/AppLayout";
import { logContentAction } from "@/utils/debugUtils";

const Auth = () => {
  const { login, register, resetPassword, isAuthenticated, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [authError, setAuthError] = useState<string | null>(error);
  
  // Get the return URL from location state or default to homepage
  const from = location.state?.from?.pathname || "/";
  
  // If user is already authenticated, redirect to the return URL
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      logContentAction('User already authenticated, redirecting', { from });
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, from]);
  
  // Update local error state when context error changes
  useEffect(() => {
    setAuthError(error);
  }, [error]);
  
  const handleLogin = async (email: string, password: string) => {
    logContentAction('Login attempt', { email });
    const success = await login(email, password);
    if (success) {
      navigate(from, { replace: true });
    }
  };
  
  const handleRegister = async (email: string, password: string, username: string) => {
    logContentAction('Registration attempt', { email, username });
    const success = await register(email, password, username);
    if (success) {
      navigate(from, { replace: true });
    }
  };
  
  const handleForgotPassword = async (email: string) => {
    logContentAction('Password reset attempt', { email });
    await resetPassword(email);
  };
  
  return (
    <AppLayout>
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Account Access</h1>
          <AuthForm
            onLogin={handleLogin}
            onRegister={handleRegister}
            onForgotPassword={handleForgotPassword}
            isLoading={isLoading}
            error={authError}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default Auth;
