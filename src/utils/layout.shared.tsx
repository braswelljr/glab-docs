import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { siteConfig } from '@/config/site';

export function baseOptions(): BaseLayoutProps {
  const config: BaseLayoutProps = {
    themeSwitch: {
      mode: 'light-dark-system'
    },
    nav: {
      title: (
        <span className="flex items-center gap-2">
          <Avatar className="">
            <AvatarImage src="/icons/icon.png" />
            <AvatarFallback>{siteConfig.name}</AvatarFallback>
          </Avatar>
          <span>{siteConfig.name}</span>
        </span>
      )
    },
    links: [
      {
        type: 'main',
        text: 'Documentation',
        description: 'Learn to use GLab',
        url: '/docs'
      }
    ]
  };

  return config;
}
