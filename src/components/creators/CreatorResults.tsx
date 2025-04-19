
// Fix CreatorResults to match CreatorCard props interface by removing props not in CreatorCardProps interface

import CreatorCard from "@/components/creators/CreatorCard";
import { Button } from "@/components/ui/button";
import { ContentCreator } from "@/types/creator";

interface CreatorResultsProps {
  creators: ContentCreator[];
  clearFilters: () => void;
}

const CreatorResults = ({ creators, clearFilters }: CreatorResultsProps) => {
  return (
    <>
      {/* Results count */}
      <div className="mb-4">
        <p className="text-gray-400">Showing {creators.length} creators</p>
      </div>
      
      {/* Results grid */}
      {creators.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator) => (
            <CreatorCard
              key={creator.id}
              id={creator.id}
              name={creator.name || "Unknown Creator"}
              image={creator.imageUrl || creator.avatarUrl || creator.profileImage || ""}
              location={creator.location || "Unknown location"}
              premium={Boolean(creator.isPremium) || false}
              price={creator.price || 0}
              rating={creator.rating || 0}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No creators found matching your criteria.</p>
          <Button variant="outline" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}
      
      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <Button variant="outline" className="mx-1" disabled>
          Previous
        </Button>
        <Button variant="outline" className="mx-1 bg-primary text-primary-foreground hover:bg-primary/90">
          1
        </Button>
        <Button variant="outline" className="mx-1">
          2
        </Button>
        <Button variant="outline" className="mx-1">
          3
        </Button>
        <Button variant="outline" className="mx-1">
          Next
        </Button>
      </div>
    </>
  );
};

export default CreatorResults;
