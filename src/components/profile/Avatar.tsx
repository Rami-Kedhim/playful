
import React from 'react';
import { Avatar as UIAvatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
  username?: string; // Added username
  email?: string; // Added email
  size?: string; // Added size
  border?: boolean; // Added border
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt = '', 
  fallback, 
  className = '',
  username,
  email,
  size,
  border
}) => {
  const initials = fallback || 
    (username ? username.charAt(0).toUpperCase() : '') || 
    (alt ? alt.charAt(0).toUpperCase() : '') || 
    (email ? email.charAt(0).toUpperCase() : '');

  const sizeClass = size === 'lg' ? 'h-16 w-16' : 
                   size === 'sm' ? 'h-8 w-8' : 
                   'h-10 w-10';

  const borderClass = border ? 'border-2 border-primary' : '';
  const finalClassName = `${sizeClass} ${borderClass} ${className}`;

  return (
    <UIAvatar className={finalClassName}>
      {src && <AvatarImage src={src} alt={alt} />}
      <AvatarFallback>{initials}</AvatarFallback>
    </UIAvatar>
  );
};

export default Avatar;
