'use client';

import { RootProvider } from 'fumadocs-ui/provider/next';
import { ThemeProvider } from '@/providers/theme';

export default function BaseProvider({ children }: { children?: React.ReactNode }) {
  return (
    <ThemeProvider>
      <RootProvider>{children}</RootProvider>
    </ThemeProvider>
  );
}
