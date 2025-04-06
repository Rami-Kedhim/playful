
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Globe, Shield, CreditCard } from 'lucide-react';
import Logo from './Logo';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t pt-12 pb-6 mt-16">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-muted-foreground text-sm mb-4 max-w-xs">
              The secure web3 platform connecting verified escorts, creators and clients with innovative safety features.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" aria-label="Facebook" className="text-muted-foreground hover:text-foreground transition">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="text-muted-foreground hover:text-foreground transition">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" aria-label="YouTube" className="text-muted-foreground hover:text-foreground transition">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-lg">{t('services')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/escorts" className="text-muted-foreground hover:text-foreground transition">
                  {t('escorts')}
                </Link>
              </li>
              <li>
                <Link to="/creators" className="text-muted-foreground hover:text-foreground transition">
                  {t('content_creators')}
                </Link>
              </li>
              <li>
                <Link to="/livecams" className="text-muted-foreground hover:text-foreground transition">
                  {t('livecams')}
                </Link>
              </li>
              <li>
                <Link to="/ai-companion" className="text-muted-foreground hover:text-foreground transition">
                  {t('ai_companions')}
                </Link>
              </li>
              <li>
                <Link to="/metaverse" className="text-muted-foreground hover:text-foreground transition">
                  {t('metaverse')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-lg">{t('company')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition">
                  {t('about_us')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition">
                  {t('faq')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground transition">
                  {t('blog')}
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-foreground transition">
                  {t('careers')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-lg">{t('legal')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition">
                  {t('terms_of_service')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition">
                  {t('privacy_policy')}
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-muted-foreground hover:text-foreground transition">
                  {t('cookie_policy')}
                </Link>
              </li>
              <li>
                <Link to="/content-policy" className="text-muted-foreground hover:text-foreground transition">
                  {t('content_policy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between mt-12 pt-6 border-t text-sm text-muted-foreground">
          <div className="mb-4 md:mb-0">
            &copy; {currentYear} UberEscorts. {t('all_rights_reserved')}.
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center">
              <Globe size={16} className="mr-1" />
              <span>{t('worldwide_service')}</span>
            </div>
            <div className="flex items-center">
              <Shield size={16} className="mr-1" />
              <span>{t('secure_verification')}</span>
            </div>
            <div className="flex items-center">
              <CreditCard size={16} className="mr-1" />
              <span>{t('secure_payments')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
