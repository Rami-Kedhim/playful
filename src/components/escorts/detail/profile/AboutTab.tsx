
import { Escort } from "@/types/escort";

interface AboutTabProps {
  escort: Escort;
}

const AboutTab = ({ escort }: AboutTabProps) => {
  // Helper function to format measurements
  const formatMeasurements = (measurements?: {bust?: number, waist?: number, hips?: number}) => {
    if (!measurements) return "Not specified";
    
    const bust = measurements.bust || "-";
    const waist = measurements.waist || "-";
    const hips = measurements.hips || "-";
    
    return `${bust}-${waist}-${hips}`;
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">About {escort.name}</h3>
      <p className="text-gray-300 mb-4">
        {escort.description || `I'm a fun-loving, adventurous companion looking for genuine connections. 
        I enjoy both quiet evenings and exciting adventures. Let's create unforgettable 
        memories together in ${escort.location}. I provide high-class companionship services 
        and prioritize discretion and comfort.`}
      </p>
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm mt-6">
        <div className="text-gray-400">Age</div>
        <div>{escort.age} years</div>
        
        <div className="text-gray-400">Gender</div>
        <div className="capitalize">{escort.gender || "Not specified"}</div>
        
        <div className="text-gray-400">Sexual Orientation</div>
        <div className="capitalize">{escort.sexualOrientation || "Not specified"}</div>
        
        <div className="text-gray-400">Height</div>
        <div>{escort.height || "Not specified"}</div>
        
        <div className="text-gray-400">Weight</div>
        <div>{escort.weight || "Not specified"}</div>
        
        <div className="text-gray-400">Measurements</div>
        <div>{formatMeasurements(escort.measurements)}</div>
        
        <div className="text-gray-400">Hair Color</div>
        <div>{escort.hairColor || "Not specified"}</div>
        
        <div className="text-gray-400">Eye Color</div>
        <div>{escort.eyeColor || "Not specified"}</div>
        
        <div className="text-gray-400">Ethnicity</div>
        <div>{escort.ethnicity || "Not specified"}</div>
        
        <div className="text-gray-400">Languages</div>
        <div>{escort.languages?.join(", ") || "Not specified"}</div>
        
        <div className="text-gray-400">Availability</div>
        <div>{escort.availability?.days.join(", ") || "Contact for availability"}</div>
        
        <div className="text-gray-400">Hours</div>
        <div>{escort.availability?.hours || "Flexible"}</div>
      </div>
    </div>
  );
};

export default AboutTab;
