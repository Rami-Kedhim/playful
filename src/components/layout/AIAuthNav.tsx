
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/auth/useAuthContext'; // Update this import
import { LogIn, UserCircle, MessageSquare, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// You'll need to define a minimal recentInteractions interface
interface RecentInteraction {
  companionId: string;
}

interface AICompanion {
  id: string;
  name: string;
  avatarUrl: string;
}

const AIAuthNav: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  // Mock these properties that would come from useUserAIContext
  const currentCompanion: AICompanion | null = null;
  const clearCurrentCompanion = () => {};
  const recentInteractions: RecentInteraction[] = [];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Show current AI companion if there is one */}
      {currentCompanion && (
        <div className="flex items-center mr-2 bg-secondary/30 px-3 py-1 rounded-full">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={currentCompanion.avatarUrl} />
            <AvatarFallback>{currentCompanion.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{currentCompanion.name}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-2 h-6 w-6 p-0"
            onClick={clearCurrentCompanion}
          >
            <span className="sr-only">Clear</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </Button>
        </div>
      )}

      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative" size="sm">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar_url || user?.avatarUrl || user?.profileImageUrl} />
                <AvatarFallback>{user?.email?.[0]?.toUpperCase() || <User />}</AvatarFallback>
              </Avatar>
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex items-center justify-start p-2">
              <div className="flex flex-col space-y-1">
                <p className="font-medium text-sm">{user?.username || user?.name || user?.email}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="cursor-pointer">
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/ai-companions" className="cursor-pointer">
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>AI Companions</span>
              </Link>
            </DropdownMenuItem>

            {recentInteractions.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <p className="text-xs px-2 py-1 text-muted-foreground">Recent Companions</p>
                {recentInteractions.slice(0, 3).map(interaction => (
                  <DropdownMenuItem key={interaction.companionId} asChild>
                    <Link to={`/ai-companions/${interaction.companionId}`} className="cursor-pointer">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span className="truncate max-w-[150px]">
                        {interaction.companionId.substr(0, 10)}...
                      </span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </>
            )}
            
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogIn className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild variant="secondary" size="sm">
          <Link to="/auth">
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Link>
        </Button>
      )}
    </div>
  );
};

export default AIAuthNav;
