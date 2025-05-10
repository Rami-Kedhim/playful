
import React from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/auth';

const UserDropdown = () => {
  const { user, logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="flex items-center space-x-2">
          <img src={user?.avatarUrl || user?.avatar_url || '/placeholder-avatar.png'} alt="User Avatar" className="w-8 h-8 rounded-full" />
          <span>{user?.name || 'User'}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name || user?.username}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
            {user && 'ubxBalance' in user && (
              <p className="text-xs leading-none text-muted-foreground mt-1">
                UBX Balance: {user.ubxBalance || 0}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
