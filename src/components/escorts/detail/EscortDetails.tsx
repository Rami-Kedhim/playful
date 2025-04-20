
import { Escort } from "@/types/Escort";

import { Card, CardContent } from "@/components/ui/card";

interface EscortDetailsProps {
  escort: Escort;
}

const EscortDetails = ({ escort }: EscortDetailsProps) => {
  // Fake data as fallback if properties are missing
  const details = {
    height: escort.height ? String(escort.height) : "Not specified",
    weight: escort.weight ? String(escort.weight) : "Not specified",
    measurements: escort.measurements || "N/A",
    languages: escort.languages || [],
    available: "Monday to Friday",
    hairColor: escort.hairColor || "Not specified",
    eyeColor: escort.eyeColor || "Not specified",
    ethnicity: escort.ethnicity || "Not specified",
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <div className="text-gray-400">Age</div>
          <div>{escort.age ?? "Not specified"}</div>

          <div className="text-gray-400">Gender</div>
          <div className="capitalize">{escort.gender ?? "Not specified"}</div>

          <div className="text-gray-400">Sexual Orientation</div>
          <div className="capitalize">{escort.sexualOrientation ?? "Not specified"}</div>

          <div className="text-gray-400">Height</div>
          <div>{details.height}</div>

          <div className="text-gray-400">Weight</div>
          <div>{details.weight}</div>

          <div className="text-gray-400">Measurements</div>
          <div>{details.measurements}</div>

          <div className="text-gray-400">Hair Color</div>
          <div>{details.hairColor}</div>

          <div className="text-gray-400">Eye Color</div>
          <div>{details.eyeColor}</div>

          <div className="text-gray-400">Ethnicity</div>
          <div>{details.ethnicity}</div>

          <div className="text-gray-400">Languages</div>
          <div>{details.languages.join(", ")}</div>

          <div className="text-gray-400">Availability</div>
          <div>{details.available}</div>
        </div>

        <h3 className="font-semibold mt-6 mb-2">About Me</h3>
        <p className="text-sm text-gray-300">
          {escort.description ??
            `I'm a fun-loving, adventurous companion looking for genuine connections. 
          I enjoy both quiet evenings and exciting adventures. Let's create unforgettable 
          memories together in ${escort.location ?? "your city"}. I provide high-class companionship services 
          and prioritize discretion and comfort.`}
        </p>
      </CardContent>
    </Card>
  );
};

export default EscortDetails;
