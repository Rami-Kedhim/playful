
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';

export const UserNav = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <div className="text-sm hidden md:block">
          {user?.email || 'User'}
        </div>
        <div className="rounded-full bg-muted h-8 w-8 flex items-center justify-center overflow-hidden">
          {user?.user_metadata?.avatar_url ? (
            <img src={user.user_metadata.avatar_url} alt="Avatar" className="h-full w-full object-cover" />
          ) : (
            <span className="font-medium">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
