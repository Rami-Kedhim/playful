
import MainLayout from "@/components/layout/MainLayout";
import EscortContainer from "@/components/escorts/EscortContainer";
import { escorts, availableServices } from "@/data/escortData";

const Escorts = () => {
  // Set page title and description using regular DOM APIs as fallback
  document.title = "Premium Escort Directory | Find Verified Escorts";
  
  return (
    <MainLayout>
      <EscortContainer 
        escorts={escorts}
        services={availableServices}
      />
    </MainLayout>
  );
};

export default Escorts;
