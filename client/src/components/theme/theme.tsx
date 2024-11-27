import resolveConfig from 'tailwindcss/resolveConfig';
import { pick } from 'lodash';

import tailwindConfig from '../../../tailwind.config';
import { ThemeProvider } from './theme-context';

const fullConfig = resolveConfig(tailwindConfig) as any;

export type ThemeProps = { children: React.ReactNode };
export function Theme({ children }: ThemeProps) {
  return <ThemeProvider theme={pick(fullConfig.theme, ['screens'])}>{children}</ThemeProvider>;
}
