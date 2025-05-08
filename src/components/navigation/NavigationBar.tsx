
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import AuthStatus from '@/components/auth/AuthStatus';

export const NavigationBar = () => {
  const { user } = useAuth();

  return (
    <nav className="border-b py-3 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">UberEscorts</Link>
        
        <div className="flex gap-4 items-center">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/escorts" className="hover:underline">Escorts</Link>
          <Link to="/creators" className="hover:underline">Creators</Link>
          {user ? (
            <>
              <Link to="/profile" className="hover:underline">Profile</Link>
              <AuthStatus />
            </>
          ) : (
            <Link to="/login" className="hover:underline">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
