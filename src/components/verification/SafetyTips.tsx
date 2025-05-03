
import React from "react";

const SafetyTips: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Safety Tips</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Always meet in public places for initial meetings</li>
        <li>Share your location with a trusted friend</li>
        <li>Trust your instincts - if something feels wrong, leave</li>
        <li>Verify identity when possible</li>
        <li>Keep personal information private until trust is established</li>
      </ul>
    </div>
  );
};

export default SafetyTips;
