
import AppLayout from "@/components/layout/AppLayout";
import EscortContainer from "@/components/escorts/EscortContainer";
import { escorts, availableServices } from "@/data/escortData";

const Escorts = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <EscortContainer 
          escorts={escorts}
          services={availableServices}
        />
      </div>
    </AppLayout>
  );
};

export default Escorts;
