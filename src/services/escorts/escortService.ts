import { Escort } from "@/types/Escort";
import { mockEscorts } from "@/data/escortData";

const getEscorts = async (): Promise<Escort[]> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEscorts);
    }, 500);
  });
};

const getEscortById = async (id: string): Promise<Escort | undefined> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const escort = mockEscorts.find((escort) => escort.id === id);
      resolve(escort);
    }, 500);
  });
};

export const escortService = {
  getEscorts,
  getEscortById,
};
