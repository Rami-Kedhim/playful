// Import from a consistent path that doesn't have casing issues
import { Escort } from '@/types/escort';
import { Grid } from '@/components/ui/grid';
import EscortCard from './EscortCard';

interface EscortGridProps {
  escorts: Escort[];
  loading?: boolean;
  emptyMessage?: string;
  onEscortClick?: (escort: Escort) => void;
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const EscortGrid: React.FC<EscortGridProps> = ({
  escorts,
  loading = false,
  emptyMessage = "No escorts found",
  onEscortClick,
  totalPages,
  currentPage,
  onPageChange
}) => {
  if (loading) {
    return (
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array(8).fill(0).map((_, index) => (
          <div key={index} className="rounded-lg bg-muted animate-pulse h-[300px]"></div>
        ))}
      </div>
    );
  }
  
  if (escorts.length === 0) {
    return (
      <div className="w-full py-10 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {escorts.map(escort => (
        <EscortCard
          key={escort.id}
          escort={escort}
          onClick={() => onEscortClick?.(escort)}
        />
      ))}
    </div>
  );
};

export default EscortGrid;
