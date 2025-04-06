
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AICompanionNavLinkProps {
  className?: string;
}

const AICompanionNavLink: React.FC<AICompanionNavLinkProps> = ({ className }) => {
  return (
    <Link
      to="/ai-companion"
      className={cn(
        "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
        className
      )}
    >
      <Heart className="h-4 w-4" />
      AI Companions
    </Link>
  );
};

export default AICompanionNavLink;
