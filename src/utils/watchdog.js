
// watchdog.js — UberEscorts Ecosystem Enforcement Script

/**
 * This module is the strict validator for the UberEscorts development environment.
 * It enforces architecture compliance, prevents logic fragmentation, and ensures
 * all files are structured under UberCore governance.
 */

const fs = require('fs');
const path = require('path');

// Default rules in case the JSON file is not available
const DEFAULT_RULES = {
  blocked_paths: [
    '/legacy/',
    '/deprecated/',
    '/old-components/',
    '/temp/',
    '/experimental/'
  ],
  approved_pages: [
    'index.tsx',
    'app.tsx',
    'brain-hub.tsx',
    'profile.tsx',
    'wallet.tsx'
  ],
  rules: [
    {
      action: 'enforce',
      modules: [
        'UberCore.ts',
        'Hermes.ts',
        'Oxum.ts',
        'Lucie.ts',
        'Orus.ts',
        'HermesOxumNeuralHub.ts',
        'HermesOrusOxum.ts',
        'neuralHub.ts'
      ]
    }
  ],
  monitoring: {
    log_modifications: true,
    strict_enforcement: true,
  }
};

// Try to load rules file, use defaults if it doesn't exist
function loadRules() {
  try {
    const RULES_PATH = path.join(__dirname, '../../config/uberescorts_rules.json');
    if (fs.existsSync(RULES_PATH)) {
      return JSON.parse(fs.readFileSync(RULES_PATH, 'utf-8'));
    }
    console.warn('[WARN] Rules file not found, using default rules');
    return DEFAULT_RULES;
  } catch (error) {
    console.error('[ERROR] Failed to load rules:', error.message);
    return DEFAULT_RULES;
  }
}

const rules = loadRules();

const ALLOWED_FOLDERS = ['/core/', '/components/', '/pages/', '/services/', '/utils/', '/hooks/'];
const BLOCKED_KEYWORDS = rules.blocked_paths || DEFAULT_RULES.blocked_paths;
const UBERCORE_MODULES = (rules.rules && rules.rules.find(r => r.action === 'enforce')?.modules || 
                         DEFAULT_RULES.rules.find(r => r.action === 'enforce').modules)
                         .map(m => m.replace('.ts', ''));

/**
 * Logs messages with standard formatting
 * @param {string} type - Log category (error, warn, info, monitor)
 * @param {string} msg - Message content
 */
function log(type, msg) {
  const label = type.toUpperCase();
  console.log(`[${label}] ${msg}`);
}

/**
 * Checks if a file is in a blocked path
 * @param {string} filePath - Path to the file
 * @returns {boolean} - True if file path contains blocked keywords
 */
function isFileInBlockedPath(filePath) {
  return BLOCKED_KEYWORDS.some(keyword => filePath.includes(keyword));
}

/**
 * Checks if file is inside valid project structure
 * @param {string} filePath - Path to the file
 * @returns {boolean} - True if file is in an allowed folder
 */
function isInsideValidStructure(filePath) {
  return ALLOWED_FOLDERS.some(folder => filePath.includes(folder));
}

/**
 * Checks if file imports UberCore modules
 * @param {string} content - File content
 * @returns {boolean} - True if content includes UberCore imports
 */
function fileUsesUberCore(content) {
  return UBERCORE_MODULES.some(module => content.includes(module));
}

/**
 * Validates files against UberEscorts architecture rules
 * @param {Object} event - Event with file information
 * @param {string} event.file - Path to the file
 * @param {boolean} [event.strict=false] - Whether to strictly enforce all rules
 * @returns {Object} - Result with validation status and messages
 */
function watchdog(event) {
  const filePath = event.file;
  const fileName = path.basename(filePath);
  const strict = event.strict || rules.monitoring.strict_enforcement || false;
  
  const result = {
    valid: true,
    errors: [],
    warnings: []
  };

  try {
    if (!fs.existsSync(filePath)) {
      log('warn', `Skipped validation: '${filePath}' does not exist.`);
      result.warnings.push(`File '${filePath}' does not exist.`);
      return result;
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    // Rule 1 — Block legacy paths
    if (isFileInBlockedPath(filePath)) {
      const message = `[BLOCKED] '${filePath}' is forbidden. Remove or rename.`;
      if (strict) {
        throw new Error(message);
      }
      log('error', message);
      result.errors.push(message);
      result.valid = false;
    }

    // Rule 2 — Enforce allowed structure
    if (!isInsideValidStructure(filePath)) {
      const message = `[INVALID] '${filePath}' is outside permitted architecture.`;
      if (strict) {
        throw new Error(message);
      }
      log('error', message);
      result.errors.push(message);
      result.valid = false;
    }

    // Rule 3 — Enforce UberCore integration
    // Skip this check for utility files and non-React components
    const skipCoreCheck = ['.css', '.json', '.md', '.svg', '.png', '.jpg', '.test.', '.spec.'].some(ext => 
      filePath.includes(ext)
    );
    
    if (!skipCoreCheck && !fileUsesUberCore(content)) {
      const message = `[REJECTED] '${filePath}' does not import any UberCore module.`;
      if (strict) {
        throw new Error(message);
      }
      log('error', message);
      result.errors.push(message);
      result.valid = false;
    }

    // Rule 4 — Report compliance
    if (rules.monitoring.log_modifications && result.valid) {
      log('monitor', `File '${filePath}' passed all structure and UberCore checks.`);
    }

    return result;
  } catch (error) {
    result.valid = false;
    result.errors.push(error.message);
    console.error(error.message);
    if (strict) {
      throw error;
    }
    return result;
  }
}

// Export for usage in build scripts and CI/CD pipelines
module.exports = { watchdog, DEFAULT_RULES };
