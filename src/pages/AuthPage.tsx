
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { AuthForm } from '@/components/auth/AuthForm';
import { toast } from 'sonner';

const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const redirectTo = searchParams.get('from') || '/';

  // If user is already authenticated, redirect them
  if (isAuthenticated) {
    navigate(redirectTo, { replace: true });
    return null;
  }

  const onAuthSuccess = () => {
    toast.success('Successfully authenticated');
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <AuthForm onSuccess={onAuthSuccess} />
      </div>
    </div>
  );
};

export default AuthPage;
