
import { Escort } from '@/types/Escort';
import EscortCard from './EscortCard';

interface ExtendedEscort extends Escort {
  sexualOrientation?: string;
  lastActive?: string | Date;
}

interface EscortGridProps {
  escorts: ExtendedEscort[];
  loading?: boolean;
  emptyMessage?: string;
  onEscortClick?: (escort: ExtendedEscort) => void;
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
          id={escort.id}
          name={escort.name}
          age={escort.age ?? 0}
          location={escort.location ?? ''}
          rating={escort.rating ?? 0}
          reviews={escort.reviewCount ?? 0}
          tags={escort.tags ?? []}
          imageUrl={escort.imageUrl ?? escort.profileImage ?? (escort.images?.[0] ?? '')}
          price={escort.price ?? 0}
          verified={escort.isVerified ?? escort.verified ?? false}
          gender={escort.gender ?? ''}
          sexualOrientation={escort.sexualOrientation}
          availableNow={escort.availableNow ?? false}
          lastActive={escort.lastActive ? new Date(escort.lastActive) : undefined}
          responseRate={escort.responseRate ?? undefined}
        />
      ))}
    </div>
  );
};

export default EscortGrid;

