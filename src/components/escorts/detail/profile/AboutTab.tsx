
import { Escort } from "@/types/escort";

interface AboutTabProps {
  escort: Escort;
}

const AboutTab = ({ escort }: AboutTabProps) => {
  // Format measurements for display
  const formatMeasurements = (measurements?: { bust?: number, waist?: number, hips?: number }) => {
    if (!measurements) return "Not specified";
    
    const { bust, waist, hips } = measurements;
    if (bust && waist && hips) {
      return `${bust}-${waist}-${hips}`;
    }
    return "Not specified";
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">About Me</h3>
      
      <p className="text-gray-300">
        {escort.description || 
          `I'm a fun-loving, adventurous companion looking for genuine connections. 
          I enjoy both quiet evenings and exciting adventures. Let's create unforgettable 
          memories together in ${escort.location}. I provide high-class companionship services 
          and prioritize discretion and comfort.`
        }
      </p>
      
      <h3 className="text-xl font-semibold mt-6">Personal Details</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-gray-400 text-sm">Age</h4>
          <p>{escort.age} years</p>
        </div>
        
        <div>
          <h4 className="text-gray-400 text-sm">Gender</h4>
          <p className="capitalize">{escort.gender}</p>
        </div>
        
        <div>
          <h4 className="text-gray-400 text-sm">Height</h4>
          <p>{escort.height ? `${escort.height} cm` : "Not specified"}</p>
        </div>
        
        <div>
          <h4 className="text-gray-400 text-sm">Weight</h4>
          <p>{escort.weight ? `${escort.weight} kg` : "Not specified"}</p>
        </div>
        
        <div>
          <h4 className="text-gray-400 text-sm">Measurements</h4>
          <p>{formatMeasurements(escort.measurements)}</p>
        </div>
        
        <div>
          <h4 className="text-gray-400 text-sm">Hair Color</h4>
          <p>{escort.hairColor || "Not specified"}</p>
        </div>
        
        <div>
          <h4 className="text-gray-400 text-sm">Eye Color</h4>
          <p>{escort.eyeColor || "Not specified"}</p>
        </div>
        
        <div>
          <h4 className="text-gray-400 text-sm">Ethnicity</h4>
          <p>{escort.ethnicity || "Not specified"}</p>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mt-6">Languages</h3>
      
      <div className="flex flex-wrap gap-2">
        {escort.languages && escort.languages.length > 0 ? (
          escort.languages.map((language, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-secondary/30 rounded-full text-sm"
            >
              {language}
            </span>
          ))
        ) : (
          <p className="text-gray-400">No languages specified</p>
        )}
      </div>
    </div>
  );
};

export default AboutTab;
