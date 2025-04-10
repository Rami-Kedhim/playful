
import React from 'react';
import { useAuth } from '@/hooks/auth/useAuthContext';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Welcome to UberEscorts</h1>
          
          <div className="bg-card rounded-lg border p-4 mb-6">
            <h2 className="font-semibold mb-2">Your Profile</h2>
            {user ? (
              <div className="space-y-2">
                <p><span className="font-medium">Email:</span> {user.email}</p>
                <p><span className="font-medium">Username:</span> {user.username || 'Not set'}</p>
                
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            ) : (
              <p>Loading profile information...</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card rounded-lg border p-4">
              <h2 className="font-semibold mb-2">Features</h2>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Multi-role authentication system</li>
                <li>Profile management</li>
                <li>Booking system</li>
                <li>Wallet and transactions</li>
                <li>AI companions and chat</li>
              </ul>
            </div>
            
            <div className="bg-card rounded-lg border p-4">
              <h2 className="font-semibold mb-2">Getting Started</h2>
              <p className="text-sm text-muted-foreground">
                Welcome to the UberEscorts platform. This system is currently in development. 
                More features will be added soon.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
