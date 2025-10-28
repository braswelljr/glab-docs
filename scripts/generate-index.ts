import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file's directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const components = path.join(__dirname, '../src/components/ui');
const providers = path.join(__dirname, '../src/providers');
const hooks = path.join(__dirname, '../src/hooks');
const indexFp = path.join(__dirname, '../src');

function toForwardSlash(pathStr: string): string {
  return pathStr.replace(/\\/g, '/');
}

function generateIndexFile(dirs: Array<string>, indexFilePath: string) {
  // Filter out directories that don't exist
  const existingDirs = dirs.filter((dir) => fs.existsSync(dir));

  // Get all the folders in the folderPaths
  const folders = existingDirs.map((fp) => {
    try {
      return fs.readdirSync(fp);
    } catch (err) {
      console.error(`Failed to read directory ${fp}:`, err);
      return []; // Return an empty array if the directory cannot be read
    }
  });

  // Get all the files in the folders
  const files = folders.map(
    (folder) =>
      folder
        .filter((file) => file.endsWith('.tsx') || file.endsWith('.ts')) // Only consider TypeScript files
        .map((file) => path.basename(file, path.extname(file))) // Remove the file extension
  );

  // Generate the export statements based on the actual directory structure
  const exportStatements = files.map((file, index) => {
    const currentDir = existingDirs[index];
    if (currentDir) {
      const relativePath = path.relative(indexFilePath, currentDir); // Get relative path from index.ts file to current folder
      const relativePathWithForwardSlash = toForwardSlash(relativePath); // Replace backslashes with forward slashes
      const stmt = file.map((componentName) => `export * from './${toForwardSlash(path.join(relativePathWithForwardSlash, componentName))}';`);
      return `// ${path.basename(currentDir)}\n${stmt.join('\n')}`;
    }
    return ''; // Or some other appropriate fallback if currentDir is undefined
  });

  // Generate the index.ts file content
  const indexFileContent = "'use client';\n\n" + exportStatements.filter((stmt) => stmt !== '').join('\n\n') + '\n';

  // Write the index.ts file
  fs.writeFileSync(path.join(indexFilePath, 'index.ts'), indexFileContent, 'utf8');

  console.log('\x1b[32m%s\x1b[0m', 'index.ts file generated successfully.');
}

generateIndexFile([components, providers, hooks], indexFp);
