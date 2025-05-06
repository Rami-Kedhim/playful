
import { BaseNeuralService } from '@/services/neural/types/NeuralService';

// Define types for reporting
export interface ServiceReport {
  id: string;
  name: string;
  moduleType: string;
  metrics: Record<string, number>;
  status: 'active' | 'inactive' | 'error' | 'maintenance';
  health: number; // 0-100 health score
  lastUpdated: Date;
}

export interface SystemReport {
  timestamp: Date;
  overallHealth: number;
  services: ServiceReport[];
}

export interface ReportGenerationOptions {
  includeLogs?: boolean;
  includeHistory?: boolean;
  timeframe?: 'hour' | 'day' | 'week';
}

class NeuralReporterService {
  private serviceCache: BaseNeuralService[] = [];
  private reportHistory: SystemReport[] = [];
  private maximumReportHistory: number = 24; // Store 24 reports max

  constructor() {
    // Initialize the reporting service
    console.log('Neural Reporter Service initialized');
  }
  
  // Register services for reporting
  public registerServices(services: BaseNeuralService[]): void {
    // Only accept services that have all the required methods
    this.serviceCache = services.filter(service => 
      service.getMetrics && 
      service.initialize && 
      service.updateConfig && 
      service.getCapabilities &&
      service.processRequest && 
      service.canHandleRequestType
    );
    console.log(`Registered ${this.serviceCache.length} services for reporting`);
  }
  
  // Generate a report on the current system state
  public generateReport(options: ReportGenerationOptions = {}): SystemReport {
    const report: SystemReport = {
      timestamp: new Date(),
      overallHealth: 0,
      services: []
    };
    
    // If we have services, collect their metrics
    if (this.serviceCache.length > 0) {
      let totalHealth = 0;
      
      this.serviceCache.forEach(service => {
        const metrics = service.getMetrics();
        
        // Calculate health score (0-100) based on metrics
        // This would be more sophisticated in a real system
        const errorRate = metrics.errorRate || 0;
        const responseTime = metrics.responseTime || metrics.latency || 100;
        const health = Math.max(0, 100 - (errorRate * 1000) - (responseTime / 10));
        
        totalHealth += health;
        
        report.services.push({
          id: service.id,
          name: service.name,
          moduleType: service.moduleType,
          metrics: metrics,
          status: service.status,
          health: health,
          lastUpdated: new Date()
        });
      });
      
      // Calculate overall health as an average
      report.overallHealth = totalHealth / this.serviceCache.length;
    } else {
      // If no registered services, use mock data
      report.overallHealth = 85 + (Math.random() * 10 - 5); // 80-95%
      
      // Add a mock service report
      report.services.push({
        id: 'mock-service',
        name: 'Mock Neural Service',
        moduleType: 'core',
        metrics: {
          requestsProcessed: 1200,
          errorRate: 0.02,
          latency: 120,
          memoryUsage: 512
        },
        status: 'active',
        health: report.overallHealth,
        lastUpdated: new Date()
      });
    }
    
    // Add to history, removing old reports if necessary
    this.reportHistory.unshift(report);
    if (this.reportHistory.length > this.maximumReportHistory) {
      this.reportHistory = this.reportHistory.slice(0, this.maximumReportHistory);
    }
    
    return report;
  }
  
  // Get historical reports
  public getReportHistory(count: number = 10): SystemReport[] {
    return this.reportHistory.slice(0, count);
  }
  
  // Add a custom service report
  public addCustomReport(serviceReport: ServiceReport): void {
    const existingReport = this.reportHistory[0] || {
      timestamp: new Date(),
      overallHealth: 0,
      services: []
    };
    
    // Add the service report to the most recent report
    const updatedReport = {
      ...existingReport,
      services: [
        ...existingReport.services.filter(s => s.id !== serviceReport.id),
        serviceReport
      ]
    };
    
    // Recalculate overall health
    updatedReport.overallHealth = updatedReport.services.reduce(
      (sum, service) => sum + service.health, 
      0
    ) / updatedReport.services.length;
    
    // Add to history
    this.reportHistory[0] = updatedReport;
  }
}

// Create and export singleton instance
export const neuralReporter = new NeuralReporterService();
export default neuralReporter;
