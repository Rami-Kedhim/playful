
import MainLayout from "@/components/layout/MainLayout";
import EscortContainer from "@/components/escorts/EscortContainer";
import { escorts, availableServices } from "@/data/escortData";
import { Helmet } from "react-helmet-async";

const Escorts = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Premium Escort Directory | Find Verified Escorts</title>
        <meta name="description" content="Browse our exclusive directory of verified escorts. Filter by location, services, and more to find your perfect companion." />
      </Helmet>
      
      <EscortContainer 
        escorts={escorts}
        services={availableServices}
      />
    </MainLayout>
  );
};

export default Escorts;
