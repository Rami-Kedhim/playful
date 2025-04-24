
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { AuthForm } from '@/components/auth/AuthForm';
import { toast } from 'sonner';

const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const redirectTo = searchParams.get('from') || '/';
  const initialTab = (searchParams.get('tab') as 'login' | 'register') || 'login';

  // If user is already authenticated, redirect them
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTo]);

  const onAuthSuccess = () => {
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <AuthForm onSuccess={onAuthSuccess} initialTab={initialTab} />
      </div>
    </div>
  );
};

export default AuthPage;
