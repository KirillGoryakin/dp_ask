import { useMedia } from 'react-use';

import { type ThemeType, useTheme } from './theme-context';

export function useBreakpoint(screenKey: keyof ThemeType['screens']) {
  const screen = useTheme().screens[screenKey];
  return useMedia(`(min-width: ${screen})`, false);
}
