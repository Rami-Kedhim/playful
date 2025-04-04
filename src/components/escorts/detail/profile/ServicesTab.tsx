
import { Escort } from "@/types/escort";
import ProfessionalServicesTab from "./ProfessionalServicesTab";

interface ServicesTabProps {
  escort: Escort;
}

const ServicesTab = ({ escort }: ServicesTabProps) => {
  return <ProfessionalServicesTab escort={escort} />;
};

export default ServicesTab;
