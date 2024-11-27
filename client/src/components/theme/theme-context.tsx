'use client';

import { createContext, useContext } from '@/lib/context';

export type ThemeType = {
  screens: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
};
const ThemeContext = createContext<ThemeType>('ThemeContext');

export function useTheme() {
  return useContext(ThemeContext);
}

export type ThemeProviderProps = { theme: ThemeType; children: React.ReactNode };
export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
