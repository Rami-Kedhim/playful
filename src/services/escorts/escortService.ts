
// Fix import path casing for Escort to all lowercase

import { Escort } from '@/types/escort';
import { db } from '@/lib/db';

const getEscorts = async (): Promise<Escort[]> => {
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

const getEscortById = async (escortId: string): Promise<Escort | null> => {
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

export default {
  getEscorts,
  getEscortById,
};
