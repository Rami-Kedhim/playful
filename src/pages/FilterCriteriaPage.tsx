
import MainLayout from "@/components/layout/MainLayout";
import FilterCriteria from "@/components/FilterCriteria";

const FilterCriteriaPage = () => {
  return (
    <MainLayout title="Filter Criteria" containerClass="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Escort Filter Criteria</h1>
      <p className="mb-8 text-muted-foreground">
        This page provides a comprehensive list of all available filtering criteria and service categories 
        used in our escort directory. Use these options to create a more targeted search experience.
      </p>
      
      <FilterCriteria />
    </MainLayout>
  );
};

export default FilterCriteriaPage;
