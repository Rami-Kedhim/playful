
// Brain Hub Security Engine - Manages security monitoring and threat detection
import { v4 as uuidv4 } from 'uuid';

export interface SecurityAlert {
  id: string;
  timestamp: Date;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  category: string;
  description: string;
  source: string;
  data?: Record<string, any>;
  status: 'new' | 'reviewing' | 'resolved' | 'false_positive';
}

export interface SecurityMetrics {
  totalAlerts: number;
  criticalAlerts: number;
  highAlerts: number;
  mediumAlerts: number;
  lowAlerts: number;
  resolvedAlerts: number;
  threatLevel: number; // 0-100
  lastScanCompleted?: Date;
}

class BrainHubSecurityEngine {
  private alerts: SecurityAlert[] = [];
  private isMonitoring: boolean = false;
  private monitoringInterval: number | null = null;
  private metrics: SecurityMetrics = {
    totalAlerts: 0,
    criticalAlerts: 0,
    highAlerts: 0,
    mediumAlerts: 0,
    lowAlerts: 0,
    resolvedAlerts: 0,
    threatLevel: 0
  };
  
  constructor() {
    this.initializeMetrics();
  }
  
  private initializeMetrics() {
    // In a real implementation, this would load actual security metrics
    this.metrics = {
      totalAlerts: 0,
      criticalAlerts: 0,
      highAlerts: 0,
      mediumAlerts: 0,
      lowAlerts: 0,
      resolvedAlerts: 0,
      threatLevel: Math.floor(Math.random() * 30), // Random initial threat level (0-30)
      lastScanCompleted: new Date()
    };
  }
  
  // Start security monitoring
  startMonitoring(): boolean {
    if (this.isMonitoring) return false;
    
    this.isMonitoring = true;
    console.log('Security monitoring started');
    
    // Simulate periodic security checks
    // In a real implementation, this would run actual security scans and analysis
    this.monitoringInterval = window.setInterval(() => {
      this.generateSecurityEvents();
    }, 60000); // Every minute
    
    return true;
  }
  
  // Stop security monitoring
  stopMonitoring(): boolean {
    if (!this.isMonitoring) return false;
    
    this.isMonitoring = false;
    if (this.monitoringInterval !== null) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    
    console.log('Security monitoring stopped');
    return true;
  }
  
  // Check if monitoring is active
  isMonitoringActive(): boolean {
    return this.isMonitoring;
  }
  
  // Get all security alerts
  getAlerts(filter?: {
    severity?: SecurityAlert['severity'],
    status?: SecurityAlert['status'],
    limit?: number
  }): SecurityAlert[] {
    let filteredAlerts = [...this.alerts];
    
    if (filter?.severity) {
      filteredAlerts = filteredAlerts.filter(a => a.severity === filter.severity);
    }
    
    if (filter?.status) {
      filteredAlerts = filteredAlerts.filter(a => a.status === filter.status);
    }
    
    // Sort by timestamp (newest first)
    filteredAlerts = filteredAlerts.sort((a, b) => 
      b.timestamp.getTime() - a.timestamp.getTime()
    );
    
    if (filter?.limit) {
      filteredAlerts = filteredAlerts.slice(0, filter.limit);
    }
    
    return filteredAlerts;
  }
  
  // Get a specific alert by ID
  getAlert(alertId: string): SecurityAlert | undefined {
    return this.alerts.find(a => a.id === alertId);
  }
  
  // Update alert status
  updateAlertStatus(alertId: string, status: SecurityAlert['status']): boolean {
    const alertIndex = this.alerts.findIndex(a => a.id === alertId);
    if (alertIndex === -1) return false;
    
    this.alerts[alertIndex].status = status;
    
    // Update metrics
    if (status === 'resolved') {
      this.metrics.resolvedAlerts++;
    }
    
    return true;
  }
  
  // Get current security metrics
  getMetrics(): SecurityMetrics {
    return { ...this.metrics };
  }
  
  // Run a security scan
  async runSecurityScan(): Promise<SecurityMetrics> {
    console.log('Running security scan...');
    
    // In a real implementation, this would run actual security scans
    // For demo purposes, we'll simulate a scan with a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update scan timestamp
    this.metrics.lastScanCompleted = new Date();
    
    // Generate some security events from the scan
    this.generateSecurityEvents(true);
    
    return this.getMetrics();
  }
  
  // Add a new security alert
  addAlert(alert: Omit<SecurityAlert, 'id' | 'timestamp' | 'status'>): SecurityAlert {
    const newAlert: SecurityAlert = {
      id: uuidv4(),
      timestamp: new Date(),
      status: 'new',
      ...alert
    };
    
    this.alerts.push(newAlert);
    
    // Update metrics
    this.metrics.totalAlerts++;
    switch (newAlert.severity) {
      case 'critical':
        this.metrics.criticalAlerts++;
        break;
      case 'high':
        this.metrics.highAlerts++;
        break;
      case 'medium':
        this.metrics.mediumAlerts++;
        break;
      case 'low':
        this.metrics.lowAlerts++;
        break;
    }
    
    // Update threat level based on severity of unresolved alerts
    this.recalculateThreatLevel();
    
    return newAlert;
  }
  
  // Private: Recalculate the current threat level
  private recalculateThreatLevel() {
    const unresolvedAlerts = this.alerts.filter(a => 
      a.status !== 'resolved' && a.status !== 'false_positive'
    );
    
    // Calculate threat level based on unresolved alerts
    const criticalCount = unresolvedAlerts.filter(a => a.severity === 'critical').length;
    const highCount = unresolvedAlerts.filter(a => a.severity === 'high').length;
    const mediumCount = unresolvedAlerts.filter(a => a.severity === 'medium').length;
    const lowCount = unresolvedAlerts.filter(a => a.severity === 'low').length;
    
    // Weighted calculation: critical=30, high=10, medium=3, low=1
    const threatScore = (criticalCount * 30) + (highCount * 10) + (mediumCount * 3) + lowCount;
    
    // Cap at 100
    this.metrics.threatLevel = Math.min(100, threatScore);
  }
  
  // Private: Generate simulated security events
  private generateSecurityEvents(isScan: boolean = false) {
    // For demo purposes only - simulates security events
    const shouldGenerateEvent = isScan || Math.random() > 0.7;
    
    if (shouldGenerateEvent) {
      const severities: SecurityAlert['severity'][] = ['critical', 'high', 'medium', 'low', 'info'];
      const categories = [
        'access_control', 'authentication', 'data_validation', 
        'resource_usage', 'unusual_behavior', 'compliance'
      ];
      
      const randomSeverityIndex = Math.floor(Math.random() * (isScan ? 5 : 3.5)); // Higher chance of lower severity
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      
      const descriptions = {
        'access_control': 'Unusual permission elevation detected',
        'authentication': 'Multiple failed authentication attempts',
        'data_validation': 'Potential data corruption detected',
        'resource_usage': 'Resource usage spike detected',
        'unusual_behavior': 'Anomalous system behavior detected',
        'compliance': 'Compliance policy violation detected'
      };
      
      this.addAlert({
        severity: severities[randomSeverityIndex],
        category: randomCategory,
        description: descriptions[randomCategory as keyof typeof descriptions],
        source: isScan ? 'security_scan' : 'runtime_monitor',
        data: {
          timestamp: new Date().toISOString(),
          automated: true,
          scan_initiated: isScan
        }
      });
    }
  }
}

// Singleton instance
const securityEngine = new BrainHubSecurityEngine();

export default securityEngine;
