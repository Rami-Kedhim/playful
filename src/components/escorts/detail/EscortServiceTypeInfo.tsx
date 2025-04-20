
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Escort } from "@/types/Escort";

type ServiceTypeFilter = "in-person" | "virtual" | "both" | "";

interface EscortServiceTypeInfoProps {
  escort: Escort;
}

const EscortServiceTypeInfo: React.FC<EscortServiceTypeInfoProps> = ({ escort }) => {
  const services = escort.services || [];

  const getServiceType = (): ServiceTypeFilter => {
    const hasInPerson = services.includes("in-person");
    const hasVirtual = services.includes("virtual");
    if (hasInPerson && hasVirtual) return "both";
    if (hasInPerson) return "in-person";
    if (hasVirtual) return "virtual";
    return "";
  };

  const serviceType = getServiceType();

  if (!serviceType) return null;

  return (
    <Badge
      variant="outline"
      className={`
        ${serviceType === "in-person" ? "bg-indigo-100 text-indigo-800 border-indigo-200" : ""}
        ${serviceType === "virtual" ? "bg-purple-100 text-purple-800 border-purple-200" : ""}
        ${serviceType === "both" ? "bg-blue-100 text-blue-800 border-blue-200" : ""}
      `}
    >
      {serviceType === "in-person" && "In-Person Services"}
      {serviceType === "virtual" && "Virtual Services"}
      {serviceType === "both" && "In-Person & Virtual"}
    </Badge>
  );
};

export default EscortServiceTypeInfo;
