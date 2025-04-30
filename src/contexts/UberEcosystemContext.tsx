import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/AuthService';
import { userService } from '@/services/UserService';
import { UberPersona } from '@/types/uberPersona';
import { uberCoreInstance } from '@/core/UberCore';
import { SystemIntegrityResult } from '@/core/Orus';
import { useToast } from '@/hooks/use-toast';

interface UberEcosystemContextType {
  user: any | null;
  profile: UberPersona | null;
  loading: boolean;
  error: string | null;
  login: (token: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  checkSystemIntegrity: () => Promise<SystemIntegrityResult>;
  shutdown: () => Promise<boolean>;
}

const UberEcosystemContext = createContext<UberEcosystemContextType | undefined>(
  undefined
);

interface UberEcosystemProviderProps {
  children: ReactNode;
}

export const UberEcosystemProvider: React.FC<UberEcosystemProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<UberPersona | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
          const userData = await authService.validateToken(storedToken);
          if (userData) {
            setUser(userData);
            // Fetch profile immediately after setting user
            await fetchProfile(userData.id);
          }
        }
      } catch (err: any) {
        console.error('Authentication initialization error:', err);
        setError(err.message || 'Failed to initialize authentication.');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const userProfile = await userService.getUserProfile(userId);
      setProfile(userProfile);
    } catch (profileError: any) {
      console.error('Failed to fetch profile:', profileError);
      setError(profileError.message || 'Failed to fetch profile.');
      toast({
        title: "Error fetching profile",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const login = async (token: string): Promise<boolean> => {
    setLoading(true);
    try {
      localStorage.setItem('authToken', token);
      const userData = await authService.validateToken(token);
      if (userData) {
        setUser(userData);
        await fetchProfile(userData.id); // Fetch profile on login
        navigate('/home');
        toast({
          title: "Login successful",
          description: "Welcome to the ecosystem!",
        });
        return true;
      } else {
        setError('Invalid token');
        return false;
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed');
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<boolean> => {
    setLoading(true);
    try {
      localStorage.removeItem('authToken');
      setUser(null);
      setProfile(null);
      navigate('/login');
      toast({
        title: "Logout successful",
        description: "You have been successfully logged out.",
      });
      return true;
    } catch (err: any) {
      console.error('Logout error:', err);
      setError(err.message || 'Logout failed');
      toast({
        title: "Logout failed",
        description: "Please try again later",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const checkSystemIntegrity = async (): Promise<SystemIntegrityResult> => {
    setLoading(true);
    try {
      const integrityResult = uberCoreInstance.checkSystemIntegrity();
      toast({
        title: "System integrity check",
        description: integrityResult.message,
      });
      return integrityResult;
    } catch (err: any) {
      console.error('System integrity check error:', err);
      setError(err.message || 'System integrity check failed');
      toast({
        title: "System integrity check failed",
        description: "Please contact support",
        variant: "destructive",
      });
      return {
        isValid: false,
        message: err.message || 'System integrity check failed',
        timestamp: new Date().toISOString(),
      };
    } finally {
      setLoading(false);
    }
  };

  // Fix the shutdown method usage
  const handleShutdown = async () => {
    try {
      uberCoreInstance.shutdown();
      // No need to catch a void return type
      return true;
    } catch (error) {
      console.error('Error shutting down UberCore:', error);
      return false;
    }
  };

  const shutdown = async (): Promise<boolean> => {
    setLoading(true);
    try {
      const shutdownSuccess = await handleShutdown();
      if (shutdownSuccess) {
        console.log('UberCore shutdown successfully.');
        toast({
          title: "System shutdown",
          description: "System shutdown was successful.",
        });
        return true;
      } else {
        setError('System shutdown failed.');
        toast({
          title: "System shutdown failed",
          description: "Please check the console for more details.",
          variant: "destructive",
        });
        return false;
      }
    } catch (err: any) {
      console.error('Shutdown error:', err);
      setError(err.message || 'Shutdown failed');
      toast({
        title: "Shutdown failed",
        description: "Please check the console for more details.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value: UberEcosystemContextType = {
    user,
    profile,
    loading,
    error,
    login,
    logout,
    checkSystemIntegrity,
    shutdown,
  };

  return (
    <UberEcosystemContext.Provider value={value}>
      {children}
    </UberEcosystemContext.Provider>
  );
};

export const useUberEcosystem = (): UberEcosystemContextType => {
  const context = useContext(UberEcosystemContext);
  if (!context) {
    throw new Error(
      'useUberEcosystem must be used within a UberEcosystemProvider'
    );
  }
  return context;
};
