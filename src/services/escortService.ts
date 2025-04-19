import { db } from "@/lib/db";
import { Escort } from "@/types/Escort";

export const getEscorts = async (): Promise<Escort[]> => {
  try {
    const escorts = await db.escort.findMany({
      where: {
        isAI: false
      }
    });
    return escorts;
  } catch {
    return [];
  }
};

export const getEscortById = async (escortId: string): Promise<Escort | null> => {
  try {
    const escort = await db.escort.findUnique({
      where: {
        id: escortId,
        isAI: false
      }
    });
    return escort;
  } catch {
    return null;
  }
};
