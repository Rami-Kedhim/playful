
declare module 'react-i18next' {
  import i18next from 'i18next';
  import { ReactNode } from 'react';

  export interface UseTranslationOptions {
    keyPrefix?: string;
    nsMode?: string;
  }

  export interface UseTranslationResponse {
    t: (key: string | string[], options?: any) => string;
    i18n: i18next.i18n;
    ready: boolean;
  }

  export function useTranslation(ns?: string | string[], options?: UseTranslationOptions): UseTranslationResponse;
  export function initReactI18next: {
    type: any;
    [key: string]: any;
  };

  export interface WithTranslationProps {
    t: (key: string | string[], options?: any) => string;
    i18n: i18next.i18n;
    tReady: boolean;
  }

  export function withTranslation(ns?: string | string[]): <P extends WithTranslationProps>(
    component: React.ComponentType<P>
  ) => React.ComponentType<Omit<P, keyof WithTranslationProps>>;

  export interface TransProps {
    i18nKey?: string | string[];
    t?: (key: string | string[], options?: any) => string;
    count?: number;
    ns?: string | string[];
    i18n?: i18next.i18n;
    defaults?: string;
    values?: { [key: string]: any };
    components?: ReactNode[];
    children?: ReactNode;
  }

  export const Trans: React.ComponentType<TransProps>;
}

declare module 'i18next-browser-languagedetector' {
  import i18next from 'i18next';
  
  export default class LanguageDetector {
    constructor(services?: any, options?: any);
    init(services?: any, options?: any): void;
    detect(callback?: (lng: string) => void): string;
    cacheUserLanguage(lng: string): void;
    type: 'languageDetector';
  }
}
