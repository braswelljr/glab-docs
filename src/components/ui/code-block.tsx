import { getHighlighter, hastToJsx } from 'fumadocs-core/highlight';
import * as Base from 'fumadocs-ui/components/codeblock';
import type { BundledLanguage } from 'shiki';
import { cn } from 'lib/utils';

export type CodeBlockProps = {
  code: string;
  wrapper?: Base.CodeBlockProps;
  lang: string;
};

const highlighter = await getHighlighter('oniguruma', {
  langs: ['js', 'ts', 'jsx', 'tsx', 'bash', 'go', 'c', 'cpp', 'java', 'php', 'rust', 'ruby'],
  themes: ['vesper', 'github-light', 'github-dark']
});

export async function CodeBlock({ code, lang, wrapper }: CodeBlockProps) {
  await highlighter.loadLanguage(lang as BundledLanguage);
  const hast = highlighter.codeToHast(code, {
    lang,
    defaultColor: false,
    themes: {
      light: 'github-light',
      dark: 'vesper'
    }
  });

  const rendered = hastToJsx(hast, {
    components: {
      pre: Base.Pre
    }
  });

  return (
    <Base.CodeBlock
      {...wrapper}
      className={cn('my-0', wrapper?.className)}
    >
      {rendered}
    </Base.CodeBlock>
  );
}
