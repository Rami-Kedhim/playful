
#!/usr/bin/env node

/**
 * Setup UberEscorts Git Hooks
 *
 * This script sets up Git hooks to enforce UberEscorts architecture guidelines.
 * It creates a pre-commit hook that validates modified files before allowing commits.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const HOOKS_DIR = path.join(PROJECT_ROOT, '.git/hooks');
const PRE_COMMIT_PATH = path.join(HOOKS_DIR, 'pre-commit');

// Make sure hooks directory exists
if (!fs.existsSync(HOOKS_DIR)) {
  console.log('Creating hooks directory...');
  fs.mkdirSync(HOOKS_DIR, { recursive: true });
}

// Content for the pre-commit hook
const preCommitContent = `#!/bin/sh
#
# UberEscorts pre-commit hook
# Validates architecture compliance for modified files

echo "🔍 UberEscorts Architecture Validator"

# Get list of staged files (only .ts, .tsx, .js, .jsx)
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\\.(js|jsx|ts|tsx)$')

if [ -z "$STAGED_FILES" ]; then
  echo "No relevant files to check. Continuing commit..."
  exit 0
fi

# Create temporary file list
TEMP_FILE=$(mktemp)
echo "$STAGED_FILES" > $TEMP_FILE

# Run the validator on staged files
echo "Validating $(echo "$STAGED_FILES" | wc -l | xargs) files..."
node ./scripts/validate-architecture.js $(cat $TEMP_FILE)
RESULT=$?

# Clean up
rm $TEMP_FILE

# Exit with the validator's exit code
if [ $RESULT -ne 0 ]; then
  echo "❌ Architecture validation failed. Commit aborted."
  echo "Run 'node scripts/validate-architecture.js --all' for a full project scan."
  exit 1
else
  echo "✅ Architecture validation passed."
  exit 0
fi
`;

// Write the pre-commit hook
fs.writeFileSync(PRE_COMMIT_PATH, preCommitContent);
fs.chmodSync(PRE_COMMIT_PATH, '755'); // Make it executable

console.log('✅ Git hooks installed successfully!');
console.log('UberEscorts architecture validation is now enabled for pre-commit.');
console.log('\nTo manually run the validator:');
console.log('  node scripts/validate-architecture.js --all');
