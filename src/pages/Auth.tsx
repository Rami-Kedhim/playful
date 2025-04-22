
import React from 'react';
import { useAuth } from '@/hooks/auth';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

// This is a simplified mock implementation to fix the build errors
const Auth = () => {
  const { login, register } = useAuth();
  
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold">Authentication Page</h1>
        <LoginForm onSubmit={login} />
        <RegisterForm onSubmit={register} />
      </div>
    </div>
  );
};

export default Auth;
