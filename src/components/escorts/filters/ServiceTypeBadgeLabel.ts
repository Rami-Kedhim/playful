
/**
 * Get a user-friendly name for service type filters
 */
const getServiceTypeName = (type: "in-person" | "virtual" | "both" | ""): string => {
  switch(type) {
    case "in-person": return "In-Person Services Only";
    case "virtual": return "Virtual Services Only";
    case "both": return "Both In-Person & Virtual";
    default: return "";
  }
};

export default getServiceTypeName;
