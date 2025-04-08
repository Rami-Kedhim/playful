
import { brainHub } from './HermesOxumBrainHub';

export class BrainHubAutoDevOpsManager {
  private actions: Array<{
    timestamp: number;
    action: string;
    result: string;
    component: string;
  }> = [];
  
  private componentCreations: Array<{
    timestamp: number;
    componentName: string;
    type: string;
    status: string;
  }> = [];
  
  private fileRejections: Array<{
    timestamp: number;
    fileName: string;
    reason: string;
    severity: string;
  }> = [];
  
  // Log a DevOps action
  logAction(action: string, result: string, component: string): void {
    this.actions.push({
      timestamp: Date.now(),
      action,
      result,
      component
    });
    
    brainHub.logDecision(
      'auto_devops',
      `${action} on ${component}: ${result}`,
      0.85,
      'BrainHubAutoDevOpsManager'
    );
  }
  
  // Log component creation
  logComponentCreation(componentName: string, type: string, status: string): void {
    this.componentCreations.push({
      timestamp: Date.now(),
      componentName,
      type,
      status
    });
  }
  
  // Log file rejection
  logFileRejection(fileName: string, reason: string, severity: string): void {
    this.fileRejections.push({
      timestamp: Date.now(),
      fileName,
      reason,
      severity
    });
  }
  
  // Store optimization history in BrainHub memory
  storeOptimizationHistory(historyData: any): void {
    brainHub.storeInMemory('optimization_history', historyData);
  }
  
  // Get action logs
  getActionLogs(): Array<{
    timestamp: number;
    action: string;
    result: string;
    component: string;
  }> {
    return [...this.actions];
  }
  
  // Get component creation logs
  getComponentCreationLogs(): Array<{
    timestamp: number;
    componentName: string;
    type: string;
    status: string;
  }> {
    return [...this.componentCreations];
  }
  
  // Get file rejection logs
  getFileRejectionLogs(): Array<{
    timestamp: number;
    fileName: string;
    reason: string;
    severity: string;
  }> {
    return [...this.fileRejections];
  }
}

export const brainHubAutoDevOpsManager = new BrainHubAutoDevOpsManager();
