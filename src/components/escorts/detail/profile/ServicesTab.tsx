
import { Escort } from "@/data/escortData";

interface ServicesTabProps {
  escort: Escort;
}

const ServicesTab = ({ escort }: ServicesTabProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Services Offered</h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {(escort.services || escort.tags).map((service, index) => (
          <div key={index} className="bg-secondary/20 p-2 rounded-md text-center text-sm">
            {service}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesTab;
