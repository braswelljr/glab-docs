import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { siteConfig } from '@/config/site';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: siteConfig.name
    }
  };
}
