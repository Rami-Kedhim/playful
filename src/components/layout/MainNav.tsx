
import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppRoutes } from '@/utils/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/auth/useAuthContext';

const MainNav: React.FC<{ className?: string }> = ({ className }) => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className={className}>
      <ul className="flex space-x-4">
        <li>
          <NavLink to={AppRoutes.HOME} className={({ isActive }) => isActive ? 'font-bold text-primary' : undefined}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={AppRoutes.ESCORTS} className={({ isActive }) => isActive ? 'font-bold text-primary' : undefined}>
            Escorts
          </NavLink>
        </li>
        <li>
          <NavLink to="/book" className={({ isActive }) => isActive ? 'font-bold text-primary' : undefined}>
            Book
          </NavLink>
        </li>
        <li>
          <NavLink to="/livecam" className={({ isActive }) => isActive ? 'font-bold text-primary' : undefined}>
            LiveCam
          </NavLink>
        </li>
        <li>
          <NavLink to="/generate" className={({ isActive }) => isActive ? 'font-bold text-primary' : undefined}>
            Generate
          </NavLink>
        </li>
        {isAuthenticated && (
          <li>
            <NavLink to={AppRoutes.PERSONAS} className={({ isActive }) => isActive ? 'font-bold text-primary' : undefined}>
              Personas
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MainNav;
