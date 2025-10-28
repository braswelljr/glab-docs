// source.config.ts
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from "fumadocs-mdx/config";
import { transformerTwoslash } from "fumadocs-twoslash";
import { createFileSystemTypesCache } from "fumadocs-twoslash/cache-fs";
import { z } from "zod";

// lib/remark-console-to-terminal.ts
import { visit } from "unist-util-visit";
function remarkConsoleToTerminal() {
  return (tree) => {
    visit(tree, "code", (node) => {
      if (node.lang === "console" || node.lang === "plaintext") {
        node.lang = "bash";
      }
    });
  };
}

// source.config.ts
var docsMetaSchema = {
  title: z.string().min(1),
  stage: z.string(),
  group: z.string(),
  info: z.string()
};
var docs = defineDocs({
  dir: "content/docs",
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
var source_config_default = defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: "github-light-default",
        dark: "github-dark-default"
      },
      tab: true,
      inline: "tailing-curly-colon",
      transformers: [...rehypeCodeDefaultOptions.transformers ?? [], transformerTwoslash({ typesCache: createFileSystemTypesCache() })]
    },
    remarkPlugins: [remarkConsoleToTerminal]
  }
});
export {
  source_config_default as default,
  docs
};
