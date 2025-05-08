
// Export escort-related types 
// Avoid re-exporting with explicit imports to prevent duplicate exports
import { Escort } from '@/types/Escort';
export type { Escort };

// Export hooks - use relative paths to prevent conflicts
export { useEscortDetail } from '../../hooks/escort/useEscortDetail';
export { useEscortFilter } from '../../hooks/escort/useEscortFilter';
export { useEscortSearch } from '../../hooks/escort/useEscortSearch';
export { useEscortProfileState } from '../../hooks/escort/useEscortProfileState';

// Export components
export { default as EscortCard } from '@/components/escorts/EscortCard';
export { default as EscortGrid } from '@/components/escorts/EscortGrid';
export { default as EscortFilters } from '@/components/escorts/EscortFilters';
export { default as FeaturedEscorts } from '@/components/escorts/FeaturedEscorts';

// Export services
export { default as escortService } from '@/services/escorts/escortService';
