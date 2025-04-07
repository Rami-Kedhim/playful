
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Globe, Shield, CreditCard } from 'lucide-react';
import Logo from './Logo';
import { useTranslation } from 'react-i18next';
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    services: [
      { name: t('escorts'), path: '/escorts' },
      { name: t('content_creators'), path: '/creators' },
      { name: t('livecams'), path: '/livecams' },
      { name: t('ai_companions'), path: '/ai-companion' },
      { name: t('metaverse'), path: '/metaverse' },
    ],
    company: [
      { name: t('about_us'), path: '/about' },
      { name: t('faq'), path: '/faq' },
      { name: t('blog'), path: '/blog' },
      { name: t('careers'), path: '/careers' },
      { name: t('contact'), path: '/contact' },
    ],
    legal: [
      { name: t('terms_of_service'), path: '/terms' },
      { name: t('privacy_policy'), path: '/privacy' },
      { name: t('cookie_policy'), path: '/cookie-policy' },
      { name: t('content_policy'), path: '/content-policy' },
    ],
  };
  
  const socialLinks = [
    { icon: Facebook, url: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: Youtube, url: 'https://youtube.com', label: 'YouTube' },
  ];
  
  const features = [
    { icon: Globe, text: t('worldwide_service') },
    { icon: Shield, text: t('secure_verification') },
    { icon: CreditCard, text: t('secure_payments') },
  ];
  
  return (
    <footer className="bg-background border-t pt-10 pb-6">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-muted-foreground text-sm mb-4 max-w-xs">
              The secure web3 platform connecting verified escorts, creators and clients with innovative safety features.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.url} 
                  aria-label={social.label} 
                  className="text-muted-foreground hover:text-foreground transition"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Services links */}
          <div>
            <h3 className="font-bold mb-4 text-lg">{t('services')}</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.services.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-muted-foreground hover:text-foreground transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company links */}
          <div>
            <h3 className="font-bold mb-4 text-lg">{t('company')}</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-muted-foreground hover:text-foreground transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal links */}
          <div>
            <h3 className="font-bold mb-4 text-lg">{t('legal')}</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-muted-foreground hover:text-foreground transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <div className="mb-4 md:mb-0">
            &copy; {currentYear} UberEscorts. {t('all_rights_reserved')}.
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            {features.map((feature) => (
              <div key={feature.text} className="flex items-center">
                <feature.icon size={16} className="mr-1" />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
