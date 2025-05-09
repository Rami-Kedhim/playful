
import React from "react";
import EscortResults from "@/components/escorts/EscortResults";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Escort } from "@/types/escort";

interface ResultsSectionProps {
  escorts: Escort[];
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  clearFilters: () => void;
  isLoading?: boolean;
  resultsPerPage?: number;
  totalEscorts?: number;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  escorts,
  totalPages,
  currentPage,
  setCurrentPage,
  clearFilters,
  isLoading = false,
  resultsPerPage = 12,
  totalEscorts = 0,
}) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <Button
          key="1"
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(1)}
        >
          1
        </Button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="ellipsis1">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "outline"}
          size="icon"
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="ellipsis2">...</span>);
      }
      pageNumbers.push(
        <Button
          key={totalPages}
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <div>
      <EscortResults
        escorts={escorts}
        isLoading={isLoading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination 
            totalPages={totalPages} 
            currentPage={currentPage}
            onPageChange={handlePageChange}
            className="mx-auto flex w-full justify-center" 
          />
        </div>
      )}
    </div>
  );
};

export default ResultsSection;
