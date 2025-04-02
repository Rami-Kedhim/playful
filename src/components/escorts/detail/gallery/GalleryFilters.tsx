
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ImageType = "all" | "portrait" | "full-body" | "artistic";

interface GalleryFiltersProps {
  selectedType: ImageType;
  onTypeChange: (type: ImageType) => void;
}

const GalleryFilters = ({ selectedType, onTypeChange }: GalleryFiltersProps) => {
  return (
    <Tabs 
      value={selectedType} 
      onValueChange={(value) => onTypeChange(value as ImageType)}
      className="mb-2"
    >
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="portrait">Portrait</TabsTrigger>
        <TabsTrigger value="full-body">Full Body</TabsTrigger>
        <TabsTrigger value="artistic">Artistic</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default GalleryFilters;
