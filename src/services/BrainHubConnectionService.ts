
import { brainHub } from "./neural/HermesOxumBrainHub";

/**
 * Brain Hub Connection Service - A central utility to connect components 
 * through the Neural Brain Hub infrastructure
 */
export class BrainHubConnectionService {
  private static instance: BrainHubConnectionService;
  private connectedComponents: Set<string> = new Set();
  
  private constructor() {
    console.log("Brain Hub Connection Service initialized");
  }
  
  public static getInstance(): BrainHubConnectionService {
    if (!BrainHubConnectionService.instance) {
      BrainHubConnectionService.instance = new BrainHubConnectionService();
    }
    return BrainHubConnectionService.instance;
  }
  
  /**
   * Connects a component to the Brain Hub
   * @param componentId Unique identifier for the component
   * @returns Connection success status
   */
  public connectComponent(componentId: string): boolean {
    if (this.connectedComponents.has(componentId)) {
      console.log(`Component ${componentId} is already connected`);
      return false;
    }
    
    console.log(`Connecting component ${componentId} to Brain Hub`);
    this.connectedComponents.add(componentId);
    
    // Register component with Brain Hub
    brainHub.processRequest({
      type: "register_component",
      data: { componentId },
      filters: {
        geoRestrictions: false
      }
    });
    
    return true;
  }
  
  /**
   * Disconnects a component from the Brain Hub
   * @param componentId Unique identifier for the component
   */
  public disconnectComponent(componentId: string): boolean {
    if (!this.connectedComponents.has(componentId)) {
      console.log(`Component ${componentId} is not connected`);
      return false;
    }
    
    console.log(`Disconnecting component ${componentId} from Brain Hub`);
    this.connectedComponents.delete(componentId);
    
    // Unregister component with Brain Hub
    brainHub.processRequest({
      type: "unregister_component",
      data: { componentId }
    });
    
    return true;
  }
  
  /**
   * Synchronizes data between components via the Brain Hub
   * @param sourceComponentId Source component ID
   * @param targetComponentId Target component ID
   * @param data Data to synchronize
   */
  public synchronizeComponents(sourceComponentId: string, targetComponentId: string, data: any): boolean {
    if (!this.connectedComponents.has(sourceComponentId) || !this.connectedComponents.has(targetComponentId)) {
      console.log(`Cannot synchronize: one or both components are not connected`);
      return false;
    }
    
    console.log(`Synchronizing data from ${sourceComponentId} to ${targetComponentId}`);
    
    // Process synchronization through Brain Hub
    brainHub.processRequest({
      type: "sync_components",
      data: {
        sourceComponentId,
        targetComponentId,
        payload: data
      }
    });
    
    return true;
  }
  
  /**
   * Get all connected components
   * @returns Array of connected component IDs
   */
  public getConnectedComponents(): string[] {
    return Array.from(this.connectedComponents);
  }
}

export const brainHubConnection = BrainHubConnectionService.getInstance();
export default brainHubConnection;
