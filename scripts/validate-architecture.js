
#!/usr/bin/env node

/**
 * UberEscorts Architecture Validator
 * 
 * This script validates files against UberEscorts architecture guidelines.
 * Usage:
 *   - Check a single file: node validate-architecture.js path/to/file.tsx
 *   - Check multiple files: node validate-architecture.js path/to/file1.tsx path/to/file2.tsx
 *   - Check all TypeScript files: node validate-architecture.js --all
 */

const fs = require('fs');
const path = require('path');
const { watchdog } = require('../src/utils/watchdog');
const glob = require('glob');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(PROJECT_ROOT, 'src');

// Colorize console output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m"
};

// Helper for colored output
function colorLog(color, text) {
  console.log(`${colors[color]}${text}${colors.reset}`);
}

// Summary tracking variables
let totalFiles = 0;
let passedFiles = 0;
let failedFiles = 0;
let warnedFiles = 0;

/**
 * Validates a single file
 * @param {string} filePath - Path to file
 * @param {boolean} [strict=false] - Enforce strict validation
 */
function validateFile(filePath, strict = false) {
  const fullPath = path.resolve(filePath);
  const relativePath = path.relative(PROJECT_ROOT, fullPath);
  
  totalFiles++;
  
  try {
    const result = watchdog({ file: fullPath, strict });
    
    if (result.valid) {
      passedFiles++;
      colorLog("green", `✓ PASSED: ${relativePath}`);
    } else {
      failedFiles++;
      colorLog("red", `✗ FAILED: ${relativePath}`);
      result.errors.forEach(error => {
        colorLog("yellow", `  - ${error}`);
      });
    }
    
    if (result.warnings && result.warnings.length > 0) {
      warnedFiles++;
      result.warnings.forEach(warning => {
        colorLog("yellow", `  ! ${warning}`);
      });
    }
  } catch (error) {
    failedFiles++;
    colorLog("red", `✗ ERROR: ${relativePath}`);
    colorLog("red", `  - ${error.message}`);
  }
}

/**
 * Validates all TypeScript/JavaScript files in the src directory
 */
function validateAllFiles() {
  const files = glob.sync('src/**/*.{ts,tsx,js,jsx}', { cwd: PROJECT_ROOT });
  
  colorLog("blue", `\nValidating ${files.length} files against UberEscorts architecture rules...\n`);
  
  files.forEach(file => {
    validateFile(path.join(PROJECT_ROOT, file));
  });
  
  printSummary();
}

/**
 * Prints validation summary
 */
function printSummary() {
  colorLog("cyan", "\n=== Validation Summary ===");
  colorLog("white", `Total Files: ${totalFiles}`);
  colorLog("green", `Passed: ${passedFiles}`);
  colorLog("red", `Failed: ${failedFiles}`);
  colorLog("yellow", `With Warnings: ${warnedFiles}`);
  
  if (failedFiles > 0) {
    colorLog("red", "\n⚠️ Some files do not comply with UberEscorts architecture guidelines!");
    process.exit(1);
  } else {
    colorLog("green", "\n✅ All files comply with UberEscorts architecture guidelines!");
    process.exit(0);
  }
}

// Process command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  colorLog("yellow", "\nNo files specified! Usage:");
  colorLog("white", "  - Check a single file: node validate-architecture.js path/to/file.tsx");
  colorLog("white", "  - Check multiple files: node validate-architecture.js path/to/file1.tsx path/to/file2.tsx");
  colorLog("white", "  - Check all TypeScript files: node validate-architecture.js --all\n");
  process.exit(1);
}

if (args.includes('--all')) {
  validateAllFiles();
} else {
  colorLog("blue", `\nValidating ${args.length} files against UberEscorts architecture rules...\n`);
  args.forEach(filePath => {
    validateFile(filePath);
  });
  printSummary();
}
