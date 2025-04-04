
export const getServiceTypeName = (type: string): string => {
  switch(type) {
    case "in-person": return "In-Person Services";
    case "virtual": return "Virtual Content";
    case "both": return "In-Person & Virtual";
    default: return "";
  }
};

export default getServiceTypeName;
