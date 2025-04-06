
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

const NotFound = () => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">{t('notFound.title', '404 - Page Not Found')}</h1>
      <p className="text-lg text-muted-foreground mb-8">
        {t('notFound.message', 'The page you are looking for does not exist or has been moved.')}
      </p>
      <Button asChild>
        <Link to={`/${currentLanguage}`} className="flex items-center">
          <Home className="mr-2 h-4 w-4" />
          {t('notFound.backHome', 'Back to Home')}
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
