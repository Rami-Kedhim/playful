
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define language types
export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh';

// Language metadata with name and flag emoji
export const languages: Record<Language, { name: string; flag: string }> = {
  en: { name: 'English', flag: '🇺🇸' },
  es: { name: 'Español', flag: '🇪🇸' },
  fr: { name: 'Français', flag: '🇫🇷' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  zh: { name: '中文', flag: '🇨🇳' }
};

// Resources for each language
const resources = {
  en: {
    translation: {
      welcome: 'Welcome to UberEscorts',
      tagline: 'The Web3 Platform for Secure Adult Connections',
      search: 'Search',
      escorts: 'Escorts',
      creators: 'Creators',
      livecams: 'Live Cams',
      ai_companions: 'AI Companions',
      login: 'Login',
      register: 'Register',
      profile: 'Profile',
      notFound: {
        title: '404 - Page Not Found',
        message: 'The page you are looking for does not exist or has been moved.',
        backHome: 'Back to Home'
      }
    }
  },
  es: {
    translation: {
      welcome: 'Bienvenido a UberEscorts',
      tagline: 'La plataforma Web3 para conexiones adultas seguras',
      search: 'Buscar',
      escorts: 'Escorts',
      creators: 'Creadores',
      livecams: 'Cámaras en vivo',
      ai_companions: 'Compañeros IA',
      login: 'Iniciar sesión',
      register: 'Registrarse',
      profile: 'Perfil',
      notFound: {
        title: '404 - Página no encontrada',
        message: 'La página que estás buscando no existe o ha sido movida.',
        backHome: 'Volver al inicio'
      }
    }
  },
  fr: {
    translation: {
      welcome: 'Bienvenue sur UberEscorts',
      tagline: 'La plateforme Web3 pour des connexions adultes sécurisées',
      search: 'Rechercher',
      escorts: 'Escortes',
      creators: 'Créateurs',
      livecams: 'Cams en direct',
      ai_companions: 'Compagnons IA',
      login: 'Connexion',
      register: "S'inscrire",
      profile: 'Profil',
      notFound: {
        title: '404 - Page non trouvée',
        message: "La page que vous recherchez n'existe pas ou a été déplacée.",
        backHome: "Retour à l'accueil"
      }
    }
  },
  de: {
    translation: {
      welcome: 'Willkommen bei UberEscorts',
      tagline: 'Die Web3-Plattform für sichere Erwachsenenverbindungen',
      search: 'Suche',
      escorts: 'Escorts',
      creators: 'Ersteller',
      livecams: 'Live-Cams',
      ai_companions: 'KI-Begleiter',
      login: 'Anmelden',
      register: 'Registrieren',
      profile: 'Profil',
      notFound: {
        title: '404 - Seite nicht gefunden',
        message: 'Die gesuchte Seite existiert nicht oder wurde verschoben.',
        backHome: 'Zurück zur Startseite'
      }
    }
  },
  zh: {
    translation: {
      welcome: '欢迎来到 UberEscorts',
      tagline: '安全成人连接的Web3平台',
      search: '搜索',
      escorts: '伴游',
      creators: '创作者',
      livecams: '直播摄像头',
      ai_companions: 'AI伴侣',
      login: '登录',
      register: '注册',
      profile: '个人资料',
      notFound: {
        title: '404 - 页面未找到',
        message: '您要查找的页面不存在或已被移动。',
        backHome: '返回首页'
      }
    }
  }
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already safes from XSS
    }
  });

export default i18n;
