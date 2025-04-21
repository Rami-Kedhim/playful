
import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppRoutes } from '@/utils/navigation';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { Book, Video, Image, ArrowRight } from 'lucide-react';

const MainNav: React.FC<{ className?: string }> = ({ className }) => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className={className}>
      <ul className="flex space-x-4 items-center">
        <li>
          <NavLink
            to={AppRoutes.HOME}
            className={({ isActive }) =>
              isActive ? 'font-bold text-primary flex items-center space-x-1' : 'flex items-center space-x-1'
            }
          >
            <Image size={16} />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to={AppRoutes.ESCORTS}
            className={({ isActive }) =>
              isActive ? 'font-bold text-primary flex items-center space-x-1' : 'flex items-center space-x-1'
            }
          >
            <Video size={16} />
            <span>Escorts</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/book"
            className={({ isActive }) =>
              isActive ? 'font-bold text-primary flex items-center space-x-1' : 'flex items-center space-x-1'
            }
          >
            <Book size={16} />
            <span>Book</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/livecam"
            className={({ isActive }) =>
              isActive ? 'font-bold text-primary flex items-center space-x-1' : 'flex items-center space-x-1'
            }
          >
            <Video size={16} />
            <span>LiveCam</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/generate"
            className={({ isActive }) =>
              isActive ? 'font-bold text-primary flex items-center space-x-1' : 'flex items-center space-x-1'
            }
          >
            <ArrowRight size={16} />
            <span>Generate</span>
          </NavLink>
        </li>
        {isAuthenticated && (
          <li>
            <NavLink
              to={AppRoutes.PERSONAS}
              className={({ isActive }) =>
                isActive ? 'font-bold text-primary flex items-center space-x-1' : 'flex items-center space-x-1'
              }
            >
              <Image size={16} />
              <span>Personas</span>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MainNav;

