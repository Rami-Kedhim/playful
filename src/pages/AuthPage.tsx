
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';
import Auth from './Auth';
import { AppRoutes } from '@/utils/navigation';
import { UserRole } from '@/types/user';

const AuthPage: React.FC = () => {
  const { user, login } = useAuth();
  const [demoLoginLoading, setDemoLoginLoading] = useState(false);
  
  // If already logged in, redirect to home
  if (user) {
    return <Navigate to={AppRoutes.HOME} replace />;
  }

  const handleDemoAdminLogin = async () => {
    setDemoLoginLoading(true);
    await login('admin@example.com', 'password123');
    
    // This is just for demo purposes - normally login() would handle this
    const mockAdmin = {
      id: 'admin-123',
      email: 'admin@example.com',
      username: 'admin',
      role: UserRole.ADMIN,
      isVerified: true,
      name: 'Admin User',
      createdAt: new Date().toISOString()
    };
    setDemoLoginLoading(false);
  };

  const handleDemoUserLogin = async () => {
    setDemoLoginLoading(true);
    await login('user@example.com', 'password123');
    
    // This is just for demo purposes - normally login() would handle this
    const mockUser = {
      id: 'user-123',
      email: 'user@example.com',
      username: 'demouser',
      role: UserRole.USER,
      isVerified: true,
      name: 'Regular User',
      createdAt: new Date().toISOString()
    };
    setDemoLoginLoading(false);
  };
  
  const handleGuestExplore = () => {
    // For guest exploration without login
    const mockGuest = {
      id: 'guest-' + Date.now(),
      email: 'guest@example.com',
      username: 'guest',
      role: UserRole.USER,
      isVerified: false,
      name: 'Guest User',
      createdAt: new Date().toISOString()
    };
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md space-y-6">
            <h1 className="text-3xl font-bold">Welcome to Our Platform</h1>
            <p className="text-muted-foreground">
              Join our community to access exclusive content and connect with amazing escorts and companions.
            </p>
            
            <div className="space-y-3 pt-4">
              <h3 className="text-lg font-medium">Quick Demo Accounts</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <button 
                  onClick={handleDemoUserLogin}
                  className="flex-1 px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                  disabled={demoLoginLoading}
                >
                  Demo User
                </button>
                <button 
                  onClick={handleDemoAdminLogin}
                  className="flex-1 px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                  disabled={demoLoginLoading}
                >
                  Demo Admin
                </button>
              </div>
              <button
                onClick={handleGuestExplore}
                className="w-full px-4 py-2 text-muted-foreground border border-dashed rounded-md hover:bg-muted/50 transition-colors"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <Auth />
        </div>
      </div>
      
      <footer className="p-4 text-center text-sm text-muted-foreground">
        <p>By using our service, you agree to our Terms of Service and Privacy Policy.</p>
      </footer>
    </div>
  );
};

export default AuthPage;
