
import { Escort } from "@/types/escort";
import { escorts } from "@/data/escortData";
import { v4 as uuidv4 } from "uuid";

/**
 * Mock escort service for development
 */
class EscortService {
  private escorts: Escort[];

  constructor() {
    this.escorts = [...escorts];
  }

  /**
   * Get all escorts
   */
  async getAllEscorts(): Promise<Escort[]> {
    return Promise.resolve([...this.escorts]);
  }

  /**
   * Get escort by ID
   */
  async getEscortById(id: string): Promise<Escort | null> {
    const escort = this.escorts.find(e => e.id === id) || null;
    return Promise.resolve(escort);
  }

  /**
   * Create new escort profile
   */
  async createEscortProfile(profile: Omit<Escort, "id">): Promise<Escort> {
    const newEscort: Escort = {
      id: uuidv4(),
      ...profile
    };
    
    this.escorts.push(newEscort);
    return Promise.resolve(newEscort);
  }

  /**
   * Update escort profile
   */
  async updateEscortProfile(id: string, updates: Partial<Escort>): Promise<Escort | null> {
    const index = this.escorts.findIndex(e => e.id === id);
    
    if (index === -1) {
      return Promise.resolve(null);
    }
    
    const updatedEscort = {
      ...this.escorts[index],
      ...updates,
      id // Ensure ID doesn't change
    };
    
    this.escorts[index] = updatedEscort;
    return Promise.resolve(updatedEscort);
  }

  /**
   * Delete escort profile
   */
  async deleteEscortProfile(id: string): Promise<boolean> {
    const initialLength = this.escorts.length;
    this.escorts = this.escorts.filter(e => e.id !== id);
    return Promise.resolve(initialLength > this.escorts.length);
  }
}

export const escortService = new EscortService();
