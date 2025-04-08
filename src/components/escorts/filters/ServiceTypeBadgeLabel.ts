
/**
 * Get a user-friendly name for service type filters
 */
const getServiceTypeName = (type: "in-person" | "virtual" | "both" | ""): string => {
  switch(type) {
    case "in-person": return "In-Person Services";
    case "virtual": return "Virtual Services";
    case "both": return "All Services";
    default: return "";
  }
};

export default getServiceTypeName;
