
import { useState, useMemo } from "react";
import { ContentCreator } from "@/types/creator";

export const useCreatorFilters = (creators: ContentCreator[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [liveOnly, setLiveOnly] = useState(false);
  const [hideAI, setHideAI] = useState(false);
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  
  const toggleContentType = (type: string) => {
    setSelectedContentTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setLiveOnly(false);
    setHideAI(false);
    setSelectedContentTypes([]);
    setPriceMax("all");
  };
  
  // Filter creators based on criteria
  const filteredCreators = useMemo(() => {
    return creators.filter(creator => {
      const matchesSearch = 
        creator.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        creator.username.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLive = liveOnly ? creator.isLive : true;
      const matchesAI = hideAI ? !creator.isAI : true;
      const matchesPrice = priceMax === "all" ? true : 
        priceMax === "5" ? creator.price <= 5 :
        priceMax === "10" ? creator.price <= 10 :
        priceMax === "15" ? creator.price <= 15 :
        priceMax === "20" ? creator.price <= 20 : true;
        
      return matchesSearch && matchesLive && matchesAI && matchesPrice;
    });
  }, [creators, searchQuery, liveOnly, hideAI, priceMax]);
  
  return {
    searchQuery,
    setSearchQuery,
    liveOnly,
    setLiveOnly,
    hideAI,
    setHideAI,
    selectedContentTypes,
    setSelectedContentTypes,
    toggleContentType,
    priceMax,
    setPriceMax,
    showFilters,
    setShowFilters,
    clearFilters,
    filteredCreators
  };
};

export default useCreatorFilters;
