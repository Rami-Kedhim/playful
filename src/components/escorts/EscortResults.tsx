
import { Button } from "@/components/ui/button";
import EscortCard from "@/components/cards/EscortCard";

interface Escort {
  id: string;
  name: string;
  location: string;
  age: number;
  rating: number;
  reviews: number;
  tags: string[];
  imageUrl: string;
  price: number;
  verified: boolean;
}

interface EscortResultsProps {
  escorts: Escort[];
  clearFilters: () => void;
}

const EscortResults = ({ escorts, clearFilters }: EscortResultsProps) => {
  return (
    <>
      <div className="mb-4">
        <p className="text-gray-400">
          Showing {escorts.length} escorts
        </p>
      </div>
      
      {escorts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {escorts.map(escort => (
            <EscortCard key={escort.id} {...escort} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No escorts found matching your criteria.</p>
          <Button variant="outline" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}
      
      {/* Pagination */}
      {escorts.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="mx-1" disabled>Previous</Button>
          <Button variant="outline" className="mx-1 bg-primary text-primary-foreground hover:bg-primary/90">1</Button>
          <Button variant="outline" className="mx-1">2</Button>
          <Button variant="outline" className="mx-1">3</Button>
          <Button variant="outline" className="mx-1">Next</Button>
        </div>
      )}
    </>
  );
};

export default EscortResults;
