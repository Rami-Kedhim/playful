
/**
 * Home page related types
 */

export interface HeroProps {
  searchLocation: string;
  setSearchLocation: (value: string) => void;
}

export interface FeaturesProps {
  title?: string;
  description?: string;
  features?: Array<{
    title: string;
    description: string;
    icon?: React.ReactNode;
  }>;
}

export interface TestimonialProps {
  avatar?: string;
  name: string;
  role?: string;
  content: string;
}
