import { DynamicViewportHeight } from '@/components/dynamic-viewport-height';
import { NoHoverOnScroll } from '@/components/no-hover-on-scroll';
import { SSRProvider } from '@/components/ssr';
import { Theme } from '@/components/theme';
import { UserProvider } from '@/features/user';

export function LayoutProviders({ children }: React.PropsWithChildren) {
  return (
    <Theme>
      <DynamicViewportHeight />
      <NoHoverOnScroll />
      <UserProvider>
        <SSRProvider>{children}</SSRProvider>
      </UserProvider>
    </Theme>
  );
}
