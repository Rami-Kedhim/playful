
import { ReactNode } from 'react';

// Type definitions for react-i18next
declare module 'react-i18next' {
  export interface UseTranslationOptions {
    keyPrefix?: string;
    nsMode?: string;
  }

  export interface UseTranslationResponse {
    t: (key: string | string[], options?: any) => string;
    i18n: i18n;
    ready: boolean;
  }

  export function useTranslation(ns?: string | string[], options?: UseTranslationOptions): UseTranslationResponse;
  export const initReactI18next: {
    type: any;
    [key: string]: any;
  };

  export interface WithTranslationProps {
    t: (key: string | string[], options?: any) => string;
    i18n: i18n;
    tReady: boolean;
  }

  export function withTranslation(ns?: string | string[]): <P extends WithTranslationProps>(
    component: React.ComponentType<P>
  ) => React.ComponentClass<Omit<P, keyof WithTranslationProps>>;

  export interface TransProps {
    i18nKey?: string | string[];
    t?: (key: string | string[], options?: any) => string;
    count?: number;
    ns?: string | string[];
    i18n?: i18n;
    defaults?: string;
    values?: { [key: string]: any };
    components?: ReactNode[];
    children?: ReactNode;
  }

  export const Trans: React.ComponentType<TransProps>;
}

// Type definitions for i18next
declare module 'i18next' {
  export interface InitOptions {
    resources?: Record<string, Record<string, Record<string, string>>>;
    lng?: string;
    fallbackLng?: string | string[];
    ns?: string | string[];
    defaultNS?: string;
    fallbackNS?: string | string[];
    debug?: boolean;
    interpolation?: {
      escapeValue?: boolean;
      formatSeparator?: string;
      format?: (value: any, format: string, lng: string) => string;
    };
    detection?: {
      order?: string[];
      lookupFromPathIndex?: number;
      caches?: string[];
    };
    [key: string]: any;
  }

  export interface i18n {
    t: (key: string | string[], options?: any) => string;
    changeLanguage: (lng: string, callback?: (err: Error | null, t: TFunction) => void) => Promise<TFunction>;
    language?: string;
    languages: string[];
    getFixedT: (lng: string, ns?: string | string[]) => TFunction;
    use: (module: any) => i18n;
    init: (options: InitOptions) => i18n;
    [key: string]: any;
  }

  interface TFunction {
    (key: string | string[], options?: any): string;
  }

  const i18next: i18n;
  export default i18next;
}

// Type definitions for i18next-browser-languagedetector
declare module 'i18next-browser-languagedetector' {
  import { i18n } from 'i18next';
  
  export default class LanguageDetector {
    constructor(services?: any, options?: any);
    init(services?: any, options?: any): void;
    detect(callback?: (lng: string) => void): string;
    cacheUserLanguage(lng: string): void;
    type: 'languageDetector';
  }
}
