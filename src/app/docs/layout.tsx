import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/utils/layout.shared';
import { source } from '@/utils/source';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const { nav, ...base } = baseOptions();
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{ ...nav }}
      githubUrl="https://github.com/braswelljr/glab-docs"
      {...base}
    >
      {children}
    </DocsLayout>
  );
}
