
// Added featured to EscortCard props to fix typings, use correct import for Escort type

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import EscortCard from "@/components/escorts/EscortCard";
import { Escort } from "@/types/Escort";
import { Skeleton } from "@/components/ui/skeleton";
import { BadgeCheck, Calendar, MapPin } from "lucide-react";
import ServiceTypeBadgeLabel from "./filters/ServiceTypeBadgeLabel";

interface EscortResultsProps {
  escorts: Escort[];
  clearFilters: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  isLoading: boolean;
}

const EscortResults = ({
  escorts,
  clearFilters,
  currentPage,
  setCurrentPage,
  totalPages,
  isLoading,
}: EscortResultsProps) => {
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    if (currentPage) {
      setLocalLoading(true);
      const timer = setTimeout(() => {
        setLocalLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const loading = isLoading || localLoading;

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(9).fill(0).map((_, i) => (
          <div key={i} className="border rounded-lg p-6">
            <Skeleton className="h-48 w-full rounded-md mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <div className="flex gap-2 mb-4">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!escorts || escorts.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/10 p-8">
        <h3 className="text-xl font-medium mb-2">No escorts found</h3>
        <p className="text-muted-foreground mb-6">
          We couldn't find any escorts matching your filters.
        </p>
        <Button onClick={clearFilters} className="px-6 py-2">
          Clear all filters
        </Button>
      </div>
    );
  }

  const getServiceType = (escort: Escort): { inPerson: boolean; virtual: boolean } => {
    const inPerson =
      Boolean(escort.providesInPersonServices) || (escort.services?.includes('in-person') ?? false);
    const virtual =
      Boolean(escort.providesVirtualContent) || (escort.services?.includes('virtual') ?? false);
    return { inPerson, virtual };
  };

  const inPersonCount = escorts.filter((e) => getServiceType(e).inPerson).length;
  const virtualCount = escorts.filter((e) => getServiceType(e).virtual).length;

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {escorts.length} {escorts.length === 1 ? 'escort' : 'escorts'}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <BadgeCheck className="h-4 w-4 text-green-500" />
            <span>{escorts.filter(e => e.verified).length} Verified</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span>{escorts.filter(e => e.availableNow).length} Available now</span>
          </div>

          {inPersonCount > 0 && (
            <div className="hidden sm:flex">
              <ServiceTypeBadgeLabel type="in-person" />
              <span className="ml-1 text-muted-foreground">{inPersonCount}</span>
            </div>
          )}

          {virtualCount > 0 && (
            <div className="hidden sm:flex">
              <ServiceTypeBadgeLabel type="virtual" />
              <span className="ml-1 text-muted-foreground">{virtualCount}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {escorts.map((escort) => (
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
            featured={escort.featured ?? false}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <Pagination 
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            className="px-2 py-1"
          />
        </div>
      )}

      <div className="mt-8 pt-6 border-t text-sm text-muted-foreground flex justify-between items-center">
        <p>All escorts are independent service providers</p>
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>Escorts near you</span>
        </div>
      </div>
    </>
  );
};

export default EscortResults;

