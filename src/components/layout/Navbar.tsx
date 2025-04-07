import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Heart, User, Settings, MessageSquare, Menu, LogOut, Search } from 'lucide-react';
import Logo from './Logo';
import LanguageSwitcher from '../language/LanguageSwitcher';
import { useAuth } from '@/hooks/auth/useAuth';
import { ThemeToggle } from "@/components/ui/theme-toggle";
import MobileMenu from '../navigation/MobileMenu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated, userRoles = [], logout } = useAuth();
  const { currentLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isAdmin = userRoles?.some(role => ['admin', 'moderator'].includes(role));
  
  const navItems = [
    { name: t('nav.escorts'), path: `/escorts`, auth: false },
    { name: t('nav.creators'), path: `/creators`, auth: false },
    { name: t('nav.metaverse'), path: `/metaverse`, auth: true },
  ];
  
  if (isAdmin) {
    navItems.push({ name: 'SEO', path: `/seo`, auth: true });
  }
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-300">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navItems.map((item) => {
              if (item.auth && !isAuthenticated) return null;
              
              return (
                <li key={item.path}>
                  <NavLink
                    to={`/${currentLanguage}${item.path}`}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors ${
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Link to="/search" aria-label={t('search')}>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
              <span className="sr-only">{t('search')}</span>
            </Button>
          </Link>
          
          <ThemeToggle />
          
          <LanguageSwitcher />
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <MobileMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
          
          <div className="hidden md:block">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage 
                        src={user?.profileImageUrl || user?.avatarUrl || undefined} 
                        alt={user?.username || "User"} 
                      />
                      <AvatarFallback>{getInitials(user?.username || user?.email)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.username || 'User'}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="w-full cursor-pointer flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        {t('profile')}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/messages" className="w-full cursor-pointer flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        {t('messages')}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/favorites" className="w-full cursor-pointer flex items-center">
                        <Heart className="h-4 w-4 mr-2" />
                        {t('favorites')}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="w-full cursor-pointer flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        {t('settings')}
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('logout')}
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
};

export default Navbar;
