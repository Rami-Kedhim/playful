
import MainLayout from "@/components/layout/MainLayout";
import FilterCriteria from "@/components/FilterCriteria";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const FilterCriteriaPage = () => {
  return (
    <MainLayout title="Filter Criteria" containerClass="container mx-auto py-8 px-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Escort Filter Criteria</h1>
            <p className="text-muted-foreground mt-1">
              Browse all available filtering options and service categories
            </p>
          </div>
          <Button asChild>
            <Link to="/escorts">
              <Search size={18} className="mr-2" />
              Start Searching
            </Link>
          </Button>
        </div>
        
        <div className="bg-card border rounded-lg p-6 mb-8">
          <p className="text-base">
            This page provides a comprehensive guide to all the filtering criteria available in our escort directory.
            Use these options to create more targeted searches and find the perfect escort for your preferences.
            Click on any filter to see escorts matching that criteria.
          </p>
        </div>
        
        <FilterCriteria />
      </div>
    </MainLayout>
  );
};

export default FilterCriteriaPage;
