
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg">
          Your App
        </Link>
        
        <div>
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {user?.email || user?.username}
              </span>
              <Button variant="outline" onClick={() => logout()}>
                Logout
              </Button>
            </div>
          ) : (
            <Button asChild>
              <Link to="/auth">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
