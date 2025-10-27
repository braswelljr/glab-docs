'use client';

import { ThemeProvider as Theme } from 'next-themes';

export function ThemeProvider({ children }: { children?: React.ReactNode }) {
  return (
    <Theme
      enableSystem
      defaultTheme="light"
      attribute="class"
    >
      {children}
    </Theme>
  );
}
