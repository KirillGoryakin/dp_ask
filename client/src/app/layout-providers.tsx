import { DynamicDialogsProvider } from '@/components/dialog';
import { DynamicViewportHeight } from '@/components/dynamic-viewport-height';
import { NoHoverOnScroll } from '@/components/no-hover-on-scroll';
import { SSRProvider } from '@/components/ssr';
import { Theme } from '@/components/theme';
import { TooltipProvider } from '@/components/tooltip';

export function LayoutProviders({ children }: React.PropsWithChildren) {
  return (
    <Theme>
      <DynamicViewportHeight />
      <NoHoverOnScroll />
      <TooltipProvider>
        <SSRProvider>
          <DynamicDialogsProvider>{children}</DynamicDialogsProvider>
        </SSRProvider>
      </TooltipProvider>
    </Theme>
  );
}
