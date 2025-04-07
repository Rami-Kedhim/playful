
import React from 'react';
import { useAuth } from '@/hooks/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, LogIn, User, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface AuthStatusProps {
  showAvatar?: boolean;
  showUsername?: boolean;
  className?: string;
}

/**
 * Component to display authentication status and quick login/profile links
 */
const AuthStatus: React.FC<AuthStatusProps> = ({
  showAvatar = true,
  showUsername = true,
  className = '',
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        <span className="text-xs text-muted-foreground">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Button variant="outline" size="sm" asChild className={className}>
        <Link to="/auth" className="flex items-center gap-1">
          <LogIn className="h-4 w-4" />
          <span>Login</span>
        </Link>
      </Button>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showAvatar && (
        <Avatar className="h-7 w-7">
          <AvatarImage src={user?.profileImageUrl || ''} alt={user?.username || ''} />
          <AvatarFallback>
            {user?.username?.substring(0, 2).toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
      )}
      
      {showUsername && (
        <div className="flex items-center gap-1">
          <UserCheck className="h-3 w-3 text-green-500" />
          <span className="text-sm font-medium">{user?.username}</span>
        </div>
      )}
    </div>
  );
};

export default AuthStatus;
