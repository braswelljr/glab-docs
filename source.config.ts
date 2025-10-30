import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins';
import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from 'fumadocs-mdx/config';
import { transformerTwoslash } from 'fumadocs-twoslash';
import { createFileSystemTypesCache } from 'fumadocs-twoslash/cache-fs';
import { z } from 'zod';

// import { remarkConsoleToTerminal } from 'lib/remark-console-to-terminal';

const docsMetaSchema = {
  title: z.string().min(1),
  stage: z.string(),
  group: z.string(),
  info: z.string()
};

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema.extend(docsMetaSchema),
    postprocess: {
      includeProcessedMarkdown: true
    }
  },
  meta: {
    schema: metaSchema.extend(docsMetaSchema)
  }
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: 'github-light-default',
        dark: 'github-dark-default'
      },
      tab: true,
      inline: 'tailing-curly-colon',
      transformers: [...(rehypeCodeDefaultOptions.transformers ?? []), transformerTwoslash({ typesCache: createFileSystemTypesCache() })]
    },
    remarkPlugins: [
      // remarkConsoleToTerminal
    ]
  }
});
