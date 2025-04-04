
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ProfessionalEscortServices from "./ProfessionalEscortServices";

interface EscortServicesProps {
  tags: string[];
}

const EscortServices = ({ tags }: EscortServicesProps) => {
  return <ProfessionalEscortServices tags={tags} />;
};

export default EscortServices;
