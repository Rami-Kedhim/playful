import { brainHub } from './HermesOxumBrainHub';
import { toast } from "@/components/ui/use-toast";

// Types for security events and alerts
export type SecuritySeverity = 'info' | 'low' | 'medium' | 'high' | 'critical';

export interface SecurityRule {
  id: string;
  name: string;
  description: string;
  category: 'access' | 'content' | 'system' | 'financial' | 'compliance';
  severity: SecuritySeverity;
  isActive: boolean;
  lastTriggered?: Date;
  triggerCount: number;
}

export interface SecurityAlert {
  id: string;
  ruleId: string;
  timestamp: Date;
  severity: SecuritySeverity;
  message: string;
  data: any;
  resolved: boolean;
  resolvedAt?: Date;
  resolvedBy?: string;
  actions?: string[];
}

export interface ContentFilter {
  id: string;
  type: 'blacklist' | 'whitelist' | 'regex';
  pattern: string;
  category: string;
  action: 'block' | 'flag' | 'warn';
  isActive: boolean;
  description: string;
}

// Main security engine class
class BrainHubSecurityEngine {
  private static instance: BrainHubSecurityEngine;
  private securityRules: Map<string, SecurityRule> = new Map();
  private securityAlerts: SecurityAlert[] = [];
  private contentFilters: ContentFilter[] = [];
  private isMonitoring: boolean = false;
  private monitoringInterval: ReturnType<typeof setInterval> | null = null;
  
  private constructor() {
    this.initializeDefaultRules();
    this.initializeDefaultFilters();
  }
  
  public static getInstance(): BrainHubSecurityEngine {
    if (!BrainHubSecurityEngine.instance) {
      BrainHubSecurityEngine.instance = new BrainHubSecurityEngine();
    }
    return BrainHubSecurityEngine.instance;
  }
  
  private initializeDefaultRules() {
    // Access and authentication rules
    this.addSecurityRule({
      id: 'auth-repeated-failures',
      name: 'Repeated Authentication Failures',
      description: 'Detects multiple failed login attempts in a short period',
      category: 'access',
      severity: 'high',
      isActive: true,
      triggerCount: 0
    });
    
    this.addSecurityRule({
      id: 'auth-unusual-location',
      name: 'Unusual Login Location',
      description: 'Detects logins from previously unseen geographic locations',
      category: 'access',
      severity: 'medium',
      isActive: true,
      triggerCount: 0
    });
    
    // System health and operation rules
    this.addSecurityRule({
      id: 'sys-high-resource',
      name: 'Abnormal Resource Usage',
      description: 'Detects unusually high CPU or memory consumption',
      category: 'system',
      severity: 'medium',
      isActive: true,
      triggerCount: 0
    });
    
    this.addSecurityRule({
      id: 'sys-forced-shutdown',
      name: 'Forced System Shutdown',
      description: 'Detects attempts to force shutdown core services',
      category: 'system',
      severity: 'critical',
      isActive: true,
      triggerCount: 0
    });
    
    // Content and moderation rules
    this.addSecurityRule({
      id: 'content-illegal',
      name: 'Illegal Content Detection',
      description: 'Detects potentially illegal content based on configured filters',
      category: 'content',
      severity: 'critical',
      isActive: true,
      triggerCount: 0
    });
    
    this.addSecurityRule({
      id: 'content-nsfw-unauth',
      name: 'Unauthorized NSFW Access',
      description: 'Detects unauthorized access to age-restricted content',
      category: 'content',
      severity: 'high',
      isActive: true,
      triggerCount: 0
    });
    
    // Financial rules
    this.addSecurityRule({
      id: 'fin-unusual-transaction',
      name: 'Unusual Transaction Pattern',
      description: 'Detects unusual transaction patterns that may indicate fraud',
      category: 'financial',
      severity: 'high',
      isActive: true,
      triggerCount: 0
    });
    
    // Compliance rules
    this.addSecurityRule({
      id: 'compliance-geo-restricted',
      name: 'Geo-Restricted Access',
      description: 'Detects access from geo-restricted regions',
      category: 'compliance',
      severity: 'high',
      isActive: true,
      triggerCount: 0
    });
  }
  
  private initializeDefaultFilters() {
    // Illegal content filters
    this.addContentFilter({
      id: 'illegal-content-1',
      type: 'regex',
      pattern: '(child|minor|underage).*(explicit|nude|pornography)',
      category: 'illegal',
      action: 'block',
      isActive: true,
      description: 'Blocks content related to child exploitation'
    });
    
    // Compliance filters
    this.addContentFilter({
      id: 'compliance-filter-1',
      type: 'blacklist',
      pattern: 'terrorism,bomb-making,weapon',
      category: 'compliance',
      action: 'block',
      isActive: true,
      description: 'Blocks content related to terrorism or illegal weapons'
    });
    
    // NSFW filters
    this.addContentFilter({
      id: 'nsfw-filter-1',
      type: 'regex',
      pattern: '(sex|explicit|adult|xxx).*content',
      category: 'nsfw',
      action: 'flag',
      isActive: true,
      description: 'Flags adult content for verification'
    });
  }
  
  // Start security monitoring
  public startMonitoring(): void {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.monitoringInterval = setInterval(() => this.performSecurityCheck(), 60000);
    
    toast({
      title: "Security Monitoring Activated",
      description: "Brain Hub security monitoring is now active",
    });
    
    // Log this action in Brain Hub
    brainHub.logDecision('security_monitoring_start', {
      timestamp: new Date().toISOString()
    });
  }
  
  // Stop security monitoring
  public stopMonitoring(): void {
    if (!this.isMonitoring) return;
    
    this.isMonitoring = false;
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    
    toast({
      title: "Security Monitoring Deactivated",
      description: "Brain Hub security monitoring has been stopped",
    });
    
    // Log this action in Brain Hub
    brainHub.logDecision('security_monitoring_stop', {
      timestamp: new Date().toISOString()
    });
  }
  
  // Perform a security check
  private performSecurityCheck(): void {
    // This is where we would implement the actual security checks
    // For demonstration purposes, we'll just simulate some checks
    
    // Check system health
    const systemStatus = brainHub.getSystemStatus();
    
    if (systemStatus.cpuUsage > 85) {
      this.triggerAlert('sys-high-resource', {
        message: 'High CPU usage detected',
        data: { cpuUsage: systemStatus.cpuUsage }
      });
    }
    
    if (systemStatus.memoryUsage > 90) {
      this.triggerAlert('sys-high-resource', {
        message: 'High memory usage detected',
        data: { memoryUsage: systemStatus.memoryUsage }
      });
    }
    
    // Check for unusual activity patterns
    const decisions = brainHub.getDecisionLogs(50);
    const decisionsLastMinute = decisions.filter(d => 
      (Date.now() - d.timestamp) < 60000
    ).length;
    
    if (decisionsLastMinute > 30) {
      this.triggerAlert('sys-high-resource', {
        message: 'Unusual activity rate detected',
        data: { decisionsPerMinute: decisionsLastMinute }
      });
    }
    
    // Log the security check
    brainHub.logDecision('security_check_completed', {
      timestamp: new Date().toISOString(),
      alertsTriggered: this.securityAlerts.filter(a => 
        (Date.now() - a.timestamp.getTime()) < 60000
      ).length
    });
  }
  
  // Filter content based on configured filters
  public filterContent(content: string): { 
    allowed: boolean; 
    reasons: { filterId: string, action: string }[] 
  } {
    const result = { allowed: true, reasons: [] };
    
    if (!content) {
      return result;
    }
    
    for (const filter of this.contentFilters) {
      if (!filter.isActive) continue;
      
      let matched = false;
      
      if (filter.type === 'blacklist') {
        const terms = filter.pattern.split(',').map(term => term.trim().toLowerCase());
        matched = terms.some(term => content.toLowerCase().includes(term));
      } else if (filter.type === 'whitelist') {
        const terms = filter.pattern.split(',').map(term => term.trim().toLowerCase());
        matched = !terms.some(term => content.toLowerCase().includes(term));
      } else if (filter.type === 'regex') {
        try {
          const regex = new RegExp(filter.pattern, 'i');
          matched = regex.test(content);
        } catch (e) {
          console.error('Invalid regex pattern in content filter:', filter.pattern);
        }
      }
      
      if (matched) {
        result.reasons.push({ filterId: filter.id, action: filter.action });
        
        if (filter.action === 'block') {
          result.allowed = false;
          
          // Log content blocking
          brainHub.logDecision('content_blocked', {
            timestamp: new Date().toISOString(),
            filterId: filter.id,
            category: filter.category
          });
          
          // If it's a critical filter (e.g. illegal content), trigger an alert
          if (filter.category === 'illegal') {
            this.triggerAlert('content-illegal', {
              message: 'Potentially illegal content detected and blocked',
              data: { filterId: filter.id }
            });
          }
        }
      }
    }
    
    return result;
  }
  
  // Trigger a security alert based on a rule
  private triggerAlert(ruleId: string, options: { message: string, data: any }): void {
    const rule = this.securityRules.get(ruleId);
    
    if (!rule || !rule.isActive) {
      return;
    }
    
    // Update rule stats
    rule.lastTriggered = new Date();
    rule.triggerCount++;
    
    // Create the alert
    const alert: SecurityAlert = {
      id: `alert-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      ruleId,
      timestamp: new Date(),
      severity: rule.severity,
      message: options.message,
      data: options.data,
      resolved: false
    };
    
    // Add to alerts list
    this.securityAlerts.push(alert);
    
    // Keep only the last 1000 alerts
    if (this.securityAlerts.length > 1000) {
      this.securityAlerts = this.securityAlerts.slice(-1000);
    }
    
    // For critical/high severity alerts, show a toast notification
    if (rule.severity === 'critical' || rule.severity === 'high') {
      toast({
        title: `Security Alert: ${rule.name}`,
        description: options.message,
        variant: "destructive"
      });
    }
    
    // Log the alert in Brain Hub
    brainHub.logDecision('security_alert', {
      ruleId,
      severity: rule.severity,
      message: options.message,
      timestamp: new Date().toISOString()
    });
  }
  
  // Add a security rule
  public addSecurityRule(rule: SecurityRule): void {
    this.securityRules.set(rule.id, rule);
  }
  
  // Update a security rule
  public updateSecurityRule(ruleId: string, updates: Partial<SecurityRule>): boolean {
    const rule = this.securityRules.get(ruleId);
    if (!rule) return false;
    
    this.securityRules.set(ruleId, { ...rule, ...updates });
    return true;
  }
  
  // Get all security rules
  public getSecurityRules(): SecurityRule[] {
    return Array.from(this.securityRules.values());
  }
  
  // Add a content filter
  public addContentFilter(filter: ContentFilter): void {
    this.contentFilters.push(filter);
  }
  
  // Update a content filter
  public updateContentFilter(filterId: string, updates: Partial<ContentFilter>): boolean {
    const index = this.contentFilters.findIndex(filter => filter.id === filterId);
    if (index === -1) return false;
    
    this.contentFilters[index] = { ...this.contentFilters[index], ...updates };
    return true;
  }
  
  // Get all content filters
  public getContentFilters(): ContentFilter[] {
    return [...this.contentFilters];
  }
  
  // Get recent alerts
  public getRecentAlerts(count: number = 50): SecurityAlert[] {
    return this.securityAlerts.slice(-count);
  }
  
  // Resolve an alert
  public resolveAlert(alertId: string, resolvedBy: string): boolean {
    const alert = this.securityAlerts.find(a => a.id === alertId);
    if (!alert) return false;
    
    alert.resolved = true;
    alert.resolvedAt = new Date();
    alert.resolvedBy = resolvedBy;
    
    // Log resolution in Brain Hub
    brainHub.logDecision('security_alert_resolved', {
      alertId,
      resolvedBy,
      timestamp: new Date().toISOString()
    });
    
    return true;
  }
  
  // Get monitoring status
  public getMonitoringStatus(): boolean {
    return this.isMonitoring;
  }
  
  // Run a one-time security audit
  public async runSecurityAudit(): Promise<{
    score: number;
    findings: { severity: SecuritySeverity; category: string; message: string }[];
  }> {
    // This would be a comprehensive check of the system
    // For now, we'll return a simulated audit result
    
    const findings = [];
    
    // Check for unresolved critical/high alerts
    const unresolvedCritical = this.securityAlerts.filter(
      a => !a.resolved && (a.severity === 'critical' || a.severity === 'high')
    ).length;
    
    if (unresolvedCritical > 0) {
      findings.push({
        severity: 'high',
        category: 'alerts',
        message: `${unresolvedCritical} unresolved critical/high security alerts`
      });
    }
    
    // Check for disabled essential rules
    const disabledEssential = Array.from(this.securityRules.values()).filter(
      r => !r.isActive && (r.severity === 'critical' || r.severity === 'high')
    ).length;
    
    if (disabledEssential > 0) {
      findings.push({
        severity: 'medium',
        category: 'configuration',
        message: `${disabledEssential} essential security rules are disabled`
      });
    }
    
    // Generate random findings for demonstration
    if (Math.random() > 0.7) {
      findings.push({
        severity: 'low',
        category: 'system',
        message: 'System update available with security patches'
      });
    }
    
    if (Math.random() > 0.9) {
      findings.push({
        severity: 'medium',
        category: 'content',
        message: 'Content filter rules have not been updated in over 30 days'
      });
    }
    
    // Calculate an overall score from 0-100
    const severityWeights = {
      'critical': 40,
      'high': 20,
      'medium': 10,
      'low': 5
    };
    
    let totalDeductions = findings.reduce((sum, finding) => {
      return sum + (severityWeights[finding.severity] || 0);
    }, 0);
    
    const score = Math.max(0, Math.min(100, 100 - totalDeductions));
    
    // Log the audit in Brain Hub
    brainHub.logDecision('security_audit_completed', {
      score,
      findingsCount: findings.length,
      timestamp: new Date().toISOString()
    });
    
    return { score, findings };
  }
}

// Export singleton instance
export const securityEngine = BrainHubSecurityEngine.getInstance();
export default securityEngine;
