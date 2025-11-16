import * as Twoslash from 'fumadocs-twoslash/ui';
import * as CodeBlock from 'fumadocs-ui/components/codeblock';
import * as FilesComponents from 'fumadocs-ui/components/files';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { cn } from 'lib/utils';
import { icons } from '@/components/icons';

export const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        'mt-2 scroll-m-20 text-2xl leading-tight font-bold tracking-tight text-primary uppercase sm:text-3xl md:text-4xl dark:text-secondary',
        className
      )}
      {...props}
    >
      <span className="text-sm">#</span> {props.children}
    </h1>
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'mt-16 scroll-m-20 border-b border-b-neutral-200 pb-2 text-2xl font-semibold tracking-tight text-primary first:mt-0 dark:border-b-neutral-800 dark:text-secondary',
        className
      )}
      {...props}
    >
      <span className="text-sm">##</span> {props.children}
    </h2>
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn('mt-12 scroll-m-20 text-xl font-semibold tracking-tight text-primary dark:text-secondary', className)}
      {...props}
    >
      <span className="text-sm">###</span> {props.children}
    </h3>
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn('mt-8 scroll-m-20 text-lg font-semibold tracking-tight text-primary dark:text-secondary', className)}
      {...props}
    >
      <span className="text-sm">####</span> {props.children}
    </h4>
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn('mt-8 scroll-m-20 text-base font-semibold tracking-tight text-primary dark:text-secondary', className)}
      {...props}
    >
      <span className="text-sm">#####</span> {props.children}
    </h5>
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn('mt-8 scroll-m-20 text-base font-semibold tracking-tight text-primary dark:text-secondary', className)}
      {...props}
    >
      <span className="text-sm">######</span> {props.children}
    </h6>
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        'font text-primary! underline decoration-current! underline-offset-4 dark:text-secondary! prose-a:text-primary! dark:prose-a:text-secondary!',
        className
      )}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn('mt-6 border-l-2 border-primary-200 pl-6 text-neutral-800 italic *:text-neutral-600 dark:border-secondary-200', className)}
      {...props}
    />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr
      className="my-4 border-primary md:my-8 dark:border-secondary"
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn('relative rounded px-[0.3rem] py-[0.2rem] font-mono text-primary decoration-current! dark:text-secondary', className)}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.ComponentProps<'pre'>) => {
    return (
      <CodeBlock.CodeBlock
        date-code-block="true"
        className={cn('prose font-mono', className)}
        {...props}
      >
        <CodeBlock.Pre>{props.children}</CodeBlock.Pre>
      </CodeBlock.CodeBlock>
    );
  }
};

export function getMDXComponents(comps?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...Twoslash,
    ...FilesComponents,
    ...components,
    ...icons,
    ...comps
  };
}
