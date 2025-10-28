import type { Root } from 'mdast';
import type { Transformer } from 'unified';
import { visit } from 'unist-util-visit';

/**
 * remarkConsoleToTerminal
 *
 * Converts code blocks:
 * - from ```console, ```plaintext, or ```bash
 * - to ```bash twoslash
 *
 * It also converts lines starting with `>` to
 * `# expands to or results\n<text>`
 */
export function remarkConsoleToTerminal(): Transformer<Root, Root> {
  return (tree) => {
    visit(tree, 'code', (node, _i, _parent) => {
      if (!node.lang) return;

      const lang = node.lang.toLowerCase();

      // Handle console/plaintext/bash as "bash" with "twoslash"
      if (['console', 'plaintext', 'bash'].includes(lang)) {
        node.lang = 'make';
        node.meta = node.meta ? `${node.meta} twoslash` : 'twoslash';
      }
    });
  };
}
