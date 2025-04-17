
import React from 'react';
import { Avatar as UIAvatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = '', fallback, className = '' }) => {
  const initials = fallback || alt
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <UIAvatar className={className}>
      {src && <AvatarImage src={src} alt={alt} />}
      <AvatarFallback>{initials}</AvatarFallback>
    </UIAvatar>
  );
};

export default Avatar;
