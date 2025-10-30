import { type Metadata } from 'next';
import LocalFont from 'next/font/local';
import { siteConfig } from '@/config/site';
import '@/styles/main.css';
import { Analytics } from '@vercel/analytics/next';
import { cn } from 'lib/utils';
import BaseProvider from '@/providers/base';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: 'Prof Clems',
      url: 'https://braswelljr.vercel.app'
    },
    {
      name: 'braswelljr',
      url: 'https://braswelljr.vercel.app'
    }
  ],
  creator: 'braswelljr',
  icons: {
    icon: '/favicon.ico?v=2',
    shortcut: '/icons/icon.png?v=2',
    apple: '/icons/apple-touch-icon.png?v=2'
  },
  manifest: `/manifest.json`
};

const Satoshi = LocalFont({ src: './_fonts/Satoshi-Variable.woff2', variable: '--font-satoshi' });
const Inter = LocalFont({ src: './_fonts/Inter[slnt,wght].ttf', variable: '--font-inter' });
const AbyssinicaSIL = LocalFont({ src: './_fonts/AbyssinicaSIL-Regular.ttf', variable: '--font-abyssinca' });
const Cascadia = LocalFont({ src: './_fonts/Cascadia.ttf', variable: '--font-cascadia' });
const JetbrainsMono = LocalFont({
  src: [
    { path: './_fonts/jetbrainsmono.ttf', style: 'normal' },
    { path: './_fonts/jetbrainsmono-italic.ttf', style: 'italic' }
  ],
  variable: '--font-mono'
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={cn(Satoshi.variable, Inter.variable, JetbrainsMono.variable, AbyssinicaSIL.variable, Cascadia.className)}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col scroll-smooth font-mono antialiased">
        <BaseProvider>{children}</BaseProvider>
        <Analytics />
      </body>
    </html>
  );
}
