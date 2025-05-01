
import { UberPersona } from '@/types/uberPersona';

export interface SystemStatusFormatted {
  status: string;
  uptime: number;
  components?: Array<{
    name: string;
    status: string;
    health: number;
  }>;
}

export const formatSystemStatus = (status: { status: string; uptime: number }): SystemStatusFormatted => {
  return {
    status: status.status || 'operational',
    uptime: status.uptime || 99.9,
    components: [
      { name: 'Authentication', status: 'operational', health: 98 },
      { name: 'Database', status: 'operational', health: 99.5 },
      { name: 'Hermes Engine', status: 'operational', health: 97.8 },
      { name: 'Oxum Boosting', status: 'operational', health: 99.2 },
    ]
  };
};

export interface FeaturedPersonasResponse {
  personas: UberPersona[];
  featuredCount: number;
  totalCount: number;
}
