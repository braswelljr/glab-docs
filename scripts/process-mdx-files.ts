#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { toTsObject } from './utils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MARKDOWN_EXTS = new Set(['.md', '.mdx']);

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type RenameResult = {
  renamed: string[];
  updated: string[];
  processed: string[];
  cleanedDirs: string[];
  errors: string[];
};

type FileNode = {
  name: string;
  path: string;
  href: string;
  children?: FileNode[];
};

type ProcessOptions = {
  generateFileTree?: boolean;
  fileTreeOutput?: string;
  cleanEmptyDirs?: boolean;
};

/* -------------------------------------------------------------------------- */
/*                               Helper Functions                             */
/* -------------------------------------------------------------------------- */

const isMarkdownFile = (file: string) => MARKDOWN_EXTS.has(path.extname(file).toLowerCase());

const safeReadDir = (dir: string) => {
  try {
    return fs.readdirSync(dir);
  } catch {
    return [];
  }
};

const safeStat = (fp: string) => {
  try {
    return fs.statSync(fp);
  } catch {
    return null;
  }
};

/**
 * Check if a directory is empty (ignoring certain files)
 */
function isEmptyDirectory(dir: string, ignoreFiles: string[] = ['.DS_Store', 'Thumbs.db']): boolean {
  try {
    const entries = fs.readdirSync(dir);
    const filteredEntries = entries.filter((entry) => !ignoreFiles.includes(entry));
    return filteredEntries.length === 0;
  } catch {
    return false;
  }
}

/**
 * Recursively remove empty directories
 */
function removeEmptyDirectories(dir: string, baseDir: string, result: RenameResult): void {
  const entries = safeReadDir(dir);

  // First, recursively process subdirectories
  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry);
    const stat = safeStat(fullPath);
    if (stat?.isDirectory()) {
      removeEmptyDirectories(fullPath, baseDir, result);
    }
  });

  // Check if current directory is empty (after processing subdirectories)
  if (isEmptyDirectory(dir) && dir !== baseDir) {
    try {
      fs.rmdirSync(dir);
      result.cleanedDirs.push(dir);
      console.log(`🧹 Removed empty directory: ${path.relative(baseDir, dir)}`);
    } catch (error) {
      result.errors.push(`❌ Failed to remove empty directory ${dir}: ${(error as Error).message}`);
    }
  }
}

/**
 * Format a human-readable name from a file or folder path.
 * - Removes underscores/dashes
 * - Capitalizes words
 * - Uses the parent folder name if the file is `index` or `page`
 */
export function formatName(rawName: string, parentPath?: string, generatedDir?: string): string {
  let base = rawName
    .replace(/^_+/, '') // remove leading underscores
    .replace(/\.[^.]+$/, '') // remove extension
    .trim();

  // Use the generated directory name ONLY for the root index file
  if (/^(index|page)$/i.test(base)) {
    // Check if this is the root index file (no parent path)
    const isRootIndex = !parentPath || parentPath === '' || parentPath === '.';

    if (isRootIndex && generatedDir) {
      // Root index: use generated directory name (e.g., "Docs", "Blog")
      base = path.basename(generatedDir);
    } else if (parentPath) {
      // Nested index: use the immediate parent directory name
      base = path.basename(parentPath);
    }
  }

  // Clean up and title case
  const name = base.replace(/^_+/, '').replace(/[-_]+/g, ' ').trim();

  return name
    ? name
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Untitled';
}

/** Normalize href for output */
/**
 * Normalize href for output with support for index.md files
 */
export function normalizeHref(fp: string, baseDir: string, generatedDir: string): string {
  // Get absolute paths for consistent comparison
  const absBaseDir = path.resolve(baseDir);
  const absGeneratedDir = path.resolve(generatedDir);
  const absFilePath = path.resolve(fp);

  // Get relative path from base directory to the file
  const relFromBase = path.relative(absBaseDir, absFilePath).replace(/\\/g, '/');

  // Get the base name of the generated directory (e.g., 'docs' or 'blog')
  const generatedBaseName = path.basename(absGeneratedDir);

  let href = '';

  // Always use the generated base name as the root
  if (relFromBase === 'index.md' || relFromBase === '') {
    // This is the root index file
    href = '/' + generatedBaseName;
  } else {
    // Build path as: /{generatedBaseName}/{relative-path-from-base}
    href = '/' + path.join(generatedBaseName, relFromBase).replace(/\\/g, '/');
  }

  // Apply cleaning rules
  href = href
    .replace(/\/_+/g, '/') // remove leading underscores
    .replace(/\.mdx?$/i, '') // strip .md/.mdx
    .replace(/\/(index|page)$/i, '') // remove trailing index/page
    .replace(/([^:]\/)\/+/g, '$1'); // collapse duplicate slashes

  // Special handling for index.md files - they become the directory index
  if (path.basename(fp) === 'index.md') {
    href = href.replace(/\/index$/, '');
  }

  // Remove trailing slash (except for root)
  if (href.length > 1 && href.endsWith('/')) href = href.slice(0, -1);

  return href;
}

/* -------------------------------------------------------------------------- */
/*                           Markdown File Handlers                           */
/* -------------------------------------------------------------------------- */

function handleRename(filePath: string, _baseDir: string, _generatedDir: string, result: RenameResult) {
  const fileName = path.basename(filePath);
  if (!isMarkdownFile(fileName)) return;

  const dir = path.dirname(filePath);

  // Handle _index.md → index.md
  if (fileName === '_index.md') {
    const newPath = path.join(dir, 'index.md');

    // If index.md already exists, skip renaming and keep _index.md
    if (fs.existsSync(newPath)) {
      result.errors.push(`⚠️ Skipped renaming "${fileName}" in ${dir} — "index.md" already exists (maintaining both).`);
      result.processed.push(filePath);
      console.log(`⚠️ Kept both: index.md and _index.md in ${dir}`);
      return;
    }

    // Otherwise, safe to rename
    try {
      fs.renameSync(filePath, newPath);
      result.renamed.push(`${filePath} → ${newPath}`);
      result.processed.push(newPath);
      console.log(`📁 Renamed: ${fileName} → ${path.basename(newPath)}`);
    } catch (error) {
      result.errors.push(`❌ Failed to rename ${filePath}: ${(error as Error).message}`);
    }

    return;
  }

  // Handle other files starting with underscore
  if (!fileName.startsWith('_')) return;

  const newPath = path.join(dir, fileName.slice(1));

  try {
    if (fs.existsSync(newPath)) {
      result.errors.push(`⚠️ Skipped (exists): ${newPath}`);
      return;
    }

    fs.renameSync(filePath, newPath);
    result.renamed.push(`${filePath} → ${newPath}`);
    result.processed.push(newPath);
    console.log(`📁 Renamed: ${fileName} → ${path.basename(newPath)}`);
  } catch (error) {
    result.errors.push(`❌ Failed to rename ${filePath}: ${(error as Error).message}`);
  }
}

function handleLinkUpdate(filePath: string, baseDir: string, generatedDir: string, result: RenameResult) {
  if (!isMarkdownFile(filePath)) return;

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const updated = transformMarkdownLinks(content, baseDir, generatedDir, filePath);

    if (updated !== content) {
      fs.writeFileSync(filePath, updated, 'utf8');
      result.updated.push(filePath);
      result.processed.push(filePath);
      console.log(`🔗 Updated links in: ${filePath}`);
    } else {
      result.processed.push(filePath);
    }
  } catch (error) {
    result.errors.push(`❌ Failed to update links in ${filePath}: ${(error as Error).message}`);
  }
}

type CodeBlockMatch = {
  fullMatch: string;
  language: string;
  codeBody: string;
};

function findCodeBlocks(content: string): CodeBlockMatch[] {
  const codeBlockRegex = /```(console|plaintext|bash)\n([\s\S]*?)```/g;
  const matches: CodeBlockMatch[] = [];
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    matches.push({
      fullMatch: match[0],
      language: match[1],
      codeBody: match[2]
    });
  }

  return matches;
}

/**
 * Transforms code blocks of ```console``` or ```plaintext``` or ```shell``` into ```bash twoslash
 * and replaces:
 *  - `$` lines = commands
 *  - `>` lines = expands/results
 */
function transformConsoleBlocks(content: string): string {
  const blocks = findCodeBlocks(content);
  let transformedContent = content;

  blocks.forEach((block: CodeBlockMatch) => {
    const transformedLines = block.codeBody
      .split('\n')
      .map((line: string): string => {
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith('$')) {
          return `${line.replace(/^\$\s?/, '').trim()}\n`;
        }

        if (trimmedLine.startsWith('>')) {
          const text = line.replace(/^>\s?/, '').trim();
          return `# :-> ${text}\n\n`;
        }

        return line;
      })
      .filter((line: string) => line.length > 1)
      .join('\n')
      .trimEnd();

    const replacement = `\`\`\`bash twoslash title="Terminal"\n${transformedLines}\n\`\`\``;
    transformedContent = transformedContent.replace(block.fullMatch, replacement);
  });

  return transformedContent;
}

export function updateConsoleToBashCode(filePath: string, _baseDir: string, _generatedDir: string, result: RenameResult) {
  if (!isMarkdownFile(filePath)) return;

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const updated = transformConsoleBlocks(content);

    if (updated !== content) {
      fs.writeFileSync(filePath, updated, 'utf8');
      result.updated.push(filePath);
      result.processed.push(filePath);
      console.log(`💻 Updated console blocks in: ${filePath}`);
    } else {
      result.processed.push(filePath);
    }
  } catch (error) {
    result.errors.push(`❌ Failed to update console blocks in ${filePath}: ${(error as Error).message}`);
  }
}

/** Apply markdown link cleaning rules */
function transformMarkdownLinks(content: string, baseDir: string, generatedDir: string, currentFilePath: string): string {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  return content.replace(linkRegex, (match, text, url) => {
    if (/^(https?:|#|mailto:)/.test(url)) return match;

    // Get the base name of the generated directory (e.g., 'docs' or 'blog')
    const generatedBaseName = path.basename(path.resolve(generatedDir));

    let newUrl = url;

    // Handle relative paths by converting them to absolute paths first
    if (!url.startsWith('/')) {
      // Convert relative link to absolute path based on current file location
      const currentFileDir = path.dirname(currentFilePath);
      const absoluteLinkPath = path.resolve(currentFileDir, url);

      // Get relative path from base directory to the linked file
      const relFromBase = path.relative(baseDir, absoluteLinkPath).replace(/\\/g, '/');

      // Build href using the same logic as normalizeHref
      if (relFromBase === 'index.md' || relFromBase === '') {
        newUrl = '/' + generatedBaseName;
      } else {
        newUrl = '/' + path.join(generatedBaseName, relFromBase).replace(/\\/g, '/');
      }
    } else {
      // For absolute paths, apply the same cleaning rules as normalizeHref
      newUrl = url
        .replace(/\/_+/g, '/') // remove leading underscores
        .replace(/\.mdx?$/i, '') // strip .md/.mdx
        .replace(/\/(index|page)$/i, '') // remove trailing index/page
        .replace(/([^:]\/)\/+/g, '$1'); // collapse duplicate slashes
    }

    // Apply the same cleaning rules as normalizeHref
    newUrl = newUrl
      .replace(/\/_+/g, '/') // remove leading underscores
      .replace(/\.mdx?$/i, '') // strip .md/.mdx
      .replace(/\/(index|page)$/i, '') // remove trailing index/page
      .replace(/([^:]\/)\/+/g, '$1'); // collapse duplicate slashes

    // Special handling for index.md files - they become the directory index
    if (url.endsWith('index.md') || url.endsWith('_index.md')) {
      newUrl = newUrl.replace(/\/index$/, '');
    }

    // Remove trailing slash (except for root)
    if (newUrl.length > 1 && newUrl.endsWith('/')) newUrl = newUrl.slice(0, -1);

    return newUrl !== url ? `[${text}](${newUrl})` : match;
  });
}

/* -------------------------------------------------------------------------- */
/*                           Directory Traversal                              */
/* -------------------------------------------------------------------------- */

function processDirectory(
  dir: string,
  baseDir: string,
  generatedDir: string,
  action: (fp: string, bd: string, gd: string, r: RenameResult) => void,
  result: RenameResult
) {
  for (const entry of safeReadDir(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = safeStat(fullPath);
    if (!stat) continue;

    if (stat.isDirectory()) {
      processDirectory(fullPath, baseDir, generatedDir, action, result);
    } else if (stat.isFile()) {
      action(fullPath, baseDir, generatedDir, result);
    }
  }
}

/* -------------------------------------------------------------------------- */
/*                           File Tree Generation                             */
/* -------------------------------------------------------------------------- */

/**
 * Builds a hierarchical file tree from a list of file paths.
 * Automatically promotes `index.md` as the parent if it exists in a folder.
 */
export function buildFileTreeFromPaths(filePaths: string[], baseDir: string, generatedDir: string): FileNode[] {
  const tree: FileNode[] = [];

  filePaths.forEach((fp) => {
    const relativePath = path.relative(baseDir, fp).replace(/\\/g, '/');
    const parts = relativePath.split('/');
    let currentLevel = tree;
    let accumulatedPath = '';

    parts.forEach((part, index) => {
      accumulatedPath = path.join(accumulatedPath, part).replace(/\\/g, '/');
      const parentPath = parts.slice(0, index).join('/') || '';

      // 🔍 Try to find an existing node
      let node = currentLevel.find((n) => n.path === accumulatedPath);

      // 🌿 Create node if missing
      if (!node) {
        // Use the FULL file path for href calculation, not just accumulatedPath
        const fullPathForHref = path.join(baseDir, accumulatedPath);
        node = {
          name: formatName(part, parentPath, generatedDir),
          path: accumulatedPath,
          href: normalizeHref(fullPathForHref, baseDir, generatedDir), // Pass full path
          children: []
        };
        currentLevel.push(node);
      }

      // 🌲 If not the last part, go deeper
      if (index < parts.length - 1 && node.children) {
        currentLevel = node.children;
      }
    });
  });

  /**
   * Post-process the tree to promote `index.md` files.
   * Replaces parent folder nodes with their index.md files when they have matching hrefs.
   */
  const promoteIndex = (nodes: FileNode[]): FileNode[] => {
    return nodes.map((branch) => {
      if (Array.isArray(branch.children) && branch.children.length) {
        // First, recursively process children
        const processedChildren = promoteIndex(branch.children);

        // Find a child that has the same href as the parent branch
        const matchingChild = processedChildren.find((b) => branch.href === b.href);

        if (matchingChild) {
          // Get all other children excluding the matching one
          const otherChildren = processedChildren.filter((b) => b !== matchingChild);

          return {
            name: matchingChild.name,
            href: matchingChild.href,
            path: matchingChild.path,
            children: [...(matchingChild.children || []), ...otherChildren]
          };
        } else {
          // No matching child found, return branch with processed children
          return {
            ...branch,
            children: processedChildren
          };
        }
      }

      return branch;
    });
  };

  // Call promoteIndex on the tree and return the result
  return promoteIndex(tree);
}

/** Write the generated file tree as a TS module */
export function writeFileTreeTs(tree: FileNode[] | FileNode, outputPath: string) {
  const data = Array.isArray(tree) ? tree : [tree];

  // 🧠 Serialize to TypeScript literal using your helper
  const serialized = toTsObject(data, 2);

  // 🧾 Generate full TypeScript content
  const tsContent = `// Auto-generated file tree. Do not edit manually.
// Generated on ${new Date().toISOString()}

export const fileTree = ${serialized} as const;

export type FileTree = typeof fileTree;
`;

  // 📝 Ensure directory exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, tsContent, 'utf8');

  console.log(`🌲 File tree written to: ${outputPath}`);
}

/* -------------------------------------------------------------------------- */
/*                                   Main                                     */
/* -------------------------------------------------------------------------- */

export async function cleanMarkdownFiles(rootDir: string, generatedDir?: string, options: ProcessOptions = {}): Promise<RenameResult> {
  const result: RenameResult = {
    renamed: [],
    updated: [],
    processed: [],
    cleanedDirs: [],
    errors: []
  };

  // Use rootDir as baseDir and generatedDir, or provided generatedDir
  const baseDir = rootDir;
  const finalGeneratedDir = generatedDir || rootDir;

  try {
    // Step 1: Process files (rename, update links, transform code blocks)
    processDirectory(rootDir, baseDir, finalGeneratedDir, handleRename, result);
    processDirectory(rootDir, baseDir, finalGeneratedDir, handleLinkUpdate, result);
    processDirectory(rootDir, baseDir, finalGeneratedDir, updateConsoleToBashCode, result);

    // Step 2: Clean empty directories (if enabled)
    if (options.cleanEmptyDirs !== false) {
      console.log('🧹 Cleaning empty directories...');
      removeEmptyDirectories(rootDir, baseDir, result);
    }

    console.log(
      `✅ Cleaned ${result.processed.length} files (${result.renamed.length} renamed, ${result.updated.length} links updated, ${result.cleanedDirs.length} empty directories removed).`
    );
  } catch (error) {
    result.errors.push(`Fatal: ${(error as Error).message}`);
  }

  return result;
}

type GeneratorDir =
  | {
      /** Base directory to read from */
      base: string;
      /** Optional separate directory to write generated files */
      generated?: string;
    }
  | string;

export async function main(
  dirs: GeneratorDir[],
  options: ProcessOptions = {
    generateFileTree: true,
    fileTreeOutput: 'index.ts',
    cleanEmptyDirs: true
  }
) {
  // Normalize directory entries
  const normalizedDirs = dirs.map((dir) =>
    typeof dir === 'string' ? { base: dir, generated: dir } : { base: dir.base, generated: dir.generated ?? dir.base }
  );

  // Validate base directories
  const validDirs = normalizedDirs.filter((d) => fs.existsSync(d.base));
  if (!validDirs.length) {
    console.error('❌ No valid directories found.');
    return;
  }

  const allProcessedPaths: string[] = [];

  // 🧩 Step 1: Clean markdown files (including empty directory removal)
  for (const dir of validDirs) {
    const result = await cleanMarkdownFiles(dir.base, dir.generated, options);
    if (Array.isArray(result.processed)) {
      allProcessedPaths.push(...result.processed);
    }
  }

  // 🌲 Step 2: Generate file trees
  if (options.generateFileTree && allProcessedPaths.length) {
    await Promise.all(
      validDirs.map(async ({ base, generated }) => {
        const tree = buildFileTreeFromPaths(allProcessedPaths, path.resolve(base), path.resolve(generated));

        // 🧠 Always write inside the target directory (either base or generated)
        const outputFileName = options.fileTreeOutput || 'index.ts';
        const outputPath = path.join(generated, outputFileName);

        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        writeFileTreeTs(tree, outputPath);
      })
    );
  }

  console.log(`✅ Processed ${validDirs.length} root directories.`);
}

// Example usage:
main(['content/docs'], {
  generateFileTree: true,
  fileTreeOutput: 'index.ts',
  cleanEmptyDirs: true
});
