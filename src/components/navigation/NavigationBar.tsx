
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Heart, User, Video, Search, Menu as MenuIcon } from 'lucide-react';
import Logo from '../layout/Logo';
import LanguageSwitcher from '../language/LanguageSwitcher';
import { useAuth } from '@/hooks/auth/useAuth';
import { ThemeToggle } from "@/components/ui/theme-toggle";
import MobileNavigation from './MobileNavigation';
import DesktopNavigation from './DesktopNavigation';

interface NavigationBarProps {
  className?: string;
  containerClassName?: string;
}

export default function NavigationBar({ className, containerClassName }: NavigationBarProps) {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-300",
      className
    )}>
      <div className={cn("container flex h-16 items-center", containerClassName)}>
        <div className="mr-4 flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
        </div>
        
        <DesktopNavigation />
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Link to="/search" aria-label={t('search')}>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
              <span className="sr-only">{t('search')}</span>
            </Button>
          </Link>
          
          <ThemeToggle />
          
          <LanguageSwitcher />
          
          {/* Mobile Menu Trigger */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
          
          {/* Mobile Navigation */}
          <MobileNavigation open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
          
          {/* Desktop Auth Menu */}
          <div className="hidden md:block">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="rounded-full h-8 w-8 bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-semibold">
                        {user?.email?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium truncate max-w-[180px]">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/favorites" className="cursor-pointer">Favorites</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/messages" className="cursor-pointer">Messages</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/logout" className="cursor-pointer text-destructive">Log out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">{t('login')}</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">{t('register')}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
