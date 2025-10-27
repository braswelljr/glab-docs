import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/utils/layout.shared';
import { source } from '@/utils/source';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
    >
      {children}
    </DocsLayout>
  );
}
