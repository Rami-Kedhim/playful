
import fs from 'fs';
import path from 'path';

/**
 * Generate missing page files based on the approved list
 */
export function generateMissingPages(approvedPages: string[], pagesDir: string): void {
  // Create the pages directory if it doesn't exist
  if (!fs.existsSync(pagesDir)) {
    fs.mkdirSync(pagesDir, { recursive: true });
  }
  
  // Generate a template page for each approved page that doesn't exist yet
  approvedPages.forEach(page => {
    const filePath = path.join(pagesDir, page);
    
    // Skip if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`Page ${page} already exists`);
      return;
    }
    
    // Generate a simple template page
    const pageName = page.replace('.tsx', '');
    const componentName = pageName
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('') + 'Page';
    
    const template = `import React from 'react';
import { UnifiedLayout } from '@/layouts';

const ${componentName}: React.FC = () => {
  return (
    <UnifiedLayout title="${pageName.charAt(0).toUpperCase() + pageName.slice(1)}" showBreadcrumbs>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">${pageName.charAt(0).toUpperCase() + pageName.slice(1)}</h1>
        <p>This page is coming soon.</p>
      </div>
    </UnifiedLayout>
  );
};

export default ${componentName};
`;
    
    // Write the file
    fs.writeFileSync(filePath, template);
    console.log(`Created page ${page}`);
  });
}

/**
 * Delete unapproved page files
 */
export function deleteUnapprovedPages(approvedPages: string[], pagesDir: string, blockedPaths: string[]): void {
  const approvedPageMap: Record<string, boolean> = {};
  approvedPages.forEach(page => {
    approvedPageMap[page] = true;
  });
  
  // Get all files in the pages directory
  const files = fs.readdirSync(pagesDir);
  
  files.forEach(file => {
    // Skip directories
    const filePath = path.join(pagesDir, file);
    if (fs.statSync(filePath).isDirectory()) {
      // Check if it's a blocked path
      for (const blockedPath of blockedPaths) {
        if (filePath.includes(blockedPath)) {
          fs.rmSync(filePath, { recursive: true });
          console.log(`Removed blocked directory: ${filePath}`);
        }
      }
      return;
    }
    
    // Check if the file is in the approved list
    if (!approvedPageMap[file]) {
      fs.unlinkSync(filePath);
      console.log(`Removed unapproved file: ${file}`);
    }
  });
}
