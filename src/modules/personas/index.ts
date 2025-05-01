
// Main entry point for the Personas module
import { personaService } from './service';

export { personaService };
export * from './types';
export * from './hooks';
export * from './utils';

// Re-export common components
export { default as UberPersonaGrid } from '@/components/personas/UberPersonaGrid';
export { default as UberPersonaCard } from '@/components/personas/UberPersonaCard';
export { default as UberPersonaFilters } from '@/components/personas/UberPersonaFilters';

console.info('Personas module initialized');
