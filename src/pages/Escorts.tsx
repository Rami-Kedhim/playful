
import MainLayout from "@/components/layout/MainLayout";
import EscortContainer from "@/components/escorts/EscortContainer";
import { escorts, availableServices } from "@/data/escortData";

const Escorts = () => {
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
