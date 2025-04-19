
import { Escort } from "@/types/escort";
import { escorts } from "@/data/escortData";

const getEscorts = async (): Promise<Escort[]> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(escorts);
    }, 500);
  });
};

const getEscortById = async (id: string): Promise<Escort | undefined> => {
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const escort = escorts.find((escort) => escort.id === id);
      resolve(escort);
    }, 500);
  });
};

export const escortService = {
  getEscorts,
  getEscortById,
};
