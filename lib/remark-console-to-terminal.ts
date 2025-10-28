import type { Root } from 'mdast';
import type { Transformer } from 'unified';
import { visit } from 'unist-util-visit';

export function remarkConsoleToTerminal(): Transformer<Root, Root> {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (node.lang === 'console' || node.lang === 'plaintext') {
        node.lang = 'bash';
      }
    });
  };
}
